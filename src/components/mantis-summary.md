# mantis-summary: src/components

## Core Components
- `Contact.tsx` — Form di contatto principale: integra AI (useChat) + EmailJS. Gestisce i 3 rami (spam/info/lead).
- `Alert.tsx` — Alert UI: rendering condizionale di `text` prop in un `<p>`.
- `Modal.tsx` — Modale accessibile (ESC, overlay click, body scroll lock, focus trap).
- `Navbar.tsx` / `Footer.tsx` — Navigazione e footer con link.
- `Hero3D.tsx` / `HeroScene.tsx` — Rendering 3D con Three.js + React Three Fiber.
- `ThemeControls.tsx` — Toggle tema (localStorage).
- `LegalCenter.tsx` — Banner cookie + modali per Termini/Cookie/Privacy.
- `About.tsx` / `AboutView.tsx` — Pagina About.
- `Process.tsx` — Sezione "Come lavoro".
- `SectionHeading.tsx` — Componente titolo di sezione.
- `Card.tsx` / `Cardblog.tsx` — Card UI.

## API Endpoints & Exports
- `Contact` — `handleSubmit` → `POST /api/chat` → switch(category) → EmailJS / Modal / Alert.
- `Alert` — renderizza `text` in `<p>` (React-escapato di default, safe).
- `Modal` — children renderizzati direttamente (React-escapato).

## Trust Boundaries & External Inputs
- **Form input (Contact.tsx):** `form.name`, `form.email`, `form.message` — tutti da `<input>` / `<textarea>` controllati React. Il `message` è inviato all'AI; `name` e `email` vanno solo a EmailJS.
- **EmailJS:** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` esposti nel bundle JS. `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` è visibile. EmailJS è progettato per avere la public key esposta, ma service_id e template_id possono essere usati per inviare email non autorizzate se non protetti.
- **localStorage:** `LegalCenter.tsx` e `ThemeControls.tsx` leggono/scrivono preferenze in localStorage — manipolabile, usato solo lato client.
- **3D assets:** `Hero3D.tsx` carica `public/mac-draco.glb` via `useGLTF` — file statico, nessun input esterno.
- **Modal.tsx:** `children` renderizzati direttamente. Nel caso d'uso corrente, `modalReply` (da AI) è renderizzato come testo in un `<div>` — React lo esegue l'escaping. Se in futuro si usasse `dangerouslySetInnerHTML`, si aprirebbe un vettore XSS.

## Sensitive Operations
- `Contact.tsx`: `import('animejs')` dinamico — carica anime.js on-demand per l'animazione SVG.
- `Contact.tsx`: `setTimeout` per auto-hide alert — non cleanup se il componente si smonta prima del timeout (potenziale memory leak minore).
- `Contact.tsx`: `notifyOwnerByEmail()` — se EmailJS fallisce silenziosamente, il lead viene perso senza feedback all'utente (il codice mostra "success" prima di verificare l'esito).
- `LegalCenter.tsx`: rendering di testi legali lunghi (20+ KB) — da verificare che non ci sia XSS se i testi vengono da fonti esterne in futuro (attualmente sono hardcoded in i18n.ts).

## Historical Vulnerabilities & Fixes
- Nessuna nota.