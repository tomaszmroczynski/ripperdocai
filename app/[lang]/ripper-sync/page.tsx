import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type RS = {
  eyebrow: string;
  title: string;
  lede: string;
  whatH: string;
  what: string;
  whyH: string;
  why: string[];
  coachH: string;
  coach: string;
  techH: string;
  tech: string;
  ctaDiag: string;
  ctaTrinity: string;
};

const INTEGR = ['Meta Quest 3', 'Apple Watch', 'Garmin', 'Polar', 'Whoop', 'Oura', 'Withings', 'Fitbit', 'Suunto', 'Wahoo', 'Zwift', 'Strava', 'Health Connect'];

const UI: Record<string, RS> = {
  no: {
    eyebrow: 'Testprogram i gang — RipperSync',
    title: 'Du kan ikke forsterke sinnet mens du ignorerer kroppen.',
    lede: 'Trening påvirker sirkulasjon, konsentrasjon, søvn og evnen til å lære. Det er et signal om hvordan du fungerer, restituerer og gjenvinner handlekraft.',
    whatH: 'Hva det er',
    what: 'RipperSync samler signaler fra enhetene som allerede måler kroppen din, og en privat KI-coach gjør dem om til en trend du faktisk kan bruke. Den trener ikke for deg — beslutningen blir hos mennesket.',
    whyH: 'Hvorfor kroppen former sinnet',
    why: [
      'Hjertet pumper mer blod — mer oksygen når hjernen, og konsentrasjonen kommer lettere tilbake.',
      'Innsats øker BDNF — hjernen danner og styrker forbindelser lettere (læring, hukommelse).',
      'Bevegelse regulerer dopamin, serotonin og kortisol — motivasjon, humør og selvkontroll.',
      'Søvn lukker syklusen — hjernen ordner minner og følelser, og handlekraften kommer tilbake.'
    ],
    coachH: 'Coach og selvmotivasjon',
    coach: 'Du snakker med coachen om uken, en plan eller et fall i energi. Den husker historikken, oppdager mønstre og viser raske bevis på fremgang — motivasjon bygd på fakta, ikke på disiplin alene.',
    techH: 'Det tekniske laget',
    tech: 'Helsedata er sensitive, derfor kjører RipperSync på privat infrastruktur — på din egen maskinvare, en server eller en dedikert enhet. Uten å flyttes til andres sky.',
    ctaDiag: 'Se hva som bør forsterkes',
    ctaTrinity: 'Se Ripper Trinity'
  },
  en: {
    eyebrow: 'Test program live — RipperSync',
    title: 'You can’t amplify the mind while ignoring the body.',
    lede: 'Training affects circulation, focus, sleep and the ability to learn. It’s a signal of how you perform, recover and regain readiness.',
    whatH: 'What it is',
    what: 'RipperSync collects signals from the devices already measuring your body, and a private AI coach turns them into a trend you can actually use. It doesn’t train for you — the decision stays with the person.',
    whyH: 'Why the body shapes the mind',
    why: [
      'The heart pumps more blood — more oxygen reaches the brain, and focus returns more easily.',
      'Effort raises BDNF — the brain forms and strengthens connections more easily (learning, memory).',
      'Movement regulates dopamine, serotonin and cortisol — motivation, mood and self-control.',
      'Sleep closes the cycle — the brain orders memories and emotions, and readiness returns.'
    ],
    coachH: 'Coach and self-motivation',
    coach: 'You talk to the coach about the week, a plan or a drop in energy. It remembers your history, spots patterns and surfaces quick evidence of progress — motivation built on facts, not on discipline alone.',
    techH: 'The technical layer',
    tech: 'Health data is sensitive, so RipperSync runs on private infrastructure — on your own hardware, a server or a dedicated device. Without moving it to someone else’s cloud.',
    ctaDiag: 'See what to amplify',
    ctaTrinity: 'Explore Ripper Trinity'
  },
  pl: {
    eyebrow: 'Program testowy uruchomiony — RipperSync',
    title: 'Nie da się wzmacniać umysłu, ignorując ciało.',
    lede: 'Trening wpływa na krążenie, koncentrację, sen i zdolność uczenia się. To sygnał o tym, jak działasz, regenerujesz się i odzyskujesz gotowość.',
    whatH: 'Czym jest',
    what: 'RipperSync zbiera sygnały z urządzeń, które już mierzą ciało, a prywatny AI coach zamienia je w trend, który realnie wykorzystasz. Nie ćwiczy za ciebie — decyzja zostaje przy człowieku.',
    whyH: 'Dlaczego ciało wpływa na umysł',
    why: [
      'Serce pompuje więcej krwi — do mózgu trafia więcej tlenu, łatwiej wraca koncentracja.',
      'Wysiłek zwiększa BDNF — mózg łatwiej tworzy i wzmacnia połączenia (uczenie, pamięć).',
      'Ruch reguluje dopaminę, serotoninę i kortyzol — motywacja, nastrój, samokontrola.',
      'Sen domyka cykl — mózg porządkuje pamięć i emocje, wraca gotowość.'
    ],
    coachH: 'Coach i samomotywacja',
    coach: 'Z coachem rozmawiasz o tygodniu, planie albo spadku energii. Pamięta historię, wykrywa wzorce i pokazuje szybkie dowody postępu — motywacja oparta na faktach, nie na samej dyscyplinie.',
    techH: 'Warstwa techniczna',
    tech: 'Dane zdrowotne są wrażliwe, dlatego RipperSync działa w prywatnej infrastrukturze — na twoim sprzęcie, serwerze albo dedykowanym urządzeniu. Bez przenoszenia do cudzej chmury.',
    ctaDiag: 'Sprawdź, co warto wzmocnić',
    ctaTrinity: 'Zobacz Ripper Trinity'
  }
};

function HeroTitle({ text }: { text: string }) {
  const parts = text.trim().split(' ');
  const last = parts.length > 1 ? parts.pop() : '';
  return (
    <h1 className="phero-title">
      {parts.join(' ')} {last && <span className="amp">{last}</span>}
    </h1>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  return {
    title: `RipperSync — ${u.title}`,
    description: u.lede,
    alternates: {
      canonical: `/${lang}/ripper-sync`,
      languages: { no: '/no/ripper-sync', en: '/en/ripper-sync', pl: '/pl/ripper-sync' }
    }
  };
}

export default async function RipperSyncPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  return (
    <main className="rs-page">
      <canvas data-neural-field data-sparks="2" data-density="0.00006" data-speed="0.1" className="bg-field" />
      <div className="wrap">
        <Link className="rs-back" href={`/${lang}`}>
          ← Ripperdoc
        </Link>
        <section className="phero">
          <div className="phero-copy">
            <div className="sec-eyebrow">{u.eyebrow}</div>
            <HeroTitle text={u.title} />
            <p className="phero-sub">{u.lede}</p>
            <div className="phero-lockup">Human First · Intelligence Amplified</div>
            <div className="phero-cta">
              <Link className="btn btn-primary" href={`/${lang}/diagnostic`}>{u.ctaDiag}</Link>
              <Link className="btn btn-ghost" href={`/${lang}/ripper-trinity`}>{u.ctaTrinity}</Link>
            </div>
          </div>
          <div className="phero-art">
            <iframe src={`/bio-scan-3d.html?lang=${lang}&embed=1`} title="RipperSync — bio-scan" loading="lazy" />
          </div>
        </section>
      </div>

      <div className="wrap rs-wrap">
        <section className="rs-section">
          <h2 className="rs-h2">{u.whatH}</h2>
          <p className="rs-lead">{u.what}</p>
        </section>

        <section className="rs-section">
          <h2 className="rs-h2">{u.whyH}</h2>
          <ul className="rs-bio">
            {u.why.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="rs-section">
          <h2 className="rs-h2">{u.coachH}</h2>
          <p className="rs-lead">{u.coach}</p>
        </section>

        <section className="rs-section">
          <h2 className="rs-h2">{u.techH}</h2>
          <p className="rs-lead">{u.tech}</p>
          <div className="rs-chips" style={{ marginTop: 18 }}>
            {INTEGR.map((c) => (
              <span key={c} className="rs-chip">{c}</span>
            ))}
          </div>
        </section>

        <div className="rs-cta">
          <Link className="btn btn-primary" href={`/${lang}/diagnostic`}>{u.ctaDiag}</Link>
          <Link className="btn btn-ghost" href={`/${lang}/ripper-trinity`}>{u.ctaTrinity}</Link>
        </div>
      </div>
    </main>
  );
}
