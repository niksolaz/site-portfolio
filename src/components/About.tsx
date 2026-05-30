'use client'
import { useEffect, useRef } from 'react'
import { store } from '../store/store'
import type { Locale } from '../types'

interface AboutProps {
  local: Locale
}

const About = ({ local }: AboutProps) => {
  const about = store.about[local]
  const rootRef = useRef<HTMLDivElement>(null)

  // Animazione "line drawing" dei tratti SVG con anime.js (createDrawable):
  // i contorni si disegnano da soli quando la sezione entra nello schermo.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let active = true
    let io: IntersectionObserver | null = null
    let anim: { play: () => void; pause?: () => void } | null = null

    import('animejs').then(({ animate, svg, stagger }) => {
      if (!active || !rootRef.current) return

      const lines = svg.createDrawable('.about-line')
      // Partiamo con i tratti "non disegnati" per evitare lampeggi.
      lines.forEach((l: { draw: string }) => {
        l.draw = '0 0'
      })

      anim = animate(lines, {
        draw: ['0 0', '0 1'],
        ease: 'inOutQuad',
        duration: 1500,
        delay: stagger(90),
        autoplay: false,
      })

      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            anim?.play()
            io?.disconnect()
          }
        },
        { threshold: 0.2 },
      )
      io.observe(rootRef.current)
    })

    return () => {
      active = false
      io?.disconnect()
      anim?.pause?.()
    }
  }, [])

  return (
    <div ref={rootRef} className="mx-auto flex w-full max-w-5xl flex-col gap-12 lg:gap-20">
      {/* BLOCCO 1 — Chi sono */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[280px_1fr] lg:gap-14">
        {/* Illustrazione: orbita + codice </> */}
        <div className="mx-auto flex items-center justify-center">
          <svg
            viewBox="0 0 220 220"
            fill="none"
            aria-hidden="true"
            className="w-full max-w-[240px] text-primary drop-shadow-[0_0_24px_rgba(0,77,77,0.18)]"
          >
            <ellipse
              className="about-line"
              cx="110"
              cy="110"
              rx="94"
              ry="40"
              transform="rotate(-22 110 110)"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.55"
            />
            <ellipse
              className="about-line"
              cx="110"
              cy="110"
              rx="94"
              ry="40"
              transform="rotate(38 110 110)"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.35"
            />
            <circle className="about-line" cx="110" cy="110" r="46" stroke="currentColor" strokeWidth="2" />
            <polyline
              className="about-line"
              points="97,95 82,110 97,125"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              className="about-line"
              points="123,95 138,110 123,125"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              className="about-line"
              x1="117"
              y1="90"
              x2="103"
              y2="130"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="16" cy="150" r="3" fill="currentColor" className="animate-pulse" />
            <circle cx="204" cy="72" r="3" className="animate-pulse fill-accent" opacity="0.9" />
          </svg>
        </div>

        {/* Testo principale */}
        <div className="rounded-2xl border border-primary/15 bg-white/60 p-6 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,77,77,0.08)] lg:p-8">
          <span className="mb-4 inline-block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
          <p className="text-justify text-base leading-relaxed text-ink/80 lg:text-lg">{about.main}</p>
        </div>
      </div>

      {/* BLOCCO 2 — Contatto */}
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_280px] lg:gap-14">
        {/* Testo + link contatto */}
        <div className="order-2 rounded-2xl border border-primary/15 bg-white/60 p-6 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,77,77,0.08)] lg:order-1 lg:p-8">
          <p className="flex flex-wrap items-center gap-3 text-base leading-relaxed text-ink/80 lg:text-lg">
            <a
              className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 font-bold text-primary transition-all duration-300 ease-in-out hover:border-accent hover:bg-accent hover:text-ink hover:shadow-[0_0_20px_rgba(255,179,0,0.35)]"
              href="/contact"
            >
              {about.link}
            </a>
            <span>{about.textLink}</span>
          </p>
        </div>

        {/* Illustrazione: aeroplanino di carta + scia */}
        <div className="order-1 mx-auto flex items-center justify-center lg:order-2">
          <svg
            viewBox="0 0 220 220"
            fill="none"
            aria-hidden="true"
            className="w-full max-w-[240px] text-primary drop-shadow-[0_0_24px_rgba(0,77,77,0.18)]"
          >
            <path
              className="about-line"
              d="M22 190 C70 172 80 120 122 104"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              className="about-line"
              d="M196 38 L150 178 L120 120 L62 96 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              className="about-line"
              d="M196 38 L120 120"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              className="about-line"
              d="M42 56 L42 76 M32 66 L52 66"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="188" cy="150" r="3" fill="currentColor" className="animate-pulse" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default About
