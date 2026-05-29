'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = ({local}: {local: string}) => {
  const localLink: {en: string, it: string, es: string, fr: string} = {
    en: 'CONTACT ME',
    it: 'CONTATTAMI',
    es: 'CONTACTAME',
    fr: 'CONTACTEZ-MOI'
  }
  return (
    <>
      <div className="fixed top-0 z-10 max-w-5xl w-full flex items-center justify-between font-mono text-sm px-4 backdrop-blur py-4">
          <Link href="/" className="text-gray-300 text-xs lg:text-sm uppercase">
          Nicola Solazzo &gt;<span className="animate-pulse">_</span>
          </Link>
          <div className="flex items-center justify-between space-x-2" >
            <Link href="/contact" className="text-gray-300 text-xs lg:text-sm">
              {localLink[local as keyof typeof localLink]}
            </Link>
          </div>
      </div>
    </>
  )
}

export default Navbar