'use client'
import Image from 'next/image'
import type { Locale } from '../types'

interface ThemeControlsProps {
  local: Locale
  theme: boolean
  onThemeToggle: () => void
  onLocaleChange: (locale: Locale) => void
}

const ThemeControls = ({ local, theme, onThemeToggle, onLocaleChange }: ThemeControlsProps) => {
  return (
    <div className="fixed top-0 z-20 flex items-center justify-center space-x-4 py-2">
      <button
        onClick={onThemeToggle}
        aria-label="Toggle theme"
        className={`rounded-full p-1 transition-colors duration-300 ${theme ? 'bg-white border border-white shadow-lg rotate-0 animation-pulse hover:rotate-180 transition-transform duration-1000 ease-in-out' : 'bg-yellow-300 border border-yellow-300 shadow-lg rotate-180 animation-pulse hover:rotate-0 transition-transform duration-1000 ease-in-out'}`}
      >
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
      <select
        value={local}
        onChange={(e) => onLocaleChange(e.target.value as Locale)}
        className="text-xs text-ink lg:h-8 lg:text-sm border border-primary/30 p-1 bg-white/60 rounded-lg"
        aria-label="Select language"
      >
        <option value="en">EN</option>
        <option value="it">IT</option>
        <option value="es">ES</option>
        <option value="fr">FR</option>
      </select>
    </div>
  )
}

export default ThemeControls
