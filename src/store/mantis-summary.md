# mantis-summary: src/store

## Core Components
- `store.ts` — Aggregatore centrale: `{ cards, about, i18n }`.
- `cards.ts` — Card servizi localizzate (IT/EN), 6 card per lingua.
- `about.ts` — Dati statici per la pagina About.
- `i18n.ts` — Tutte le stringhe localizzate (navigazione, hero, process, servizi, about, footer, contatti, legali).

## API Endpoints & Exports
- `store` — oggetto esportato come singolo punto di accesso ai dati.
- `i18n` — ~30+ chiavi localizzate (form, modali, alert, legal docs). Include testi legali completi (Termini, Cookie Policy, Privacy Policy) con placeholder `[EMAIL]`.

## Trust Boundaries & External Inputs
- Nessun input esterno. I dati sono statici e importati lato client nei componenti React.
- Il placeholder `[EMAIL]` nei testi legali (`i18n.ts:93`, `i18n.ts:340`, `i18n.ts:366`) non viene sostituito dinamicamente — l'email reale non è nel codice.

## Sensitive Operations
- I testi legali (privacy policy, termini) contengono riferimenti a GDPR, AI Act (Reg. UE 2024/1689), Legge 132/2025 — richiedono aggiornamento normativo periodico.
- La privacy policy dichiara esplicitamente che nome e email NON vengono trasmessi al sistema AI — claim da verificare nella route.

## Historical Vulnerabilities & Fixes
- Nessuna nota.