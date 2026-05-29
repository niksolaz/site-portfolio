import { useState, useEffect } from 'react'
import type { Locale } from '../types'

const STORAGE_KEY = 'preferred-locale'

const useLocale = () => {
  const [local, setLocal] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved) setLocal(saved)
  }, [])

  const changeLocale = (locale: Locale) => {
    setLocal(locale)
    localStorage.setItem(STORAGE_KEY, locale)
  }

  return { local, changeLocale }
}

export default useLocale
