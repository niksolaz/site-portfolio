'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
import ThemeControls from './ThemeControls'
import About from './About'
import Hero3D from './Hero3D'
import Footer from './Footer'
import useLocale from '../hooks/useLocale'
import { store } from '../store/store'
import { techStack } from '../store/about'

// Vista client della pagina /about: qui vive la parte personale del sito
// (storia, laptop 3D interattivo come firma, stack tecnico completo).
const AboutView = () => {
  const { local, changeLocale } = useLocale()
  const t = store.i18n.aboutPage[local]

  // Il laptop 3D, spostato dalla home: resta interattivo (aperto/chiuso).
  const [laptopOpen, setLaptopOpen] = useState(false)

  return (
    <>
      <main className="relative min-h-screen">
        <Navbar local={local}>
          <ThemeControls local={local} onLocaleChange={changeLocale} />
        </Navbar>

        {/* Intestazione + laptop 3D */}
        <section id="about-hero" className="px-5 pt-36 text-center lg:px-24 lg:pt-44">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent lg:text-sm">
            {t.eyebrow}
          </p>
          <h1 className="head-text mt-4">{t.title}</h1>
          <Hero3D open={laptopOpen} onToggle={() => setLaptopOpen((v) => !v)} />
        </section>

        {/* Storia e approccio */}
        <section id="about" className="w-full px-5 py-16 lg:px-24 lg:py-24">
          <About local={local} />
        </section>

        {/* Stack tecnologico completo (qui, non in home) */}
        <section id="stack" className="w-full px-5 pb-16 lg:px-24 lg:pb-24">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="text-2xl font-black uppercase tracking-tight text-primary lg:text-3xl">
              {t.stackTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70 lg:text-base">
              {t.stackIntro}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group) => (
                <div
                  key={group.group}
                  className="rounded-2xl border border-primary/10 bg-white/70 p-5 backdrop-blur-sm"
                >
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {group.group}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium text-ink/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA verso i contatti in home */}
            <div className="mt-14 text-center">
              <Link
                href="/#contact"
                className="cta-button inline-block rounded-md px-8 py-3 text-sm font-semibold uppercase tracking-wide shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer local={local} />
    </>
  )
}

export default AboutView
