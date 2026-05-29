'use client'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
})

type Hero3DProps = {
  theme: boolean
}

export default function Hero3D({ theme }: Hero3DProps) {
  return (
    <div className="mx-auto -mb-4 h-[320px] w-full max-w-[680px] lg:-mb-10 lg:h-[480px]">
      <HeroScene theme={theme} />
    </div>
  )
}
