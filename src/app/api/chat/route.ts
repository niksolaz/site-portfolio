import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'
import { buildSystemPrompt } from '../../../lib/knowledge'
import type { Locale } from '../../../types'

export const runtime = 'nodejs'

const SUPPORTED_LOCALES: Locale[] = ['it', 'en']

// Limite di lunghezza del messaggio: protegge dai costi di messaggi enormi.
const MAX_MESSAGE_LENGTH = 2000
// Timeout massimo per la chiamata a Google Gemini (15 secondi).
const AI_TIMEOUT_MS = 15_000

// ---------------------------------------------------------------------------
// Structured logger — NIENTE dati utente o errori completi in produzione.
// ---------------------------------------------------------------------------
function logError(context: string, detail: string): void {
  // In produzione usa un logger strutturato (Pino, Winston) con redaction.
  // Qui emettiamo solo tipo e contesto, mai il messaggio utente o l'errore raw.
  console.error(
    JSON.stringify({ ts: new Date().toISOString(), context, detail }),
  )
}

// ---------------------------------------------------------------------------
// Prompt hardening: rimuove pattern comuni di prompt injection dal messaggio.
// Non e' una difesa perfetta (il modello puo' sempre essere ingannato),
// ma riduce la superficie di attacco per i tentativi piu' semplici.
// ---------------------------------------------------------------------------
function sanitizeMessage(raw: string): string {
  let cleaned = raw
    // Rimuove delimiter injection: triple backtick e sequenze XML-style.
    .replace(/```/g, "'''")
    .replace(/<\|[\s\S]*?\|>/g, '')
    .replace(/<\|/g, '')
    // Normalizza caratteri Unicode insoliti usati per bypass.
    .replace(/[\u200B-\u200F\u2028-\u202F\uFEFF]/g, '')
    .trim()

  // Tronca a max length dopo la sanitizzazione.
  if (cleaned.length > MAX_MESSAGE_LENGTH) {
    cleaned = cleaned.slice(0, MAX_MESSAGE_LENGTH)
  }
  return cleaned
}

// ---------------------------------------------------------------------------
// Rate limiting in-memory per IP (sliding window).
// LIMITAZIONE NOTA: in ambienti serverless con piu' istanze il contatore
// non e' condiviso (ogni lambda ha la sua Map). Questo blocca gli abusi
// piu' comuni (loop dalla stessa istanza). Per ambienti multi-istanza
// (Vercel) valutare Upstash Redis / Vercel KV per un rate limiter globale.
//
// MITIGAZIONE AGGIUNTIVA: il costo per richiesta e' basso (classificazione
// con modello flash). Il rate limit + la sanitizzazione + il timeout
// offrono una protezione a strati adeguata per un portfolio personale.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  requestLog.set(ip, timestamps)

  // Pulizia periodica per non far crescere la mappa all'infinito.
  if (requestLog.size > 1000) {
    requestLog.forEach((value, key) => {
      if (value.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key)
    })
  }
  return false
}

const analysisSchema = z.object({
  category: z
    .enum(['spam', 'info', 'lead'])
    .describe('Categoria del messaggio: spam, info (richiesta informazioni) o lead (potenziale cliente/collaborazione).'),
  reply: z
    .string()
    .describe('Risposta FAQ da mostrare all\'utente. Valorizzata SOLO quando category = "info", altrimenti stringa vuota.'),
})

export async function POST(req: Request) {
  try {
    // --- Rate limiting ---
    // Prendiamo l'IP piu' a destra di x-forwarded-for (impostato dal proxy Vercel).
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',').pop()?.trim() ?? 'unknown'

    if (isRateLimited(ip)) {
      return Response.json(
        { error: 'Troppe richieste, riprova tra qualche istante.' },
        { status: 429 },
      )
    }

    // --- Input parsing & validation ---
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return Response.json({ error: 'Richiesta non valida.' }, { status: 400 })
    }

    const rawMessage: unknown = (body as Record<string, unknown>)?.message
    const localeInput: unknown = (body as Record<string, unknown>)?.locale

    if (typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
      return Response.json({ error: 'Messaggio mancante o non valido.' }, { status: 400 })
    }

    // --- Prompt hardening: sanitizza input prima di passarlo all'AI ---
    const message = sanitizeMessage(rawMessage)

    // Dopo sanitizzazione, verifica che il messaggio non sia vuoto.
    if (message.length === 0) {
      return Response.json({ error: 'Messaggio non valido dopo la sanitizzazione.' }, { status: 400 })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: 'Messaggio troppo lungo.' }, { status: 413 })
    }

    const locale: Locale = SUPPORTED_LOCALES.includes(localeInput as Locale)
      ? (localeInput as Locale)
      : 'it'

    // --- AI classification con timeout esplicito ---
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: analysisSchema,
      system: buildSystemPrompt(locale),
      prompt: `Messaggio del visitatore da analizzare:\n"""\n${message}\n"""`,
      // AbortSignal ferma la chiamata dopo 15 secondi (protegge da hanging).
      abortSignal: AbortSignal.timeout(AI_TIMEOUT_MS),
    })

    // --- Output validation (defense-in-depth contro prompt injection) ---
    // Lo schema Zod garantisce category e reply validi. Verifichiamo anche
    // che reply non contenga tentativi di injection nel markup.
    const category = object.category
    let reply = object.reply

    // reply e' valida solo per category === 'info'.
    if (category !== 'info') {
      reply = ''
    }

    // Taglia reply se e' eccessivamente lunga (max 2000 caratteri).
    if (reply.length > MAX_MESSAGE_LENGTH) {
      reply = reply.slice(0, MAX_MESSAGE_LENGTH)
    }

    return Response.json({ category, reply })
  } catch (error) {
    // Structured logging: MAI loggare il messaggio utente o l'errore completo.
    const reason = error instanceof Error ? error.constructor.name : typeof error
    logError('POST /api/chat', reason)
    return Response.json(
      { error: "Errore durante l'analisi del messaggio." },
      { status: 500 },
    )
  }
}