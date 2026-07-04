import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'
import { buildSystemPrompt } from '../../../lib/knowledge'
import type { Locale } from '../../../types'

export const runtime = 'nodejs'

const SUPPORTED_LOCALES: Locale[] = ['it', 'en']

// Limite di lunghezza del messaggio: protegge dai costi di messaggi enormi.
const MAX_MESSAGE_LENGTH = 2000

// ---------------------------------------------------------------------------
// Rate limiting in-memory per IP (sliding window).
// NOTA: in ambienti serverless con piu' istanze il contatore non e' condiviso;
// per una protezione robusta valutare Upstash/Vercel KV. Qui blocca comunque
// gli abusi piu' comuni (loop di richieste dalla stessa istanza).
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
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return Response.json({ error: 'Troppe richieste, riprova tra qualche istante.' }, { status: 429 })
    }

    const body = await req.json()
    // Data minimization: questa route accetta SOLO message + locale.
    // Nome ed email del form non servono all'AI e non devono arrivare qui.
    const message: unknown = body?.message
    const localeInput: unknown = body?.locale

    if (typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: 'Messaggio mancante o non valido.' }, { status: 400 })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: 'Messaggio troppo lungo.' }, { status: 413 })
    }

    const locale: Locale = SUPPORTED_LOCALES.includes(localeInput as Locale)
      ? (localeInput as Locale)
      : 'it'

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: analysisSchema,
      system: buildSystemPrompt(locale),
      prompt: `Messaggio del visitatore da analizzare:\n"""\n${message}\n"""`,
    })

    // Garantisce che reply sia popolata solo per le richieste di informazioni.
    const reply = object.category === 'info' ? object.reply : ''

    return Response.json({ category: object.category, reply })
  } catch (error) {
    console.error('Errore analisi messaggio /api/chat:', error)
    return Response.json({ error: 'Errore durante l\'analisi del messaggio.' }, { status: 500 })
  }
}
