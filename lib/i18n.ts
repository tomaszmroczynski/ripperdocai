import no from '@/messages/no.json';
import en from '@/messages/en.json';
import pl from '@/messages/pl.json';

export const locales = ['no', 'en', 'pl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'no';

const dicts: Record<Locale, Record<string, string>> = { no, en, pl };

export function getDict(locale: string): Record<string, string> {
  return dicts[(locale as Locale)] ?? dicts[defaultLocale];
}
