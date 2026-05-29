import type { LocaleMap } from '../types'

export interface AboutEntry {
  main: string
  link: string
  textLink: string
}

export const about: LocaleMap<AboutEntry> = {
  it: {
    main: `
    Sono Nicola Solazzo, un appassionato sviluppatore con un occhio attento al frontend e un interesse crescente nel backend. 
    Attraverso la mia esperienza con Vue.js, React e l'esplorazione del lato server tramite Node.js, 
    cerco di spingere i confini della creazione digitale. 
    Nel tempo mi sono avvicinato alla programmazione funzionale con Elixir e Phoenix.
    La mia passione per la programmazione mi ha portato a creare applicazioni web e desktop, 
    e sono sempre alla ricerca di nuovi progetti e sfide.
    Penso che la programmazione sia un'arte e cerco di creare applicazioni che siano non solo funzionali,
    ma anche belle e intuitive. 
    `,
    link: 'Contattami',
    textLink: `  se anche tu come me credi che la programmazione sia un'arte`,
  },
  en: {
    main: `
    I'm Nicola Solazzo, a passionate developer with a keen eye on frontend and a growing interest in backend. 
    Through my experience with Vue.js, React, and exploring the server side with Node.js, 
    I strive to push the boundaries of digital creation.
    In time I have approached functional programming with Elixir and Phoenix.
    My passion for programming has led me to create web and desktop applications, 
    and I'm always on the lookout for new projects and challenges. 
    I believe programming is an art and aim to create applications that are not only functional 
    but also beautiful and intuitive.
    `,
    link: 'Contact me',
    textLink: ` if you also believe that programming is an art`,
  },
  es: {
    main: `
    Soy Nicola Solazzo, un desarrollador apasionado con un ojo atento al frontend y un interés creciente en el backend. 
    A través de mi experiencia con Vue.js, React y explorando el lado del servidor con Node.js, 
    busco empujar los límites de la creación digital. 
    En el tiempo me he acercado a la programación funcional con Elixir y Phoenix.
    Mi pasión por la programación me ha llevado a crear aplicaciones web y de escritorio, y siempre estoy en busca de nuevos proyectos y desafíos. 
    Creo que la programación es un arte y mi objetivo es crear aplicaciones que no solo sean funcionales, 
    sino también hermosas e intuitivas.
    `,
    link: 'Contáctame',
    textLink: ` si también crees que la programación es un arte`,
  },
  fr: {
    main: `
    Je suis Nicola Solazzo, un développeur passionné avec un regard attentif sur le frontend et un intérêt croissant pour le backend.
    Grâce à mon expérience avec Vue.js, React et l'exploration du côté serveur avec Node.js,
    je cherche à pousser les limites de la création numérique.
    Au fil du temps, j'ai approché la programmation fonctionnelle avec Elixir et Phoenix.
    Ma passion pour la programmation m'a conduit à créer des applications web et de bureau, et je suis toujours à la recherche de nouveaux projets et défis.
    Je pense que la programmation est un art et je cherche à créer des applications qui ne soient pas seulement fonctionnelles,
    mais aussi belles et intuitives.
    `,
    link: 'Contactez-moi',
    textLink: ` si vous aussi pensez que la programmation est un art`,
  },
}
