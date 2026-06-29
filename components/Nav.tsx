'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getDict } from '@/lib/i18n';
import LangSwitcher from '@/components/LangSwitcher';

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export default function Nav({ lang }: { lang: string }) {
  const d = getDict(lang);
  const t = (k: string) => d[k] ?? '';
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu after any navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <Link className="brand" href={`/${lang}`} onClick={close}>
          <img src="/assets/logo/ripperdoc-mark.svg" alt="" />
          <span className="name">
            Ripper<span className="doc">doc</span>
          </span>
        </Link>
        <div className="nav-right">
          <div className={`nav-links${open ? ' open' : ''}`}>
            <a href={`/${lang}#manifest`} onClick={close}>{t('nav.manifest')}</a>
            <a href={`/${lang}#services`} onClick={close}>{t('nav.services')}</a>
            <a href={`/${lang}#ekosystem`} onClick={close}>{t('nav.ecosystem')}</a>
            <a href={`/${lang}#contact`} onClick={close}>{t('nav.contact')}</a>
            <Link href={`/${lang}/o-mnie`} onClick={close}>{t('nav.about')}</Link>
            <a className="btn btn-ghost" href={`/${lang}#contact`} onClick={close}>
              {t('nav.cta')}
            </a>
          </div>
          <LangSwitcher current={lang} />
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
