# Entity: EmailJS Integration

## Scope
`src/components/Contact.tsx` (funzione `notifyOwnerByEmail`) + variabili `NEXT_PUBLIC_EMAILJS_*`

## Responsibility
Inviare una notifica email al proprietario del sito quando un visitatore viene classificato
come `lead` (potenziale cliente/collaborazione).

## Configuration
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` — ID del servizio EmailJS
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` — ID del template email
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — Chiave pubblica EmailJS (per autenticazione SDK browser)

Tutte e tre sono esposte nel bundle JavaScript del browser (prefisso `NEXT_PUBLIC_`).

## Data Flow
```
Contact.tsx (category === 'lead')
  → emailjs.send(serviceId, templateId, {
      from_name: form.name,
      to_name: 'Nicola',
      from_email: form.email,
      to_email: '[EMAIL]',
      message: form.message
    }, publicKey)
  → EmailJS API
  → Email a [EMAIL] (destinatario reale sostituito a build/deploy time)
```

## Trust Boundaries
- **Chiavi pubbliche:** EmailJS è progettato per avere la public key esposta. Tuttavia,
  service_id e template_id esposti permettono a chiunque di inviare email attraverso
  il template configurato.
- **Rate limiting EmailJS:** Dipende dal piano EmailJS (free tier: 200 email/mese).
  Nessun rate limiting aggiuntivo lato applicazione.
- **Validazione dati:** `form.name`, `form.email`, `form.message` inviati senza ulteriore
  sanitizzazione. EmailJS potrebbe essere vulnerabile a email header injection se i
  template non sono configurati correttamente.

## Security Notes
- `to_email: '[EMAIL]'` è un placeholder — l'email reale è configurata nel template EmailJS
  o sostituita a build time. Da verificare che non sia hardcoded nel codice.
- Nessuna verifica dell'esito: `notifyOwnerByEmail()` è fire-and-forget. Se EmailJS fallisce,
  il lead viene perso senza feedback.
- Le chiavi `NEXT_PUBLIC_*` possono essere ruotate dalla dashboard EmailJS se compromesse.
- EmailJS free tier ha quota 200 email/mese — un attacco di spam consumption è possibile.