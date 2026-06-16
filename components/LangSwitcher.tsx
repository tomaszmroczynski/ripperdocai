'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n';

export default function LangSwitcher({ current }: { current: string }) {
  const pathname = usePathname() || `/${current}`;

  function localized(l: string) {
    const parts = pathname.split('/');
    parts[1] = l;
    const next = parts.join('/');
    return next || `/${l}`;
  }

  return (
    <div className="lang" id="lang">
      {locales.map((l) => (
        <Link
          key={l}
          href={localized(l)}
          className={l === current ? 'active' : ''}
          data-lang={l}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
