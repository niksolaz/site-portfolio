'use client'
import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { store } from '../store/store'
import type { Locale } from '../types'

interface NavbarProps {
  local: Locale
  children?: ReactNode
}

const Navbar = ({ local, children }: NavbarProps) => {
  // Stato di apertura del menu hamburger.
  const [open, setOpen] = useState(false)

  const menu = store.i18n.navMenu[local]

  // Le voci del menu: ogni "href" punta all'id della relativa sezione in page.tsx.
  const links = [
    { href: '#hero', label: menu.hero },
    { href: '#cards', label: menu.cards },
    { href: '#about', label: menu.about },
    { href: '#contact', label: menu.contact },
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-30 mx-auto flex max-w-5xl items-center justify-between px-4 py-4 font-mono text-sm backdrop-blur">
      <Link href="/" className="text-primary text-xs lg:text-sm uppercase font-semibold">
        Nicola Solazzo &gt;<span className="animate-pulse text-accent">_</span>
      </Link>

      <div className="flex items-center gap-3">
        {/* Slot per i controlli del tema/lingua passati da page.tsx */}
        {children}

        {/* Pulsante hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="primary-menu"
          className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 transition-colors hover:border-primary"
        >
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-transform duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-opacity duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-5 rounded-full bg-primary transition-transform duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Pannello del menu a tendina */}
      <div
        id="primary-menu"
        className={`absolute right-4 top-full mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-primary/20 bg-base/95 shadow-lg backdrop-blur transition-all duration-300 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <ul className="flex flex-col py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-ink/80 transition-colors hover:bg-primary/10 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
