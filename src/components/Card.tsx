import React from 'react'

interface CardProps {
  title: string
  text: string
  index?: number
}

const Card = ({ title, text, index }: CardProps) => {
  return (
    <article className="group relative flex h-full w-full max-w-sm min-h-56 flex-col gap-4 overflow-hidden rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
      {/* Barra-accento in alto: nascosta a riposo, si rivela al passaggio del mouse */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />

      <header className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight text-primary">{title}</h2>
        {typeof index === 'number' && (
          <span className="font-mono text-sm font-semibold text-accent/90">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </header>

      {/* Piccolo divisore oro: richiama l'accento usato altrove nel sito */}
      <span className="h-px w-10 bg-accent/60" />

      <p className="text-sm leading-relaxed text-ink/75">{text}</p>
    </article>
  )
}

export default Card
