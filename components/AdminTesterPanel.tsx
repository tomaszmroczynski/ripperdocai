'use client';

import { useState } from 'react';
import type { TesterRecord } from '@/lib/tester-store';

function dateLabel(value?: string): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
}

export default function AdminTesterPanel({
  initialTesters,
  adminEmail,
  lang
}: {
  initialTesters: TesterRecord[];
  adminEmail: string;
  lang: string;
}) {
  const [testers, setTesters] = useState(initialTesters);
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'working' | 'error'>('idle');
  const [notice, setNotice] = useState('');

  async function refresh() {
    const response = await fetch('/api/admin/testers');
    if (!response.ok) throw new Error('refresh');
    const data = await response.json();
    setTesters(data.testers);
  }

  async function invite(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    setState('working');
    setNotice('');
    try {
      const response = await fetch('/api/admin/testers', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, lang })
      });
      if (!response.ok) throw new Error('invite');
      await refresh();
      setEmail('');
      setNotice('Zaproszenie zostało wysłane.');
      setState('idle');
    } catch {
      setNotice('Nie udało się wysłać zaproszenia.');
      setState('error');
    }
  }

  async function action(
    testerEmail: string,
    actionName: 'resend' | 'suspend' | 'activate'
  ) {
    setState('working');
    setNotice('');
    try {
      const response = await fetch('/api/admin/testers', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: testerEmail, action: actionName, lang })
      });
      if (!response.ok) throw new Error(actionName);
      await refresh();
      setNotice(
        actionName === 'resend'
          ? 'Nowy link został wysłany.'
          : 'Status testera został zmieniony.'
      );
      setState('idle');
    } catch {
      setNotice('Nie udało się wykonać operacji.');
      setState('error');
    }
  }

  async function remove(testerEmail: string) {
    if (!window.confirm(`Usunąć dostęp dla ${testerEmail}?`)) return;
    setState('working');
    setNotice('');
    try {
      const response = await fetch(
        `/api/admin/testers?email=${encodeURIComponent(testerEmail)}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('delete');
      await refresh();
      setNotice('Tester został usunięty.');
      setState('idle');
    } catch {
      setNotice('Nie udało się usunąć testera.');
      setState('error');
    }
  }

  async function logout() {
    await fetch('/api/tester-auth/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div className="admin-access">
      <header className="admin-head">
        <div>
          <div className="sec-eyebrow">RipperSync · administracja</div>
          <h1>Testerzy</h1>
          <p>
            Zaproszenia są jednorazowe. Dostęp aktywuje się po potwierdzeniu
            adresu e-mail.
          </p>
        </div>
        <button className="btn btn-ghost" type="button" onClick={logout}>
          <i data-lucide="log-out" />
          <span>Wyloguj</span>
        </button>
      </header>

      <form className="admin-invite" onSubmit={invite}>
        <label htmlFor="tester-email">Adres nowego testera</label>
        <div className="admin-invite-row">
          <input
            id="tester-email"
            type="email"
            required
            autoComplete="email"
            placeholder="tester@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={state === 'working'}
          >
            <i data-lucide="user-plus" />
            <span>Dodaj i wyślij zaproszenie</span>
          </button>
        </div>
      </form>

      <div className={`admin-notice${state === 'error' ? ' error' : ''}`}>
        {notice}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Adres e-mail</th>
              <th>Status</th>
              <th>Zaproszony</th>
              <th>Ostatnie logowanie</th>
              <th><span className="sr-only">Akcje</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{adminEmail}</strong>
                <span className="admin-role">administrator</span>
              </td>
              <td><span className="status-dot active">aktywny</span></td>
              <td>konto systemowe</td>
              <td>—</td>
              <td />
            </tr>
            {testers
              .filter((tester) => tester.role !== 'admin')
              .map((tester) => (
                <tr key={tester.email}>
                  <td>{tester.email}</td>
                  <td>
                    <span className={`status-dot ${tester.status}`}>
                      {tester.status === 'active'
                        ? 'aktywny'
                        : tester.status === 'suspended'
                          ? 'wstrzymany'
                          : 'zaproszony'}
                    </span>
                  </td>
                  <td>{dateLabel(tester.invitedAt)}</td>
                  <td>{dateLabel(tester.lastLoginAt)}</td>
                  <td>
                    <div className="admin-actions">
                      <button
                        className="icon-btn"
                        type="button"
                        title="Wyślij nowy link"
                        aria-label={`Wyślij nowy link do ${tester.email}`}
                        onClick={() => action(tester.email, 'resend')}
                      >
                        <i data-lucide="send" />
                      </button>
                      <button
                        className="icon-btn"
                        type="button"
                        title={
                          tester.status === 'suspended'
                            ? 'Przywróć dostęp'
                            : 'Wstrzymaj dostęp'
                        }
                        aria-label={
                          tester.status === 'suspended'
                            ? `Przywróć dostęp dla ${tester.email}`
                            : `Wstrzymaj dostęp dla ${tester.email}`
                        }
                        onClick={() =>
                          action(
                            tester.email,
                            tester.status === 'suspended'
                              ? 'activate'
                              : 'suspend'
                          )
                        }
                      >
                        <i
                          data-lucide={
                            tester.status === 'suspended' ? 'play' : 'pause'
                          }
                        />
                      </button>
                      <button
                        className="icon-btn danger"
                        type="button"
                        title="Usuń testera"
                        aria-label={`Usuń ${tester.email}`}
                        onClick={() => remove(tester.email)}
                      >
                        <i data-lucide="trash-2" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

