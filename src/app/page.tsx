'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import About from "../components/About";

import {store}  from "../store/store";

export default function Home() {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    if (theme) {
      document.body.classList.add('light-theme');
      document.getElementById('theme-switcher')?.classList.remove('icon-moon');
      document.getElementById('theme-switcher')?.classList.add('icon-sun');
    } else {
      document.body.classList.remove('light-theme');
      document.getElementById('theme-switcher')?.classList.remove('icon-sun');
      document.getElementById('theme-switcher')?.classList.add('icon-moon');
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(!theme)
  }

 
  const listCard = store.cards.listCard;
  // const setListCard = store.cards.setListCard;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Navbar />
      <button onClick={toggleTheme} className="fixed top-0 z-50">
        <Image
            id="theme-switcher"
            className="relative rounded-full w-8 h-8 mt-6 border border-yellow-400 p-1 bg-yellow-400"
            src="/theme.svg"
            alt="theme light/dark mode switcher"
            width={20}
            height={20}
            priority
            />
      </button>
      <section className="py-20 text-center">
        { theme ? 
          <Image
            src="/astrox-sun.webp"
            alt="Astronaut Hero Image"
            width={380}
            height={370}
            priority
            className="rounded-full shadow-yellow-400 shadow-lg mx-auto mb-10"
          /> :
          <Image
          src="/astrox.webp"
          alt="Astronaut Hero Image"
          width={380}
          height={370}
          priority
          className="rounded-full shadow-yellow-400 shadow-lg mx-auto mb-10"
        />
        }
        <h2 className="block bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text py-5 text-8xl text-transparent">
          Nicola Solazzo
        </h2>
        <p className="text-3xl">Trasforma le tue idee in realtà.</p>
      </section>
      <section className="mx-auto flex flex-wrap items-center justify-center gap-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-3">
        {listCard.map((card, index) => {
          return (
            <Card key={index} title={card.title} text={card.text} price={card.price} />
          );
        })}
      </section>
      <section className="container py-10">
        <About />
      </section>
    </main>
  );
}
