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
