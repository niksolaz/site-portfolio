interface AboutState {
  main: string;
  link: string;
  textLink: string;
}  

interface AboutObject {
  it: AboutState;
  en: AboutState;
  es: AboutState;
}  

export const about: AboutObject = {

  it: {
    main: `
    Hai un'idea e vuoi approfondire se è fattibile?
    Pensi di avere un progetto che potrebbe essere interessante?
    Mi chiamo Nicola e sono un programmatore con anni di esperienza.
    Il mio obiettivo è trasformare le tue idee in realtà.
    Sono specializzato nello sviluppo web e desktop.
    I miei focus tecnologici sono Vue.js/Nuxt.js e React.js/Next.js per il frontend e Node.js per il backend.
    Sul fronte desktop mi occupo dello sviluppo con Electron.js. Mentre per le attività di automazione utilizzo Python.
    `,
    link: 'Contattami',
    textLink:`  e insieme valuteremo la fattibilità e la realizzazione del tuo progetto.
    Sono sicuro che potremo trovare la soluzione migliore per te.`
  },
  en: {
    main: `
    Do you have an idea and want to deepen if it is feasible?
    Do you think you have a project that could be interesting?
    My name is Nicola and I am a programmer with years of experience.
    My goal is to turn your ideas into reality.
    I specialize in web and desktop development.
    My technological focuses are Vue.js/Nuxt.js and React.js/Next.js for the frontend and Node.js for the backend.
    On the desktop side, I take care of development with Electron.js. While for automation tasks I use Python.
    `,
    link: 'Contact me',
    textLink:` and together we will evaluate the feasibility and realization of your project.
    I am sure we can find the best solution for you.`
  },
  es: {
    main: `
    ¿Tienes una idea y quieres profundizar si es factible?
    ¿Crees que tienes un proyecto que podría ser interesante?
    Mi nombre es Nicola y soy un programador con años de experiencia.
    Mi objetivo es convertir tus ideas en realidad.
    Estoy especializado en el desarrollo web y de escritorio.
    Mis focos tecnológicos son Vue.js/Nuxt.js y React.js/Next.js para el frontend y Node.js para el backend.
    En el lado de escritorio, me ocupo del desarrollo con Electron.js. Mientras que para tareas de automatización utilizo Python.
    `,
    link: 'Contáctame',
    textLink:` y juntos evaluaremos la viabilidad y realización de tu proyecto.
    Estoy seguro de que podemos encontrar la mejor solución para ti.`
  }
}
  

