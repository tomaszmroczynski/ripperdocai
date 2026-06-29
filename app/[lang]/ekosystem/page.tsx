import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Card = {
  level: string;
  name: string;
  line: string;
  status: string;
  icon: string;
  href?: string;
  cta?: string;
};
type Eco = {
  eyebrow: string;
  title: string;
  lead: string[];
  cards: Card[];
};

const UI: Record<string, Eco> = {
  no: {
    eyebrow: 'Økosystem',
    title: 'Ett system. Hele mennesket.',
    lead: [
      'Ripperdoc bygger ikke enkeltverktøy. Det bygger ett system som forsterker mennesket på tre nivåer: kropp, tenkning og handling.',
      'På hvert nivå er prinsippet det samme — teknologien gir råd og utfører, men beslutningen, kontrollen og forfatterskapet blir hos mennesket. Forsterkning, ikke automatisering.'
    ],
    cards: [
      { level: 'Kropp', name: 'RipperSync', line: 'Signal fra enhetene dine gjort om til en trend: handlekraft, restitusjon, energi. En privat KI-coach.', status: 'Testprogram i gang', icon: 'heart-pulse', href: 'ripper-sync', cta: 'Se RipperSync' },
      { level: 'Tenkning', name: 'Ripper Trinity', line: 'Et moderert råd: to KI-stemmer, du leder. Beslutninger med et sporbart resonnement.', status: 'Testprogram i gang', icon: 'brain', href: 'ripper-trinity', cta: 'Se Ripper Trinity' },
      { level: 'Handling', name: 'Ripper Task Force', line: 'En oppgavestyrke av modeller utfører oppgaver i CLI — under menneskelig moderering og kontroll. Ikke en autonom løkke.', status: 'Under arbeid', icon: 'terminal' }
    ]
  },
  en: {
    eyebrow: 'Ecosystem',
    title: 'One system. The whole human.',
    lead: [
      'Ripperdoc doesn’t build single tools. It builds one system that amplifies the human on three levels: body, thinking and action.',
      'At each level the principle is the same — technology advises and executes, but the decision, the control and the authorship stay with the person. Augmentation, not automation.'
    ],
    cards: [
      { level: 'Body', name: 'RipperSync', line: 'The signal from your devices turned into a trend: readiness, recovery, energy. A private AI coach.', status: 'Test program live', icon: 'heart-pulse', href: 'ripper-sync', cta: 'Explore RipperSync' },
      { level: 'Thinking', name: 'Ripper Trinity', line: 'A moderated council: two AI voices, you lead. Decisions with an auditable trace of the reasoning.', status: 'Test program live', icon: 'brain', href: 'ripper-trinity', cta: 'Explore Ripper Trinity' },
      { level: 'Action', name: 'Ripper Task Force', line: 'A task force of models executes tasks in the CLI — under human moderation and control. Not an autonomous loop.', status: 'In preparation', icon: 'terminal' }
    ]
  },
  pl: {
    eyebrow: 'Ekosystem',
    title: 'Jeden system. Cały człowiek.',
    lead: [
      'Ripperdoc nie buduje pojedynczych narzędzi. Buduje jeden system, który wzmacnia człowieka na trzech poziomach: ciała, myślenia i działania.',
      'Na każdym z nich zasada jest ta sama — technologia doradza i wykonuje, ale decyzja, kontrola i autorstwo zostają przy człowieku. Augmentacja, nie automatyzacja.'
    ],
    cards: [
      { level: 'Ciało', name: 'RipperSync', line: 'Sygnał z urządzeń zamieniony w trend: gotowość, regeneracja, energia. Prywatny AI coach.', status: 'Program testowy uruchomiony', icon: 'heart-pulse', href: 'ripper-sync', cta: 'Zobacz RipperSync' },
      { level: 'Myślenie', name: 'Ripper Trinity', line: 'Moderowana rada: dwa głosy AI, Ty prowadzisz. Decyzje z audytowalnym śladem rozumowania.', status: 'Program testowy uruchomiony', icon: 'brain', href: 'ripper-trinity', cta: 'Zobacz Ripper Trinity' },
      { level: 'Działanie', name: 'Ripper Task Force', line: 'Grupa zadaniowa modeli realizuje zadania w CLI — pod moderacją i kontrolą człowieka. Nie autonomiczna pętla.', status: 'W przygotowaniu', icon: 'terminal' }
    ]
  }
};

const IMG: Record<string, string> = {
  RipperSync: '/assets/img/ripper-sync.png',
  'Ripper Trinity': '/assets/img/ripper-trinity.png',
  'Ripper Task Force': '/assets/img/ripper-task-force.png'
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  return {
    title: `Ripperdoc — ${u.title}`,
    description: u.lead[0],
    alternates: {
      canonical: `/${lang}/ekosystem`,
      languages: { no: '/no/ekosystem', en: '/en/ekosystem', pl: '/pl/ekosystem' }
    }
  };
}

export default async function EkosystemPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  return (
    <main className="eco">
      <div className="wrap">
        <Link className="rs-back" href={`/${lang}`}>
          ← Ripperdoc
        </Link>
        <div className="sec-eyebrow">{u.eyebrow}</div>
        <h1 className="eco-title">{u.title}</h1>
        {u.lead.map((p, i) => (
          <p key={i} className="eco-lead">
            {p}
          </p>
        ))}
        <div className="eco-lockup">Human First · Intelligence Amplified</div>

        <div className="eco-grid">
          {u.cards.map((c) => {
            const body = (
              <div className="eco-card-body">
                <div className="eco-level">{c.level}</div>
                <h2 className="eco-name">{c.name}</h2>
                <p className="eco-line">{c.line}</p>
                <div className="eco-foot">
                  <span className="eco-status">{c.status}</span>
                  {c.href && <span className="eco-go">{c.cta} →</span>}
                </div>
              </div>
            );
            const style = { backgroundImage: `url(${IMG[c.name] ?? ''})` };
            return c.href ? (
              <Link key={c.name} className="eco-card is-link" href={`/${lang}/${c.href}`} style={style}>
                {body}
              </Link>
            ) : (
              <article key={c.name} className="eco-card is-soon" style={style}>
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
