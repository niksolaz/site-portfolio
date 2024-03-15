'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from "next/image";

const Navbar = () => {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    if (theme) {
      document.body.classList.add('dark-theme');
      document.getElementById('theme-switcher').classList.remove('icon-moon');
      document.getElementById('theme-switcher').classList.add('icon-sun');
    } else {
      document.body.classList.remove('dark-theme');
      document.getElementById('theme-switcher').classList.remove('icon-sun');
      document.getElementById('theme-switcher').classList.add('icon-moon');
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(!theme)
  }
  return (
    <>
      <div className="fixed top-0 z-10 max-w-5xl w-full flex items-center justify-between font-mono text-sm px-10 bg-transaprent">
          <Link href="/" className="py-8 backdrop-blur-2xl text-yellow-400">
          NIXO &gt;<span className="animate-pulse">_</span>
          </Link>
          <div className="flex items-center justify-between space-x-2">
            <Link href="/contact" className="py-8 backdrop-blur-2xl text-yellow-400">
                CONTACT
            </Link>
            <button onClick={toggleTheme}>
            <Image
                id="theme-switcher"
                className="relative rounded-full"
                src="/theme.svg"
                alt="theme light/dark mode switcher"
                width={20}
                height={20}
                priority
                />
            </button>
          </div>
      </div>
    </>
  )
}

export default Navbar