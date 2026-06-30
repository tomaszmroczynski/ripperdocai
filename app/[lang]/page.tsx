import Link from 'next/link';
import { getDict, locales } from '@/lib/i18n';
import RevolutionStatement from '@/components/RevolutionStatement';
import { type EcoItem } from '@/components/EcoTabs';

const REV: Record<string, { eyebrow: string; lines: string[] }> = {
  no: {
    eyebrow: 'Revolusjonen',
    lines: [
      'Det andre tiåret av det 21. århundret er et <em>vendepunkt</em>.',
      'En <em>revolusjon</em> pågår.',
      'Den høyeste frykten: å bli <em>erstattet</em>.',
      'Mitt svar er et annet: ikke erstatning, men <em>forsterkning</em>.',
      'Jeg setter <em>mennesket</em> først.',
      'Det er <em>tryggheten</em> jeg gir — å komme styrket gjennom endringen.',
      'Jeg utvider menneskelig <em>kapasitet</em>.'
    ]
  },
  en: {
    eyebrow: 'The revolution',
    lines: [
      'The second decade of the 21st century is a <em>turning point</em>.',
      'A <em>revolution</em> is underway.',
      'The loudest fear: <em>being replaced</em>.',
      'My answer is different: not replacement, but <em>amplification</em>.',
      'I put the <em>human</em> first.',
      'That is the <em>security</em> I give — to come through this change stronger.',
      'I expand human <em>capability</em>.'
    ]
  },
  pl: {
    eyebrow: 'Rewolucja',
    lines: [
      'Druga dekada XXI wieku to <em>punkt zwrotny</em>.',
      'Trwa <em>rewolucja</em>.',
      'Najgłośniejszy lęk: zostać <em>zastąpionym</em>.',
      'Moja odpowiedź jest inna: nie zastąpienie, lecz <em>wzmocnienie</em>.',
      'Stawiam <em>człowieka</em> na pierwszym miejscu.',
      'To jest <em>bezpieczeństwo</em>, które daję — wyjść z tej zmiany silniejszym.',
      'Rozszerzam ludzkie <em>możliwości</em>.'
    ]
  }
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const ECO: Record<string, { eyebrow: string; title: string; body: string[]; items: EcoItem[] }> = {
  no: {
    eyebrow: 'Økosystem',
    title: 'Ett system. Én visjon. Mennesket i sentrum.',
    body: [
      'RIPPERDOC ble ikke skapt for å levere enda et frittstående AI-verktøy.',
      'Målet vårt er ett helhetlig økosystem der kunstig intelligens støtter mennesket gjennom hele prosessen — fra å forstå problemet, via analyse og beslutninger, til å gjennomføre handlinger.',
      'I stedet for mange isolerte løsninger bygger vi ett sammenhengende system der alle komponenter samarbeider, og mennesket forblir det sentrale elementet i hver prosess.'
    ],
    items: [
      { level: 'Kropp', name: 'RipperSync', line: 'Signal fra enhetene dine gjort om til en trend: handlekraft, restitusjon, energi. En privat KI-coach.', status: 'Testprogram i gang', href: 'ripper-sync', cta: 'Se RipperSync', img: '/assets/img/ripper-sync.png' },
      { level: 'Tenkning', name: 'Ripper Trinity', line: 'Et moderert råd: to KI-stemmer, du leder. Beslutninger med et sporbart resonnement.', status: 'Testprogram i gang', href: 'ripper-trinity', cta: 'Se Ripper Trinity', img: '/assets/img/ripper-trinity.png' },
      { level: 'Handling', name: 'Ripper Task Force', line: 'En oppgavestyrke av modeller utfører oppgaver i CLI — under menneskelig moderering og kontroll. Ikke en autonom løkke.', status: 'Under arbeid', href: '', cta: '', img: '/assets/img/ripper-task-force.png' }
    ]
  },
  en: {
    eyebrow: 'Ecosystem',
    title: 'One system. One vision. The human at the centre.',
    body: [
      'RIPPERDOC wasn’t created to ship yet another standalone AI tool.',
      'Our goal is one comprehensive ecosystem where artificial intelligence supports the person across the whole process — from understanding the problem, through analysis and decisions, to carrying the actions out.',
      'Instead of many isolated solutions we build one coherent system in which all components work together, and the human stays the central element of every process.'
    ],
    items: [
      { level: 'Body', name: 'RipperSync', line: 'The signal from your devices turned into a trend: readiness, recovery, energy. A private AI coach.', status: 'Test program live', href: 'ripper-sync', cta: 'Explore RipperSync', img: '/assets/img/ripper-sync.png' },
      { level: 'Thinking', name: 'Ripper Trinity', line: 'A moderated council: two AI voices, you lead. Decisions with an auditable trace of the reasoning.', status: 'Test program live', href: 'ripper-trinity', cta: 'Explore Ripper Trinity', img: '/assets/img/ripper-trinity.png' },
      { level: 'Action', name: 'Ripper Task Force', line: 'A task force of models executes tasks in the CLI — under human moderation and control. Not an autonomous loop.', status: 'In preparation', href: '', cta: '', img: '/assets/img/ripper-task-force.png' }
    ]
  },
  pl: {
    eyebrow: 'Ekosystem',
    title: 'Jeden system. Jedna wizja. Człowiek w centrum.',
    body: [
      'RIPPERDOC nie powstał po to, aby dostarczać kolejne pojedyncze narzędzia AI.',
      'Naszym celem jest stworzenie kompleksowego ekosystemu, w którym sztuczna inteligencja wspiera człowieka w całym procesie — od zrozumienia problemu, przez analizę i podejmowanie decyzji, aż po realizację działań.',
      'Zamiast wielu odizolowanych rozwiązań budujemy jeden spójny system, w którym wszystkie komponenty współpracują ze sobą, a człowiek pozostaje centralnym elementem każdego procesu.'
    ],
    items: [
      { level: 'Ciało', name: 'RipperSync', line: 'Sygnał z urządzeń zamieniony w trend: gotowość, regeneracja, energia. Prywatny AI coach.', status: 'Program testowy uruchomiony', href: 'ripper-sync', cta: 'Zobacz RipperSync', img: '/assets/img/ripper-sync.png' },
      { level: 'Myślenie', name: 'Ripper Trinity', line: 'Moderowana rada: dwa głosy AI, Ty prowadzisz. Decyzje z audytowalnym śladem rozumowania.', status: 'Program testowy uruchomiony', href: 'ripper-trinity', cta: 'Zobacz Ripper Trinity', img: '/assets/img/ripper-trinity.png' },
      { level: 'Działanie', name: 'Ripper Task Force', line: 'Grupa zadaniowa modeli realizuje zadania w CLI — pod moderacją i kontrolą człowieka. Nie autonomiczna pętla.', status: 'W przygotowaniu', href: '', cta: '', img: '/assets/img/ripper-task-force.png' }
    ]
  }
};

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = getDict(lang);
  const t = (k: string) => d[k] ?? '';
  const html = (k: string) => ({ __html: d[k] ?? '' });
  const eco = ECO[lang] ?? ECO.en;

  return (
    <>
      <header className="hero">
        <div className="hero-bg">
          <img src="/assets/img/hero.jpg" alt="" />
        </div>
        <canvas data-neural-field data-sparks="4" data-density="0.00008" data-speed="0.12" />
        <div className="wrap hero-in">
          <div className="eyebrow">
            <span className="pip" />
            <span>{t('hero.eyebrow')}</span>
          </div>
          <RevolutionStatement lines={(REV[lang] ?? REV.en).lines} />
          <div className="hero-cta">
            <a className="btn btn-primary" href={`/${lang}/diagnostic`}>
              <i data-lucide="scan-eye" /> <span>{t('hero.cta1')}</span>
            </a>
          </div>
          <div className="lockup">
            <span>AI</span>
            <span className="x">×</span>
            <span>SOFTWARE</span>
            <span className="x">×</span>
            <span className="c">HARDWARE</span>
          </div>
        </div>
      </header>

      <section className="block" id="manifest">
        <div className="wrap manifesto">
          <div className="manifesto-art">
            <img src="/assets/img/portrait-neural.jpg" alt="" />
            <div className="scrim" />
            <div className="tag">{t('manifesto.tag')}</div>
          </div>
          <div>
            <div className="sec-eyebrow">{t('manifesto.eyebrow')}</div>
            <p className="body" style={{ marginTop: 0 }}>
              {t('manifesto.lead')}
            </p>
            <p className="quote" style={{ marginTop: 24 }} dangerouslySetInnerHTML={html('manifesto.quote')} />
            <p className="body">{t('manifesto.body1')}</p>
            <p className="body">{t('manifesto.body2')}</p>
            <p className="body">{t('manifesto.body3')}</p>
          </div>
        </div>
      </section>

      <section className="block" id="services">
        <div className="wrap">
          <div className="sec-eyebrow">{t('services.eyebrow')}</div>
          <h2 className="sec-title">{t('services.title')}</h2>
          <p className="sec-sub">{t('services.sub')}</p>
          <div className="pillars">
            <div className="pillar">
              <div className="ic">
                <i data-lucide="brain" />
              </div>
              <h3>{t('pillar1.h')}</h3>
              <p>{t('pillar1.p')}</p>
              <div className="meta">
                <i data-lucide="waypoints" /> <span>{t('pillar1.meta')}</span>
              </div>
            </div>
            <div className="pillar">
              <div className="ic">
                <i data-lucide="code-xml" />
              </div>
              <h3>{t('pillar2.h')}</h3>
              <p>{t('pillar2.p')}</p>
              <div className="meta">
                <i data-lucide="git-branch" /> <span>{t('pillar2.meta')}</span>
              </div>
            </div>
            <div className="pillar">
              <div className="ic">
                <i data-lucide="cpu" />
              </div>
              <h3>{t('pillar3.h')}</h3>
              <p>{t('pillar3.p')}</p>
              <div className="meta">
                <i data-lucide="layers" /> <span>{t('pillar3.meta')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="ekosystem">
        <div className="wrap">
          <div className="sec-eyebrow">{eco.eyebrow}</div>
          <h2 className="sec-title" style={{ fontSize: 40 }}>
            {eco.title}
          </h2>
          {eco.body.map((p, i) => (
            <p key={i} className="sec-sub" style={{ maxWidth: 680, marginTop: i ? 12 : undefined }}>{p}</p>
          ))}
          <div className="eco-stack">
            {eco.items.map((it) => (
              <article key={it.name} className="eco-item">
                <div className="eco-item-head">
                  <span className="eco-level">{it.level}</span>
                  <span className="eco-item-name">{it.name}</span>
                </div>
                <div className="eco-item-body">
                  <div className="eco-item-art" style={{ backgroundImage: `url(${it.img})` }} aria-hidden="true" />
                  <div className="eco-item-copy">
                    <p className="eco-line">{it.line}</p>
                    <div className="eco-foot">
                      <span className="eco-status">{it.status}</span>
                      {it.href && it.cta && (
                        <Link className="btn btn-ghost" href={`/${lang}/${it.href}`}>{it.cta} →</Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block" id="proof">
        <div className="wrap">
          <div className="sec-eyebrow">{t('proof.eyebrow')}</div>
          <h2 className="sec-title">{t('proof.title')}</h2>
          <div className="stats">
            <div className="stat">
              <div className="v">1 240</div>
              <div className="l">{t('stat1.l')}</div>
            </div>
            <div className="stat">
              <div className="v">+312%</div>
              <div className="l">{t('stat2.l')}</div>
            </div>
            <div className="stat">
              <div className="v">{t('stat3.v')}</div>
              <div className="l">{t('stat3.l')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="contact">
        <div className="wrap">
          <div className="cta">
            <canvas data-neural-field data-sparks="3" data-density="0.00012" />
            <div className="cta-in">
              <h2>{t('contact.title')}</h2>
              <p>{t('contact.body')}</p>
              <a className="btn btn-primary" href="#contact" style={{ height: 52, padding: '0 28px', fontSize: 16 }}>
                <i data-lucide="zap" /> <span>{t('contact.cta')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-in">
          <div className="brand">
            <img src="/assets/logo/ripperdoc-mark.svg" alt="" style={{ width: 24, height: 24 }} />
            <span className="name" style={{ fontSize: 16 }}>
              Ripper<span className="doc">doc</span>
            </span>
          </div>
          <span className="copy">{t('footer.copy')}</span>
        </div>
      </footer>
    </>
  );
}
