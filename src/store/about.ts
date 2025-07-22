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
    textLink:`  se anche tu come me credi che la programmazione sia un'arte`
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
    textLink:` if you also believe that programming is an art`
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
    textLink:` si también crees que la programación es un arte`
  }
}
  

