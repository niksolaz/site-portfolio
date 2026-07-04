import type { LocaleMap } from '../types'

export interface AboutEntry {
  main: string
  link: string
  textLink: string
}

export const about: LocaleMap<AboutEntry> = {
  it: {
    main: `
    Sono Nicola Solazzo, sviluppatore e consulente. Ho iniziato dal frontend con Vue.js e React,
    per poi estendere il mio lavoro al backend con Node.js e alla programmazione funzionale con Elixir e Phoenix.
    Negli anni ho costruito siti, web app, applicazioni desktop e gestionali su misura.
    Oggi metto questa esperienza al servizio di PMI e startup: ascolto come lavori,
    individuo ciò che ti rallenta e progetto la soluzione digitale più semplice per farti lavorare meglio.
    Credo che le migliori soluzioni digitali non nascano dal codice, ma dalla comprensione del tuo lavoro.
    `,
    link: 'Contattami',
    textLink: ' e raccontami la tua attività: troviamo insieme la soluzione.',
  },
  en: {
    main: `
    I'm Nicola Solazzo, developer and consultant. I started on the frontend with Vue.js and React,
    then extended my work to the backend with Node.js and to functional programming with Elixir and Phoenix.
    Over the years I have built websites, web apps, desktop applications and tailor-made management systems.
    Today I put this experience at the service of SMEs and startups: I listen to how you work,
    identify what slows you down and design the simplest digital solution to help you work better.
    I believe the best digital solutions are not born from code, but from understanding your work.
    `,
    link: 'Contact me',
    textLink: " and tell me about your business: let's find the solution together.",
  },
}

// Stack tecnologico completo, mostrato solo nella pagina /about
// (in home parliamo di benefici, qui dei ferri del mestiere).
export const techStack: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['Vue.js', 'Nuxt 3', 'React', 'Next.js', 'TypeScript', 'TailwindCSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Elixir', 'Phoenix', 'REST API', 'GraphQL'] },
  { group: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase'] },
  { group: 'AI', items: ['Claude', 'OpenAI', 'Gemini', 'Agent AI', 'MCP', 'Skills'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Cursor', 'Monday', 'Slack'] },
  { group: 'Metodo', items: ['Agile', 'Scrum', 'Kanban', 'Lean'] },
]
