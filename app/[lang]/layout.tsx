import type { Metadata } from 'next';
import '../globals.css';
import { locales, getDict } from '@/lib/i18n';
import ClientEnhancements from '@/components/ClientEnhancements';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const d = getDict(params.lang);
  return {
    metadataBase: new URL('https://ripperdoc.ai'),
    title: 'Ripperdoc — Human First. Intelligence Amplified.',
    description: d['hero.lede'],
    alternates: {
      canonical: '/' + params.lang,
      languages: { no: '/no', en: '/en', pl: '/pl' }
    }
  };
}

export default function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>
        {children}
        <ClientEnhancements />
      </body>
    </html>
  );
}
