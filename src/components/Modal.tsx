'use client'
import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  title: string
  closeLabel: string
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ open, title, closeLabel, children, onClose }: ModalProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Chiusura con tasto ESC + blocco dello scroll del body mentre il modale e' aperto.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Sposta il focus sul bottone di chiusura per accessibilita'.
    closeBtnRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Overlay: click fuori per chiudere */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-primary/15 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:p-8">
        <h3 className="head-text text-2xl">{title}</h3>

        <div className="mt-4 max-h-[60vh] overflow-y-auto whitespace-pre-line text-base leading-relaxed text-ink/90">
          {children}
        </div>

        <div className="mt-6 flex justify-end">
          <button ref={closeBtnRef} type="button" className="btn" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
