import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'
import { buildSystemPrompt } from '../../../lib/knowledge'
import type { Locale } from '../../../types'

export const runtime = 'nodejs'

const SUPPORTED_LOCALES: Locale[] = ['en', 'it', 'es', 'fr']

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
    const body = await req.json()
    const message: unknown = body?.message
    const localeInput: unknown = body?.locale

    if (typeof message !== 'string' || message.trim().length === 0) {
      return Response.json({ error: 'Messaggio mancante o non valido.' }, { status: 400 })
    }

    const locale: Locale = SUPPORTED_LOCALES.includes(localeInput as Locale)
      ? (localeInput as Locale)
      : 'en'

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
