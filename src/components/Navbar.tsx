'use client'
import Link from 'next/link'
import { store } from '../store/store'
import type { Locale } from '../types'

interface NavbarProps {
  local: Locale
}

const Navbar = ({ local }: NavbarProps) => {
  return (
    <div className="fixed top-0 z-10 max-w-5xl w-full flex items-center justify-between font-mono text-sm px-4 backdrop-blur py-4">
      <Link href="/" className="text-gray-300 text-xs lg:text-sm uppercase">
        Nicola Solazzo &gt;<span className="animate-pulse">_</span>
      </Link>
      <div className="flex items-center justify-between space-x-2">
        <Link href="/contact" className="text-gray-300 hover:text-sky-600 cursor-pointer text-xs lg:text-sm">
          {store.i18n.navContactLink[local]}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
