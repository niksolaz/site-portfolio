'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import About from "../components/About";
import Link from 'next/link'

import {store}  from "../store/store";

export default function Home() {
  const [theme, setTheme] = useState(false)
  const [local, setLocal] = useState('en')

  const subtitle: {en: string, it: string, es: string, fr: string} = {
    en: "Like an astronaut in the digital universe, I explore the frontiers of development with boldness and creativity.",
    it: "Come un astronauta nell'universo digitale, esploro le frontiere dello sviluppo con audacia e creatività.",
    es: "Como un astronauta en el universo digital, explorar las fronteras del desarrollo con audacia y creatividad.",
    fr: "Comme un astronaute dans l'univers numérique, je explore les frontières du développement avec audace et créativité."
  }

  const localLink: {en: string, it: string, es: string, fr: string} = {
    en: 'CONTACT ME',
    it: 'CONTATTAMI',
    es: 'CONTACTAME',
    fr: 'CONTACTEZ-MOI'
  }

  useEffect(() => {
    if (theme) {
      document.body.classList.add('light-theme');
      document.getElementById('theme-switcher')?.classList.remove('icon-moon');
      document.getElementById('theme-switcher')?.classList.add('icon-sun');
      document.getElementById('footer-switcher')?.classList.remove('footer-light');
      document.getElementById('footer-switcher')?.classList.add('footer-dark');
    } else {
      document.body.classList.remove('light-theme');
      document.getElementById('theme-switcher')?.classList.remove('icon-sun');
      document.getElementById('theme-switcher')?.classList.add('icon-moon');
      document.getElementById('footer-switcher')?.classList.remove('footer-dark');
      document.getElementById('footer-switcher')?.classList.add('footer-light');
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(!theme)
  }

  const selectTongue = (e:any) => {
    setLocal(e.target.value)
  }
 
  const listCard = store.cards[local as keyof typeof store.cards];

  return (
    <>
    <main className="relative flex min-h-screen flex-col items-center justify-between px-5 lg:px-24">
      <Navbar local={local} />
      <div className="fixed top-0 z-20 flex items-center justify-center space-x-4 py-2">
        <button onClick={toggleTheme}>
          <Image
              id="theme-switcher"
              className="rounded-full w-6 h-6 lg:w-8 lg:h-8 p-1"
              src="/theme.svg"
              alt="theme light/dark mode switcher"
              width={20}
              height={20}
              priority
              />
        </button>
        <select onChange={selectTongue} className="h-6 text-xs text-gray-600 lg:h-8 lg:text-sm border border-gray-400 p-1 bg-gray-200 rounded-lg">
          <option value="en">EN</option>
          <option value="it">IT</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
        </select>
      </div>
      <section className="pt-20 pb-0 lg:py-40 text-center">
        { theme ? 
          <Image
            src="/astrox-sun.webp"
            alt="Astronaut Hero Image"
            width={380}
            height={370}
            priority
            className="rounded-full shadow-gray-200 shadow-lg mx-auto mb-4 lg:mb-10 delay-75 duration-300 ease-in-out transform hover:rotate-12"
          /> :
          <Image
          src="/astrox.webp"
          alt="Astronaut Hero Image"
          width={380}
          height={370}
          priority
          className="rounded-full shadow-gray-200 shadow-lg mx-auto  mb-4 lg:mb-10 delay-75 duration-300 ease-in-out transform hover:-rotate-12"
        />
        }
        <h2 className="block bg-gradient-to-r from-gray-200 to-sky-600 uppercase bg-clip-text py-5 text-3xl lg:text-8xl text-transparent">
          Nicola Solazzo
        </h2>
        <p className="text-xl lg:text-3xl">{subtitle[local as keyof typeof subtitle]}</p>
      </section>
      <section className="mx-auto flex flex-wrap items-center justify-center gap-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-6">
        {listCard.map((card, index) => {
          if(index % 2 === 0) {
            return (
              <div key={index} className="scale-75 lg:scale-100 delay-75 duration-300 ease-in-out transform rotate-3 hover:rotate-0 hover:scale-100 lg:hover:scale-125">
                <Card title={card.title} text={card.text} />
              </div>
            );
          } else {
            return (
              <div key={index} className="scale-75 lg:scale-100 delay-75 duration-300 ease-in-out transform -rotate-3 hover:rotate-0 hover:scale-100 lg:hover:scale-125">
                <Card title={card.title} text={card.text} />
              </div>
            );
          }
        })}
      </section>
      <section className="container py-10 w-full">
        <About local={local}/>
      </section>
    </main>
    <footer id="footer-switcher" className="w-full text-center py-4 mt-6 rounded-t-lg">
      <p>© 2024 Nicola Solazzo</p>
      <Link href="/contact" className="text-xs font-medium ">
        {localLink[local as keyof typeof localLink]}
      </Link>
    </footer>
  </>
  );
}
