'use client'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { store } from '../store/store'
import type { Locale } from '../types'

// Chiave in localStorage dove salviamo la scelta sul consenso ai cookie.
const CONSENT_KEY = 'cookie-consent'

type LegalDoc = 'terms' | 'cookie' | 'privacy'

interface LegalCenterProps {
  local: Locale
}

// Gestisce in un unico posto: i link legali nel footer, il banner cookie
// (in basso, fisso) e i modali con i testi di Termini / Cookie / Privacy.
const LegalCenter = ({ local }: LegalCenterProps) => {
  const t = store.i18n.legal[local]

  const [showBanner, setShowBanner] = useState(false)
  const [openDoc, setOpenDoc] = useState<LegalDoc | null>(null)

  // Mostriamo il banner solo se l'utente non ha ancora espresso una scelta.
  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY)
    if (!saved) setShowBanner(true)
  }, [])

  const saveConsent = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, value)
    setShowBanner(false)
  }

  const activeDoc = openDoc ? t.docs[openDoc] : null

  return (
    <>
      {/* Link legali nel footer */}
      <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink/60">
        <button
          type="button"
          onClick={() => setOpenDoc('terms')}
          className="font-medium transition-colors hover:text-accent"
        >
          {t.links.terms}
        </button>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={() => setOpenDoc('privacy')}
          className="font-medium transition-colors hover:text-accent"
        >
          {t.links.privacy}
        </button>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={() => setOpenDoc('cookie')}
          className="font-medium transition-colors hover:text-accent"
        >
          {t.links.cookie}
        </button>
      </nav>

      {/* Banner cookie fisso in basso */}
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-primary/15 bg-white/95 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm leading-relaxed text-ink/80">
              {t.banner.message}{' '}
              <button
                type="button"
                onClick={() => setOpenDoc('cookie')}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {t.banner.more}
              </button>
            </p>
            <div className="flex shrink-0 items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => saveConsent('rejected')}
                className="rounded-md border-2 border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary"
              >
                {t.banner.reject}
              </button>
              <button
                type="button"
                onClick={() => saveConsent('accepted')}
                className="cta-button rounded-md px-5 py-2 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.02]"
              >
                {t.banner.accept}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale con il testo del documento selezionato */}
      <Modal
        open={activeDoc !== null}
        title={activeDoc?.title ?? ''}
        closeLabel={t.close}
        onClose={() => setOpenDoc(null)}
      >
        {activeDoc?.body}
      </Modal>
    </>
  )
}

export default LegalCenter
