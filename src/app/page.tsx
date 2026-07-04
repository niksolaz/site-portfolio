'use client'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Process from '../components/Process'
import SectionHeading from '../components/SectionHeading'
import Contact from '../components/Contact'
import ThemeControls from '../components/ThemeControls'
import Footer from '../components/Footer'
import useLocale from '../hooks/useLocale'
import { store } from '../store/store'

export default function Home() {
  const { local, changeLocale } = useLocale()

  const listCard = store.cards[local]
  const services = store.i18n.servicesSection[local]
  const teaser = store.i18n.aboutTeaser[local]

  return (
    <>
      <main className="relative min-h-screen">
        <Navbar local={local}>
          <ThemeControls local={local} onLocaleChange={changeLocale} />
        </Navbar>

        {/* HERO — cliente-centrico: occhiello + beneficio + CTA. */}
        <section id="hero" className="px-5 pb-16 pt-36 text-center lg:px-24 lg:pb-28 lg:pt-48">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent lg:text-sm">
              {store.i18n.heroEyebrow[local]}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-primary lg:text-6xl">
              {store.i18n.heroTitle[local]}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/80 lg:text-xl">
              {store.i18n.heroSubtitle[local]}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="cta-button rounded-md px-8 py-3 text-sm font-semibold uppercase tracking-wide shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                {store.i18n.heroCtaPrimary[local]}
              </a>
              <a
                href="#process"
                className="rounded-md border-2 border-primary/30 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/5"
              >
                {store.i18n.heroCtaSecondary[local]}
              </a>
            </div>
          </div>
        </section>

        {/* COME LAVORO — il metodo vale piu' dell'elenco di tecnologie. */}
        <section id="process" className="px-5 py-20 lg:px-24 lg:py-32">
          <Process local={local} />
        </section>

        {/* SERVIZI — benefici per il cliente, griglia allineata e sobria. */}
        <section id="services" className="px-5 py-20 lg:px-24 lg:py-32">
          <div className="mx-auto w-full max-w-6xl">
            <SectionHeading eyebrow={services.eyebrow} title={services.title} />
            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listCard.map((card, index) => (
                <Card key={card.title} title={card.title} text={card.text} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* TEASER ABOUT — due righe: chi sei lo racconta la pagina dedicata. */}
        <section id="about-teaser" className="px-5 py-16 lg:px-24 lg:py-24">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/15 bg-white/60 p-8 text-center backdrop-blur-sm shadow-[0_8px_40px_rgba(0,77,77,0.08)] lg:p-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              {teaser.eyebrow}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80 lg:text-xl">{teaser.text}</p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              {teaser.link} →
            </Link>
          </div>
        </section>

        {/* CONTATTI */}
        <section id="contact" className="w-full px-5 py-20 lg:px-40 lg:py-32">
          <Contact local={local} />
        </section>
      </main>

      <Footer local={local} />
    </>
  )
}
