import { useState, useEffect } from 'react'
import type { Locale } from '../types'

const STORAGE_KEY = 'preferred-locale'
const SUPPORTED: Locale[] = ['it', 'en']

const useLocale = () => {
  // Italiano come lingua di default del sito.
  const [local, setLocal] = useState<Locale>('it')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    // Valida il valore salvato: vecchie scelte (es. 'es'/'fr') vengono ignorate.
    if (saved && SUPPORTED.includes(saved)) setLocal(saved)
  }, [])

  const changeLocale = (locale: Locale) => {
    setLocal(locale)
    localStorage.setItem(STORAGE_KEY, locale)
  }

  return { local, changeLocale }
}

export default useLocale
