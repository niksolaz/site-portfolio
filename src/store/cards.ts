interface Card {
  title: string;
  text: string;
  price: number;
}

const listCard = [
      {
        title: "Sviluppo",
        text: "Sviluppo di applicazioni web e mobile",
        price: 400,
      },
      {
        title: "Design",
        text: "Design di interfacce utente e user experience",
        price: 300,
      },
      {
        title: "Consulenza",
        text: "Consulenza e formazione",
        price: 100,
      },
      {
        title: "Api",
        text: "Sviluppo di backend e API",
        price: 500,
      },
      {
        title: "Gestione progetti",
        text: "Design di interfacce utente e user experience",
        price: 300,
      },
      {
        title: "Caffè",
        text: "Consulenza e formazione",
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