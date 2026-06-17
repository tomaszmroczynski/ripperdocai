'use client';

import { useEffect, useState } from 'react';

// Calm, sentence-by-sentence fade in / hold / fade out, looping.
// Respects prefers-reduced-motion (renders all lines statically).
export default function RevolutionStatement({ lines }: { lines: string[] }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setReduced(true);
      return;
    }
    const HOLD = 3200;
    const FADE = 1200;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      setShown(true);
      timer = setTimeout(() => {
        setShown(false);
        timer = setTimeout(() => {
          i = (i + 1) % lines.length;
          setIndex(i);
          run();
        }, FADE);
      }, HOLD);
    };
    run();
    return () => clearTimeout(timer);
  }, [lines]);

  if (reduced) {
    return (
      <div className="rev-stage">
        <p
          className="rev-line rev-in"
          dangerouslySetInnerHTML={{ __html: lines[lines.length - 1] }}
        />
      </div>
    );
  }

  return (
    <div className="rev-stage" aria-live="polite">
      <p
        className={`rev-line ${shown ? 'rev-in' : 'rev-out'}`}
        dangerouslySetInnerHTML={{ __html: lines[index] }}
      />
    </div>
  );
}
