# Entity: Contact Form

## Scope
`src/components/Contact.tsx` — Componente React del form di contatto

## Responsibility
Raccogliere nome, email, messaggio dall'utente e orchestrare il flusso:
1. Chiamare `useContactAgent().analyze()` → POST /api/chat
2. In base alla categoria: mostrare modale FAQ, inviare email via EmailJS, o mostrare messaggio neutro

## Input
- `form.name: string` — da `<input type="text">` required
- `form.email: string` — da `<input type="email">` required
- `form.message: string` — da `<textarea>` required
- `local: Locale` — prop dal parent

## Output
- `info`: Apre `<Modal>` con reply AI
- `lead`: `emailjs.send()` → alert success + reset form dopo 3s
- `spam`: Alert neutro + reset form dopo 3s
- `error`: Alert danger

## Dependencies
- `useContactAgent` (useChat.ts) → fetch /api/chat
- `useAlert` (useAlert.ts) → alert UI
- `emailjs` (@emailjs/browser) → invio email
- `Modal` component → modale FAQ
- `animejs` → animazione SVG (lazy loaded)
- `store.i18n` → stringhe localizzate

## Trust Boundaries
- **Form inputs:** Dati utente non trusted. Validazione HTML5 (type, required) — facilmente bypassabile.
- **AI pipeline:** Solo `message` va all'AI. `name` e `email` restano nel client.
- **EmailJS:** `name`, `email`, `message` inviati via EmailJS. Chiavi `NEXT_PUBLIC_*` nel bundle.
- **Modal:** `modalReply` (da AI) renderizzato come children React (safe escaping).

## Security Notes
- `notifyOwnerByEmail()` è fire-and-forget — non verifica l'esito di EmailJS.
- `setTimeout` per hide alert — nessun cleanup se il componente si smonta (memory leak minore).
- Lazy import di `animejs` — dynamic import, nessun rischio statico.
- `handleChange` usa `e.target.name` per aggiornare lo stato — pattern sicuro con controlled components.
- `console.error(err)` nel catch — logga errori in console browser.