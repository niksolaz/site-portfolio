KB_SNAPSHOT: UNPINNED

# Threat Model — Portfolio Site

## System Overview Summary

Applicazione web Next.js 14 di tipo portfolio personale per Nicola Solazzo, Digital Solutions Developer.
Il sito e' un single-page con sezioni informative (Hero, Process, Services, About, Contact) piu' una
pagina About dedicata. L'unica superficie di attacco dinamica e' il form di contatto, che integra
un'API AI (Google Gemini) per la classificazione dei messaggi e EmailJS per l'inoltro dei lead.

Runtime: Node.js 22.x su Vercel (serverless). Client: React 18 + TypeScript + TailwindCSS.
L'applicazione e' internazionalizzata (IT/EN) con dati statici. Non c'e' database, autenticazione
o sessioni utente.

## Deployment Intent

Intent: PRODUCTION

Verifica checklist PRODUCTION-SIGNAL:
1. [x] Entita' con availability: l'API chat e' un servizio esterno raggiungibile → FALSE per test-only
2. [x] Servizio esterno: `POST /api/chat` e' un endpoint API pubblico → FALSE per test-only
3. [x] Package pubblicabile: Next.js app deployabile su Vercel → FALSE per test-only
4. [x] Directory produzione: `src/app/`, `src/components/` non sono test → FALSE per test-only
5. [x] Input esterno reale: il form accetta messaggi da visitatori reali → FALSE per test-only

CHECKLIST ESITO: almeno un FALSE → Intent: PRODUCTION.

## Trust Boundaries

### Boundary 1: Internet ↔ Vercel Edge / Next.js Server

| Campo | Dettaglio |
|-------|-----------|
| **Protocollo** | HTTPS (gestito da Vercel) |
| **Attaccante** | Unauthenticated Network Attacker |
| **Superficie** | `POST /api/chat`, tutte le pagine statiche |
| **Dati sensibili** | Chiave API Google Gemini (server-side), messaggi utente |
| **Controlli** | Rate limiting in-memory (non condiviso), input validation (Zod output, manual input) |

**Rischi:**
- Rate limiting bypassabile con richieste distribuite tra istanze serverless
- Prompt injection nell'endpoint AI
- DoS via richieste API massive (costi AI)
- Assenza di CSP / security headers

### Boundary 2: Next.js Server ↔ Google Gemini API

| Campo | Dettaglio |
|-------|-----------|
| **Protocollo** | HTTPS (SDK `@ai-sdk/google`) |
| **Attaccante** | Man-in-the-Middle, Google stesso, supply chain |
| **Superficie** | `generateObject()` call |
| **Dati inviati** | System prompt (pubblico), messaggio utente (testo libero) |
| **Controlli** | API key server-side, HTTPS |

**Rischi:**
- Data exposure a Google (messaggi utente, knowledge base)
- Prompt injection: l'utente puo' influenzare il comportamento dell'AI
- Costi: ogni richiesta consuma token API

### Boundary 3: Browser ↔ EmailJS API

| Campo | Dettaglio |
|-------|-----------|
| **Protocollo** | HTTPS (SDK `@emailjs/browser`) |
| **Attaccante** | Unauthenticated Network Attacker, utente malevolo |
| **Superficie** | `emailjs.send()` |
| **Dati inviati** | Nome, email, messaggio + chiavi `NEXT_PUBLIC_*` |
| **Controlli** | API key pubblica (per design EmailJS), HTTPS |

**Rischi:**
- Chiavi `NEXT_PUBLIC_EMAILJS_*` esposte nel bundle JS
- Invio email non autorizzate usando le chiavi pubbliche
- Spam consumption (quota EmailJS free tier: 200/mese)

### Boundary 4: Browser ↔ localStorage

| Campo | Dettaglio |
|-------|-----------|
| **Protocollo** | N/A (client-side) |
| **Attaccante** | Utente locale, XSS |
| **Superficie** | `localStorage.getItem/setItem` |
| **Dati** | Lingua, tema, consenso cookie |
| **Controlli** | Nessuno (dati non sensibili per design) |

**Rischi:**
- Manipolazione preferenze (impatto basso: solo UI)
- XSS potrebbe leggere/scrivere localStorage

### Boundary 5: Browser ↔ React Rendering (DOM)

| Campo | Dettaglio |
|-------|-----------|
| **Protocollo** | N/A (client-side) |
| **Attaccante** | XSS via contenuti dinamici |
| **Superficie** | `dangerouslySetInnerHTML` (JSON-LD), rendering AI reply nel Modal |
| **Controlli** | React default escaping, JSON-LD da dati statici |

**Rischi:**
- `dangerouslySetInnerHTML` in layout.tsx:94 — attualmente safe (dati statici)
- Se `reply` dall'AI venisse renderizzato senza escaping, XSS possibile
- Attualmente `reply` e' renderizzato come text node in div (safe)

## Threat Actors & Vectors

### TA-1: Unauthenticated Network Attacker (Esterno)
- **Posizione:** EXTERNAL
- **Obiettivo:** Abusare dell'endpoint AI, rubare chiavi, causare costi, degradare il servizio
- **Vettori:**
  - Prompt injection su `POST /api/chat`
  - Rate limit bypass (multi-istanza)
  - DoS sull'API AI
  - Scanning di vulnerabilita' Next.js note
  - Abuso delle chiavi EmailJS pubbliche

### TA-2: Malicious Visitor (Form Abuser)
- **Posizione:** EXTERNAL
- **Obiettivo:** Inviare spam, phishing, o degradare la qualita' del servizio
- **Vettori:**
  - Invio messaggi spam classificati come lead (falsi positivi)
  - Bypass validazione form lato client
  - Prompt injection per far classificare spam come lead
  - Esaurimento quota EmailJS

### TA-3: Supply Chain Attacker
- **Posizione:** SUPPLY_CHAIN
- **Obiettivo:** Iniettare codice malevolo via dipendenze npm
- **Vettori:**
  - Typosquatting
  - Compromissione pacchetto legittimo
  - Dipendenze non utilizzate (@ai-sdk/anthropic, @ai-sdk/openai) aumentano superficie

### TA-4: Network Eavesdropper (MITM)
- **Posizione:** INTERNAL_NETWORK / rete pubblica
- **Obiettivo:** Intercettare messaggi, chiavi, o dati utente
- **Vettori:**
  - MITM su connessioni (mitigato da HTTPS Vercel + Google)
  - DNS poisoning verso server malevoli

### TA-5: Malicious Insider / Compromised Developer
- **Posizione:** HOST_SYSTEM
- **Obiettivo:** Rubare chiavi API, modificare il codice
- **Vettori:**
  - Accesso al repository Git
  - Accesso alla dashboard Vercel
  - Accesso alla Google Cloud Console (API key Gemini)
  - Accesso alla dashboard EmailJS

## High-Risk Assets

### Asset 1: Google Gemini API Key
- **Tipo:** Segreto / Credenziale
- **Disponibilita':** STANDARD (il sito puo' funzionare senza AI, con fallback)
- **Rischio compromissione:** Costi API incontrollati, furto di quota, possibili attacchi ad altri servizi Google
- **Protezione:** Server-side only (non `NEXT_PUBLIC_`)

### Asset 2: Messaggi degli Utenti (Form di Contatto)
- **Tipo:** Dati personali (art. 4 GDPR)
- **Disponibilita':** STANDARD
- **Rischio compromissione:** Violazione GDPR, perdita di lead commerciali
- **Protezione:** HTTPS, data minimization (nome/email non vanno all'AI), processamento temporaneo

### Asset 3: EmailJS Credentials
- **Tipo:** Credenziali pubbliche (per design) + template
- **Disponibilita':** LOW_CRITICALITY (il sito funziona senza email)
- **Rischio compromissione:** Invio email non autorizzate, spam, esaurimento quota
- **Protezione:** Limitate dal piano EmailJS (200/mese free tier)

### Asset 4: Disponibilita' del Sito
- **Tipo:** Availability
- **Disponibilita':** STANDARD (portfolio personale, non business-critical 24/7)
- **Rischio compromissione:** DoS, costi API, degrado SEO
- **Protezione:** Rate limiting (debole), Vercel DDoS protection

### Asset 5: Reputazione e Contenuti
- **Tipo:** Integrita' dei contenuti
- **Disponibilita':** STANDARD
- **Rischio compromissione:** Defacement, contenuti malevoli iniettati
- **Protezione:** Deploy via Git, Vercel preview deployments

## Risk Matrix (Preliminare)

| Rischio | Probabilita' | Impatto | Severita' |
|---------|-------------|---------|-----------|
| Prompt injection su /api/chat | Alta | Medio | HIGH |
| Rate limit bypass (multi-istanza) | Media | Basso | LOW |
| Abuso chiavi EmailJS | Alta | Basso | MEDIUM |
| Dipendenze vulnerabili (Next.js CVE) | Bassa | Alto | MEDIUM |
| DoS su API AI (costi) | Media | Medio | MEDIUM |
| XSS via dangerouslySetInnerHTML | Bassa | Medio | LOW |
| Assenza CSP headers | Alta | Basso | LOW |
| Supply chain npm | Bassa | Alto | MEDIUM |
| Data exposure a Google (GDPR) | Alta | Basso | LOW |

## Assunzioni e Limitazioni

1. **Vercel gestisce TLS termination** — si assume che il traffico tra client e server sia crittografato.
2. **Google Gemini e' trusted** — i messaggi utente sono inviati a Google per l'analisi.
3. **EmailJS e' trusted** — i messaggi classificati come lead sono inviati via EmailJS.
4. **Nessun database** — non c'e' persistenza lato server, i dati sono effimeri.
5. **Single developer** — il rischio insider e' basso (repository personale).
6. **Nessuna autenticazione** — non ci sono login, sessioni o ruoli utente.
7. **Rate limiting non condiviso** — in ambiente serverless Vercel, ogni istanza ha la propria mappa.