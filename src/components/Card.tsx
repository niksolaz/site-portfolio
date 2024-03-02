import React from 'react'

const Card = ({title, text, price}) => {
  return (
    <div className="p-5 border border-b-8 border-r-8 border-yellow-600 rounded-lg w-full min-h-44">
        <h2 className="text-yellow-400">{title}</h2>
        <p>{text}</p>
        <p>A partire da {price} €</p>
    </div>
  )
}

export default Card