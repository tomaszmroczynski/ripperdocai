import Link from 'next/link';
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Section = { title: string; body: string[] };
type Viz = {
  flow: string[];
  cap: string[];
  cycle: { center: string[]; nodes: string[][] };
  loop: { center: string[]; nodes: string[][] };
  archK: { devices: string; sync: string; coach: string; human: string };
  arch: { devices: string; sync: string; coach: string; human: string; host: string };
  chipsCap: string;
};
type RS = {
  eyebrow: string;
  title: string;
  intro: string[];
  sections: Section[];
  viz: Viz;
  ctaDiag: string;
  ctaScan: string;
};

const INTEGR = [
  'Meta Quest 3', 'Apple Watch', 'Garmin', 'Polar', 'Whoop', 'Oura',
  'Withings', 'Fitbit', 'Suunto', 'Wahoo', 'Zwift', 'Strava', 'Health Connect'
];

const UI: Record<string, RS> = {
  no: {
    eyebrow: 'Konsept under arbeid — RipperSync',
    title: 'Du kan ikke forsterke sinnet mens du ignorerer kroppen.',
    intro: [
      'Trening påvirker sirkulasjon, konsentrasjon, søvn, stress og evnen til å lære. Det er ikke bare fysisk innsats. Det er et signal om hvordan et menneske fungerer, restituerer og gjenvinner handlekraft.',
      'RipperSync samler signaler fra enhetene som allerede måler kroppen din: sportsklokker, armbånd, ringer, smarte vekter, blodtrykksmålere, søvnsensorer, treningsapper, cardio-utstyr, sykler, VR-plattformer og data fra Health Connect. En privat KI-coach organiserer så denne informasjonen, bearbeider den og gjør den om til en trend du faktisk kan bruke: handlekraft for belastning, behovet for restitusjon, og hvordan innsats påvirker oppmerksomhet, energi og beslutninger.',
      'Du kan snakke med coachen: om uken som gikk, en treningsplan, et fall i energi, restitusjon, eller hva som er verdt å gjøre i dag. Coachen husker historikken din, oppdager mønstre, motiverer og holder rytmen. Den trener ikke for deg. Beslutningen blir hos mennesket.',
      'Helsedata er sensitive, derfor kjører RipperSync på privat nettverksinfrastruktur: på din egen maskinvare, en dedikert server, eller en enhet levert spesielt for dette systemet. Dataene dine blir under din kontroll, uten å flyttes til andres sky.'
    ],
    sections: [
      {
        title: 'Hvorfor kroppen former sinnet',
        body: [
          'Under trening pumper hjertet mer blod, og mer oksygen og næring når hjernen. Nevroner jobber stabilere, konsentrasjonen kommer lettere tilbake, og nervesystemet går raskere fra overbelastning til handling.',
          'Fysisk aktivitet øker BDNF, et protein som støtter nevroplastisitet. Hjernen danner og styrker lettere forbindelser mellom nevroner. Det gir læring, hukommelse og tilpasning.',
          'Bevegelse påvirker også dopamin, serotonin og noradrenalin. Disse signalstoffene støtter motivasjon, humør, oppmerksomhet og handlekraft. Samtidig hjelper regelmessig trening med å regulere kortisol — stresshormonet som i overskudd svekker hukommelse, beslutninger og selvkontroll.',
          'Søvn lukker syklusen. Etter godt tilpasset innsats går kroppen lettere inn i restitusjon, og hjernen ordner minner, følelser og oppmerksomhet. Derfor er trening ikke bare muskelarbeid. Det er en måte å påvirke nervesystemet, dagsrytmen og kognitiv ytelse på.'
        ]
      },
      {
        title: 'Selvmotivasjon og KI-coachen',
        body: [
          'Det viktigste er at effektene ofte synes raskt. Du begynner å merke at du sover bedre etter bevegelse, konsentrasjonen kommer raskere tilbake, spenningen faller, og energien og dagsrytmen blir bedre. RipperSync viser disse endringene tydelig, slik at motivasjon ikke hviler på disiplin alene. Den hviler på bevis: jeg beveget meg, og systemet mitt fungerer bedre.',
          'KI-modellen i RipperSync er laget for å styrke menneskets selvmotivasjon ytterligere. Ut fra dataene anslår den kroppens nåværende tilstand: belastning, restitusjon, spenning, energi og handlekraft. Mennesket kjenner ofte denne tilstanden før det kan sette ord på den. RipperSync hjelper å lese den og gjøre den om til en beslutning.',
          'Coachen leter etter raske, tydelige tegn på fremgang og forklarer dem på et enkelt språk: hva som ble bedre, hva som begynner å virke, hvor kroppen gjenvinner rytmen, og hvilket neste steg som er verdt å vurdere. Slik er trening ikke en abstrakt plikt. Den blir en prosess hvis effekter du kan se, forstå og gjenta.'
        ]
      },
      {
        title: 'Det tekniske laget',
        body: [
          'RipperSync fungerer som et privat synkroniseringslag mellom enheter, helsedata og KI-coachen. Systemet kan kjøre på din egen maskinvare, en dedikert server, eller en enhet levert spesielt for det. Dataene blir på privat nettverksinfrastruktur, uten å flyttes til andres sky.',
          'Datakilder kan omfatte sportsklokker, armbånd, ringer, smarte vekter, blodtrykksmålere, søvnsensorer, treningsapper, cardio-utstyr, sykler, VR-plattformer og data fra Health Connect. Meta Quest 3, Apple Watch, Garmin, Polar, Whoop, Oura, Withings, Fitbit, Suunto, Wahoo, Zwift og Strava er eksempler på integrasjoner. Flere velges ut fra utstyret, målet og hvordan en person jobber.',
          'Dataene normaliseres, ordnes og slås sammen til én trendprofil: aktivitet, søvn, restitusjon, belastning, puls, dagsrytme og økthistorikk. Ut fra dette analyserer den private KI-coachen mønstre, anslår kroppens nåværende tilstand og fører en dialog med brukeren. Den kan svare på spørsmål, forklare endringer, foreslå et neste steg og holde rytmen — men beslutningen blir hos mennesket.',
          'I senere versjoner kan systemet utvides med en ElevenLabs-stemmeagent, integrasjoner med flere enheter, og automatiske rapporter for brukeren.'
        ]
      }
    ],
    viz: {
      flow: ['Kropp', 'RipperSync', 'KI-coach', 'Menneske'],
      cap: ['Løkke: kropp → sinn', 'Selvmotivasjon-løkke', 'Systemarkitektur'],
      cycle: { center: ['rytme &', 'kognisjon'], nodes: [['Hjerte', 'flyt'], ['Hjerne', 'BDNF'], ['Dopamin', 'serotonin'], ['Søvn', 'restitusjon']] },
      loop: { center: ['selv-', 'motivasjon'], nodes: [['Bevegelse'], ['Signaler'], ['Bevis'], ['Motivasjon']] },
      archK: { devices: 'datakilder', sync: 'synk-lag', coach: 'dialog', human: 'beslutning' },
      arch: { devices: 'Dine enheter', sync: 'RipperSync — privat synk-lag', coach: 'Privat KI-coach', human: 'Mennesket bestemmer', host: 'Selvhostet: din maskinvare · server · dedikert enhet' },
      chipsCap: 'Eksempel-integrasjoner'
    },
    ctaDiag: 'Se hva som bør forsterkes',
    ctaScan: 'Åpne 3D bio-scan'
  },
  en: {
    eyebrow: 'Concept in progress — RipperSync',
    title: 'You can’t amplify the mind while ignoring the body.',
    intro: [
      'Training affects circulation, focus, sleep, stress and the ability to learn. It isn’t just physical effort. It’s a signal of how a person performs, recovers and regains readiness.',
      'RipperSync collects signals from the devices that already measure your body: sports watches, bands, rings, smart scales, blood-pressure monitors, sleep sensors, training apps, cardio equipment, bikes, VR platforms and data from Health Connect. A private AI coach then organizes that information, processes it and turns it into a trend you can actually use: readiness for load, the need to recover, and how effort affects attention, energy and decisions.',
      'You can talk to the coach: about the past week, a training plan, a drop in energy, recovery, or what’s worth doing today. The coach remembers your history, spots patterns, motivates and keeps the rhythm. It doesn’t train for you. The decision stays with the person.',
      'Health data is sensitive, so RipperSync runs on private network infrastructure: on your own hardware, a dedicated server, or a device provided specifically for this system. Your data stays under your control, without moving it to someone else’s cloud.'
    ],
    sections: [
      {
        title: 'Why the body shapes the mind',
        body: [
          'During training the heart pumps more blood, and more oxygen and nutrients reach the brain. Neurons work more steadily, focus returns more easily, and the nervous system moves faster from overload back to action.',
          'Physical activity raises BDNF, a protein that supports neuroplasticity. The brain more easily forms and strengthens connections between neurons. That translates into learning, memory and adaptation.',
          'Movement also affects dopamine, serotonin and noradrenaline. These neurotransmitters support motivation, mood, attention and readiness to act. At the same time, regular training helps regulate cortisol — the stress hormone that, in excess, weakens memory, decisions and self-control.',
          'Sleep closes the cycle. After well-matched effort the body enters recovery more easily, and the brain organizes memories, emotions and attention. That’s why training isn’t only muscle work. It’s a way to influence the nervous system, the rhythm of the day and cognitive performance.'
        ]
      },
      {
        title: 'Self-motivation and the AI coach',
        body: [
          'What matters most is that the effects are often visible quickly. You start to notice that after movement you sleep better, focus returns faster, tension drops, and energy and daily rhythm improve. RipperSync shows these changes clearly, so motivation doesn’t rest on discipline alone. It rests on evidence: I moved, and my system runs better.',
          'The AI model in RipperSync is designed to further strengthen a person’s self-motivation. From the data it estimates the body’s current state: load, recovery, tension, energy and readiness to act. People often feel this state before they can name it. RipperSync helps read it and turn it into a decision.',
          'The coach looks for quick, clear signals of progress and explains them in plain language: what improved, what’s starting to work, where the body is regaining its rhythm, and what next step is worth considering. So training isn’t an abstract obligation. It becomes a process whose effects you can see, understand and repeat.'
        ]
      },
      {
        title: 'The technical layer',
        body: [
          'RipperSync works as a private synchronization layer between devices, health data and the AI coach. The system can run on your own hardware, a dedicated server, or a device provided specifically for it. Data stays on private network infrastructure, without moving it to someone else’s cloud.',
          'Data sources can include sports watches, bands, rings, smart scales, blood-pressure monitors, sleep sensors, training apps, cardio equipment, bikes, VR platforms and data from Health Connect. Meta Quest 3, Apple Watch, Garmin, Polar, Whoop, Oura, Withings, Fitbit, Suunto, Wahoo, Zwift and Strava are example integrations. Further ones are chosen for the hardware, the goal and how a person works.',
          'Data is normalized, organized and merged into one trend profile: activity, sleep, recovery, load, heart rate, daily rhythm and session history. From this the private AI coach analyzes patterns, estimates the body’s current state and holds a dialogue with the user. It can answer questions, explain changes, suggest a next step and keep the rhythm — but the decision stays with the person.',
          'In later versions the system may be extended with an ElevenLabs voice agent, integrations with more devices, and automatic reports for the user.'
        ]
      }
    ],
    viz: {
      flow: ['Body', 'RipperSync', 'AI coach', 'Human'],
      cap: ['Loop: body → mind', 'Self-motivation loop', 'System architecture'],
      cycle: { center: ['rhythm &', 'cognition'], nodes: [['Heart', 'flow'], ['Brain', 'BDNF'], ['Dopamine', 'serotonin'], ['Sleep', 'recovery']] },
      loop: { center: ['self-', 'motivation'], nodes: [['Move'], ['Signals'], ['Evidence'], ['Motivation']] },
      archK: { devices: 'data sources', sync: 'sync layer', coach: 'dialogue', human: 'decision' },
      arch: { devices: 'Your devices', sync: 'RipperSync — private sync layer', coach: 'Private AI coach', human: 'The human decides', host: 'Self-hosted: your hardware · server · dedicated device' },
      chipsCap: 'Example integrations'
    },
    ctaDiag: 'See what to amplify',
    ctaScan: 'Open the 3D bio-scan'
  },
  pl: {
    eyebrow: 'Koncepcja w toku — RipperSync',
    title: 'Nie da się wzmacniać umysłu, ignorując ciało.',
    intro: [
      'Trening wpływa na krążenie, koncentrację, sen, stres i zdolność uczenia się. To nie jest tylko wysiłek fizyczny. To sygnał o tym, jak człowiek działa, regeneruje się i odzyskuje gotowość.',
      'RipperSync zbiera sygnały z urządzeń, które już mierzą ciało: zegarków sportowych, opasek, pierścieni, wag smart, ciśnieniomierzy, sensorów snu, aplikacji treningowych, sprzętu cardio, rowerów, platform VR i danych z Health Connect. Następnie prywatny AI coach porządkuje te informacje, przetwarza je i zamienia w trend, który człowiek może realnie wykorzystać: gotowość do obciążenia, potrzebę regeneracji oraz wpływ wysiłku na uwagę, energię i decyzje.',
      'Z coachem można rozmawiać: o ostatnim tygodniu, planie treningowym, spadku energii, regeneracji albo tym, co dziś warto zrobić. Coach pamięta historię, wykrywa zależności, motywuje i pilnuje rytmu. Nie ćwiczy za ciebie. Decyzja zostaje przy człowieku.',
      'Dane zdrowotne są wrażliwe, dlatego RipperSync działa w prywatnej infrastrukturze sieciowej: na twoim sprzęcie, wydzielonym serwerze albo urządzeniu dostarczonym specjalnie pod ten system. Dane zostają pod twoją kontrolą, bez przenoszenia ich do cudzej chmury.'
    ],
    sections: [
      {
        title: 'Dlaczego ciało wpływa na umysł',
        body: [
          'Podczas treningu serce pompuje więcej krwi, a do mózgu trafia więcej tlenu i składników odżywczych. Neurony pracują stabilniej, łatwiej wraca koncentracja, a układ nerwowy szybciej przechodzi z przeciążenia do działania.',
          'Aktywność fizyczna zwiększa poziom BDNF, białka wspierającego neuroplastyczność. Dzięki temu mózg łatwiej tworzy i wzmacnia połączenia między neuronami. To przekłada się na uczenie się, pamięć i adaptację.',
          'Ruch wpływa też na dopaminę, serotoninę i noradrenalinę. Te neuroprzekaźniki wspierają motywację, nastrój, uwagę i gotowość do działania. Jednocześnie regularny trening pomaga regulować kortyzol, czyli hormon stresu, który w nadmiarze osłabia pamięć, decyzje i samokontrolę.',
          'Sen zamyka ten cykl. Po dobrze dobranym wysiłku organizm łatwiej wchodzi w regenerację, a mózg porządkuje wspomnienia, emocje i uwagę. Dlatego trening nie jest tylko pracą mięśni. Jest sposobem wpływania na układ nerwowy, rytm dnia i efektywność poznawczą.'
        ]
      },
      {
        title: 'Samomotywacja i AI coach',
        body: [
          'Najważniejsze jest to, że efekty często widać szybko. Człowiek zaczyna zauważać, że po ruchu lepiej śpi, szybciej wraca koncentracja, spada napięcie, poprawia się energia i rytm dnia. RipperSync pokazuje te zmiany wyraźnie, dzięki czemu motywacja nie opiera się wyłącznie na dyscyplinie. Opiera się na dowodzie: zrobiłem ruch, mój system działa lepiej.',
          'Model AI w RipperSync jest zaprojektowany tak, żeby dodatkowo wzmacniać samomotywację człowieka. Na podstawie danych szacuje aktualny stan fizyczny organizmu: poziom obciążenia, regeneracji, napięcia, energii i gotowości do działania. Człowiek często czuje ten stan, zanim potrafi go nazwać. RipperSync pomaga go odczytać i zamienić w decyzję.',
          'Coach wyszukuje szybkie, wyraźne sygnały postępu i tłumaczy je prostym językiem: co się poprawiło, co zaczyna działać, gdzie organizm odzyskuje rytm i jaki następny krok warto rozważyć. Dzięki temu trening nie jest abstrakcyjnym obowiązkiem. Staje się procesem, którego efekty można zobaczyć, zrozumieć i powtórzyć.'
        ]
      },
      {
        title: 'Warstwa techniczna',
        body: [
          'RipperSync działa jako prywatna warstwa synchronizacji między urządzeniami, danymi zdrowotnymi i AI coachem. System może być uruchomiony na twoim sprzęcie, wydzielonym serwerze albo urządzeniu dostarczonym specjalnie pod ten system. Dane zostają w prywatnej infrastrukturze sieciowej, bez przenoszenia ich do cudzej chmury.',
          'Źródła danych mogą obejmować zegarki sportowe, opaski, pierścienie, wagi smart, ciśnieniomierze, sensory snu, aplikacje treningowe, sprzęt cardio, rowery, platformy VR oraz dane z Health Connect. Meta Quest 3, Apple Watch, Garmin, Polar, Whoop, Oura, Withings, Fitbit, Suunto, Wahoo, Zwift i Strava to przykładowe integracje. Kolejne dobieramy do sprzętu, celu i sposobu pracy człowieka.',
          'Dane są normalizowane, porządkowane i łączone w jeden profil trendu: aktywność, sen, regeneracja, obciążenie, tętno, rytm dnia i historia sesji. Na tej podstawie prywatny AI coach analizuje wzorce, szacuje aktualny stan organizmu i prowadzi dialog z użytkownikiem. Może odpowiadać na pytania, wyjaśniać zmiany, sugerować następny krok i pilnować rytmu, ale decyzja zostaje przy człowieku.',
          'W kolejnych wersjach system może zostać rozszerzony o agenta głosowego ElevenLabs, integracje z kolejnymi urządzeniami oraz automatyczne raporty dla użytkownika.'
        ]
      }
    ],
    viz: {
      flow: ['Ciało', 'RipperSync', 'AI coach', 'Człowiek'],
      cap: ['Pętla: ciało → umysł', 'Pętla samomotywacji', 'Architektura systemu'],
      cycle: { center: ['rytm', 'i poznanie'], nodes: [['Serce', 'krążenie'], ['Mózg', 'BDNF'], ['Dopamina', 'serotonina'], ['Sen', 'regeneracja']] },
      loop: { center: ['samo-', 'motywacja'], nodes: [['Ruch'], ['Sygnały'], ['Dowód'], ['Motywacja']] },
      archK: { devices: 'źródła danych', sync: 'warstwa sync', coach: 'dialog', human: 'decyzja' },
      arch: { devices: 'Twoje urządzenia', sync: 'RipperSync — prywatna warstwa sync', coach: 'Prywatny AI coach', human: 'Człowiek decyduje', host: 'Self-hosted: twój sprzęt · serwer · dedykowane urządzenie' },
      chipsCap: 'Przykładowe integracje'
    },
    ctaDiag: 'Sprawdź, co warto wzmocnić',
    ctaScan: 'Otwórz bio-skan 3D'
  }
};

const FLOW_ICONS = ['heart-pulse', 'git-merge', 'message-circle', 'user-round'];

function FlowStrip({ flow }: { flow: string[] }) {
  return (
    <div className="rs-flow" aria-hidden="true">
      {flow.map((label, i) => (
        <Fragment key={i}>
          {i > 0 && <div className="rs-flow-link" />}
          <div className={`rs-flow-step${i === 1 ? ' hot' : ''}`}>
            <div className="rs-flow-ico">
              <i data-lucide={FLOW_ICONS[i]} />
            </div>
            <div className="rs-flow-lab">{label}</div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

type Pt = { x: number; y: number; pos: 'top' | 'right' | 'bottom' | 'left' };

function nodeLabel(lines: string[], p: Pt, isHot: boolean) {
  const fill = isHot ? '#F1B86A' : '#828D9C';
  let x = p.x;
  let anchor: 'middle' | 'start' | 'end' = 'middle';
  let y0 = p.y;
  if (p.pos === 'top') y0 = p.y - 18 - (lines.length - 1) * 13;
  else if (p.pos === 'bottom') y0 = p.y + 26;
  else if (p.pos === 'right') { x = p.x + 16; anchor = 'start'; y0 = p.y - (lines.length - 1) * 7 + 4; }
  else { x = p.x - 16; anchor = 'end'; y0 = p.y - (lines.length - 1) * 7 + 4; }
  return lines.map((l, i) => (
    <text key={i} x={x} y={y0 + i * 13} textAnchor={anchor} fontFamily="'Geist Mono', ui-monospace, monospace" fontSize="11" fill={fill} letterSpacing="0.04em">{l}</text>
  ));
}

function RingDiagram({ center, nodes, hot, idp }: { center: string[]; nodes: string[][]; hot: number; idp: string }) {
  const cx = 210, cy = 160, R = 100;
  const pts: Pt[] = [
    { x: cx, y: cy - R, pos: 'top' },
    { x: cx + R, y: cy, pos: 'right' },
    { x: cx, y: cy + R, pos: 'bottom' },
    { x: cx - R, y: cy, pos: 'left' }
  ];
  const arcs = [
    `M${cx},${cy - R} A${R},${R} 0 0 1 ${cx + R},${cy}`,
    `M${cx + R},${cy} A${R},${R} 0 0 1 ${cx},${cy + R}`,
    `M${cx},${cy + R} A${R},${R} 0 0 1 ${cx - R},${cy}`,
    `M${cx - R},${cy} A${R},${R} 0 0 1 ${cx},${cy - R}`
  ];
  return (
    <svg viewBox="0 0 420 320" role="img" aria-hidden="true">
      <defs>
        <marker id={`ar-${idp}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#EA9A3E" />
        </marker>
      </defs>
      <circle className="rs-dia-orbit" cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 8" />
      {arcs.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#EA9A3E" strokeOpacity="0.5" strokeWidth="1.4" markerEnd={`url(#ar-${idp})`} />
      ))}
      <circle cx={cx} cy={cy} r="46" fill="rgba(234,154,62,0.05)" stroke="rgba(234,154,62,0.42)" />
      {center.map((line, i) => (
        <text key={i} x={cx} y={cy - (center.length - 1) * 8 + i * 16 + 4} textAnchor="middle" fontFamily="'Geist Mono', ui-monospace, monospace" fontSize="12" fill="#EEF1F5" letterSpacing="0.04em">{line}</text>
      ))}
      {pts.map((p, i) => {
        const isHot = i === hot;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="8" fill={isHot ? 'rgba(255,217,160,0.18)' : '#0B0E12'} stroke={isHot ? '#FFD9A0' : '#EA9A3E'} strokeWidth="1.4" className={isHot ? 'rs-dia-pulse' : undefined} />
            {nodeLabel(nodes[i], p, isHot)}
          </g>
        );
      })}
    </svg>
  );
}

function ArchDiagram({ viz }: { viz: Viz }) {
  const { arch, archK } = viz;
  return (
    <>
      <div className="rs-arch" aria-hidden="true">
        <div className="rs-col">
          <div className="rs-node">
            <span className="rs-node-k">{archK.devices}</span>
            <span className="rs-node-t">{arch.devices}</span>
          </div>
        </div>
        <div className="rs-arch-ar"><i data-lucide="arrow-right" /></div>
        <div className="rs-col">
          <div className="rs-node hot">
            <span className="rs-node-k">{archK.sync}</span>
            <span className="rs-node-t">{arch.sync}</span>
          </div>
        </div>
        <div className="rs-arch-ar"><i data-lucide="arrow-right" /></div>
        <div className="rs-col">
          <div className="rs-node">
            <span className="rs-node-k">{archK.coach}</span>
            <span className="rs-node-t">{arch.coach}</span>
          </div>
          <div className="rs-arch-ar" style={{ transform: 'rotate(90deg)' }}><i data-lucide="arrow-right" /></div>
          <div className="rs-node">
            <span className="rs-node-k">{archK.human}</span>
            <span className="rs-node-t">{arch.human}</span>
          </div>
        </div>
      </div>
      <div className="rs-host"><i data-lucide="shield-check" /><span>{arch.host}</span></div>
    </>
  );
}

function SectionFig({ viz, i }: { viz: Viz; i: number }) {
  if (i === 0) {
    return (
      <div className="rs-fig">
        <p className="rs-figcap">{viz.cap[0]}</p>
        <RingDiagram center={viz.cycle.center} nodes={viz.cycle.nodes} hot={1} idp="cyc" />
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="rs-fig">
        <p className="rs-figcap">{viz.cap[1]}</p>
        <RingDiagram center={viz.loop.center} nodes={viz.loop.nodes} hot={3} idp="loop" />
      </div>
    );
  }
  return (
    <div className="rs-fig">
      <p className="rs-figcap">{viz.cap[2]}</p>
      <ArchDiagram viz={viz} />
      <p className="rs-figcap" style={{ margin: '22px 0 0' }}>{viz.chipsCap}</p>
      <div className="rs-chips">
        {INTEGR.map((c) => (
          <span key={c} className="rs-chip">{c}</span>
        ))}
      </div>
    </div>
  );
}

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
    description: u.intro[2] ?? u.intro[0],
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

const VIZ_RS: Record<string, { cap: string; fs: string; trinity: string }> = {
  no: { cap: '3D bio-scan — kroppen som signal', fs: 'Åpne i fullskjerm', trinity: 'Se Ripper Trinity' },
  en: { cap: '3D bio-scan — the body as signal', fs: 'Open fullscreen', trinity: 'Explore Ripper Trinity' },
  pl: { cap: 'Bio-skan 3D — ciało jako sygnał', fs: 'Otwórz pełny ekran', trinity: 'Zobacz Ripper Trinity' }
};

export default async function RipperSyncPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const u = UI[lang] ?? UI.en;
  const v = VIZ_RS[lang] ?? VIZ_RS.en;
  const ecoLabel = ({ no: 'Økosystem', en: 'Ecosystem', pl: 'Ekosystem' } as Record<string, string>)[lang] ?? 'Ecosystem';
  return (
    <main className="rs-page">
      <div className="wrap">
        <Link className="rs-back" href={`/${lang}`}>
          ← Ripperdoc
        </Link>
        <section className="phero">
          <div className="phero-copy">
            <div className="sec-eyebrow">{u.eyebrow}</div>
            <HeroTitle text={u.title} />
            <p className="phero-sub">{u.intro[0]}</p>
            <div className="phero-lockup">Human First · Intelligence Amplified</div>
            <div className="phero-cta">
              <Link className="btn btn-primary" href={`/${lang}/diagnostic`}>{u.ctaDiag}</Link>
              <Link className="btn btn-ghost" href={`/${lang}/ekosystem`}>{ecoLabel}</Link>
            </div>
          </div>
          <div className="phero-art">
            <iframe src={`/bio-scan-3d.html?lang=${lang}&embed=1`} title="RipperSync — bio-scan 3D" loading="lazy" />
          </div>
        </section>
      </div>

      <div className="wrap rs-wrap">
        {u.intro.slice(1).map((p, i) => (
          <p key={i} className="rs-lead">{p}</p>
        ))}

        <FlowStrip flow={u.viz.flow} />

        {u.sections.map((s, i) => (
          <section key={i} className="rs-section">
            <h2 className="rs-h2">{s.title}</h2>
            <SectionFig viz={u.viz} i={i} />
            {s.body.map((p, j) => (
              <p key={j} className="rs-lead">
                {p}
              </p>
            ))}
          </section>
        ))}

        <div className="rs-cta">
          <Link className="btn btn-primary" href={`/${lang}/diagnostic`}>
            {u.ctaDiag}
          </Link>
          <Link className="btn btn-ghost" href={`/${lang}/ripper-trinity`}>
            {v.trinity}
          </Link>
        </div>
      </div>
    </main>
  );
}
