import type { Metadata } from 'next'
import AboutView from '../../components/AboutView'
import { siteConfig } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Chi sono — Nicola Solazzo',
  description:
    'Sviluppatore e consulente digitale: percorso, approccio e stack tecnologico di Nicola Solazzo. Le migliori soluzioni digitali nascono dalla comprensione del tuo lavoro.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'profile',
    url: `${siteConfig.url}/about`,
    title: 'Chi sono — Nicola Solazzo',
    description:
      'Sviluppatore e consulente digitale: percorso, approccio e stack tecnologico di Nicola Solazzo.',
    images: [{ url: siteConfig.ogImage, width: 1200, height: 658, alt: siteConfig.name }],
  },
}

export default function AboutPage() {
  return <AboutView />
}
