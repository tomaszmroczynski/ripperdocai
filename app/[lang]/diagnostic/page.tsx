import Link from 'next/link';
import type { Metadata } from 'next';
import DiagnosticChat, { type DiagStrings } from '@/components/DiagnosticChat';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type PageStrings = DiagStrings & { eyebrow: string; title: string; sub: string };

const UI: Record<string, PageStrings> = {
  no: {
    eyebrow: 'Augmentasjonsdiagnose',
    title: 'La oss finne hva som bør forsterkes.',
    sub: 'En kort samtale: fortell hva du vil forbedre og hvilke problemer du vil løse. Til slutt får du en brief til godkjenning.',
    greeting:
      'Hei. Fortell hva du mest av alt vil forbedre, eller hvilket problem du vil løse. Jeg spør om én ting av gangen for å forstå det godt.',
    placeholder: 'Skriv svaret ditt…',
    send: 'Send',
    thinking: 'Tenker…',
    briefHint:
      'Se gjennom briefen over. Stemmer den, legg igjen e-posten din og godkjenn — en kopi går til Ripperdoc.',
    emailPlaceholder: 'Din e-post (for kontakt)',
    approve: 'Godkjenn og send',
    sending: 'Sender…',
    sentOk: 'Takk — briefen er godkjent og sendt. Vi tar kontakt.',
    notConfigured:
      'Agenten settes fortsatt opp. Bruk kontakt eller book en time — vi tar kontakt med deg.',
    tooLong:
      'Det er ganske mye — la oss fullføre live. Book en time, så går vi gjennom det sammen.',
    error: 'Noe gikk galt. Prøv igjen om et øyeblikk.'
  },
  en: {
    eyebrow: 'Augmentation diagnostic',
    title: "Let's find what to amplify.",
    sub: "A short conversation: tell me what you want to improve and which problems you want to solve. At the end you'll get a brief to approve.",
    greeting:
      "Hi. Tell me what you'd most like to improve, or what problem you want to solve. I'll ask one thing at a time to understand it well.",
    placeholder: 'Type your answer…',
    send: 'Send',
    thinking: 'Thinking…',
    briefHint:
      'Check the brief above. If it fits, leave your email and approve — a copy goes to Ripperdoc.',
    emailPlaceholder: 'Your email (for contact)',
    approve: 'Approve and send',
    sending: 'Sending…',
    sentOk: "Thank you — brief approved and sent. We'll be in touch.",
    notConfigured:
      "The agent is still being set up. Please use the contact or booking — we'll get back to you.",
    tooLong:
      "That's quite a lot — let's finish live. Book a session and we'll go through it together.",
    error: 'Something went wrong. Please try again in a moment.'
  },
  pl: {
    eyebrow: 'Diagnoza augmentacji',
    title: 'Sprawdźmy, co warto wzmocnić.',
    sub: 'Krótka rozmowa: opowiedz, co chcesz usprawnić i jakie problemy rozwiązać. Na końcu zobaczysz brief do akceptacji.',
    greeting:
      'Cześć. Powiedz, co najbardziej chciałbyś usprawnić albo jaki problem chcesz rozwiązać. Pytam po kolei, żeby dobrze to zrozumieć.',
    placeholder: 'Napisz odpowiedź…',
    send: 'Wyślij',
    thinking: 'Analizuję…',
    briefHint:
      'Sprawdź brief powyżej. Jeśli się zgadza, zostaw e-mail i zatwierdź — kopia trafi do Ripperdoc.',
    emailPlaceholder: 'Twój e-mail (do kontaktu)',
    approve: 'Zatwierdź i wyślij',
    sending: 'Wysyłam…',
    sentOk: 'Dziękujemy — brief zatwierdzony i przekazany. Odezwiemy się.',
    notConfigured:
      'Agent jest jeszcze konfigurowany. Skorzystaj z kontaktu lub umów sesję — wrócimy do ciebie.',
    tooLong:
      'To już sporo — najlepiej dokończmy na żywo. Umów sesję, a przejdziemy przez to razem.',
    error: 'Coś poszło nie tak. Spróbuj ponownie za chwilę.'
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  return {
    title: `${u.title} — Ripperdoc`,
    description: u.sub,
    alternates: {
      canonical: `/${lang}/diagnostic`,
      languages: {
        no: '/no/diagnostic',
        en: '/en/diagnostic',
        pl: '/pl/diagnostic'
      }
    }
  };
}

export default async function DiagnosticPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  return (
    <main className="diag-page">
      <canvas data-neural-field data-sparks="2" data-density="0.00006" data-speed="0.1" className="bg-field" />
      <div className="wrap diag-wrap">
        <Link className="diag-back" href={`/${lang}`}>
          ← Ripperdoc
        </Link>
        <div className="sec-eyebrow">{u.eyebrow}</div>
        <h1 className="diag-title">{u.title}</h1>
        <p className="sec-sub diag-sub">{u.sub}</p>
        <DiagnosticChat lang={lang} t={u} />
      </div>
    </main>
  );
}
