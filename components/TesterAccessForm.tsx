'use client';

import { useState } from 'react';

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  submit: string;
  sending: string;
  sentTitle: string;
  sent: string;
  error: string;
};

const COPY: Record<string, Copy> = {
  pl: {
    eyebrow: 'RipperSync · dostęp prywatny',
    title: 'Wejdź do programu testowego',
    description:
      'Podaj zaproszony adres e-mail. Wyślemy jednorazowy link, który potwierdzi adres i otworzy dostęp.',
    placeholder: 'adres e-mail',
    submit: 'Wyślij link',
    sending: 'Wysyłanie…',
    sentTitle: 'Sprawdź skrzynkę',
    sent:
      'Jeśli ten adres ma dostęp, wysłaliśmy na niego jednorazowy link. Będzie aktywny przez 24 godziny.',
    error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.'
  },
  en: {
    eyebrow: 'RipperSync · private access',
    title: 'Enter the test program',
    description:
      'Enter your invited email address. We will send a one-time link that confirms it and opens access.',
    placeholder: 'email address',
    submit: 'Send access link',
    sending: 'Sending…',
    sentTitle: 'Check your inbox',
    sent:
      'If this address has access, we sent it a one-time link. The link remains active for 24 hours.',
    error: 'The message could not be sent. Please try again shortly.'
  },
  no: {
    eyebrow: 'RipperSync · privat tilgang',
    title: 'Åpne testprogrammet',
    description:
      'Skriv inn den inviterte e-postadressen. Vi sender en engangslenke som bekrefter adressen og åpner tilgangen.',
    placeholder: 'e-postadresse',
    submit: 'Send tilgangslenke',
    sending: 'Sender…',
    sentTitle: 'Sjekk innboksen',
    sent:
      'Hvis adressen har tilgang, har vi sendt en engangslenke. Den er aktiv i 24 timer.',
    error: 'Meldingen kunne ikke sendes. Prøv igjen om litt.'
  }
};

export default function TesterAccessForm({
  lang,
  admin = false
}: {
  lang: string;
  admin?: boolean;
}) {
  const c = COPY[lang] || COPY.en;
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || state === 'sending') return;
    setState('sending');
    try {
      const response = await fetch('/api/tester-auth/request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, lang })
      });
      setState(response.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="access-shell">
      <div className="access-panel">
        <div className="access-mark">
          <i data-lucide={admin ? 'shield-check' : 'fingerprint'} />
        </div>
        <div className="gate-eyebrow">
          {admin ? 'RipperSync · administracja' : c.eyebrow}
        </div>
        {state === 'sent' ? (
          <>
            <h1 className="gate-title">{c.sentTitle}</h1>
            <p className="gate-desc">{c.sent}</p>
          </>
        ) : (
          <>
            <h1 className="gate-title">
              {admin ? 'Zaloguj się do panelu' : c.title}
            </h1>
            <p className="gate-desc">{c.description}</p>
            <form className="gate-form" onSubmit={submit}>
              <input
                className="gate-input access-email"
                type="email"
                autoComplete="email"
                required
                placeholder={c.placeholder}
                aria-label={c.placeholder}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state === 'error') setState('idle');
                }}
              />
              <button
                className="btn btn-primary gate-btn"
                type="submit"
                disabled={state === 'sending'}
              >
                <i data-lucide="mail" />
                <span>{state === 'sending' ? c.sending : c.submit}</span>
              </button>
            </form>
            <p
              className={`gate-error${state === 'error' ? ' show' : ''}`}
              role="alert"
            >
              {c.error}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

