import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paperstery Publishing', 
    short_name: 'Paperstery',
    description: 'Independent publishing company helping creatives, professionals, and organizations produce world-class books and legacies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf8ff',
    theme_color: '#32007a',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}