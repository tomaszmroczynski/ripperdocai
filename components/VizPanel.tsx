'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  label: string;
  sub?: string;
  hint: string;
  icon?: string;
  fsLabel: string;
  closeLabel: string;
};

// A clickable tile that suggests interaction:
//  • single click  → expands the visualization inline (wide band)
//  • double click   → opens it fullscreen
// Inside the inline panel there are explicit fullscreen / close controls.
export default function VizPanel({ src, label, sub, hint, icon = 'scan-eye', fsLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [fs, setFs] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // @ts-expect-error injected global
    window.lucide?.createIcons();
  }, [open, fs]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setFs(false);
    }
    if (fs) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [fs]);

  function handleClick() {
    if (timer.current) return;
    timer.current = setTimeout(() => {
      timer.current = null;
      setOpen(true);
    }, 230);
  }
  function handleDouble() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setOpen(true);
    setFs(true);
  }

  return (
    <div className="vp">
      {!open && (
        <button className="vp-tile" onClick={handleClick} onDoubleClick={handleDouble}>
          <span className="vp-tile-ic">
            <i data-lucide={icon} />
          </span>
          <span className="vp-tile-main">
            <span className="vp-tile-label">{label}</span>
            {sub && <span className="vp-tile-sub">{sub}</span>}
          </span>
          <span className="vp-tile-hint">{hint}</span>
        </button>
      )}

      {open && (
        <div className="vp-inline">
          <div className="vp-bar">
            <span className="vp-bar-label">{label}</span>
            <span className="vp-bar-actions">
              <button onClick={() => setFs(true)}>
                <i data-lucide="maximize-2" /> {fsLabel}
              </button>
              <button onClick={() => setOpen(false)} aria-label={closeLabel}>
                <i data-lucide="x" />
              </button>
            </span>
          </div>
          <iframe src={src} title={label} loading="lazy" />
        </div>
      )}

      {fs && (
        <div className="vp-fs">
          <button className="vp-fs-close" onClick={() => setFs(false)} aria-label={closeLabel}>
            <i data-lucide="x" />
          </button>
          <iframe src={src} title={label} />
        </div>
      )}
    </div>
  );
}
