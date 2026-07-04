// Configurazione SEO centralizzata: modifica QUI i valori (in primis `url`)
// e si aggiornano automaticamente metadati, sitemap, robots e dati strutturati.
//
// Nota: l'H1 in pagina resta emozionale ("Soluzioni digitali progettate
// intorno al tuo lavoro"), mentre title e description lavorano per Google
// con le query reali che i clienti cercano.

export const siteConfig = {
  // IMPORTANTE: dominio reale di produzione (senza slash finale).
  url: 'https://nicolasolazzo.com',
  name: 'Nicola Solazzo',
  title: 'Nicola Solazzo — Digital Solutions Developer | Web App su misura per PMI e Startup',
  description:
    'Soluzioni digitali progettate intorno al tuo lavoro: sviluppo web app su misura, automazione dei processi e consulenza digitale per PMI e startup. Parliamo del tuo progetto.',
  // Immagine social 1200x658 in JPEG (ottimizzata, ~244KB).
  ogImage: '/OG-image-card.jpg',
  locale: 'it_IT',
  linkedin: 'https://www.linkedin.com/in/nicolasolazzo/',
  keywords: [
    'Nicola Solazzo',
    'Digital Solutions Developer',
    'sviluppo web app per aziende',
    'consulente digitale PMI',
    'software su misura',
    'gestionale su misura',
    'automazione processi aziendali',
    'sviluppo siti web professionali',
    'integrazione AI per aziende',
    'consulente web',
    'sviluppo web app',
    'Full Stack Developer',
    'Vue.js',
    'Nuxt 3',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
  ],
} as const
