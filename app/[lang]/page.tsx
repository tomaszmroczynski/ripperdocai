import { getDict, locales } from '@/lib/i18n';
import LangSwitcher from '@/components/LangSwitcher';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const scanSvg = `
<svg class="scan-svg" viewBox="0 0 320 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <linearGradient id="scanline" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EA9A3E" stop-opacity="0"/>
      <stop offset="50%" stop-color="#FFD9A0" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#EA9A3E" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <ellipse cx="160" cy="128" rx="98" ry="112" fill="none" stroke="rgba(234,154,62,0.25)" stroke-width="1"/>
  <ellipse cx="160" cy="128" rx="84" ry="98" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <g stroke="rgba(234,154,62,0.32)" stroke-width="1.1" fill="none">
    <path d="M160,46 L160,92 L160,140"/>
    <path d="M160,66 L132,78 M160,66 L188,78"/>
    <path d="M132,78 L120,112 L112,146 M188,78 L200,112 L208,146"/>
    <path d="M160,140 L146,142 L140,180 L136,214 M160,140 L174,142 L180,180 L184,214"/>
  </g>
  <g class="scan-nodes" fill="#F1B86A">
    <circle cx="160" cy="46" r="3.4"/><circle cx="160" cy="66" r="2.4"/><circle cx="132" cy="78" r="2.4"/>
    <circle cx="188" cy="78" r="2.4"/><circle cx="120" cy="112" r="2.4"/><circle cx="200" cy="112" r="2.4"/>
    <circle cx="112" cy="146" r="2.4"/><circle cx="208" cy="146" r="2.4"/><circle cx="160" cy="92" r="2.8"/>
    <circle cx="160" cy="140" r="2.8"/><circle cx="140" cy="180" r="2.4"/><circle cx="180" cy="180" r="2.4"/>
    <circle cx="136" cy="214" r="2.4"/><circle cx="184" cy="214" r="2.4"/>
  </g>
  <circle class="spark-node" cx="160" cy="92" r="5" fill="#FFD9A0"/>
  <rect class="scan-sweep" x="48" y="20" width="224" height="22" fill="url(#scanline)"/>
</svg>`;

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = getDict(lang);
  const t = (k: string) => d[k] ?? '';
  const html = (k: string) => ({ __html: d[k] ?? '' });

  return (
    <>
      <nav className="nav">
        <div className="wrap nav-in">
          <div className="brand">
            <img src="/assets/logo/ripperdoc-mark.svg" alt="" />
            <span className="name">
              Ripper<span className="doc">doc</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="#manifest">{t('nav.manifest')}</a>
            <a href="#services">{t('nav.services')}</a>
            <a href="#work">{t('nav.work')}</a>
            <a href="#contact">{t('nav.contact')}</a>
            <a className="btn btn-ghost" href="#contact">
              {t('nav.cta')}
            </a>
            <LangSwitcher current={lang} />
          </div>
        </div>
      </nav>

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
          <h1 dangerouslySetInnerHTML={html('hero.h1')} />
          <p className="lede">{t('hero.lede')}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contact">
              <i data-lucide="zap" /> <span>{t('hero.cta1')}</span>
            </a>
            <a className="btn btn-ghost" href="#manifest">
              <span>{t('hero.cta2')}</span> <i data-lucide="arrow-right" />
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

      <section className="block" id="work">
        <div className="wrap atlas">
          <a
            className="atlas-panel scan-preview"
            id="scan-link"
            href={`/bio-scan-3d.html?lang=${lang}`}
            target="_blank"
            rel="noopener"
          >
            <div className="badge">RipperSync · Bio-Scan 3D</div>
            <div dangerouslySetInnerHTML={{ __html: scanSvg }} />
            <div className="scan-cta">
              <i data-lucide="scan-eye" /> <span>{t('work.launch')}</span>
            </div>
          </a>
          <div>
            <div className="sec-eyebrow">{t('work.eyebrow')}</div>
            <h2 className="sec-title" style={{ fontSize: 40 }}>
              {t('work.title')}
            </h2>
            <p className="sec-sub">{t('work.body')}</p>
            <p className="sec-sub" style={{ fontSize: 15, marginTop: 16, color: 'var(--text-faint)' }}>
              {t('work.note')}
            </p>
            <div className="chips">
              <span className="chip">
                <i data-lucide="scan-eye" /> <span>{t('work.chip1')}</span>
              </span>
              <span className="chip">
                <i data-lucide="activity" /> <span>{t('work.chip2')}</span>
              </span>
              <span className="chip">
                <i data-lucide="brain" /> <span>{t('work.chip3')}</span>
              </span>
              <span className="chip">
                <i data-lucide="cpu" /> <span>{t('work.chip4')}</span>
              </span>
            </div>
            <div className="work-meta">{t('work.stack')}</div>
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
