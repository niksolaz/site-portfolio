/**
 * POST /api/send-email
 *
 * Proxy server-side per EmailJS. Invia l'email di notifica quando un visitatore
 * e' classificato come "lead". Le chiavi EmailJS (service_id, template_id,
 * public_key) sono SOLO lato server — NESSUNA variabile NEXT_PUBLIC_*.
 *
 * Questo sostituisce la chiamata diretta da client (Contact.tsx → emailjs.send)
 * con una chiamata indiretta (Contact.tsx → POST /api/send-email → EmailJS API).
 *
 * Data minimization (GDPR): al server arrivano name, email, message.
 * Questi dati sono gia' stati forniti volontariamente dall'utente nel form.
 */

import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

// ---------------------------------------------------------------------------
// Validazione input lato server (defense-in-depth).
// ---------------------------------------------------------------------------
const MAX_FIELD_LENGTH = 2000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

interface EmailPayload {
  name: string
  email: string
  message: string
}

function validatePayload(body: unknown): EmailPayload | null {
  if (!body || typeof body !== 'object') return null
  const { name, email, message } = body as Record<string, unknown>

  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 200) return null
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) return null
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > MAX_FIELD_LENGTH) return null

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  }
}

export async function POST(req: NextRequest) {
  // Verifica che le variabili d'ambiente siano configurate.
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    console.error(JSON.stringify({
      ts: new Date().toISOString(),
      context: 'POST /api/send-email',
      detail: 'EmailJS env vars missing',
    }))
    return Response.json(
      { error: 'Configurazione email non disponibile.' },
      { status: 500 },
    )
  }

  // --- Input validation ---
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Richiesta non valida.' }, { status: 400 })
  }

  const payload = validatePayload(body)
  if (!payload) {
    return Response.json({ error: 'Dati del form non validi.' }, { status: 400 })
  }

  // --- Chiamata EmailJS REST API (lato server) ---
  // Usiamo l'endpoint pubblico di EmailJS. La public_key e' progettata
  // per essere usata in chiamate API; service_id e template_id restano
  // visibili solo lato server (non nel bundle JS del browser).
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: publicKey,
        template_params: {
          from_name: payload.name,
          to_name: 'Nicola',
          from_email: payload.email,
          to_email: process.env.OWNER_EMAIL || '[EMAIL]',
          message: payload.message,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      const text = await response.text().catch(() => '')
      console.error(JSON.stringify({
        ts: new Date().toISOString(),
        context: 'POST /api/send-email',
        detail: `EmailJS returned ${response.status}`,
      }))
      return Response.json(
        { error: "Errore nell'invio dell'email." },
        { status: 502 },
      )
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error(JSON.stringify({
      ts: new Date().toISOString(),
      context: 'POST /api/send-email',
      detail: error instanceof Error ? error.constructor.name : 'unknown',
    }))
    return Response.json(
      { error: "Errore nell'invio dell'email." },
      { status: 502 },
    )
  }
}