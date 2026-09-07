# Entity: i18n System

## Scope
`src/store/i18n.ts` + `src/types/index.ts` + `src/hooks/useLocale.ts`

## Responsibility
Gestire la localizzazione IT/EN dell'interfaccia utente. Tutte le stringhe sono definite
staticamente in `i18n.ts` e accessibili via `store.i18n`.

## Components

### Type System (`src/types/index.ts`)
- `type Locale = 'it' | 'en'`
- `type LocaleMap<T> = Record<Locale, T>`

### String Store (`src/store/i18n.ts`)
- **Navigazione:** `navMenu`, `navContactLink`
- **Hero:** `heroEyebrow`, `heroTitle`, `heroSubtitle`, `heroCtaPrimary`, `heroCtaSecondary`
- **Process:** `processSection`, `processSteps` (4 step)
- **Servizi:** `servicesSection`
- **About:** `aboutTeaser`, `aboutPage`
- **Footer:** `footer`
- **Contatti:** `contactPreTitle`, `contactEndTitle`, `contactBtnSend`, `contactFormLabels`, `contactModalTitle/Close`, `contactAiNotice/ReplyLabel`, `contactNeutralMessage`, `contactSuccessMessage`, `contactErrorMessage`
- **Legali:** `legal` (banner + links + docs completi: Termini, Cookie Policy, Privacy Policy)

### Locale Hook (`src/hooks/useLocale.ts`)
- Legge/scrive `locale` in `localStorage`
- Fallback a default (probabilmente 'it')

## Trust Boundaries
- **localStorage:** La lingua è salvata in localStorage — manipolabile dal client. Non ha
  impatto server-side (il locale è validato con whitelist nella route API).
- **Testi legali:** I testi completi di Termini, Cookie Policy e Privacy Policy sono
  hardcoded in `i18n.ts`. Contengono placeholder `[EMAIL]` che deve essere sostituito
  a runtime o build time. Da verificare che non ci sia XSS se i testi vengono renderizzati
  con `dangerouslySetInnerHTML`.
- **Contenuti generati da AI:** `contactAiReplyLabel` e `contactAiNotice` sono etichette
  statiche per trasparenza AI (Art. 50 AI Act).

## Security Notes
- I testi legali usano `[EMAIL]` come placeholder. Se la sostituzione avviene lato client
  senza escaping, potrebbe esserci XSS. Da verificare nel componente `LegalCenter.tsx`.
- La privacy policy dichiara conformità GDPR e AI Act — contenuti statici che potrebbero
  diventare obsoleti.
- Nessuna validazione del `locale` in `useLocale` — se un attacker modifica localStorage
  con un valore non valido, il fallback potrebbe non funzionare come atteso.