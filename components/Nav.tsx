import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import LangSwitcher from '@/components/LangSwitcher';

export default function Nav({ lang }: { lang: string }) {
  const d = getDict(lang);
  const t = (k: string) => d[k] ?? '';
  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <Link className="brand" href={`/${lang}`}>
          <img src="/assets/logo/ripperdoc-mark.svg" alt="" />
          <span className="name">
            Ripper<span className="doc">doc</span>
          </span>
        </Link>
        <div className="nav-links">
          <a href={`/${lang}#manifest`}>{t('nav.manifest')}</a>
          <a href={`/${lang}#services`}>{t('nav.services')}</a>
          <a href={`/${lang}#work`}>{t('nav.work')}</a>
          <a href={`/${lang}#contact`}>{t('nav.contact')}</a>
          <a className="btn btn-ghost" href={`/${lang}#contact`}>
            {t('nav.cta')}
          </a>
          <LangSwitcher current={lang} />
        </div>
      </div>
    </nav>
  );
}
