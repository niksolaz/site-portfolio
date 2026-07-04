'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import About from '../components/About'
import Contact from '../components/Contact'
import ThemeControls from '../components/ThemeControls'
import Hero3D from '../components/Hero3D'
import LegalCenter from '../components/LegalCenter'
import useLocale from '../hooks/useLocale'
import { store } from '../store/store'

export default function Home() {
  const { local, changeLocale } = useLocale()


  const listCard = store.cards[local]
  const subtitle = store.i18n.homeSubtitle[local]
  const contactLink = store.i18n.navContactLink[local]

  // Stato del laptop 3D (chiuso/aperto): guida sia la scena sia il titolo.
  const [laptopOpen, setLaptopOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Quando il laptop cambia stato, il titolo si "ricompone" con effetto scramble
  // (anime.js): chiuso -> "NICOLA SOLAZZO", aperto -> "JS DEVELOPER".
  useEffect(() => {
    const target = laptopOpen ? 'DIGITAL SOLUTIONS' : 'NICOLA SOLAZZO'
    let cancelled = false
    import('animejs').then(({ animate, scrambleText }) => {
      const el = headingRef.current
      if (cancelled || !el) return
      animate(el, {
        innerHTML: scrambleText({ text: target }),
        duration: 1200,
        ease: 'inOut(2)',
      })
    })
    return () => {
      cancelled = true
    }
  }, [laptopOpen])

  return (
    <>
      <main className="relative min-h-screen">
        <section id="navbar" className="px-5 lg:px-24">
          <Navbar local={local}>
            <ThemeControls local={local} onLocaleChange={changeLocale} />
          </Navbar>
        </section>

        <section id="hero" className="lg:pb-40 py-20 text-center px-5 lg:px-24">
          <Hero3D open={laptopOpen} onToggle={() => setLaptopOpen((v) => !v)} />
          <h1
            ref={headingRef}
            className="relative z-10 block text-primary-light py-5 text-4xl font-extrabold uppercase tracking-tight text-transparent drop-shadow-[0_2px_18px_rgba(0,77,77,0.25)] lg:text-8xl"
          >
            Nicola Solazzo
          </h1>
          <p className="relative z-10 text-xl font-medium text-ink/80 lg:text-3xl">{subtitle}</p>
        </section>

        <section id="cards" className="px-5 lg:px-24 lg:py-40 py-20  mx-auto flex flex-wrap items-center justify-center gap-y-4 lg:grid lg:grid-cols-3 lg:gap-6">
          {listCard.map((card, index) => (
            <div
              key={index}
              className={`scale-75 lg:scale-100 delay-75 duration-300 ease-in-out transform hover:rotate-0 hover:scale-100 lg:hover:scale-125 ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}
            >
              <Card title={card.title} text={card.text} index={index} />
            </div>
          ))}
        </section>

        <section id="about" className="px-5 lg:px-24 lg:py-40 py-20 w-full">
          <About local={local} />
        </section>

        <section id="contact" className="px-5 lg:px-40 lg:py-32 py-20 w-full">
          <Contact local={local} />
        </section>
      </main>

      <footer id="footer-switcher" className="w-full text-center py-4 mt-6 rounded-t-lg">
        <p>© 2024 Nicola Solazzo</p>
        <a href="#contact" className="text-xs font-medium text-primary hover:text-accent">
          {contactLink}
        </a>
        <LegalCenter local={local} />
      </footer>
    </>
  )
}
