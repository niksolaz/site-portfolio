import Image from "next/image";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import About from "../components/About";

import {store}  from "../store/store";

export default function Home() {
  
  const listCard = store.cards.listCard;
  // const setListCard = store.cards.setListCard;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Navbar />
      <section className="py-20 text-center">
        <Image
          src="/astrox.webp"
          alt="Astronaut Hero Image"
          width={380}
          height={370}
          priority
          className="rounded-full shadow-yellow-400 shadow-lg mx-auto mb-10"
        />
        <h2 className="block bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text py-5 text-8xl text-transparent">
          NIXO
        </h2>
        <p className="text-3xl  text-white">Trasforma le tue idee in realtà.</p>
      </section>
      <section className="mx-auto flex flex-wrap items-center justify-center gap-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-3">
        {listCard.map((card, index) => {
          return (
            <Card key={index} title={card.title} text={card.text} price={card.price} />
          );
        })}
      </section>
      <section className="mx-auto flex flex-wrap items-center justify-center gap-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-3">
        <About />
      </section>
    </main>
  );
}
