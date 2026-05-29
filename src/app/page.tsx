'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import About from '../components/About'
import ThemeControls from '../components/ThemeControls'
import Hero3D from '../components/Hero3D'
import useTheme from '../hooks/useTheme'
import useLocale from '../hooks/useLocale'
import { store } from '../store/store'

export default function Home() {
  const { local, changeLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()

  const listCard = store.cards[local]
  const subtitle = store.i18n.homeSubtitle[local]
  const contactLink = store.i18n.navContactLink[local]

  // Stato del laptop 3D (chiuso/aperto): guida sia la scena sia il titolo.
  const [laptopOpen, setLaptopOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Quando il laptop cambia stato, il titolo si "ricompone" con effetto scramble
  // (anime.js): chiuso -> "NICOLA SOLAZZO", aperto -> "JS DEVELOPER".
  useEffect(() => {
    const target = laptopOpen ? 'JS DEVELOPER' : 'NICOLA SOLAZZO'
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
      <main className="relative flex min-h-screen flex-col items-center justify-between px-5 lg:px-24">
        <Navbar local={local} />
        <ThemeControls local={local} theme={theme} onThemeToggle={toggleTheme} onLocaleChange={changeLocale} />

        <section className="pt-20 pb-0 lg:py-40 text-center">
          <Hero3D theme={theme} open={laptopOpen} onToggle={() => setLaptopOpen((v) => !v)} />
          <h2
            ref={headingRef}
            className="relative z-10 block bg-gradient-to-r from-white via-sky-200 to-sky-500 bg-clip-text py-5 text-4xl font-extrabold uppercase tracking-tight text-transparent drop-shadow-[0_2px_18px_rgba(56,189,248,0.35)] lg:text-8xl"
          >
            Nicola Solazzo
          </h2>
          <p className="relative z-10 text-xl font-medium lg:text-3xl">{subtitle}</p>
        </section>

        <section className="mx-auto flex flex-wrap items-center justify-center gap-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-6">
          {listCard.map((card, index) => (
            <div
              key={index}
              className={`scale-75 lg:scale-100 delay-75 duration-300 ease-in-out transform hover:rotate-0 hover:scale-100 lg:hover:scale-125 ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}
            >
              <Card title={card.title} text={card.text} />
            </div>
          ))}
        </section>

        <section className="container py-10 w-full">
          <About local={local} />
        </section>
      </main>

      <footer id="footer-switcher" className="w-full text-center py-4 mt-6 rounded-t-lg">
        <p>© 2024 Nicola Solazzo</p>
        <Link href="/contact" className="text-xs font-medium">
          {contactLink}
        </Link>
      </footer>
    </>
  )
}
