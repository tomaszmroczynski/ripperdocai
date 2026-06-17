import type { Metadata } from 'next';
import { locales, getDict } from '@/lib/i18n';
import LangHtml from '@/components/LangHtml';
import Nav from '@/components/Nav';

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
    <>
      <LangHtml lang={lang} />
      <Nav lang={lang} />
      {children}
    </>
  );
}
