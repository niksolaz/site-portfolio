import { useState, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const themeBtn = document.getElementById('theme-switcher')
    const footer = document.getElementById('footer-switcher')

    if (theme) {
      document.body.classList.add('light-theme')
      themeBtn?.classList.replace('icon-moon', 'icon-sun')
      footer?.classList.replace('footer-light', 'footer-dark')
    } else {
      document.body.classList.remove('light-theme')
      themeBtn?.classList.replace('icon-sun', 'icon-moon')
      footer?.classList.replace('footer-dark', 'footer-light')
    }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => !prev)

  return { theme, toggleTheme }
}

export default useTheme
