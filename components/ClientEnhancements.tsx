'use client';

import { useEffect } from 'react';

// Loads the brand neural-field canvas script and Lucide icons on the client.
// neural-field.js auto-boots on load (scans [data-neural-field] canvases).
export default function ClientEnhancements() {
  useEffect(() => {
    const lucide = document.createElement('script');
    lucide.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
    lucide.onload = () => {
      // @ts-expect-error injected global
      window.lucide?.createIcons();
    };
    document.body.appendChild(lucide);

    const nf = document.createElement('script');
    nf.src = '/assets/js/neural-field.js';
    document.body.appendChild(nf);

    return () => {
      lucide.remove();
      nf.remove();
    };
  }, []);

  return null;
}
