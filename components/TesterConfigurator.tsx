'use client';

import Link from 'next/link';
import { useState } from 'react';
import type {
  DeviceConnectionSummary,
  DeviceProvider
} from '@/lib/device-store';

type ProviderView = {
  id: DeviceProvider;
  name: string;
  description: string;
  configured: boolean;
  connection?: DeviceConnectionSummary;
};

const COPY: Record<
  string,
  {
    eyebrow: string;
    title: string;
    lede: string;
    account: string;
    sources: string;
    app: string;
    connected: string;
    connect: string;
    reconnect: string;
    disconnect: string;
    missing: string;
    androidTitle: string;
    androidBody: string;
    androidReady: string;
    androidMissing: string;
    download: string;
    qrAlt: string;
    logout: string;
    admin: string;
    success: string;
    error: string;
  }
> = {
  pl: {
    eyebrow: 'RipperSync · konfiguracja',
    title: 'Połącz swoje źródła danych',
    lede:
      'Ty wybierasz urządzenia i zakres danych. Każde połączenie wymaga twojej zgody i możesz je odłączyć w dowolnym momencie.',
    account: 'Konto potwierdzone',
    sources: 'Źródła danych',
    app: 'Aplikacja Android',
    connected: 'Połączono',
    connect: 'Połącz konto',
    reconnect: 'Połącz ponownie',
    disconnect: 'Odłącz',
    missing: 'Wymaga konfiguracji administratora',
    androidTitle: 'RipperSync na Androida',
    androidBody:
      'Aplikacja łączy urządzenie z Health Connect i przekazuje wybrane sygnały do twojej prywatnej infrastruktury.',
    androidReady: 'Zeskanuj kod telefonem albo otwórz link bezpośrednio.',
    androidMissing: 'Link do aplikacji nie został jeszcze skonfigurowany.',
    download: 'Pobierz aplikację',
    qrAlt: 'Kod QR prowadzący do aplikacji RipperSync na Androida',
    logout: 'Wyloguj',
    admin: 'Panel testerów',
    success: 'Źródło danych zostało połączone.',
    error: 'Nie udało się zakończyć połączenia. Spróbuj ponownie.'
  },
  en: {
    eyebrow: 'RipperSync · setup',
    title: 'Connect your data sources',
    lede:
      'You choose the devices and data scope. Every connection requires your consent and can be removed at any time.',
    account: 'Account confirmed',
    sources: 'Data sources',
    app: 'Android app',
    connected: 'Connected',
    connect: 'Connect account',
    reconnect: 'Reconnect',
    disconnect: 'Disconnect',
    missing: 'Requires administrator setup',
    androidTitle: 'RipperSync for Android',
    androidBody:
      'The app connects your device to Health Connect and sends selected signals to your private infrastructure.',
    androidReady: 'Scan the code with your phone or open the link directly.',
    androidMissing: 'The application link has not been configured yet.',
    download: 'Download app',
    qrAlt: 'QR code linking to the RipperSync Android app',
    logout: 'Sign out',
    admin: 'Tester panel',
    success: 'The data source has been connected.',
    error: 'The connection could not be completed. Please try again.'
  },
  no: {
    eyebrow: 'RipperSync · oppsett',
    title: 'Koble til datakildene dine',
    lede:
      'Du velger enhetene og dataomfanget. Hver tilkobling krever ditt samtykke og kan fjernes når som helst.',
    account: 'Konto bekreftet',
    sources: 'Datakilder',
    app: 'Android-app',
    connected: 'Tilkoblet',
    connect: 'Koble til konto',
    reconnect: 'Koble til på nytt',
    disconnect: 'Koble fra',
    missing: 'Krever oppsett av administrator',
    androidTitle: 'RipperSync for Android',
    androidBody:
      'Appen kobler enheten til Health Connect og sender valgte signaler til din private infrastruktur.',
    androidReady: 'Skann koden med telefonen eller åpne lenken direkte.',
    androidMissing: 'Lenken til appen er ikke konfigurert ennå.',
    download: 'Last ned appen',
    qrAlt: 'QR-kode som peker til RipperSync-appen for Android',
    logout: 'Logg ut',
    admin: 'Testerpanel',
    success: 'Datakilden er koblet til.',
    error: 'Tilkoblingen kunne ikke fullføres. Prøv igjen.'
  }
};

function formatDate(value: string, lang: string): string {
  return new Intl.DateTimeFormat(
    lang === 'pl' ? 'pl-PL' : lang === 'no' ? 'nb-NO' : 'en-GB',
    { dateStyle: 'medium' }
  ).format(new Date(value));
}

export default function TesterConfigurator({
  email,
  role,
  lang,
  providers,
  androidAppUrl,
  androidQr,
  notice
}: {
  email: string;
  role: 'admin' | 'tester';
  lang: string;
  providers: ProviderView[];
  androidAppUrl?: string;
  androidQr?: string;
  notice?: 'success' | 'error';
}) {
  const c = COPY[lang] || COPY.en;
  const [busy, setBusy] = useState<DeviceProvider | 'logout' | null>(null);
  const [localError, setLocalError] = useState('');

  async function disconnect(provider: DeviceProvider) {
    setBusy(provider);
    setLocalError('');
    try {
      const response = await fetch(`/api/integrations/${provider}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('disconnect');
      window.location.reload();
    } catch {
      setLocalError(c.error);
      setBusy(null);
    }
  }

  async function logout() {
    setBusy('logout');
    await fetch('/api/tester-auth/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div className="setup">
      <header className="setup-head">
        <div>
          <div className="sec-eyebrow">{c.eyebrow}</div>
          <h1>{c.title}</h1>
          <p>{c.lede}</p>
        </div>
        <div className="setup-head-actions">
          {role === 'admin' && (
            <Link className="btn btn-ghost" href={`/${lang}/admin/testers`}>
              <i data-lucide="users" />
              <span>{c.admin}</span>
            </Link>
          )}
          <button
            className="icon-btn"
            type="button"
            title={c.logout}
            aria-label={c.logout}
            disabled={busy === 'logout'}
            onClick={logout}
          >
            <i data-lucide="log-out" />
          </button>
        </div>
      </header>

      <ol className="setup-progress" aria-label="Konfiguracja RipperSync">
        <li className="done">
          <span>1</span>
          <strong>{c.account}</strong>
          <small>{email}</small>
        </li>
        <li className={providers.some((item) => item.connection) ? 'done' : 'current'}>
          <span>2</span>
          <strong>{c.sources}</strong>
          <small>Oura · Withings</small>
        </li>
        <li className={androidAppUrl ? 'current' : ''}>
          <span>3</span>
          <strong>{c.app}</strong>
          <small>Health Connect</small>
        </li>
      </ol>

      {(notice || localError) && (
        <div className={`setup-notice ${notice === 'success' ? 'ok' : 'error'}`}>
          <i data-lucide={notice === 'success' ? 'check-circle-2' : 'circle-alert'} />
          <span>{localError || (notice === 'success' ? c.success : c.error)}</span>
        </div>
      )}

      <section className="setup-section">
        <div className="setup-section-title">
          <span>02</span>
          <h2>{c.sources}</h2>
        </div>
        <div className="device-grid">
          {providers.map((provider) => (
            <article className="device-card" key={provider.id}>
              <div className="device-card-head">
                <div className={`device-icon ${provider.id}`}>
                  <i data-lucide={provider.id === 'oura' ? 'circle-dot' : 'activity'} />
                </div>
                <div>
                  <h3>{provider.name}</h3>
                  <span
                    className={`status-dot ${
                      provider.connection
                        ? 'active'
                        : provider.configured
                          ? 'invited'
                          : 'muted'
                    }`}
                  >
                    {provider.connection
                      ? c.connected
                      : provider.configured
                        ? c.connect
                        : c.missing}
                  </span>
                </div>
              </div>
              <p>{provider.description}</p>
              {provider.connection && (
                <div className="device-meta">
                  <span>{formatDate(provider.connection.connectedAt, lang)}</span>
                  <span>{provider.connection.scopes.length} zakresy danych</span>
                </div>
              )}
              <div className="device-actions">
                {provider.configured && (
                  <a
                    className={provider.connection ? 'btn btn-ghost' : 'btn btn-primary'}
                    href={`/api/integrations/${provider.id}/start?lang=${lang}`}
                  >
                    <i data-lucide={provider.connection ? 'refresh-cw' : 'link'} />
                    <span>{provider.connection ? c.reconnect : c.connect}</span>
                  </a>
                )}
                {provider.connection && (
                  <button
                    className="btn btn-ghost"
                    type="button"
                    disabled={busy === provider.id}
                    onClick={() => disconnect(provider.id)}
                  >
                    <i data-lucide="unlink" />
                    <span>{c.disconnect}</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="setup-section">
        <div className="setup-section-title">
          <span>03</span>
          <h2>{c.app}</h2>
        </div>
        <div className="android-setup">
          <div className="android-copy">
            <div className="device-icon android">
              <i data-lucide="smartphone" />
            </div>
            <h3>{c.androidTitle}</h3>
            <p>{c.androidBody}</p>
            <p className="android-status">
              {androidAppUrl ? c.androidReady : c.androidMissing}
            </p>
            {androidAppUrl && (
              <a
                className="btn btn-primary"
                href={androidAppUrl}
                target="_blank"
                rel="noreferrer"
              >
                <i data-lucide="download" />
                <span>{c.download}</span>
              </a>
            )}
          </div>
          <div className={`android-qr${androidQr ? '' : ' unavailable'}`}>
            {androidQr ? (
              <img src={androidQr} alt={c.qrAlt} />
            ) : (
              <i data-lucide="qr-code" aria-hidden="true" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
