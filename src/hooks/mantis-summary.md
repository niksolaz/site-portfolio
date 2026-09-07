# mantis-summary: src/hooks

## Core Components
- `useChat.ts` — Hook `useContactAgent()`: incapsula la chiamata a `POST /api/chat`, gestisce loading/error state.
- `useAlert.ts` — Hook `useAlert()`: stato dell'alert (show, text, type).
- `useLocale.ts` — Hook per la lingua (legge/scrive localStorage).
- `useTheme.ts` — Hook per il tema (legge/scrive localStorage).

## API Endpoints & Exports
- `useContactAgent()` → `{ analyze, isLoading, error }` dove `analyze({ message, locale }): Promise<AnalysisResult>` chiama `/api/chat`.
- `useAlert()` → `{ alert, showAlert, hideAlert }`.
- `useLocale()` → `{ locale, setLocale }`.
- `useTheme()` → `{ theme, setTheme }`.

## Trust Boundaries & External Inputs
- `useChat.ts`: `message` e `locale` provengono dal form (input utente non trusted). Il messaggio è inviato tal quale al server — la validazione avviene lato server nella route.
- `useLocale.ts` / `useTheme.ts`: leggono da `localStorage` — dato completamente client-side, manipolabile. Non ci sono validazioni lato server.
- `useAlert.ts`: `text` viene passato direttamente al componente Alert per il rendering.

## Sensitive Operations
- `useChat.ts`: gestione errori di rete — `throw normalized` propaga l'errore al chiamante. Il chiamante (Contact.tsx) logga l'errore con `console.error` e mostra un messaggio generico.
- `analyze()` esegue `fetch('/api/chat', ...)` senza timeout esplicito — possibile hanging request.
- Gli hook di localStorage non hanno fallback se localStorage è disabilitato o bloccato (Safari ITP, incognito).

## Historical Vulnerabilities & Fixes
- Nessuna nota.