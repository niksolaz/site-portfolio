'use client'
import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'

type Astronaut3DProps = {
  theme: boolean
}

const MAX_TILT = 16

export default function Astronaut3D({ theme }: Astronaut3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = containerRef.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    setTilt({
      rotateX: -(y - 0.5) * 2 * MAX_TILT,
      rotateY: (x - 0.5) * 2 * MAX_TILT,
    })
    setGlare({ x: x * 100, y: y * 100 })
  }, [])

  const handlePointerEnter = useCallback(() => setActive(true), [])

  const handlePointerLeave = useCallback(() => {
    setActive(false)
    setTilt({ rotateX: 0, rotateY: 0 })
    setGlare({ x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="astro3d-stage mx-auto mb-4 w-[280px] max-w-full lg:mb-10 lg:w-[380px]"
      style={{ perspective: '1000px' }}
    >
      <div
        className="astro3d-float relative aspect-square will-change-transform"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: active ? 'transform 120ms ease-out' : 'transform 600ms ease-out',
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            transform: 'translateZ(-40px) scale(0.85)',
            background: theme
              ? 'radial-gradient(circle, rgba(56,189,248,0.45), transparent 70%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.35), transparent 70%)',
          }}
        />

        <Image
          src={theme ? '/astrox-sun.webp' : '/astrox.webp'}
          alt="Astronaut Hero Image"
          width={380}
          height={380}
          priority
          draggable={false}
          className="pointer-events-none relative select-none rounded-full shadow-lg shadow-sky-500/20"
          style={{ transform: 'translateZ(50px)' }}
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            transform: 'translateZ(60px)',
            opacity: active ? 1 : 0,
            transition: 'opacity 300ms ease-out',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.35), transparent 55%)`,
            mixBlendMode: 'soft-light',
          }}
        />
      </div>
    </div>
  )
}
