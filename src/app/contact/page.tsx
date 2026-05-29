'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import emailjs from '@emailjs/browser'
import Navbar from '../../components/Navbar'
import Alert from '../../components/Alert'
import ThemeControls from '../../components/ThemeControls'
import useAlert from '../../hooks/useAlert'
import useTheme from '../../hooks/useTheme'
import useLocale from '../../hooks/useLocale'
import { store } from '../../store/store'

interface FormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const { local, changeLocale } = useLocale()
  const { alert, showAlert, hideAlert } = useAlert()
  const { theme, toggleTheme } = useTheme()

  const labels = store.i18n.contactFormLabels[local]
  const contactLink = store.i18n.navContactLink[local]

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: form.name,
        to_name: 'Nicola',
        from_email: form.email,
        to_email: 'solazzo.nicola@gmail.com',
        message: form.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false)
      showAlert({ text: 'Message sent successfully', type: 'success' })
      setTimeout(() => {
        hideAlert()
        setForm({ name: '', email: '', message: '' })
      }, 3000)
    }).catch((err) => {
      setIsLoading(false)
      console.error(err)
      showAlert({ text: 'An error occurred, please try again later', type: 'danger' })
    })
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-5 lg:p-24">
        <Navbar local={local} />
        <ThemeControls local={local} theme={theme} onThemeToggle={toggleTheme} onLocaleChange={changeLocale} />

        {alert.show && <Alert {...alert} />}

        <div className="flex-1 min-w-[50%] flex flex-col mt-24">
          <h1 className="head-text">{store.i18n.contactPreTitle[local]}</h1>

          <form className="w-full flex flex-col gap-7 mt-4" onSubmit={handleSubmit} ref={formRef}>
            <label className="font-semibold">
              {labels.name}
              <input
                type="text"
                name="name"
                className="input"
                placeholder={labels.placeholderName}
                required
                value={form.name}
                onChange={handleChange}
              />
            </label>

            <label className="font-semibold">
              {labels.email}
              <input
                type="email"
                name="email"
                className="input"
                placeholder={labels.placeholderEmail}
                required
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label className="font-semibold">
              {labels.message}
              <textarea
                name="message"
                rows={4}
                className="textarea"
                placeholder={labels.placeholderMessage}
                required
                value={form.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? 'Sending...' : store.i18n.contactBtnSend[local]}
            </button>
          </form>

          <h1 className="mt-14">{store.i18n.contactEndTitle[local]}</h1>
          <div className="py-5">
            <a href="https://www.linkedin.com/in/nicolasolazzo/" target="_blank" rel="noreferrer">
              <Image
                src="/linkedin.png"
                alt="Linkedin Logo"
                width={24}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
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
