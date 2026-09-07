# Entity: Third-Party Dependencies

## Scope
`package.json` — tutte le dipendenze npm del progetto

## Production Dependencies

| Pacchetto | Versione | Ruolo | Rischio |
|-----------|----------|-------|---------|
| `next` | 14.1.1 | Framework React | CVE note, EOL |
| `react` | ^18 | UI library | CVE note |
| `react-dom` | ^18 | DOM rendering | CVE note |
| `@ai-sdk/google` | ^3.0.80 | Google Gemini SDK | Data exposure |
| `@ai-sdk/anthropic` | ^3.0.81 | Anthropic SDK (non usato?) | Inutilizzato, rimuovere |
| `@ai-sdk/openai` | ^3.0.67 | OpenAI SDK (non usato?) | Inutilizzato, rimuovere |
| `ai` | ^6.0.193 | Vercel AI SDK core | Supply chain |
| `@emailjs/browser` | ^4.3.3 | EmailJS client SDK | Chiavi esposte |
| `@react-three/fiber` | ^8.18.0 | React Three.js renderer | 3D rendering |
| `@react-three/drei` | ^9.122.0 | Three.js helpers | 3D rendering |
| `three` | ^0.169.0 | 3D library | XSS via model? |
| `@reduxjs/toolkit` | ^2.2.1 | State management | Supply chain |
| `react-redux` | ^9.1.0 | React-Redux binding | Supply chain |
| `animejs` | ^4.4.1 | Animazioni SVG | DOM manipulation |
| `zod` | ^4.4.3 | Schema validation | Supply chain |

## Dev Dependencies

| Pacchetto | Versione | Ruolo |
|-----------|----------|-------|
| `typescript` | ^5 | Type checker |
| `eslint` | ^8 | Linter |
| `eslint-config-next` | 14.1.1 | Regole ESLint Next.js |
| `tailwindcss` | ^3.3.0 | CSS framework |
| `postcss` | ^8 | CSS processor |
| `autoprefixer` | ^10.0.1 | Vendor prefixes |
| `@types/node` | ^20 | Node types |
| `@types/react` | ^18 | React types |
| `@types/react-dom` | ^18 | React DOM types |
| `@types/three` | ^0.169.0 | Three.js types |

## Supply Chain Risks

1. **Dipendenze inutilizzate:** `@ai-sdk/anthropic` e `@ai-sdk/openai` sono nel
   package.json ma non usate nel codice. Aumentano la superficie di attacco senza
   beneficio. Rimuovere.
2. **Versioni non bloccate:** La maggior parte delle dipendenze usa `^` (compatibile
   con minor/patch). Un attacco alla supply chain potrebbe introdurre codice malevolo
   in una patch version.
3. **package-lock.json:** presente (369MB?) — le versioni esatte sono bloccate.
4. **Nessun `npm audit` nel workflow:** Non c'è scanning automatico delle vulnerabilità.
5. **Next.js 14.1.1:** Versione di Febbraio 2024. Verificare CVE pubblicate dopo
   quella data (es. CVE-2024-34351, CVE-2024-34350, CVE-2025-29927).
6. **animejs 4.x:** Lazy-loaded via dynamic import. Rischio limitato ma da monitorare.

## Raccomandazioni
- `npm audit` per vulnerabilità note
- Rimuovere dipendenze non usate (`@ai-sdk/anthropic`, `@ai-sdk/openai`)
- Considerare Dependabot o Renovate per aggiornamenti automatici
- Valutare `npm audit signatures` per verificare l'integrità dei pacchetti
- Aggiornare Next.js all'ultima patch della versione 14.x