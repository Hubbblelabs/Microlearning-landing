import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Microlearning - AI-Powered Training for Frontline Workers',
    short_name: 'Microlearning',
    description: 'Train 250M+ frontline workers with AI-powered microlearning via WhatsApp & SMS',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#14b8a6',
    orientation: 'portrait-primary',
    categories: ['education', 'business', 'productivity'],
    lang: 'en-IN',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
