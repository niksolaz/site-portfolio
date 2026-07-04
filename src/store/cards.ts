import type { LocaleMap } from '../types'

export interface Card {
  title: string
  text: string
}

// Card servizi orientate al beneficio per il cliente: raccontano il problema
// risolto, non l'elenco delle tecnologie (lo stack completo vive in /about).
export const cards: LocaleMap<Card[]> = {
  it: [
    {
      title: 'Strumenti su misura',
      text: 'Web app e gestionali costruiti intorno ai tuoi processi reali, non il contrario: niente funzioni inutili, solo ciò che ti serve per lavorare meglio.',
    },
    {
      title: 'Automazione dei processi',
      text: 'Elimino le attività ripetitive che rubano tempo ogni giorno: flussi automatici, meno passaggi manuali, meno errori.',
    },
    {
      title: 'Sistemi che parlano tra loro',
      text: 'Collego il tuo sito o gestionale a pagamenti, email, mappe e servizi esterni, così i dati viaggiano da soli senza doppi inserimenti.',
    },
    {
      title: 'Siti e web app professionali',
      text: 'Una presenza online veloce, curata e affidabile, progettata per trasformare i visitatori in richieste di contatto.',
    },
    {
      title: 'AI applicata al tuo lavoro',
      text: "Integro l'intelligenza artificiale dove porta valore concreto: gestione delle richieste, analisi dei messaggi, automazioni intelligenti.",
    },
    {
      title: 'Accompagnamento continuo',
      text: 'Non sparisco dopo la consegna: evoluzione, manutenzione e supporto, con metodo e priorità chiare.',
    },
  ],
  en: [
    {
      title: 'Tailor-made tools',
      text: 'Web apps and management systems built around your real processes, not the other way round: no useless features, only what you need to work better.',
    },
    {
      title: 'Process automation',
      text: 'I remove the repetitive tasks that steal time every day: automated flows, fewer manual steps, fewer errors.',
    },
    {
      title: 'Systems that talk to each other',
      text: 'I connect your website or management system to payments, email, maps and external services, so data travels on its own with no double entry.',
    },
    {
      title: 'Professional websites & web apps',
      text: 'A fast, polished and reliable online presence, designed to turn visitors into enquiries.',
    },
    {
      title: 'AI applied to your work',
      text: 'I integrate artificial intelligence where it brings concrete value: handling enquiries, message analysis, smart automations.',
    },
    {
      title: 'Ongoing support',
      text: "I don't disappear after delivery: evolution, maintenance and support, with a clear method and priorities.",
    },
  ],
}
