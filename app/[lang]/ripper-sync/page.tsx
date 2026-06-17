import Link from 'next/link';
import type { Metadata } from 'next';
import { locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type Section = { title: string; body: string[] };
type RS = {
  eyebrow: string;
  title: string;
  intro: string[];
  sections: Section[];
  ctaDiag: string;
  ctaScan: string;
};

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
          <p key={i} className={i === 0 ? 'rs-lede' : 'rs-lead'}>
            {p}
          </p>
        ))}

        {u.sections.map((s, i) => (
          <section key={i} className="rs-section">
            <h2 className="rs-h2">{s.title}</h2>
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
          <a
            className="btn btn-ghost"
            href={`/bio-scan-3d.html?lang=${lang}`}
            target="_blank"
            rel="noopener"
          >
            {u.ctaScan}
          </a>
        </div>
      </div>
    </main>
  );
}
