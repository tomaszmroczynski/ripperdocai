'use client';

import { useState } from 'react';
import Link from 'next/link';

export type EcoItem = {
  level: string;
  name: string;
  line: string;
  status: string;
  href: string;
  cta: string;
  img: string;
};

export default function EcoTabs({ items, lang }: { items: EcoItem[]; lang: string }) {
  const [i, setI] = useState(0);
  const a = items[i] ?? items[0];
  return (
    <div className="ecot">
      <div className="ecot-tabs" role="tablist">
        {items.map((it, idx) => (
          <button
            key={it.name}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={`ecot-tab${idx === i ? ' on' : ''}`}
            onClick={() => setI(idx)}
          >
            <span className="ecot-tab-level">{it.level}</span>
            <span className="ecot-tab-name">{it.name}</span>
          </button>
        ))}
      </div>

      <div className="ecot-panel">
        <div className="ecot-art" style={{ backgroundImage: `url(${a.img})` }} aria-hidden="true" />
        <div className="ecot-copy">
          <div className="ecot-level">{a.level}</div>
          <h3 className="ecot-name">{a.name}</h3>
          <p className="ecot-line">{a.line}</p>
          <div className="ecot-foot">
            <span className="ecot-status">{a.status}</span>
            {a.href && a.cta && (
              <Link className="btn btn-ghost" href={`/${lang}/${a.href}`}>
                {a.cta} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
