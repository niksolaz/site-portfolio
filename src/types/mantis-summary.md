# mantis-summary: src/types

## Core Components
- `index.ts` — Type definitions condivisi: `Locale` ('it' | 'en'), `LocaleMap<T>`.

## API Endpoints & Exports
- `Locale` — usato in tutto il progetto per i18n
- `LocaleMap<T>` — Record<Locale, T> per mappe di stringhe localizzate

## Trust Boundaries & External Inputs
- Nessun input diretto. I tipi sono usati per validare `locale` proveniente da localStorage (client, non trusted) e passato all'API `/api/chat`.

## Sensitive Operations
- Nessuna. File puramente dichiarativo.

## Historical Vulnerabilities & Fixes
- Nessuna nota.