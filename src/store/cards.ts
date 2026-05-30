import type { LocaleMap } from '../types'

export interface Card {
  title: string
  text: string
}

export const cards: LocaleMap<Card[]> = {
  it: [
    {
      title: 'Frontend',
      text: 'Design di interfacce utente e user experience, sviluppate con Vue.js, Nuxt 3, React.js, Next.js, TailwindCSS, Bootstrap, Material-UI, SASS, CSS3, HTML5, con gestione dello stato tramite Pinia o Vuex',
    },
    {
      title: 'Backend',
      text: 'Sviluppo di backend con Node.js, Express.js, Elixir, Phoenix, MongoDB, MySQL, PostgreSQL, Firebase, GraphQL, REST API, Supabase',
    },
    {
      title: 'Integrazioni Api',
      text: 'Sviluppo di applicazioni con API di terze parti, come Google Maps, Stripe, Twilio, SendGrid, OpenWeatherMap, ecc.',
    },
    {
      title: 'Tipologia di progetti',
      text: 'Sviluppo di siti web, web app, applicazioni desktop, applicazioni web progressive, applicazioni mobile, gestionali ERP e CRM, ecc.',
    },
    {
      title: 'Gestione',
      text: 'Gestione di progetti con metodologie Agile, come Scrum, Kanban, Lean, ecc.',
    },
    {
      title: 'Strumenti di sviluppo',
      text: 'Utilizzo di strumenti di sviluppo come Git, GitHub, VS Code, Slack, Monday, Docker, Cursor, oltre a Vibe Coding, Agent AI, Claude Code, Codex, Skills e MCP, ecc.',
    },
  ],
  en: [
    {
      title: 'Frontend',
      text: 'User interface design and user experience, developed with Vue.js, Nuxt 3, React.js, Next.js, TailwindCSS, Bootstrap, Material-UI, SASS, CSS3, HTML5, with state management via Pinia or Vuex',
    },
    {
      title: 'Backend',
      text: 'Backend development with Node.js, Express.js, Elixir, Phoenix, MongoDB, MySQL, PostgreSQL, Firebase, GraphQL, REST API, Supabase',
    },
    {
      title: 'Api Integrations',
      text: 'Development of applications with third-party APIs, such as Google Maps, Stripe, Twilio, SendGrid, OpenWeatherMap, etc.',
    },
    {
      title: 'Type of projects',
      text: 'Development of websites, web apps, desktop applications, progressive web applications, mobile applications, ERP and CRM management systems, etc.',
    },
    {
      title: 'Management',
      text: 'Project management with Agile methodologies, such as Scrum, Kanban, Lean, etc.',
    },
    {
      title: 'Development tools',
      text: 'Use of development tools such as Git, GitHub, VS Code, Slack, Monday, Docker, Cursor, as well as Vibe Coding, Agent AI, Claude Code, Codex, Skills and MCP, etc.',
    },
  ],
  es: [
    {
      title: 'Frontend',
      text: 'Diseño de interfaz de usuario y experiencia de usuario, desarrollado con Vue.js, Nuxt 3, React.js, Next.js, TailwindCSS, Bootstrap, Material-UI, SASS, CSS3, HTML5, con gestión del estado mediante Pinia o Vuex',
    },
    {
      title: 'Backend',
      text: 'Desarrollo de backend con Node.js, Express.js, Elixir, Phoenix, MongoDB, MySQL, PostgreSQL, Firebase, GraphQL, REST API, Supabase',
    },
    {
      title: 'Integraciones de API',
      text: 'Desarrollo de aplicaciones con APIs de terceros, como Google Maps, Stripe, Twilio, SendGrid, OpenWeatherMap, etc.',
    },
    {
      title: 'Tipo de proyectos',
      text: 'Desarrollo de sitios web, aplicaciones web, aplicaciones de escritorio, aplicaciones web progresivas, aplicaciones móviles, sistemas de gestión ERP y CRM, etc.',
    },
    {
      title: 'Gestión',
      text: 'Gestión de proyectos con metodologías ágiles, como Scrum, Kanban, Lean, etc.',
    },
    {
      title: 'Herramientas de desarrollo',
      text: 'Uso de herramientas de desarrollo como Git, GitHub, VS Code, Slack, Monday, Docker, Cursor, además de Vibe Coding, Agent AI, Claude Code, Codex, Skills y MCP, etc.',
    },
  ],
  fr: [
    {
      title: 'Frontend',
      text: "Design de l'interface utilisateur et expérience utilisateur, développé avec Vue.js, Nuxt 3, React.js, Next.js, TailwindCSS, Bootstrap, Material-UI, SASS, CSS3, HTML5, avec gestion de l'état via Pinia ou Vuex",
    },
    {
      title: 'Backend',
      text: 'Développement de backend avec Node.js, Express.js, Elixir, Phoenix, MongoDB, MySQL, PostgreSQL, Firebase, GraphQL, REST API, Supabase',
    },
    {
      title: 'Intégrations API',
      text: "Développement d'applications avec APIs de tiers, comme Google Maps, Stripe, Twilio, SendGrid, OpenWeatherMap, etc.",
    },
    {
      title: 'Type de projets',
      text: 'Développement de sites web, applications web, applications de bureau, applications web progressives, applications mobiles, logiciels de gestion ERP et CRM, etc.',
    },
    {
      title: 'Gestion',
      text: 'Gestion de projets avec des méthodologies agiles, comme Scrum, Kanban, Lean, etc.',
    },
    {
      title: 'Outils de développement',
      text: 'Utilisation d\'outils de développement comme Git, GitHub, VS Code, Slack, Monday, Docker, Cursor, ainsi que Vibe Coding, Agent AI, Claude Code, Codex, Skills et MCP, etc.',
    },
  ],
}
