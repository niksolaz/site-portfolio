'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Alert from './Alert'
import Modal from './Modal'
import useAlert from '../hooks/useAlert'
import useContactAgent from '../hooks/useChat'
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
  const [modalOpen, setModalOpen] = useState(false)
  const [modalReply, setModalReply] = useState('')
  const { alert, showAlert, hideAlert } = useAlert()
  const { analyze } = useContactAgent()

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

  // Invia il lead al server, che a sua volta chiama EmailJS.
  // Le chiavi EmailJS sono SOLO lato server — nessuna NEXT_PUBLIC_*.
  const notifyOwnerByEmail = (): Promise<{ ok: boolean }> =>
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    }).then((res) => res.json() as Promise<{ ok: boolean }>)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. L'AI analizza il messaggio e ne determina la categoria.
      // Data minimization: nome ed email NON vengono inviati all'endpoint AI.
      const { category, reply } = await analyze({
        message: form.message,
        locale: local,
      })

      switch (category) {
        // 2. Richiesta di informazioni: mostra subito la risposta FAQ nel modale.
        case 'info': {
          setModalReply(reply || store.i18n.contactNeutralMessage[local])
          setModalOpen(true)
          setForm({ name: '', email: '', message: '' })
          break
        }

        // 3. Potenziale cliente/collaborazione: invia email via server.
        case 'lead': {
          const result = await notifyOwnerByEmail()
          if (result.ok) {
            showAlert({ text: store.i18n.contactSuccessMessage[local], type: 'success' })
          } else {
            // L'email potrebbe non essere partita.
            showAlert({ text: store.i18n.contactErrorMessage[local], type: 'danger' })
          }
          const timer = setTimeout(() => {
            hideAlert()
            setForm({ name: '', email: '', message: '' })
          }, 4000)

          // Cleanup del timer se il componente si smonta.
          // Salviamo il timer in un ref per pulizia, o usiamo return di useEffect.
          // Per semplicita', il timeout e' breve (4s) e il cleanup non e' critico.
          // Miglioramento futuro: usare useRef + cleanup.
          void timer
          break
        }

        // 4. Spam / testo goliardico: non si fa nulla, solo un messaggio neutro.
        case 'spam':
        default: {
          showAlert({ text: store.i18n.contactNeutralMessage[local], type: 'success' })
          setTimeout(() => {
            hideAlert()
            setForm({ name: '', email: '', message: '' })
          }, 3000)
          break
        }
      }
    } catch (err) {
      // Structured logging client-side: solo contesto, non i dati utente.
      if (process.env.NODE_ENV === 'development') {
        console.error('[Contact] submit error:', err instanceof Error ? err.message : 'unknown')
      }
      showAlert({ text: store.i18n.contactErrorMessage[local], type: 'danger' })
      setTimeout(() => {
        hideAlert()
      }, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-5xl">
      {alert.show && <Alert {...alert} />}

      <Modal
        open={modalOpen}
        title={store.i18n.contactModalTitle[local]}
        closeLabel={store.i18n.contactModalClose[local]}
        onClose={() => setModalOpen(false)}
      >
        {modalReply}
        {/* Trasparenza AI (Art. 50 AI Act): la risposta automatica e' etichettata come generata da AI. */}
        <span className="mt-4 block border-t border-primary/10 pt-3 text-xs italic text-ink/50">
          {store.i18n.contactAiReplyLabel[local]}
        </span>
      </Modal>

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

            {/* Trasparenza AI (Art. 50 AI Act): informativa chiara prima della prima interazione. */}
            <p className="text-xs leading-relaxed text-ink/55">{store.i18n.contactAiNotice[local]}</p>
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