import React from 'react'
import SectionHeading from './SectionHeading'
import { store } from '../store/store'
import type { Locale } from '../types'

interface ProcessProps {
  local: Locale
}

// Sezione "Come lavoro": il metodo in 4 step, dal punto di vista del cliente.
// Racconta un processo (ascolto → analisi → progetto → realizzazione) invece
// di un elenco di tecnologie.
const Process = ({ local }: ProcessProps) => {
  const section = store.i18n.processSection[local]
  const steps = store.i18n.processSteps[local]

  return (
    <div className="mx-auto w-full max-w-6xl">
      <SectionHeading eyebrow={section.eyebrow} title={section.title} />

      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="group relative flex h-full flex-col gap-3 rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
          >
            <span className="font-mono text-sm font-semibold text-accent/90">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-bold tracking-tight text-primary">{step.title}</h3>
            <span className="h-px w-10 bg-accent/60" />
            <p className="text-sm leading-relaxed text-ink/75">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Process
