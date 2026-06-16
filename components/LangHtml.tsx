'use client';

import { useEffect } from 'react';

// Sets <html lang> per locale on the client (root layout renders a default).
export default function LangHtml({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
