# Entity: API Chat Endpoint

## Scope
`src/app/api/chat/route.ts` — Endpoint `POST /api/chat`

## Responsibility
Classificare i messaggi inviati dal form di contatto usando Google Gemini (AI).
Restituisce `{ category: 'spam'|'info'|'lead', reply: string }`.

## Input
- `message: string` — testo libero dal form (max 2000 caratteri). Non validato oltre a type check e length.
- `locale: string` — whitelist `['it', 'en']`, default `'it'`.
- `x-forwarded-for` header — usato per IP-based rate limiting.

## Output
- `200`: `{ category, reply }`
- `400`: `{ error: 'Messaggio mancante o non valido.' }`
- `413`: `{ error: 'Messaggio troppo lungo.' }`
- `429`: `{ error: 'Troppe richieste...' }`
- `500`: `{ error: 'Errore durante l'analisi...' }`

## Dependencies
- `@ai-sdk/google` → `google('gemini-2.5-flash')`
- `ai` → `generateObject`
- `zod` → `analysisSchema`
- `../../../lib/knowledge` → `buildSystemPrompt`

## Trust Boundaries
- **Input boundary:** Messaggio utente non trusted → validato per tipo e lunghezza.
- **AI boundary:** Messaggio inviato a Google Gemini. Chiave API server-side.
- **Rate limiting boundary:** IP da `x-forwarded-for` (spoofabile senza proxy trusted).
- **Output boundary:** Risposta AI validata da Zod schema.

## Security Notes
- Rate limiting non è condiviso tra istanze serverless (Vercel). Multi-istanza = bypass.
- `console.error(error)` nel catch potrebbe loggare dati del messaggio o errori API.
- Nessun timeout su `generateObject`.
- Prompt injection mitigato solo da istruzione testuale nel system prompt.
- La mappa `requestLog` non ha TTL automatico — pulizia manuale a 1000 entry.