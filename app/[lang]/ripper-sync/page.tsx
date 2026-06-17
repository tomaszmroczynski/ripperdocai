import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type RS = {
  eyebrow: string;
  title: string;
  intro: string[];
  stepsTitle: string;
  steps: string[];
  bioTitle: string;
  bioPoints: string[];
  ctaDiag: string;
  ctaScan: string;
};

const UI: Record<string, RS> = {
  no: {
    eyebrow: 'Konsept under arbeid — RipperSync',
    title: 'Kroppen er det første laget av intelligens.',
    intro: [
      'Det finnes ingen forsterket tanke uten en forsterket kropp. Trening bedrer sirkulasjonen, støtter nevroplastisitet og regulerer stress, søvn og konsentrasjon. Dette er ikke bare fysisk aktivitet. Det er et biologisk signal om hvordan et menneske tilpasser seg, restituerer og gjenvinner handlekraft.',
      'RipperSync samler dette signalet i ett bilde. Den kombinerer VR-økter, helsedata og restitusjonsrytmen din for å vise ikke ett enkelt resultat, men en trend: hvordan kroppen reagerer på belastning, når nervesystemet er overbelastet, når du bør øke intensiteten, og når det er bedre å bygge opp reservene.',
      'Helsedata er sensitive, derfor kjører RipperSync privat: på din egen maskinvare, på en NAS eller VPS, ikke i andres sky. Integrasjoner som Meta Quest 3, Oura og Withings via Health Connect er utgangspunktet. Flere kilder velges ut fra ditt konkrete utstyr og hvordan du faktisk jobber.',
      'KI-en overtar ikke treningen. Den måler, husker og foreslår. Du leder prosessen, og RipperSync hjelper deg å se mønsteret som ville vært vanskelig å følge med på manuelt.'
    ],
    stepsTitle: 'Slik fungerer det',
    steps: [
      'Du trener — for eksempel en VR-økt på Meta Quest 3, eller en klassisk aktivitet sporet av helseenheter.',
      'RipperSync henter data fra tilgjengelige kilder: puls, søvn, restitusjon, belastning, økthistorikk og andre signaler, avhengig av integrasjonene.',
      'Systemet organiserer dataene lokalt eller selvhostet, fordi helseinformasjon ikke bør behandles som vanlig markedsanalyse.',
      'Et privat KI-lag analyserer trenden, ikke bare én enkelt måling. Det ser etter endringer i handlekraft, overbelastning, regelmessighet og hvordan kroppen reagerer på belastning.',
      'Du får en anbefaling på et menneskelig språk: hva det ser, hva det kan bety, og hvilken beslutning som er verdt å vurdere.'
    ],
    bioTitle: 'Hvorfor kropp → sinn',
    bioPoints: [
      'Bedre sirkulasjon og BDNF («gjødsel» for nevroner) bygger nye forbindelser — raskere læring og hukommelse.',
      'Balansert dopamin, serotonin og noradrenalin, med lavere kortisol — konsentrasjon, humør og mindre stress.',
      'Dypere søvn og en sterkere prefrontal korteks — bedre beslutninger, selvkontroll og restitusjon.'
    ],
    ctaDiag: 'Se hva som bør forsterkes',
    ctaScan: 'Åpne 3D bio-scan'
  },
  en: {
    eyebrow: 'Concept in progress — RipperSync',
    title: 'The body is the first layer of intelligence.',
    intro: [
      'There is no amplified mind without an amplified body. Training improves circulation, supports neuroplasticity, and regulates stress, sleep and focus. This isn’t just physical activity. It’s a biological signal of how a person adapts, recovers and regains readiness to perform.',
      'RipperSync gathers that signal into one picture. It combines VR sessions, health data and your recovery rhythm to show not a single result but a trend: how the body responds to effort, when the nervous system is overloaded, when to raise intensity, and when to rebuild reserves.',
      'Health data is sensitive, so RipperSync runs privately: on your own hardware, on a NAS or VPS, not in someone else’s cloud. Integrations like Meta Quest 3, Oura and Withings via Health Connect are the starting point. Further sources are chosen for your specific hardware and how you actually work.',
      'The AI doesn’t take over the training. It measures, remembers and suggests. You lead the process, and RipperSync helps you see the pattern that would be hard to keep track of by hand.'
    ],
    stepsTitle: 'How it works',
    steps: [
      'You train — for example a VR session on Meta Quest 3, or a classic activity tracked by health devices.',
      'RipperSync pulls data from available sources: heart rate, sleep, recovery, load, session history and other signals, depending on the integrations.',
      'The system organizes the data locally or self-hosted, because health information shouldn’t be treated like ordinary marketing analytics.',
      'A private AI layer analyzes the trend, not just a single measurement. It looks for changes in readiness, overload, consistency and how the body responds to effort.',
      'You get a recommendation in plain language: what it sees, what it might mean, and what decision is worth considering.'
    ],
    bioTitle: 'Why body → mind',
    bioPoints: [
      'Better circulation and BDNF (the “fertilizer” for neurons) build new connections — faster learning and memory.',
      'Balanced dopamine, serotonin and noradrenaline, with lower cortisol — focus, mood and less stress.',
      'Deeper sleep and a stronger prefrontal cortex — better decisions, self-control and recovery.'
    ],
    ctaDiag: 'See what to amplify',
    ctaScan: 'Open the 3D bio-scan'
  },
  pl: {
    eyebrow: 'Koncepcja w toku — RipperSync',
    title: 'Ciało jest pierwszą warstwą inteligencji.',
    intro: [
      'Nie ma wzmocnionego umysłu bez wzmocnionego ciała. Trening poprawia krążenie, wspiera neuroplastyczność, reguluje stres, sen i koncentrację. To nie jest tylko aktywność fizyczna. To biologiczny sygnał, który mówi, jak człowiek się adaptuje, regeneruje i odzyskuje gotowość do działania.',
      'RipperSync zbiera ten sygnał w jeden obraz. Łączy sesje VR, dane zdrowotne i rytm regeneracji, żeby pokazać nie pojedynczy wynik, ale trend: jak ciało reaguje na wysiłek, kiedy układ nerwowy jest przeciążony, kiedy warto podnieść intensywność, a kiedy lepiej odbudować zasoby.',
      'Dane zdrowotne są wrażliwe, dlatego RipperSync działa prywatnie: na twoim sprzęcie, na NAS-ie albo VPS-ie, nie w cudzej chmurze. Integracje takie jak Meta Quest 3, Oura i Withings przez Health Connect są punktem wyjścia. Kolejne źródła dobieramy pod konkretny sprzęt i realny sposób pracy człowieka.',
      'AI nie przejmuje treningu. Mierzy, pamięta i podpowiada. Ty prowadzisz proces, a RipperSync pomaga zobaczyć wzorzec, którego trudno byłoby dopilnować ręcznie.'
    ],
    stepsTitle: 'Jak to funkcjonuje',
    steps: [
      'Człowiek wykonuje trening, na przykład sesję VR na Meta Quest 3 albo klasyczną aktywność monitorowaną przez urządzenia zdrowotne.',
      'RipperSync pobiera dane z dostępnych źródeł: tętno, sen, regeneracja, obciążenie, historia sesji i inne sygnały zależne od integracji.',
      'System porządkuje dane lokalnie lub self-hosted, ponieważ informacje zdrowotne nie powinny być traktowane jak zwykła analityka marketingowa.',
      'Prywatna warstwa AI analizuje trend, nie tylko pojedynczy pomiar. Szuka zmian w gotowości, przeciążeniu, regularności i reakcji organizmu na wysiłek.',
      'Użytkownik dostaje rekomendację w ludzkim języku: co widać, co może oznaczać i jaką decyzję warto rozważyć.'
    ],
    bioTitle: 'Dlaczego ciało → umysł',
    bioPoints: [
      'Lepsze ukrwienie i BDNF („nawóz" dla neuronów) budują nowe połączenia — szybsze uczenie i pamięć.',
      'Zrównoważona dopamina, serotonina i noradrenalina, niższy kortyzol — koncentracja, nastrój i mniej stresu.',
      'Głębszy sen i silniejsza kora przedczołowa — lepsze decyzje, samokontrola i regeneracja.'
    ],
    ctaDiag: 'Sprawdź, co warto wzmocnić',
    ctaScan: 'Otwórz bio-skan 3D'
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
    title: `RipperSync — ${u.title}`,
    description: u.intro[0],
    alternates: {
      canonical: `/${lang}/ripper-sync`,
      languages: {
        no: '/no/ripper-sync',
        en: '/en/ripper-sync',
        pl: '/pl/ripper-sync'
      }
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
      <div className="wrap rs-wrap">
        <Link className="rs-back" href={`/${lang}`}>
          ← Ripperdoc
        </Link>
        <div className="sec-eyebrow">{u.eyebrow}</div>
        <h1 className="rs-title">{u.title}</h1>

        {u.intro.map((p, i) => (
          <p key={i} className="rs-lead">
            {p}
          </p>
        ))}

        <h2 className="rs-h2">{u.stepsTitle}</h2>
        <ol className="rs-steps">
          {u.steps.map((s, i) => (
            <li key={i}>
              <span className="rs-num">{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <h2 className="rs-h2">{u.bioTitle}</h2>
        <ul className="rs-bio">
          {u.bioPoints.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="rs-cta">
          <Link className="btn btn-primary" href={`/${lang}/diagnostic`}>
            {u.ctaDiag}
          </Link>
          <a className="btn btn-ghost" href={`/bio-scan-3d.html?lang=${lang}`} target="_blank" rel="noopener">
            {u.ctaScan}
          </a>
        </div>
      </div>
    </main>
  );
}
