'use client'

import { useState } from 'react'
import type { Locale } from '../types'

interface ThemeControlsProps {
  local: Locale
  onLocaleChange: (locale: Locale) => void
}

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

const ThemeControls = ({ local, onLocaleChange }: ThemeControlsProps) => {
  // Stato di apertura del menu lingue (stessa logica dell'hamburger).
  const [open, setOpen] = useState(false)

  const handleSelect = (code: Locale) => {
    onLocaleChange(code)
    setOpen(false)
  }

  return (
    <div className="relative flex items-center">
      {/* Pulsante che apre/chiude il menu lingue */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="language-menu"
        className="flex h-9 items-center gap-1 px-3 text-xs font-semibold text-ink transition-colors lg:text-sm"
      >
        {local.toUpperCase()}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-4 w-4 text-primary transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Pannello a tendina con le lingue */}
      <div
        id="language-menu"
        className={`absolute right-0 top-full mt-2 w-28 origin-top-right overflow-hidden rounded-xl border border-primary/20 bg-base/95 shadow-lg backdrop-blur transition-all duration-300 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <ul className="flex flex-col py-2">
          {locales.map(({ code, label }) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => handleSelect(code)}
                aria-current={code === local}
                className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary/10 hover:text-accent ${
                  code === local ? 'font-bold text-primary' : 'text-ink/80'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ThemeControls
