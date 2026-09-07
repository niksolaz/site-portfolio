# Architecture: Portfolio Site

## System Overview

Applicazione web Next.js 14 (App Router) di tipo portfolio personale per Nicola Solazzo,
Digital Solutions Developer. Il sito è un single-page con sezioni (Hero, Process, Services,
About, Contact) + pagina About dedicata + pagina Blog (placeholder).

**Runtime:** Node.js 22.x su Vercel (serverless)
**Linguaggio:** TypeScript 5 (strict mode)
**Styling:** TailwindCSS 3
**State Management:** Redux Toolkit (store statico) + React hooks
**i18n:** IT/EN con dati statici localizzati (nessuna libreria i18n esterna)

## Data Flow

### Primary Data Flow: Contact Form Pipeline
```
Browser (Contact.tsx)
  │
  ├─1─→ POST /api/chat { message, locale }
  │      │
  │      ├─ Validazione: message string, max 2000 chars, locale whitelist
  │      ├─ Rate limiting: IP-based sliding window (60s, 5 req)
  │      └─ generateObject (Google Gemini 2.5 Flash)
  │           ├─ Schema Zod: { category: enum, reply: string }
  │           └─ System prompt: buildSystemPrompt(locale) da knowledge.ts
  │
  ├─2─← Response { category, reply }
  │
  └─3─→ switch(category)
         ├─ 'info'  → Modal con reply (nessuna email)
         ├─ 'lead'  → EmailJS.send() → alert success
         └─ 'spam'  → alert neutro (nessuna email)
```

### Secondary Data Flows
- **localStorage:** lingua, tema, consenso cookie (solo client, manipolabile)
- **SEO metadata:** layout.tsx → metadati statici + JSON-LD
- **3D rendering:** Hero3D.tsx → useGLTF('mac-draco.glb') → Three.js canvas
- **robots.txt / sitemap.xml:** generazione dinamica Next.js da siteConfig

## Component Architecture

```
RootLayout (layout.tsx)
├── Navbar
├── [page content]
│   ├── Home (page.tsx)
│   │   ├── HeroScene / Hero3D (Three.js)
│   │   ├── Process (4 step cards)
│   │   ├── Card (services, 6 items)
│   │   ├── About (teaser)
│   │   └── Contact ← ATTACK SURFACE
│   ├── About (about/page.tsx)
│   │   └── AboutView
│   └── Blogs (blogs/page.tsx) [no-index, placeholder]
├── Footer
├── LegalCenter (cookie banner + modali)
├── ThemeControls
└── Alert (toast notifications)
```

## Trust Boundaries

| Boundary | Trusted Side | Untrusted Side | Data Flow |
|----------|-------------|----------------|-----------|
| API Route | Server (Node.js) | Client browser | message, locale → AI classification |
| AI Provider | Server | Google Gemini API | message text (no PII) → Gemini |
| EmailJS | Client browser | EmailJS API | name, email, message → email |
| localStorage | Client browser | User/browser | preferences ←→ localStorage |
| Static assets | Server/CDN | Browser | HTML, JS, CSS, 3D models |

## Key Security Properties

### Server-side
- API key AI: server-only (NON `NEXT_PUBLIC_`)
- Input validation: message type check, length cap, locale whitelist
- Rate limiting: in-memory per IP (non condiviso tra istanze serverless)
- Output validation: Zod schema forzato sull'output AI

### Client-side
- EmailJS keys: `NEXT_PUBLIC_*` (intenzionalmente pubbliche per SDK browser)
- localStorage: nessun dato sensibile, solo preferenze UI
- XSS protection: React default escaping (eccetto `dangerouslySetInnerHTML` in layout.tsx)

### Missing
- CSP Headers: assenti
- CORS: default Next.js (same-origin API routes)
- Security headers (HSTS, X-Content-Type-Options, etc.): non configurati
- CSRF protection: non esplicita (Next.js gestisce same-origin per API routes)
- Dependency scanning: nessun `npm audit` o SCA nel workflow
- Timeout su chiamate esterne: assente

## Deployment Model

- **Hosting:** Vercel (serverless functions per API routes)
- **Build:** `next build` → output statico + funzioni serverless
- **Environment:** `.env` con variabili server-side (AI key) e client-side (EmailJS IDs)
- **CI/CD:** non visibile nel repository (probabilmente Vercel Git integration)

## External Dependencies

| Servizio | Ruolo | Rischio |
|----------|-------|--------|
| Google Gemini | AI classification | Data exposure (message text), prompt injection, cost |
| EmailJS | Email delivery | Spam/abuse via public keys, email forgery |
| Vercel | Hosting | Platform security, environment variables |
| npm registry | Package supply | Dependency vulnerabilities, typosquatting |
| Google Fonts | Typography | Tracking (se non self-hosted), GDPR |

## File Inventory

Tutti i file sorgente sono sotto `src/` (~20 file TypeScript/TSX escludendo asset statici).
Vedi `mantis-summary.md` in ogni sottodirectory per dettagli per-file.