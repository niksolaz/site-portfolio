import type { LocaleMap } from '../types'

export interface FormLabels {
  name: string
  email: string
  message: string
  placeholderName: string
  placeholderEmail: string
  placeholderMessage: string
}

export interface NavMenuLabels {
  home: string
  process: string
  services: string
  about: string
  contact: string
}

// ---------------------------------------------------------------------------
// Navigazione
// ---------------------------------------------------------------------------

export const navContactLink: LocaleMap<string> = {
  it: 'CONTATTAMI',
  en: 'CONTACT ME',
}

export const navMenu: LocaleMap<NavMenuLabels> = {
  it: {
    home: 'Home',
    process: 'Come lavoro',
    services: 'Servizi',
    about: 'Chi sono',
    contact: 'Contatti',
  },
  en: {
    home: 'Home',
    process: 'How I work',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
  },
}

// ---------------------------------------------------------------------------
// Hero (home cliente-centrica)
// ---------------------------------------------------------------------------

export const heroEyebrow: LocaleMap<string> = {
  it: 'Digital Solutions Developer',
  en: 'Digital Solutions Developer',
}

export const heroTitle: LocaleMap<string> = {
  it: 'Soluzioni digitali progettate intorno al tuo lavoro.',
  en: 'Digital solutions designed around the way you work.',
}

export const heroSubtitle: LocaleMap<string> = {
  it: 'Analizzo le tue esigenze, individuo le opportunità di miglioramento e realizzo strumenti digitali semplici, per aiutarti a lavorare con più efficienza e meno complessità.',
  en: 'I analyse your needs, identify opportunities for improvement and build simple digital tools that help you work with more efficiency and less complexity.',
}

export const heroCtaPrimary: LocaleMap<string> = {
  it: 'Parliamo del tuo progetto',
  en: "Let's talk about your project",
}

export const heroCtaSecondary: LocaleMap<string> = {
  it: 'Scopri come lavoro',
  en: 'See how I work',
}

// ---------------------------------------------------------------------------
// Sezione "Come lavoro" (metodo in 4 step)
// ---------------------------------------------------------------------------

export interface ProcessStep {
  title: string
  text: string
}

export const processSection: LocaleMap<{ eyebrow: string; title: string }> = {
  it: { eyebrow: 'Metodo', title: 'Come lavoro' },
  en: { eyebrow: 'Method', title: 'How I work' },
}

export const processSteps: LocaleMap<ProcessStep[]> = {
  it: [
    {
      title: 'Ascolto',
      text: 'Ogni attività è diversa. Parto dalle tue esigenze reali, non dalla tecnologia.',
    },
    {
      title: 'Analizzo',
      text: 'Individuo i processi che rallentano il tuo lavoro e le opportunità di miglioramento.',
    },
    {
      title: 'Progetto',
      text: 'Disegno la soluzione più semplice possibile, costruita intorno al tuo modo di lavorare.',
    },
    {
      title: 'Realizzo',
      text: "Sviluppo lo strumento e ti accompagno nell'uso quotidiano e nella crescita.",
    },
  ],
  en: [
    {
      title: 'Listen',
      text: 'Every business is different. I start from your real needs, not from technology.',
    },
    {
      title: 'Analyse',
      text: 'I identify the processes slowing down your work and the opportunities for improvement.',
    },
    {
      title: 'Design',
      text: 'I design the simplest possible solution, built around the way you work.',
    },
    {
      title: 'Build',
      text: 'I develop the tool and support you in its daily use and growth.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Sezione servizi
// ---------------------------------------------------------------------------

export const servicesSection: LocaleMap<{ eyebrow: string; title: string }> = {
  it: { eyebrow: 'Servizi', title: 'Cosa posso fare per te' },
  en: { eyebrow: 'Services', title: 'What I can do for you' },
}

// ---------------------------------------------------------------------------
// Teaser "Chi sono" in home + pagina About
// ---------------------------------------------------------------------------

export const aboutTeaser: LocaleMap<{ eyebrow: string; text: string; link: string }> = {
  it: {
    eyebrow: 'Chi sono',
    text: 'Sono Nicola, sviluppatore e consulente. Credo che le migliori soluzioni digitali non nascano dal codice, ma dalla comprensione del tuo lavoro.',
    link: 'Scopri di più su di me',
  },
  en: {
    eyebrow: 'About',
    text: 'I am Nicola, developer and consultant. I believe the best digital solutions are not born from code, but from understanding your work.',
    link: 'Learn more about me',
  },
}

export const aboutPage: LocaleMap<{
  eyebrow: string
  title: string
  stackTitle: string
  stackIntro: string
  cta: string
}> = {
  it: {
    eyebrow: 'About',
    title: 'Chi sono',
    stackTitle: 'Il mio stack tecnologico',
    stackIntro:
      'Per chi vuole entrare nei dettagli tecnici: questi sono gli strumenti con cui costruisco le soluzioni.',
    cta: 'Parliamo del tuo progetto',
  },
  en: {
    eyebrow: 'About',
    title: 'About me',
    stackTitle: 'My tech stack',
    stackIntro:
      'For those who want the technical details: these are the tools I use to build solutions.',
    cta: "Let's talk about your project",
  },
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer: LocaleMap<{ tagline: string; menuTitle: string; contactTitle: string }> = {
  it: {
    tagline: 'Soluzioni digitali progettate intorno al tuo lavoro.',
    menuTitle: 'Menu',
    contactTitle: 'Contatti',
  },
  en: {
    tagline: 'Digital solutions designed around the way you work.',
    menuTitle: 'Menu',
    contactTitle: 'Contact',
  },
}

// ---------------------------------------------------------------------------
// Contatti
// ---------------------------------------------------------------------------

export const contactPreTitle: LocaleMap<string> = {
  it: 'Parliamo del tuo progetto',
  en: "Let's talk about your project",
}

export const contactEndTitle: LocaleMap<string> = {
  it: '... oppure contattami su Linkedin',
  en: '... or contact me on Linkedin',
}

export const contactBtnSend: LocaleMap<string> = {
  it: 'INVIA',
  en: 'SEND',
}

export const contactModalTitle: LocaleMap<string> = {
  it: 'Ecco la tua risposta',
  en: 'Here is your answer',
}

export const contactModalClose: LocaleMap<string> = {
  it: 'Chiudi',
  en: 'Close',
}

// Trasparenza AI (Reg. UE 2024/1689, Art. 50): l'utente deve sapere in modo
// chiaro che il messaggio viene analizzato da un sistema di intelligenza
// artificiale e che le risposte automatiche sono generate da un'AI.
export const contactAiNotice: LocaleMap<string> = {
  it: 'Inviando il messaggio, il testo viene analizzato da un sistema di intelligenza artificiale per classificare la richiesta e, quando possibile, fornirti subito una risposta automatica.',
  en: 'When you submit the form, your message is analysed by an artificial intelligence system to classify the request and, when possible, provide you with an instant automated reply.',
}

export const contactAiReplyLabel: LocaleMap<string> = {
  it: 'Risposta generata automaticamente da un sistema di intelligenza artificiale.',
  en: 'Reply automatically generated by an artificial intelligence system.',
}

// Messaggio neutro mostrato quando il messaggio e' classificato come spam (nessuna email inviata).
export const contactNeutralMessage: LocaleMap<string> = {
  it: 'Grazie per averci scritto.',
  en: 'Thanks for reaching out.',
}

// Messaggio di successo quando un lead viene inoltrato via email.
export const contactSuccessMessage: LocaleMap<string> = {
  it: 'Messaggio inviato con successo',
  en: 'Message sent successfully',
}

export const contactErrorMessage: LocaleMap<string> = {
  it: "Si e' verificato un errore, riprova piu' tardi",
  en: 'An error occurred, please try again later',
}

export const contactFormLabels: LocaleMap<FormLabels> = {
  it: {
    name: 'Il tuo Nome',
    email: 'La tua Email',
    message: 'Il tuo Messaggio',
    placeholderName: 'Mario Rossi',
    placeholderEmail: 'email@esempio.com',
    placeholderMessage: 'raccontami la tua attività e cosa vorresti migliorare',
  },
  en: {
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    placeholderName: 'John Doe',
    placeholderEmail: 'email@example.com',
    placeholderMessage: 'tell me about your business and what you would like to improve',
  },
}

// ---------------------------------------------------------------------------
// Sezione legale: banner cookie, link nel footer e testi (Termini, Cookie,
// Privacy) mostrati nel Modal. Multilingua IT/EN come il resto del sito.
// ---------------------------------------------------------------------------

export interface LegalDocCopy {
  title: string
  body: string
}

export interface LegalCopy {
  banner: {
    message: string
    accept: string
    reject: string
    more: string
  }
  links: {
    terms: string
    cookie: string
    privacy: string
  }
  close: string
  docs: {
    terms: LegalDocCopy
    cookie: LegalDocCopy
    privacy: LegalDocCopy
  }
}

export const legal: LocaleMap<LegalCopy> = {
  it: {
    banner: {
      message:
        'Usiamo solo memorizzazione tecnica per ricordare la lingua e le tue preferenze. Nessun cookie pubblicitario o di tracciamento.',
      accept: 'Accetta',
      reject: 'Rifiuta',
      more: 'Cookie Policy',
    },
    links: {
      terms: 'Termini e Condizioni',
      cookie: 'Cookie Policy',
      privacy: 'Privacy Policy',
    },
    close: 'Chiudi',
    docs: {
      terms: {
        title: 'Termini e Condizioni',
        body: `Ultimo aggiornamento: luglio 2026

Benvenuto su questo sito. Accedendo e utilizzando il sito accetti i presenti Termini e Condizioni. Se non li accetti, ti preghiamo di non utilizzare il sito.

1. Finalità — Questo è il sito professionale che presenta il profilo, i progetti e i servizi di Nicola Solazzo. I contenuti hanno finalità puramente informativa.

2. Proprietà intellettuale — Tutti i testi, le grafiche, i loghi, il codice e gli altri materiali presenti sul sito sono di proprietà di Nicola Solazzo, salvo diversa indicazione, e non possono essere riprodotti senza autorizzazione scritta.

3. Risposte automatiche generate da AI — Il form di contatto utilizza un sistema di intelligenza artificiale che analizza i messaggi ricevuti e può generare risposte automatiche di natura puramente informativa. Tali risposte non costituiscono offerta contrattuale, preventivo o consulenza professionale: fanno fede esclusivamente le comunicazioni dirette successive.

4. Assenza di garanzie — Il sito è fornito "così com'è", senza garanzie di alcun tipo. Pur impegnandoci a mantenere le informazioni accurate e aggiornate, non garantiamo la completezza o l'assenza di errori.

5. Link esterni — Il sito può contenere link a siti di terze parti. Non siamo responsabili dei loro contenuti o delle loro pratiche sulla privacy.

6. Limitazione di responsabilità — Nei limiti massimi consentiti dalla legge, Nicola Solazzo non è responsabile per eventuali danni derivanti dall'uso del sito.

7. Modifiche — I presenti termini possono essere aggiornati in qualsiasi momento. L'uso continuato del sito costituisce accettazione dei termini aggiornati.

8. Contatti — Per qualsiasi domanda puoi scrivere a solazzo.nicola@gmail.com oppure utilizzare il form di contatto presente sul sito.`,
      },
      cookie: {
        title: 'Cookie Policy',
        body: `Ultimo aggiornamento: luglio 2026

Questo sito adotta un approccio rispettoso della privacy e non utilizza cookie pubblicitari o di profilazione.

Memorizzazione tecnica — Utilizziamo la memoria locale del browser solo per ricordare preferenze tecniche che migliorano la tua esperienza:
• la lingua preferita;
• la tua scelta sul consenso ai cookie.

Questi dati restano sul tuo dispositivo, non vengono usati per tracciarti e non sono mai condivisi con terzi.

Servizi di terze parti — Quando invii il form di contatto, i dati inseriti vengono elaborati dai fornitori necessari a erogare la funzione (servizio di invio email e sistema di intelligenza artificiale). Vedi la Privacy Policy per i dettagli.

Gestione delle preferenze — Puoi eliminare in qualsiasi momento i dati memorizzati localmente cancellando la memoria del browser per questo sito.

Consenso — Cliccando "Accetta" confermi di aver letto questa policy. Il sito resta pienamente funzionante anche se rifiuti.`,
      },
      privacy: {
        title: 'Privacy Policy',
        body: `Ultimo aggiornamento: luglio 2026

La presente Informativa spiega come vengono trattati i dati personali su questo sito, in conformità al Regolamento UE 2016/679 (GDPR) e, per quanto riguarda l'uso di sistemi di intelligenza artificiale, al Regolamento UE 2024/1689 (AI Act) e alla Legge 132/2025.

Titolare del trattamento — Nicola Solazzo. Per qualsiasi richiesta sulla privacy puoi scrivere a solazzo.nicola@gmail.com oppure usare il form di contatto presente sul sito.

Dati raccolti:
• Form di contatto: nome, indirizzo email e messaggio inviato, usati esclusivamente per rispondere alla tua richiesta.
• Preferenze tecniche: lingua e consenso, memorizzati localmente sul tuo dispositivo.

Utilizzo di intelligenza artificiale — Il testo del messaggio inviato tramite il form viene analizzato da un sistema di intelligenza artificiale (Google Gemini) al solo scopo di classificare la richiesta (spam, richiesta di informazioni, potenziale collaborazione) e, quando possibile, generare una risposta informativa automatica. Le risposte automatiche sono sempre segnalate come generate da AI. Nome e indirizzo email NON vengono trasmessi al sistema di intelligenza artificiale. Nessuna decisione con effetti giuridici viene presa in modo automatizzato.

Terze parti — I messaggi possono essere elaborati da: Google (Gemini) per l'analisi del testo del messaggio; EmailJS per l'inoltro delle richieste via email. Tali fornitori trattano i dati esclusivamente per fornire il servizio richiesto. I dati non vengono venduti né usati per pubblicità.

Base giuridica — I dati sono trattati sulla base del tuo consenso e del legittimo interesse a rispondere alle tue richieste.

Trasferimenti extra-UE — Alcuni fornitori (es. servizi email o AI) potrebbero trattare i dati al di fuori dello Spazio Economico Europeo; in tal caso si applicano garanzie adeguate, come le Clausole Contrattuali Standard della Commissione Europea.

Conservazione — I dati di contatto sono conservati solo per il tempo necessario a gestire la tua richiesta.

I tuoi diritti — Puoi richiedere l'accesso, la rettifica o la cancellazione dei tuoi dati, opporti al trattamento e revocare il consenso in qualsiasi momento, contattandoci tramite il sito. Hai inoltre il diritto di proporre reclamo all'autorità di controllo competente (in Italia, il Garante per la protezione dei dati personali).`,
      },
    },
  },
  en: {
    banner: {
      message:
        'We use only technical storage to remember your language and preferences. No advertising or tracking cookies.',
      accept: 'Accept',
      reject: 'Decline',
      more: 'Cookie Policy',
    },
    links: {
      terms: 'Terms & Conditions',
      cookie: 'Cookie Policy',
      privacy: 'Privacy Policy',
    },
    close: 'Close',
    docs: {
      terms: {
        title: 'Terms & Conditions',
        body: `Last updated: July 2026

Welcome to this website. By accessing and using this site you agree to these Terms & Conditions. If you do not agree, please do not use the site.

1. Purpose — This is the professional website presenting the profile, projects and services of Nicola Solazzo. The content is provided for informational purposes only.

2. Intellectual property — All texts, graphics, logos, code and other materials on this site are owned by Nicola Solazzo unless otherwise stated, and may not be reproduced without prior written permission.

3. AI-generated automated replies — The contact form uses an artificial intelligence system that analyses incoming messages and may generate automated replies of a purely informational nature. Such replies do not constitute a contractual offer, quotation or professional advice: only subsequent direct communications are binding.

4. No warranty — The site is provided "as is" without warranties of any kind. While we strive to keep information accurate and up to date, we do not guarantee completeness or the absence of errors.

5. External links — This site may contain links to third-party websites. We are not responsible for their content or privacy practices.

6. Limitation of liability — To the maximum extent permitted by law, Nicola Solazzo shall not be liable for any damages arising from the use of this site.

7. Changes — These terms may be updated at any time. Continued use of the site constitutes acceptance of the updated terms.

8. Contact — For any questions, please write to solazzo.nicola@gmail.com or use the contact form on this site.`,
      },
      cookie: {
        title: 'Cookie Policy',
        body: `Last updated: July 2026

This website takes a privacy-friendly approach and does not use advertising or profiling cookies.

Technical storage — We use your browser's local storage only to remember technical preferences that improve your experience:
• your preferred language;
• your cookie consent choice.

These items are stored on your device, are not used to track you and are never shared with third parties.

Third-party services — When you submit the contact form, your input is processed by the service providers needed to deliver that feature (email delivery service and artificial intelligence system). See the Privacy Policy for details.

Managing preferences — You can delete locally stored data at any time by clearing your browser storage for this site.

Consent — By clicking "Accept" you confirm you have read this policy. The site remains fully functional even if you decline.`,
      },
      privacy: {
        title: 'Privacy Policy',
        body: `Last updated: July 2026

This Privacy Policy explains how personal data is handled on this website, in line with EU Regulation 2016/679 (GDPR) and, as regards the use of artificial intelligence systems, EU Regulation 2024/1689 (AI Act) and Italian Law 132/2025.

Data controller — Nicola Solazzo. For any privacy request you can write to solazzo.nicola@gmail.com or use the contact form on this site.

Data we collect:
• Contact form: name, email address and the message you send, used solely to reply to your request.
• Technical preferences: language and consent, stored locally on your device.

Use of artificial intelligence — The text of the message sent through the form is analysed by an artificial intelligence system (Google Gemini) for the sole purpose of classifying the request (spam, information request, potential collaboration) and, when possible, generating an automated informational reply. Automated replies are always labelled as AI-generated. Your name and email address are NOT transmitted to the artificial intelligence system. No decision with legal effects is taken in an automated way.

Third parties — Messages may be processed by: Google (Gemini) for the analysis of the message text; EmailJS for forwarding enquiries via email. These providers process data strictly to deliver the requested service. Data is not sold or used for advertising.

Legal basis — Data is processed on the basis of your consent and of our legitimate interest in responding to your enquiries.

International transfers — Some providers (e.g. email or AI services) may process data outside the European Economic Area; in such cases appropriate safeguards apply, such as the European Commission's Standard Contractual Clauses.

Retention — Contact data is kept only as long as necessary to handle your request.

Your rights — You may request access, correction or deletion of your data, object to processing, and withdraw consent at any time, by contacting us through the site. You also have the right to lodge a complaint with your local supervisory authority (in Italy, the Garante per la protezione dei dati personali).`,
      },
    },
  },
}
