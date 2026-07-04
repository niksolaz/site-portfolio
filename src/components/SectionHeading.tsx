import React from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
}

// Pattern di intestazione uniforme per tutte le sezioni:
// occhiello piccolo (mono, ambra) + titolo forte in Deep Teal.
const SectionHeading = ({ eyebrow, title }: SectionHeadingProps) => (
  <header className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
      {eyebrow}
    </p>
    <h2 className="head-text mt-3">{title}</h2>
    <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
  </header>
)

export default SectionHeading
