import type { Metadata } from 'next';
import './globals.css';
import ClientEnhancements from '@/components/ClientEnhancements';

const description =
  'Ripperdoc designs digital augmentations — AI, intelligent systems and automation — that expand what people and teams can do. Empowerment, not replacement.';

export const metadata: Metadata = {
  metadataBase: new URL('https://ripperdoc.ai'),
  title: 'Ripperdoc — Human First. Intelligence Amplified.',
  description,
  applicationName: 'Ripperdoc',
  openGraph: {
    type: 'website',
    siteName: 'Ripperdoc',
    title: 'Ripperdoc — Human First. Intelligence Amplified.',
    description,
    url: 'https://ripperdoc.ai',
    images: [{ url: '/assets/img/hero.jpg', width: 1559, height: 1009, alt: 'Ripperdoc' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ripperdoc — Human First. Intelligence Amplified.',
    description,
    images: ['/assets/img/hero.jpg']
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ripperdoc.ai/#org',
      name: 'Ripperdoc',
      url: 'https://ripperdoc.ai',
      slogan: 'Human First. Intelligence Amplified.',
      description,
      knowsAbout: [
        'Artificial Intelligence',
        'Automation',
        'Knowledge systems',
        'Software',
        'Infrastructure'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ripperdoc.ai/#website',
      name: 'Ripperdoc',
      url: 'https://ripperdoc.ai',
      publisher: { '@id': 'https://ripperdoc.ai/#org' },
      inLanguage: ['no', 'en', 'pl']
    }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        {children}
        <ClientEnhancements />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
