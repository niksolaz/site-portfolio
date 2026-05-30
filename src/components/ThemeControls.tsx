'use client'

import type { Locale } from '../types'

interface ThemeControlsProps {
  local: Locale
  onLocaleChange: (locale: Locale) => void
}

const ThemeControls = ({ local, onLocaleChange }: ThemeControlsProps) => {
  return (
    <div className="flex items-center">
      <select
        value={local}
        onChange={(e) => onLocaleChange(e.target.value as Locale)}
        className="h-9 cursor-pointer rounded-lg border border-primary/30 bg-white/60 px-2 text-xs font-semibold text-ink transition-colors hover:border-primary focus:outline-none lg:text-sm"
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
