'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import Alert from './Alert'
import useAlert from '../hooks/useAlert'
import { store } from '../store/store'
import type { Locale } from '../types'

interface ContactProps {
  local: Locale
}

interface FormState {
  name: string
  email: string
  message: string
}

const Contact = ({ local }: ContactProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { alert, showAlert, hideAlert } = useAlert()

  const labels = store.i18n.contactFormLabels[local]

  // Animazione "line drawing" dei tratti SVG con anime.js (createDrawable):
  // i contorni dell'aeroplanino si disegnano da soli quando la sezione entra nello schermo.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let active = true
    let io: IntersectionObserver | null = null
    let anim: { play: () => void; pause?: () => void } | null = null

    import('animejs').then(({ animate, svg, stagger }) => {
      if (!active || !rootRef.current) return

      const lines = svg.createDrawable('.about-line')
      lines.forEach((l: { draw: string }) => {
        l.draw = '0 0'
      })

      anim = animate(lines, {
        draw: ['0 0', '0 1'],
        ease: 'inOutQuad',
        duration: 1500,
        delay: stagger(90),
        autoplay: false,
      })

      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            anim?.play()
            io?.disconnect()
          }
        },
        { threshold: 0.2 },
      )
      io.observe(rootRef.current)
    })

    return () => {
      active = false
      io?.disconnect()
      anim?.pause?.()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          to_name: 'Nicola',
          from_email: form.email,
          to_email: 'solazzo.nicola@gmail.com',
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setIsLoading(false)
        showAlert({ text: 'Message sent successfully', type: 'success' })
        setTimeout(() => {
          hideAlert()
          setForm({ name: '', email: '', message: '' })
        }, 3000)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err)
        showAlert({ text: 'An error occurred, please try again later', type: 'danger' })
      })
  }

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-5xl">
      {alert.show && <Alert {...alert} />}

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
        {/* Form di contatto */}
        <div className="order-2 rounded-2xl border border-primary/15 bg-white/60 p-6 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,77,77,0.08)] lg:order-1 lg:p-8">
          <h2 className="head-text">{store.i18n.contactPreTitle[local]}</h2>

          <form className="mt-6 flex w-full flex-col gap-6" onSubmit={handleSubmit} ref={formRef}>
            <label className="font-semibold">
              {labels.name}
              <input
                type="text"
                name="name"
                className="input mt-1"
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
                className="input mt-1"
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
                className="textarea mt-1"
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

          <p className="mt-10 text-base text-ink/80 lg:text-lg">{store.i18n.contactEndTitle[local]}</p>
          <div className="py-5">
            <a href="https://www.linkedin.com/in/nicolasolazzo/" target="_blank" rel="noreferrer">
              <Image src="/linkedin.png" alt="Linkedin Logo" width={24} height={24} priority />
            </a>
          </div>
        </div>

        {/* Illustrazione: aeroplanino di carta + scia */}
        <div className="order-1 mx-auto flex items-center justify-center lg:order-2">
          <svg
            viewBox="0 0 220 220"
            fill="none"
            aria-hidden="true"
            className="w-full max-w-[240px] text-primary drop-shadow-[0_0_24px_rgba(0,77,77,0.18)]"
          >
            <path
              className="about-line"
              d="M22 190 C70 172 80 120 122 104"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              className="about-line"
              d="M196 38 L150 178 L120 120 L62 96 Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              className="about-line"
              d="M196 38 L120 120"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              className="about-line"
              d="M42 56 L42 76 M32 66 L52 66"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="188" cy="150" r="3" fill="currentColor" className="animate-pulse" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Contact
