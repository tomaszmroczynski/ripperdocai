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
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDict(lang);
  return {
    metadataBase: new URL('https://ripperdoc.ai'),
    title: 'Ripperdoc — Human First. Intelligence Amplified.',
    description: d['hero.lede'],
    alternates: {
      canonical: '/' + lang,
      languages: { no: '/no', en: '/en', pl: '/pl' }
    }
  };
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body>
        {children}
        <ClientEnhancements />
      </body>
    </html>
  );
}
