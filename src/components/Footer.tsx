'use client'
import Link from 'next/link'
import Image from 'next/image'
import LegalCenter from './LegalCenter'
import { store } from '../store/store'
import type { Locale } from '../types'

interface FooterProps {
  local: Locale
}

// Footer aziendale a colonne: brand + tagline, menu, contatti, area legale.
const Footer = ({ local }: FooterProps) => {
  const t = store.i18n.footer[local]
  const menu = store.i18n.navMenu[local]
  const year = new Date().getFullYear()

  const links = [
    { href: '/#hero', label: menu.home },
    { href: '/#process', label: menu.process },
    { href: '/#services', label: menu.services },
    { href: '/about', label: menu.about },
    { href: '/#contact', label: menu.contact },
  ]

  return (
    <footer className="mt-6 w-full border-t border-primary/10 bg-white/40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-3 lg:px-8">
        {/* Brand + tagline */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="font-mono text-xs uppercase font-semibold text-primary lg:text-sm">
            Nicola Solazzo &lt;<span className="text-accent">/</span>&gt;
          </Link>
          <p className="text-sm leading-relaxed text-ink/70">{t.tagline}</p>
        </div>

        {/* Menu */}
        <nav aria-label={t.menuTitle} className="flex flex-col gap-2">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t.menuTitle}
          </h3>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-ink/70 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contatti */}
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t.contactTitle}
          </h3>
          <Link
            href="/#contact"
            className="w-fit text-sm font-medium text-primary transition-colors hover:text-accent"
          >
            {store.i18n.navContactLink[local]}
          </Link>
          <a
            href="https://www.linkedin.com/in/nicolasolazzo/"
            target="_blank"
            rel="noreferrer"
            className="w-fit"
            aria-label="LinkedIn"
          >
            <Image src="/linkedin.png" alt="Linkedin Logo" width={24} height={24} />
          </a>
        </div>
      </div>

      {/* Riga legale */}
      <div className="border-t border-primary/10 px-5 py-4 text-center text-xs text-ink/60">
        <p>© {year} Nicola Solazzo</p>
        <LegalCenter local={local} />
      </div>
    </footer>
  )
}

export default Footer
