import React from 'react'
import {store}  from "../store/store";

const About = () => {
  const about = store.about
  return (
    <div className="flex flex-wrap items-center justify-center space-y-4">
       <span className="text-justify min-w-44 w-[800px] mx-auto">{ about }</span>
       <span className="text-justify min-w-44 w-[800px] mx-auto">
        <a className="text-yellow-400 cursor-pointer" href="/contact">Contattami</a> e insieme valuteremo la fattibilità e la realizzazione del tuo progetto.
        Sono sicuro che potremo trovare la soluzione migliore per te.
       </span>
    </div>
  )
}

export default About