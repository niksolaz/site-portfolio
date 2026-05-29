'use client'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import About from '../components/About'
import ThemeControls from '../components/ThemeControls'
import Astronaut3D from '../components/Astronaut3D'
import useTheme from '../hooks/useTheme'
import useLocale from '../hooks/useLocale'
import { store } from '../store/store'

export default function Home() {
  const { local, changeLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()

  const listCard = store.cards[local]
  const subtitle = store.i18n.homeSubtitle[local]
  const contactLink = store.i18n.navContactLink[local]

  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-between px-5 lg:px-24">
        <Navbar local={local} />
        <ThemeControls local={local} theme={theme} onThemeToggle={toggleTheme} onLocaleChange={changeLocale} />

        <section className="pt-20 pb-0 lg:py-40 text-center">
          <Astronaut3D theme={theme} />
          <h2 className="block bg-gradient-to-r from-gray-200 to-sky-600 uppercase bg-clip-text py-5 text-3xl lg:text-8xl text-transparent">
            Nicola Solazzo
          </h2>
          <p className="text-xl lg:text-3xl">{subtitle}</p>
        </section>

        <section className="mx-auto flex flex-wrap items-center justify-center gap-y-4 py-10 lg:grid lg:grid-cols-3 lg:gap-6">
          {listCard.map((card, index) => (
            <div
              key={index}
              className={`scale-75 lg:scale-100 delay-75 duration-300 ease-in-out transform hover:rotate-0 hover:scale-100 lg:hover:scale-125 ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}
            >
              <Card title={card.title} text={card.text} />
            </div>
          ))}
        </section>

        <section className="container py-10 w-full">
          <About local={local} />
        </section>
      </main>

      <footer id="footer-switcher" className="w-full text-center py-4 mt-6 rounded-t-lg">
        <p>© 2024 Nicola Solazzo</p>
        <Link href="/contact" className="text-xs font-medium">
          {contactLink}
        </Link>
      </footer>
    </>
  )
}
