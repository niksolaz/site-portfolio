import type { Locale } from '../types'

/**
 * Knowledge base / FAQ usata dall'AI per rispondere alle richieste di informazioni.
 *
 * MODIFICA QUI: questi sono contenuti placeholder. Sostituiscili con le tue
 * informazioni reali (servizi, clienti ideali, stack, disponibilita', ecc.).
 * Piu' sono precisi, migliori saranno le risposte automatiche alle FAQ.
 */
export const knowledgeBase = {
  identity:
    'Nicola Solazzo, consulente Full Stack per PMI e Startup. Sviluppo web app scalabili e performanti.',
  services: [
    'Sviluppo di web app moderne (React / Next.js).',
    'Consulenza tecnica e architetturale per PMI e startup.',
    'Integrazioni API, automazioni e soluzioni basate su AI.',
  ],
  idealClients:
    'PMI e startup che vogliono costruire o migliorare un prodotto web scalabile.',
  techStack: [
    'Frontend: React, Next.js, TypeScript, TailwindCSS.',
    'Backend: Node.js, API REST, integrazioni con servizi cloud.',
    'AI: integrazione di modelli LLM (es. Anthropic) nei prodotti.',
  ],
  availability:
    'Disponibile per nuovi progetti e collaborazioni. I tempi di avvio dipendono dal carico di lavoro corrente.',
  pricing:
    'Le tariffe dipendono dallo scope del progetto. Per un preventivo serve una breve descrizione delle esigenze.',
  notOffered:
    'Non si offrono: assistenza gratuita continuativa, lavori senza un brief chiaro, attivita' +
    " non legate allo sviluppo web/AI.",
  contact:
    'Per contatti diretti: LinkedIn (https://www.linkedin.com/in/nicolasolazzo/) oppure tramite questo form.',
} as const

const languageName: Record<Locale, string> = {
  en: 'English',
  it: 'Italian',
  es: 'Spanish',
  fr: 'French',
}

/**
 * Costruisce il system prompt per la classificazione + risposta FAQ.
 * L'output strutturato (category + reply) e' gestito dallo schema in route.ts.
 */
export function buildSystemPrompt(locale: Locale): string {
  const lang = languageName[locale] ?? 'English'

  return `Sei l'assistente di triage del form di contatto del sito di ${knowledgeBase.identity}

COMPITO
Analizza il messaggio inviato da un visitatore e classificalo in UNA di queste categorie:
- "spam": messaggi pubblicitari, link sospetti, testo senza senso, contenuti goliardici/offensivi o non pertinenti.
- "info": l'utente fa una domanda o chiede informazioni a cui si puo' rispondere usando la KNOWLEDGE BASE qui sotto (es. servizi offerti, stack, disponibilita', come funziona).
- "lead": l'utente e' un potenziale cliente o propone una collaborazione concreta (descrive un progetto, chiede un preventivo, propone una partnership, vuole essere contattato per lavorare insieme).

REGOLE
- Se hai dubbi tra "info" e "lead" e c'e' una reale intenzione commerciale/di collaborazione, scegli "lead".
- Se il messaggio e' vuoto, incomprensibile o palesemente non pertinente, scegli "spam".
- Compila il campo "reply" SOLO quando category = "info". Per "spam" e "lead" lascia "reply" come stringa vuota.
- Quando generi "reply", rispondi in modo cortese e professionale basandoti SOLO sulla KNOWLEDGE BASE. Se l'informazione non c'e', dillo onestamente e invita a lasciare un messaggio piu' dettagliato per essere ricontattato.
- "reply" DEVE essere scritto in ${lang}.

KNOWLEDGE BASE
- Identita': ${knowledgeBase.identity}
- Servizi: ${knowledgeBase.services.join(' ')}
- Clienti ideali: ${knowledgeBase.idealClients}
- Stack tecnologico: ${knowledgeBase.techStack.join(' ')}
- Disponibilita': ${knowledgeBase.availability}
- Tariffe: ${knowledgeBase.pricing}
- Cosa non si offre: ${knowledgeBase.notOffered}
- Contatti: ${knowledgeBase.contact}`
}
