import React from 'react'

interface CardProps {
  title: string
  text: string
}

const Card = ({title, text}: CardProps) => {
  return (
    <div className="p-5 border border-b-4 border-r-4 border-gray-200 rounded-lg w-72 min-h-56 space-y-4">
        <h2 className="text-center font-bold text-xl bg-gradient-to-r from-yellow-600 to-gray-400 bg-clip-text">{title}</h2>
        <p>{text}</p>
    </div>
  )
}

export default Card