'use client'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
})

type Hero3DProps = {
  open: boolean
  onToggle: () => void
}

export default function Hero3D({ open, onToggle }: Hero3DProps) {
  return (
    <div className="mx-auto -mb-4 h-[320px] w-full max-w-[1280px] lg:-mb-10 lg:h-[640px]">
      <HeroScene open={open} onToggle={onToggle} />
    </div>
  )
}
