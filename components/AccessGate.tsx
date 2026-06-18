'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type GateCopy = {
  eyebrow: string;
  title: string;
  desc: string;
  placeholder: string;
  button: string;
  verifying: string;
  error: string;
  granted: string;
};

const COPY: Record<string, GateCopy> = {
  no: {
    eyebrow: 'Dossier · privat tilgang',
    title: 'Skriv inn tilgangsnøkkel',
    desc: 'Denne delen er privat. Skriv inn koden fra visittkortet mitt for å åpne dossieret.',
    placeholder: 'tilgangsnøkkel',
    button: 'Lås opp',
    verifying: 'Verifiserer…',
    error: 'Feil kode. Prøv igjen.',
    granted: 'Tilgang innvilget'
  },
  en: {
    eyebrow: 'Dossier · private access',
    title: 'Enter access key',
    desc: 'This section is private. Enter the code from my business card to open the dossier.',
    placeholder: 'access key',
    button: 'Unlock',
    verifying: 'Verifying…',
    error: 'Invalid code. Try again.',
    granted: 'Access granted'
  },
  pl: {
    eyebrow: 'Dossier · dostęp prywatny',
    title: 'Wprowadź klucz dostępu',
    desc: 'Ta sekcja jest prywatna. Wpisz kod z mojej wizytówki, aby otworzyć dossier.',
    placeholder: 'klucz dostępu',
    button: 'Odblokuj',
    verifying: 'Weryfikacja…',
    error: 'Nieprawidłowy kod. Spróbuj ponownie.',
    granted: 'Dostęp przyznany'
  }
};

export default function AccessGate({ lang }: { lang: string }) {
  const c = COPY[lang] ?? COPY.en;
  const [code, setCode] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Boot the neural-field constellation behind the gate.
    // @ts-expect-error injected global
    window.RipperdocNeuralFieldBoot?.();
    inputRef.current?.focus();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (res.ok) {
        setState('ok');
        window.location.reload();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  return (
    <main className="gate">
      <canvas data-neural-field data-sparks="3" data-density="0.00009" data-speed="0.12" />
      <div className="wrap gate-in">
        <Link className="gate-back" href={`/${lang}`}>
          ← Ripperdoc
        </Link>
        <div className="gate-card">
          <div className="gate-ring">
            <i data-lucide="scan-eye" />
          </div>
          <div className="gate-eyebrow">{c.eyebrow}</div>
          <h1 className="gate-title">{c.title}</h1>
          <p className="gate-desc">{c.desc}</p>
          <form className="gate-form" onSubmit={submit}>
            <input
              ref={inputRef}
              className="gate-input"
              type="text"
              autoComplete="off"
              spellCheck={false}
              placeholder={c.placeholder}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (state === 'error') setState('idle');
              }}
              aria-label={c.placeholder}
            />
            <button className="btn btn-primary gate-btn" type="submit" disabled={state === 'loading' || state === 'ok'}>
              <i data-lucide="unlock" />
              <span>{state === 'loading' ? c.verifying : state === 'ok' ? c.granted : c.button}</span>
            </button>
          </form>
          <p className={`gate-error${state === 'error' ? ' show' : ''}`} role="alert">
            {c.error}
          </p>
        </div>
      </div>
    </main>
  );
}
