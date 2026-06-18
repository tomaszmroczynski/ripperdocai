import Link from 'next/link';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { isAuthed, COOKIE_NAME } from '@/lib/access';
import AccessGate from '@/components/AccessGate';

export const dynamic = 'force-dynamic';

type Exp = { period: string; role: string; org: string; detail: string };
type Edu = { period: string; school: string; what: string };
type Lab = { meta: string; title: string; text: string };
type Fact = { k: string; v: string };
type Dossier = {
  back: string;
  eyebrow: string;
  name: string;
  tagline: string;
  lead: string;
  turnH: string;
  turn: string[];
  expH: string;
  exp: Exp[];
  eduH: string;
  edu: Edu[];
  capH: string;
  capIntro: string;
  caps: string[];
  labsH: string;
  labsIntro: string;
  labs: Lab[];
  seekH: string;
  seek: string;
  facts: Fact[];
  contactH: string;
  contactText: string;
  cta: string;
};

// Language-neutral node visuals for the experiment cards (from the CV repo).
const LAB_VIS: { center: string; nodes: string[] }[] = [
  { center: 'AI', nodes: ['Input', 'Model A', 'Model B', 'Review'] },
  { center: 'RAG', nodes: ['Docs', 'Index', 'Search', 'Answer'] },
  { center: 'Flow', nodes: ['Research', 'Notes', 'Draft', 'Publish'] },
  { center: 'Form', nodes: ['Request', 'Context', 'Draft', 'Human'] },
  { center: 'Docs', nodes: ['File', 'Summary', 'Tags', 'Archive'] },
  { center: 'Watch', nodes: ['Run', 'Error', 'Signal', 'Action'] }
];

const UI: Record<string, Dossier> = {
  pl: {
    back: '← Ripperdoc',
    eyebrow: 'Dossier · Tomasz Mroczyński',
    name: 'Tomasz Mroczyński',
    tagline: 'Buduję rozwiązania, które wzmacniają człowieka.',
    lead: 'Wchodzę w technologię nie z dyplomu, lecz z potrzeby zbudowania czegoś od nowa — łącząc dwie dekady praktyki przy sieciach, systemach i wdrożeniach z tym, co buduję dziś: AI, automatyzacją i systemami self-hosted.',
    turnH: 'Punkt zwrotny',
    turn: [
      'Przez dwie dekady pracowałem na styku technologii i ludzi: sieci komputerowe, systemy bezpieczeństwa, wdrożenia, wsparcie techniczne. W 2025 zacząłem pracę jako kierowca ciężarówki i kończyłem kurs kategorii C.',
      'Miesiąc później poważny wypadek przy pracy zatrzymał tę ścieżkę. Zamiast się zatrzymać, potraktowałem to jako moment zmiany.',
      'Technologia i rozwiązywanie problemów ciągnęły mnie od dawna — ukończyłem bootcamp backend .NET w Noroff. Dziś wracam do tego świadomie: buduję projekty, automatyzacje i systemy oparte na AI, eksperymentuję z self-hosted, Dockerem i integracjami API. Uczę się przez działanie.'
    ],
    expH: 'Doświadczenie',
    exp: [
      { period: '03–04/2025', role: 'Kierowca ciężarówki', org: 'Transport Service AS', detail: 'Krótki rozdział zakończony wypadkiem przy pracy — początek świadomego zwrotu ku technologii.' },
      { period: '2013 – dziś', role: 'Dystrybucja', org: 'Amedia AS', detail: 'Stała praca przy dystrybucji, prowadzona równolegle z nauką technologii i własnymi projektami.' },
      { period: '2009 – 2011', role: 'Sprzedaż i wdrożenia', org: 'PTC Security Systems', detail: 'Wdrażanie systemów biometrycznej identyfikacji, pozyskiwanie klientów w sektorze publicznym i prywatnym, współpraca z programistami i koordynacja zespołu.' },
      { period: '2002 – 2012', role: 'Własna działalność', org: 'Complet Tomasz Mroczyński', detail: 'Instalacja i konfiguracja sieci komputerowych oraz serwis komputerowy.' },
      { period: '2002 – 2006', role: 'Sprzedaż i wsparcie techniczne', org: 'Strawford', detail: 'Wdrożenia CCTV, instalacja sieci LAN, IT helpdesk, serwis i szkolenia.' }
    ],
    eduH: 'Wykształcenie',
    edu: [
      { period: '2024 – 2025', school: 'Wright, Trafikkskole', what: 'Prawo jazdy kat. C z kwalifikacją wstępną (yrkessjåfør).' },
      { period: '2021 – 2022', school: 'Noroff — szkoła technologii i mediów cyfrowych', what: 'Backend Web Development (.NET).' },
      { period: '2002 – 2006', school: 'Uniwersytet Gdański', what: 'Ekonomia, specjalizacja: analityk.' }
    ],
    capH: 'Co potrafię',
    capIntro: 'Nie przedstawiam się jako ekspert. Pokazuję kierunek, w który realnie inwestuję czas i energię — tam, gdzie AI, automatyzacja i infrastruktura spotykają realny problem człowieka.',
    caps: ['ASP.NET', 'Next.js', 'React.js', 'Blazor', 'AI workflows', 'Automatyzacja', 'Self-hosted', 'Docker', 'Integracje API', 'RAG / bazy wiedzy', 'Modelowanie i druk 3D', 'Grafika'],
    labsH: 'Eksperymenty i koncepcje',
    labsIntro: 'Uczę się przez budowanie. To kierunki, które sprawdzam w praktyce — uczciwie nazwane: eksperyment, prototyp, koncepcja.',
    labs: [
      { meta: 'Eksperyment', title: 'Łączenie modeli AI', text: 'Rozbijam problem na kroki i dobieram do nich różne modele lub narzędzia, zamiast oczekiwać jednej idealnej odpowiedzi.' },
      { meta: 'Koncepcja', title: 'RAG i prywatna baza wiedzy', text: 'Sprawdzam, jak dokumenty i notatki zamienić w użyteczną bazę wiedzy, bez tracenia kontroli nad informacją.' },
      { meta: 'Prototyp', title: 'Workflow do treści i researchu', text: 'Buduję małe przepływy: od chaotycznych informacji do uporządkowanych notatek i pierwszego szkicu.' },
      { meta: 'Pomysł systemu', title: 'Asystent do zapytań i formularzy', text: 'AI przygotowuje strukturę i szkic odpowiedzi, ale ostateczna decyzja zostaje przy człowieku.' },
      { meta: 'Eksploracja', title: 'Porządkowanie dokumentów', text: 'Automatyczne streszczenia, tagi i priorytety — sens wyciągnięty z dokumentów bez utraty kontekstu.' },
      { meta: 'Koncepcja', title: 'Monitoring workflow i błędów', text: 'Obserwowanie automatyzacji, wykrywanie błędów i pokazywanie człowiekowi jasnego sygnału do reakcji.' }
    ],
    seekH: 'Czego szukam',
    seek: 'Szukam realnego kierunku w technologii — edukacji i pracy przy AI, automatyzacji i systemach. Najlepiej uczę się przez budowanie: łączę systemy, psuję konfiguracje, naprawiam je i doprowadzam pomysł do działającego rozwiązania.',
    facts: [
      { k: 'Lokalizacja', v: 'Norwegia (Eidsberg)' },
      { k: 'Języki', v: 'polski (ojczysty) · angielski B2 · norweski A2' },
      { k: 'Certyfikaty', v: 'prawo jazdy B96 i C' }
    ],
    contactH: 'Kontakt',
    contactText: 'Najłatwiej mailem — chętnie opowiem więcej i pokażę, co buduję.',
    cta: 'Pobierz CV (PDF)'
  },
  en: {
    back: '← Ripperdoc',
    eyebrow: 'Dossier · Tomasz Mroczyński',
    name: 'Tomasz Mroczyński',
    tagline: 'I build solutions that amplify people.',
    lead: 'I am moving into technology not from a diploma but from the need to build something anew — combining two decades of hands-on work with networks, systems and deployments with what I build today: AI, automation and self-hosted systems.',
    turnH: 'The turning point',
    turn: [
      'For two decades I worked at the meeting point of technology and people: computer networks, security systems, deployments, technical support. In 2025 I started work as a truck driver and was finishing my category C licence.',
      'A month later a serious workplace accident halted that path. Instead of freezing, I treated it as a moment of change.',
      'Technology and problem-solving had always pulled at me — I completed the backend .NET bootcamp at Noroff. Today I am returning to it consciously: I build projects, automations and AI-based systems, and experiment with self-hosted infrastructure, Docker and API integrations. I learn by doing.'
    ],
    expH: 'Experience',
    exp: [
      { period: '03–04/2025', role: 'Truck driver', org: 'Transport Service AS', detail: 'A short chapter ended by a workplace accident — the start of a conscious return to technology.' },
      { period: '2013 – present', role: 'Distribution', org: 'Amedia AS', detail: 'Steady distribution work, carried alongside learning technology and building my own projects.' },
      { period: '2009 – 2011', role: 'Sales & implementation', org: 'PTC Security Systems', detail: 'Implementing biometric identification systems, acquiring clients in the public and private sectors, working with programmers and coordinating the team.' },
      { period: '2002 – 2012', role: 'Own business', org: 'Complet Tomasz Mroczyński', detail: 'Installation and configuration of computer networks, and computer servicing.' },
      { period: '2002 – 2006', role: 'Sales & technical support', org: 'Strawford', detail: 'CCTV deployments, LAN installation, IT helpdesk, servicing and training.' }
    ],
    eduH: 'Education',
    edu: [
      { period: '2024 – 2025', school: 'Wright, Trafikkskole', what: 'Category C licence with professional driver qualification (yrkessjåfør).' },
      { period: '2021 – 2022', school: 'Noroff — School of Technology and Digital Media', what: 'Backend Web Development (.NET).' },
      { period: '2002 – 2006', school: 'University of Gdańsk', what: 'Economics, specialization: analyst.' }
    ],
    capH: 'What I can do',
    capIntro: 'I am not presenting myself as an expert. I am showing the direction I genuinely invest time and energy in — where AI, automation and infrastructure meet a real human problem.',
    caps: ['ASP.NET', 'Next.js', 'React.js', 'Blazor', 'AI workflows', 'Automation', 'Self-hosted', 'Docker', 'API integrations', 'RAG / knowledge bases', '3D modeling & printing', 'Graphic design'],
    labsH: 'Experiments & concepts',
    labsIntro: 'I learn by building. These are directions I test in practice — honestly labelled: experiment, prototype, concept.',
    labs: [
      { meta: 'Experiment', title: 'Connecting AI models', text: 'I break a problem into steps and match different models or tools to each, instead of expecting one perfect answer.' },
      { meta: 'Concept', title: 'RAG and a private knowledge base', text: 'I test how documents and notes can become a useful knowledge base without losing control over information.' },
      { meta: 'Prototype', title: 'Content & research workflow', text: 'I build small flows: from scattered information to structured notes and a first usable draft.' },
      { meta: 'System idea', title: 'Request & form assistant', text: 'AI prepares the structure and a draft response, but the final decision stays with the person.' },
      { meta: 'Exploration', title: 'Document organization', text: 'Automatic summaries, tags and priorities — meaning extracted from documents without losing context.' },
      { meta: 'Concept', title: 'Workflow & error monitoring', text: 'Observing automations, detecting errors and showing the person a clear signal for action.' }
    ],
    seekH: 'What I am looking for',
    seek: 'I am looking for a real direction in technology — education and work around AI, automation and systems. I learn best by building: connecting systems, breaking configurations, fixing them and taking an idea through to something that works.',
    facts: [
      { k: 'Location', v: 'Norway (Eidsberg)' },
      { k: 'Languages', v: 'Polish (native) · English B2 · Norwegian A2' },
      { k: 'Certificates', v: 'driving licence B96 & C' }
    ],
    contactH: 'Contact',
    contactText: 'Email is easiest — happy to tell you more and show what I build.',
    cta: 'Download CV (PDF)'
  },
  no: {
    back: '← Ripperdoc',
    eyebrow: 'Dossier · Tomasz Mroczyński',
    name: 'Tomasz Mroczyński',
    tagline: 'Jeg bygger løsninger som forsterker mennesker.',
    lead: 'Jeg går inn i teknologien ikke fra et diplom, men fra behovet for å bygge noe på nytt — og kombinerer to tiår med praktisk arbeid med nettverk, systemer og implementeringer med det jeg bygger i dag: AI, automatisering og self-hosted systemer.',
    turnH: 'Vendepunktet',
    turn: [
      'I to tiår jobbet jeg i møtet mellom teknologi og mennesker: datanettverk, sikkerhetssystemer, implementeringer, teknisk støtte. I 2025 startet jeg som lastebilsjåfør og fullførte førerkort klasse C.',
      'En måned senere stoppet en alvorlig arbeidsulykke den veien. I stedet for å stå stille, tok jeg det som et tidspunkt for endring.',
      'Teknologi og problemløsning har alltid trukket i meg — jeg fullførte backend .NET-bootcampen hos Noroff. I dag vender jeg tilbake til det bevisst: jeg bygger prosjekter, automatiseringer og AI-baserte systemer, og eksperimenterer med self-hosted infrastruktur, Docker og API-integrasjoner. Jeg lærer gjennom å gjøre.'
    ],
    expH: 'Erfaring',
    exp: [
      { period: '03–04/2025', role: 'Lastebilsjåfør', org: 'Transport Service AS', detail: 'Et kort kapittel avsluttet av en arbeidsulykke — starten på en bevisst retur til teknologi.' },
      { period: '2013 – nå', role: 'Distribusjon', org: 'Amedia AS', detail: 'Fast distribusjonsarbeid, ført parallelt med læring av teknologi og egne prosjekter.' },
      { period: '2009 – 2011', role: 'Salg og implementering', org: 'PTC Security Systems', detail: 'Implementering av biometriske identifikasjonssystemer, kundeakkvisisjon i offentlig og privat sektor, samarbeid med utviklere og koordinering av teamet.' },
      { period: '2002 – 2012', role: 'Egen virksomhet', org: 'Complet Tomasz Mroczyński', detail: 'Installasjon og konfigurasjon av datanettverk, samt datamaskinservice.' },
      { period: '2002 – 2006', role: 'Salg og teknisk støtte', org: 'Strawford', detail: 'CCTV-implementeringer, LAN-installasjon, IT-helpdesk, service og opplæring.' }
    ],
    eduH: 'Utdanning',
    edu: [
      { period: '2024 – 2025', school: 'Wright, Trafikkskole', what: 'Førerkort klasse C med yrkessjåførkvalifikasjon.' },
      { period: '2021 – 2022', school: 'Noroff — School of Technology and Digital Media', what: 'Backend Web Development (.NET).' },
      { period: '2002 – 2006', school: 'Universitetet i Gdańsk', what: 'Økonomi, spesialisering: analytiker.' }
    ],
    capH: 'Hva jeg kan',
    capIntro: 'Jeg framstiller meg ikke som ekspert. Jeg viser retningen jeg faktisk investerer tid og energi i — der AI, automatisering og infrastruktur møter et reelt menneskelig problem.',
    caps: ['ASP.NET', 'Next.js', 'React.js', 'Blazor', 'AI-workflows', 'Automatisering', 'Self-hosted', 'Docker', 'API-integrasjoner', 'RAG / kunnskapsbaser', '3D-modellering og print', 'Grafisk design'],
    labsH: 'Eksperimenter og konsepter',
    labsIntro: 'Jeg lærer ved å bygge. Dette er retninger jeg tester i praksis — ærlig merket: eksperiment, prototype, konsept.',
    labs: [
      { meta: 'Eksperiment', title: 'Kobling av AI-modeller', text: 'Jeg deler et problem i steg og velger ulike modeller eller verktøy for hvert, i stedet for å forvente ett perfekt svar.' },
      { meta: 'Konsept', title: 'RAG og privat kunnskapsbase', text: 'Jeg tester hvordan dokumenter og notater kan bli en nyttig kunnskapsbase uten å miste kontroll over informasjon.' },
      { meta: 'Prototype', title: 'Workflow for innhold og research', text: 'Jeg bygger små flyter: fra spredt informasjon til strukturerte notater og et første brukbart utkast.' },
      { meta: 'Systemidé', title: 'Assistent for skjema og forespørsler', text: 'AI lager struktur og et utkast til svar, men den endelige avgjørelsen blir hos mennesket.' },
      { meta: 'Utforskning', title: 'Dokumentstrukturering', text: 'Automatiske sammendrag, tagger og prioritet — mening hentet fra dokumenter uten å miste kontekst.' },
      { meta: 'Konsept', title: 'Monitoring av workflows og feil', text: 'Observere automatiseringer, oppdage feil og vise mennesket et tydelig signal for handling.' }
    ],
    seekH: 'Hva jeg ser etter',
    seek: 'Jeg ser etter en reell retning innen teknologi — utdanning og arbeid rundt AI, automatisering og systemer. Jeg lærer best ved å bygge: koble systemer, feile i konfigurasjoner, fikse dem og føre en idé fram til noe som fungerer.',
    facts: [
      { k: 'Sted', v: 'Norge (Eidsberg)' },
      { k: 'Språk', v: 'polsk (morsmål) · engelsk B2 · norsk A2' },
      { k: 'Sertifikater', v: 'førerkort B96 og C' }
    ],
    contactH: 'Kontakt',
    contactText: 'E-post er enklest — jeg forteller gjerne mer og viser hva jeg bygger.',
    cta: 'Last ned CV (PDF)'
  }
};

const EMAIL = 'tomaszmroczynski@gmail.com';
const PHONE_DISPLAY = '+47 940 38 480';
const PHONE_HREF = '+4794038480';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Dossier — Tomasz Mroczyński',
    robots: { index: false, follow: false },
    alternates: { canonical: `/${lang}/o-mnie` }
  };
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;

  const store = await cookies();
  const authed = isAuthed(store.get(COOKIE_NAME)?.value);
  if (!authed) {
    return <AccessGate lang={lang} />;
  }

  return (
    <main className="dos">
      <div className="wrap dos-wrap">
        <Link className="dos-back" href={`/${lang}`}>
          {u.back}
        </Link>

        {/* Identity */}
        <header className="dos-hero">
          <div className="dos-eyebrow">{u.eyebrow}</div>
          <h1 className="dos-name">{u.name}</h1>
          <p className="dos-tagline">{u.tagline}</p>
          <p className="dos-lead">{u.lead}</p>
        </header>

        {/* Turning point */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">01</span>{u.turnH}</h2>
          {u.turn.map((p, i) => (
            <p key={i} className="dos-p">{p}</p>
          ))}
        </section>

        {/* Experience */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">02</span>{u.expH}</h2>
          <ol className="dos-timeline">
            {u.exp.map((e, i) => (
              <li key={i} className="dos-exp">
                <span className="dos-exp-period">{e.period}</span>
                <div className="dos-exp-body">
                  <h3 className="dos-exp-role">
                    {e.role} <span className="dos-exp-org">· {e.org}</span>
                  </h3>
                  <p className="dos-exp-detail">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Education */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">03</span>{u.eduH}</h2>
          <ol className="dos-timeline">
            {u.edu.map((e, i) => (
              <li key={i} className="dos-exp">
                <span className="dos-exp-period">{e.period}</span>
                <div className="dos-exp-body">
                  <h3 className="dos-exp-role">{e.school}</h3>
                  <p className="dos-exp-detail">{e.what}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Capabilities */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">04</span>{u.capH}</h2>
          <p className="dos-p">{u.capIntro}</p>
          <div className="rs-chips dos-chips">
            {u.caps.map((c) => (
              <span key={c} className="rs-chip">{c}</span>
            ))}
          </div>
        </section>

        {/* Experiments */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">05</span>{u.labsH}</h2>
          <p className="dos-p">{u.labsIntro}</p>
          <div className="dos-labs">
            {u.labs.map((l, i) => {
              const vis = LAB_VIS[i];
              return (
                <article key={i} className="dos-lab">
                  <div className="dos-lab-top">
                    <span className="dos-lab-meta">{l.meta}</span>
                    <span className="dos-lab-center">{vis.center}</span>
                  </div>
                  <h3 className="dos-lab-title">{l.title}</h3>
                  <p className="dos-lab-text">{l.text}</p>
                  <div className="dos-lab-nodes">
                    {vis.nodes.map((n) => (
                      <span key={n} className="dos-node">{n}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Looking for */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">06</span>{u.seekH}</h2>
          <p className="dos-p">{u.seek}</p>
          <dl className="dos-facts">
            {u.facts.map((f) => (
              <div key={f.k} className="dos-fact">
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact */}
        <section className="dos-section">
          <h2 className="dos-h2"><span className="dos-num">07</span>{u.contactH}</h2>
          <p className="dos-p">{u.contactText}</p>
          <div className="dos-contact">
            <a className="dos-contact-row" href={`mailto:${EMAIL}`}>
              <i data-lucide="mail" />
              <span>{EMAIL}</span>
            </a>
            <a className="dos-contact-row" href={`tel:${PHONE_HREF}`}>
              <i data-lucide="phone" />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
          <div className="dos-cta">
            <a className="btn btn-primary" href="/api/cv" target="_blank" rel="noopener">
              <i data-lucide="file-down" />
              <span>{u.cta}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
