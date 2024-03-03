import Image from "next/image";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

const listCard = [
  {
    title: "Sviluppo",
    text: "Sviluppo di applicazioni web e mobile",
    price: 500
  },
  {
    title: "Design",
    text: "Design di interfacce utente e user experience",
    price: 300
  },
  {
    title: "Consulenza",
    text: "Consulenza e formazione",
    price: 100
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Navbar />
      <section className="text-center py-40">
        <Image
          src="/astronaut-hero-img.webp"
          alt="Astronaut Hero Image"
          width={380}
          height={37}
          priority
        />
        <h2 className="block text-8xl bg-gradient-to-r from-yellow-400 to-yellow-800 text-transparent bg-clip-text py-5">
          NIXO
        </h2>
        <p className="text-3xl  text-white">
          Trasforma le tue idee in realtà.
        </p>
      </section>
      <section className="mx-auto py-40 flex flex-wrap items-center justify-center gap-y-4 lg:grid lg:grid-cols-3 lg:gap-3">
      {
        listCard.map((card) => {
          return <Card title={card.title} text={card.text} price={card.price} />
        })
      }
      </section>
    </main>
  );
}
