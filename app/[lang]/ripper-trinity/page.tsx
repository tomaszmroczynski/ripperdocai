import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type RT = {
  eyebrow: string;
  title: string;
  intro: string[];
  vizCap: string;
  stepsH: string;
  steps: string[];
  traceH: string;
  trace: string;
  ecoH: string;
  eco: string;
  ctaDiag: string;
  ctaSync: string;
};

const UI: Record<string, RT> = {
  no: {
    eyebrow: 'Konsept under arbeid — Ripper Trinity',
    title: 'Forsterket tenkning.',
    intro: [
      'Ripper Trinity er et rom for vanskelige beslutninger. Du sitter med to KI-stemmer — én tenker strukturelt, den andre kritisk — og du leder samtalen.',
      'Hvert utsagn stopper hos deg: du godkjenner, korrigerer, spør, avviser. Resultatet er ikke et «chat-svar», men ditt dokument: en plan, en beslutning, en syntese — med et spor av hvordan du kom dit.',
      'Ripper Trinity forsterker tenkningen din — den tenker ikke for deg. Stemmene gir råd og er uenige; beslutningen og det endelige forfatterskapet blir hos deg. Ingen autonomi i bakgrunnen, ingen «klikk og ferdig».'
    ],
    vizCap: 'Idémyldring — to stemmer, ett menneske i sentrum',
    stepsH: 'Slik fungerer det',
    steps: [
      'Sett temaet. Et spørsmål, en beslutning, en plan, en prompt — alt som krever ettertanke.',
      'Led rådet. To KI-stemmer svarer på hver endring; du modererer hver tur — godkjenn, korriger, spør, protester.',
      'Lukk med kunnskap. Syntesen og beslutningen som ditt dokument, med et sporbart resonnement.'
    ],
    traceH: 'Hvorfor sporet betyr noe',
    trace: 'Hver økt etterlater et reproduserbart, uforanderlig spor — hva som ble bestemt, hvor uenigheten var, hva som forble åpent. Det er prosessens hukommelse, ikke bare resultatet. Du vender tilbake til «hvorfor», ikke bare «hva».',
    ecoH: 'Plass i økosystemet',
    eco: 'RipperSync forsterker kroppen. Ripper Trinity forsterker tenkningen. Sammen, under Ripperdoc AI, utgjør de ett system for personlig forsterkning av mennesket.',
    ctaDiag: 'Se hva som bør forsterkes',
    ctaSync: 'Se RipperSync'
  },
  en: {
    eyebrow: 'Concept in progress — Ripper Trinity',
    title: 'Amplified thinking.',
    intro: [
      'Ripper Trinity is a space for hard decisions. You sit with two AI voices — one thinks structurally, the other critically — and you lead the conversation.',
      'Every statement stops with you: you approve, correct, question, reject. The result isn’t a “chat answer” but your document: a plan, a decision, a synthesis — with a record of how you got there.',
      'Ripper Trinity amplifies your thinking — it does not think for you. The voices advise and disagree; the decision and the final authorship stay with you. No background autonomy, no “click and done”.'
    ],
    vizCap: 'Brainstorm — two voices, one human at the centre',
    stepsH: 'How it works',
    steps: [
      'Set the topic. A question, a decision, a plan, a prompt — anything that needs thought.',
      'Lead the council. Two AI voices respond to each change; you moderate every turn — approve, correct, question, object.',
      'Close with knowledge. The synthesis and decision as your document, with an auditable trace of the reasoning.'
    ],
    traceH: 'Why the trace matters',
    trace: 'Every session leaves a reproducible, immutable record — what was decided, where the dispute was, what stayed open. It is the memory of the process, not just the result. You return to the “why”, not only the “what”.',
    ecoH: 'Place in the ecosystem',
    eco: 'RipperSync amplifies the body. Ripper Trinity amplifies thinking. Together, under Ripperdoc AI, they form one system of personal human augmentation.',
    ctaDiag: 'See what to amplify',
    ctaSync: 'Explore RipperSync'
  },
  pl: {
    eyebrow: 'Koncepcja w toku — Ripper Trinity',
    title: 'Wzmocnienie myślenia.',
    intro: [
      'Ripper Trinity to przestrzeń do trudnych decyzji. Siadasz z dwoma głosami AI — jeden myśli strukturalnie, drugi krytycznie — a Ty prowadzisz rozmowę.',
      'Każda wypowiedź zatrzymuje się przy Tobie: zatwierdzasz, poprawiasz, pytasz, odrzucasz. Efektem nie jest „odpowiedź z czata", tylko Twój dokument: plan, decyzja, synteza — z zapisem, jak do niej doszedłeś.',
      'Ripper Trinity wzmacnia Twoje myślenie — nie myśli za Ciebie. Głosy doradzają i się spierają; decyzję i autorstwo finału zachowujesz Ty. Żadnej autonomii w tle, żadnego „kliknij i gotowe".'
    ],
    vizCap: 'Burza mózgów — dwa głosy, jeden człowiek w centrum',
    stepsH: 'Jak to działa',
    steps: [
      'Postaw temat. Pytanie, decyzja, plan, prompt — cokolwiek wymaga namysłu.',
      'Prowadź radę. Dwa głosy AI odpowiadają na zmianę; Ty moderujesz każdą turę — zgoda, korekta, pytanie, sprzeciw.',
      'Zamknij wiedzą. Synteza i decyzja jako Twój dokument, z audytowalnym śladem rozumowania.'
    ],
    traceH: 'Dlaczego ślad ma znaczenie',
    trace: 'Każda sesja zostawia odtwarzalny, niezmienialny zapis — co ustalono, gdzie był spór, co zostało otwarte. To pamięć procesu, nie tylko wynik. Wracasz do „dlaczego", nie tylko do „co".',
    ecoH: 'Miejsce w ekosystemie',
    eco: 'RipperSync wzmacnia ciało. Ripper Trinity wzmacnia myślenie. Razem, pod Ripperdoc AI, składają się na jeden system osobistego wzmocnienia człowieka.',
    ctaDiag: 'Sprawdź, co warto wzmocnić',
    ctaSync: 'Zobacz RipperSync'
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
    title: `Ripper Trinity — ${u.title}`,
    description: u.intro[0],
    alternates: {
      canonical: `/${lang}/ripper-trinity`,
      languages: {
        no: '/no/ripper-trinity',
        en: '/en/ripper-trinity',
        pl: '/pl/ripper-trinity'
      }
    }
  };
}

export default async function RipperTrinityPage({
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
          <p key={i} className={i === 0 ? 'rs-lede' : 'rs-lead'}>
            {p}
          </p>
        ))}

        <div className="rs-fig" style={{ padding: 0, background: 'transparent', border: 0 }}>
          <p className="rs-figcap">{u.vizCap}</p>
          <div className="viz-embed">
            <iframe src={`/brain-storm-3d.html?lang=${lang}`} title="Ripper Trinity — brainstorm" loading="lazy" />
          </div>
          <a className="viz-fs" href={`/brain-storm-3d.html?lang=${lang}`} target="_blank" rel="noopener">
            ↗ {u.vizCap}
          </a>
        </div>

        <section className="rs-section">
          <h2 className="rs-h2">{u.stepsH}</h2>
          <ol className="rs-steps">
            {u.steps.map((s, i) => (
              <li key={i}>
                <span className="rs-num">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rs-section">
          <h2 className="rs-h2">{u.traceH}</h2>
          <p className="rs-lead">{u.trace}</p>
        </section>

        <section className="rs-section">
          <h2 className="rs-h2">{u.ecoH}</h2>
          <p className="rs-lead">{u.eco}</p>
        </section>

        <div className="rs-cta">
          <Link className="btn btn-primary" href={`/${lang}/diagnostic`}>
            {u.ctaDiag}
          </Link>
          <Link className="btn btn-ghost" href={`/${lang}/ripper-sync`}>
            {u.ctaSync}
          </Link>
        </div>
      </div>
    </main>
  );
}
