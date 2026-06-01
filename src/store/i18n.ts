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
  hero: string
  cards: string
  about: string
  contact: string
}

export const navContactLink: LocaleMap<string> = {
  en: 'CONTACT ME',
  it: 'CONTATTAMI',
  es: 'CONTACTAME',
  fr: 'CONTACTEZ-MOI',
}

export const navMenu: LocaleMap<NavMenuLabels> = {
  en: {
    hero: 'Intro',
    cards: 'Projects',
    about: 'About',
    contact: 'Contact',
  },
  it: {
    hero: 'Intro',
    cards: 'Progetti',
    about: 'Chi sono',
    contact: 'Contatti',
  },
  es: {
    hero: 'Intro',
    cards: 'Proyectos',
    about: 'Sobre mí',
    contact: 'Contacto',
  },
  fr: {
    hero: 'Intro',
    cards: 'Projets',
    about: 'À propos',
    contact: 'Contact',
  },
}

export const homeSubtitle: LocaleMap<string> = {
  en: 'Full Stack Consultant for PMI and Startup. Scalable and performant Web App development.',
  it: "Consulente Full Stack per PMI e Startup. Sviluppo Web App scalabili e performanti.",
  es: 'Consultor Full Stack para PMI y Startup. Desarrollo de Web App escalables y performantes.',
  fr: "Consultant Full Stack pour PMI et Startup. Développement de Web App scalables et performants.",
}

export const contactPreTitle: LocaleMap<string> = {
  en: 'Write me for info and I will reply as soon as possible ...',
  it: 'Scrivimi per info e ti risponderò al più presto ... ',
  es: 'Escríbeme para obtener información y te responderé lo antes posible ...',
  fr: 'Écrivez-moi pour obtenir des informations et je vous répondrai dès que possible ...',
}

export const contactEndTitle: LocaleMap<string> = {
  en: '... or contact me on Linkedin',
  it: '... oppure contattami su Linkedin',
  es: '... o contáctame en Linkedin',
  fr: '... ou contactez-moi sur Linkedin',
}

export const contactBtnSend: LocaleMap<string> = {
  en: 'SEND',
  it: 'INVIA',
  es: 'ENVIAR',
  fr: 'ENVOYER',
}

export const contactModalTitle: LocaleMap<string> = {
  en: 'Here is your answer',
  it: 'Ecco la tua risposta',
  es: 'Aqui esta tu respuesta',
  fr: 'Voici votre reponse',
}

export const contactModalClose: LocaleMap<string> = {
  en: 'Close',
  it: 'Chiudi',
  es: 'Cerrar',
  fr: 'Fermer',
}

// Messaggio neutro mostrato quando il messaggio e' classificato come spam (nessuna email inviata).
export const contactNeutralMessage: LocaleMap<string> = {
  en: 'Thanks for reaching out.',
  it: 'Grazie per averci scritto.',
  es: 'Gracias por escribirnos.',
  fr: 'Merci de nous avoir contactes.',
}

// Messaggio di successo quando un lead viene inoltrato via email.
export const contactSuccessMessage: LocaleMap<string> = {
  en: 'Message sent successfully',
  it: 'Messaggio inviato con successo',
  es: 'Mensaje enviado con exito',
  fr: 'Message envoye avec succes',
}

export const contactErrorMessage: LocaleMap<string> = {
  en: 'An error occurred, please try again later',
  it: "Si e' verificato un errore, riprova piu' tardi",
  es: 'Ocurrio un error, intentalo de nuevo mas tarde',
  fr: "Une erreur s'est produite, veuillez reessayer plus tard",
}

export const contactFormLabels: LocaleMap<FormLabels> = {
  en: {
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    placeholderName: 'John Doe',
    placeholderEmail: 'email@example.com',
    placeholderMessage: 'let me know how I can help you',
  },
  it: {
    name: 'Il tuo Nome',
    email: 'La tua Email',
    message: 'Il tuo Messaggio',
    placeholderName: 'Mario Rossi',
    placeholderEmail: 'email@esempio.com',
    placeholderMessage: 'fammi sapere come posso aiutarti',
  },
  es: {
    name: 'Tu Nombre',
    email: 'Tu Correo Electrónico',
    message: 'Tu Mensaje',
    placeholderName: 'Juan Pérez',
    placeholderEmail: 'email@ejemplo.com',
    placeholderMessage: 'déjame saber cómo puedo ayudarte',
  },
  fr: {
    name: 'Votre Nom',
    email: 'Votre Email',
    message: 'Votre Message',
    placeholderName: 'Jean Dupont',
    placeholderEmail: 'email@exemple.com',
    placeholderMessage: 'faites-moi savoir comment je peux vous aider',
  },
}
