interface Card {
  title: string;
  text: string;
  price: number;
}

const listCard = [
      {
        title: "Frontend",
        text: "Design di interfacce utente e user experience, sviluppate con Vue.js, React.js, TailwindCSS, Bootstrap, Material-UI, SASS, CSS3, HTML5",
        price: 300,
      },
      {
        title: "Backend",
        text: "Sviluppo di backend con Node.js, Express.js, MongoDB, MySQL, PostgreSQL, Firebase, GraphQL, REST API",
        price: 400,
      },
      {
        title: "Integrazioni Api",
        text: "Sviluppo di applicazioni con API di terze parti, come Google Maps, Stripe, Twilio, SendGrid, OpenWeatherMap, ecc.",
        price: 500,
      },
      {
        title: "Tipologia di progetti",
        text: "Sviluppo di siti web, web app, applicazioni desktop, applicazioni web progressive, applicazioni mobile, ecc.",
        price: 100,
      },
      {
        title: "Gestione",
        text: "Gestione di progetti con metodologie Agile, come Scrum, Kanban, Lean, ecc.",
        price: 300,
      },
      {
        title: "Strumenti di sviluppo",
        text: "Utilizzo di strumenti di sviluppo come Git, GitHub, VS Code, Slack, Monday, Docker, ecc.",
        price: 100,
      }
    ]


const setListCard = (item:Card, i:number) => {
  listCard[i] = item;
}

export const cards = {
  listCard,
  setListCard
}