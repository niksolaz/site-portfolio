# mantis-summary: src

## Core Components
Riepilogo dell'intera applicazione Next.js 14 (React 18, TypeScript, TailwindCSS).

### Sotto-direzioni
- `app/` — Entry point Next.js: layout, pagine, API route, robots, sitemap.
- `app/api/chat/` — Endpoint AI per classificazione messaggi form di contatto.
- `app/blogs/` — Pagina blog segnaposto (no-index).
- `components/` — 13 componenti React: form contatto, modale, alert, navigazione, 3D, legale.
- `hooks/` — 4 hook personalizzati: AI chat, alert, locale, tema.
- `lib/` — Librerie: knowledge base AI, configurazione SEO.
- `store/` — Dati statici localizzati (i18n, cards, about).
- `types/` — Type definitions condivise.

## API Endpoints & Exports
- `POST /api/chat` — classificazione messaggi via AI (rate limited, input validated).
- Pagine statiche: `/`, `/about`, `/blogs` (no-index).
- File generati: `/robots.txt`, `/sitemap.xml`.

## Trust Boundaries & External Inputs
- **Frontiera principale:** `POST /api/chat` — unico endpoint che accetta input esterno non trusted.
- **Frontiera secondaria:** Form contatto → EmailJS (chiavi pubbliche esposte nel bundle JS).
- **Frontiera terziaria:** localStorage (lingua, tema, consenso cookie) — manipolabile ma senza impatto server-side.
- **Prompt injection:** Il messaggio utente è inserito come prompt LLM. La mitigazione attuale (istruzione testuale nel system prompt) è fragile.
- **XSS:** `dangerouslySetInnerHTML` in layout.tsx (JSON-LD, dati statici). Nessun altro uso rilevato.

## Sensitive Operations
- **Chiamate AI esterne:** Google Gemini riceve il testo del messaggio utente. Nome e email NON vengono inviati (data minimization).
- **Invio email:** EmailJS su rete pubblica — chiavi `NEXT_PUBLIC_*` esposte.
- **Rate limiting:** In-memory, non condiviso tra istanze serverless (Vercel). Multi-istanza = bypassabile.
- **Timeout:** Nessun timeout su fetch AI e EmailJS.
- **Error handling:** `console.error` in produzione potrebbe loggare dati sensibili.
- **CSP Headers:** Assenti. Nessuna protezione contro XSS o content injection.
- **CORS:** Default Next.js (same-origin per API routes).

## Deployment & Configurazione
- **Target:** Vercel (desunto da riferimenti nel codice e docs).
- **Node.js:** 22.x (`.nvmrc`).
- **ESLint:** `next/core-web-vitals`.
- **next.config.mjs:** Vuoto — nessuna configurazione di sicurezza esplicita.
- **Environment:** `.env` in `.gitignore`. Variabili `NEXT_PUBLIC_*` per EmailJS; chiavi AI server-side.

## Dipendenze critiche (security-relevant)
- `next@14.1.1` — verificare CVE note.
- `@ai-sdk/google@^3.0.80` — SDK AI.
- `@emailjs/browser@^4.3.3` — SDK email client-side.
- `zod@^4.4.3` — validazione schema.
- `@react-three/fiber@^8.18.0`, `three@^0.169.0` — rendering 3D.
- `animejs@^4.4.1` — animazioni SVG.

## Historical Vulnerabilities & Fixes
- DOCS/FORM_AGENT.md: chiavi AI originariamente `NEXT_PUBLIC_` → spostate server-side.
- DOCS/FORM_AGENT.md sezione "Possibili miglioramenti": rate limiting, validazione input, invio email lato server, persistenza lead, fallback AI, test automatici — tutti ancora da implementare.