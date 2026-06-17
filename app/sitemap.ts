import type { MetadataRoute } from 'next';

const base = 'https://ripperdoc.ai';
const locales = ['no', 'en', 'pl'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = {
    no: `${base}/no`,
    en: `${base}/en`,
    pl: `${base}/pl`
  };
  return locales.map((l) => ({
    url: `${base}/${l}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: l === 'no' ? 1 : 0.8,
    alternates: { languages }
  }));
}
