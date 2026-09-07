# mantis-summary: src/app

## Core Components
- `layout.tsx` — Root layout: metadata globali, JSON-LD strutturato (Person + ProfessionalService), favicon, robots.
- `page.tsx` — Home page (da esaminare per XSS/rendering dinamico).
- `robots.ts` — Generazione dinamica di robots.txt: `allow: /`, `disallow: /blogs`.
- `sitemap.ts` — Generazione dinamica sitemap.xml.
- `globals.css` — Stili globali Tailwind.
- `favicon.ico` + icone PWA — Asset statici.

## API Endpoints & Exports
- `/` — Home page.
- `/robots.txt` — generato dinamicamente.
- `/sitemap.xml` — generato dinamicamente.
- `/blogs` — pagina blog (no-index).

## Trust Boundaries & External Inputs
- `layout.tsx`: `dangerouslySetInnerHTML` usato per JSON-LD. Il JSON è costruito staticamente da `siteConfig` — nessun input utente, quindi il rischio XSS è controllato.
- `metadataBase: new URL(siteConfig.url)` — ancora l'URL a dominio fisso, previene open-redirect via metadata.
- `robots.ts`: `siteConfig.url` usato per `host` e `sitemap` — se `siteConfig.url` fosse manipolabile, sarebbe un open-redirect. Ma è `as const`.

## Sensitive Operations
- `dangerouslySetInnerHTML` in layout.tsx:94 — bypassa l'escaping di React. Il contenuto è controllato (hardcoded), ma è pattern da monitorare in future modifiche.
- Metadata: `keywords` contengono dati personali (nome) e professionali — pubblici per design.

## Historical Vulnerabilities & Fixes
- Nessuna nota.