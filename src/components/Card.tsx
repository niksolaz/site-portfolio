import React from 'react'

interface CardProps {
  title: string
  text: string
}

const Card = ({title, text}: CardProps) => {
  return (
    <div className="p-5 bg-white/60 border border-b-4 border-r-4 border-primary/20 rounded-lg w-72 min-h-56 space-y-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <h2 className="text-center font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{title}</h2>
        <p className="text-ink/80">{text}</p>
    </div>
  )
}

export default Card