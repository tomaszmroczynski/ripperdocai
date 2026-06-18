'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Loads the brand neural-field canvas script and Lucide icons on the client,
// and re-initializes them after every client-side navigation (e.g. language
// switch), since those scripts otherwise only run once on first load.
export default function ClientEnhancements() {
  const pathname = usePathname();

  // Inject the scripts once.
  useEffect(() => {
    if (!document.getElementById('lucide-script')) {
      const lucide = document.createElement('script');
      lucide.id = 'lucide-script';
      lucide.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
      // @ts-expect-error injected global
      lucide.onload = () => window.lucide?.createIcons();
      document.body.appendChild(lucide);
    }
    if (!document.getElementById('neural-field-script')) {
      const nf = document.createElement('script');
      nf.id = 'neural-field-script';
      nf.src = '/assets/js/neural-field.js';
      document.body.appendChild(nf);
    }
  }, []);

  // Re-run icon creation and constellation boot on every route change.
  useEffect(() => {
    // @ts-expect-error injected global
    window.lucide?.createIcons();
    // @ts-expect-error injected global
    window.RipperdocNeuralFieldBoot?.();
  }, [pathname]);

  return null;
}
