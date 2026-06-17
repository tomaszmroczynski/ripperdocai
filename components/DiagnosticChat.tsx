'use client';

import { useEffect, useRef, useState } from 'react';

export type DiagStrings = {
  greeting: string;
  placeholder: string;
  send: string;
  thinking: string;
  briefHint: string;
  emailPlaceholder: string;
  approve: string;
  sending: string;
  sentOk: string;
  notConfigured: string;
  tooLong: string;
  error: string;
};

type Msg = { role: 'user' | 'assistant'; content: string; local?: boolean };

const BRIEF_MARKER = '===BRIEF===';

export default function DiagnosticChat({
  lang,
  t
}: {
  lang: string;
  t: DiagStrings;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: t.greeting, local: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<string | null>(null);
  const [contact, setContact] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'done'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, brief, submitState]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user', content: text } as Msg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const payload = next
        .filter((m) => !m.local)
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lang, messages: payload })
      });
      const data = await res.json();
      if (data?.error === 'not_configured') {
        setMessages((m) => [...m, { role: 'assistant', content: t.notConfigured }]);
      } else if (data?.error === 'too_long') {
        setMessages((m) => [...m, { role: 'assistant', content: t.tooLong }]);
      } else if (typeof data?.text === 'string' && data.text) {
        setMessages((m) => [...m, { role: 'assistant', content: data.text }]);
        if (data.text.includes(BRIEF_MARKER)) {
          setBrief(data.text.split(BRIEF_MARKER)[1].trim());
        }
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: t.error }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  async function approve() {
    if (!brief || submitState === 'sending') return;
    setSubmitState('sending');
    try {
      await fetch('/api/diagnostic/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ brief, contact, lang })
      });
    } catch {
      /* still confirm to the user; brief is shown above */
    }
    setSubmitState('done');
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="diag">
      <div className="diag-log" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`diag-msg diag-${m.role}`}>
            <div className="diag-bubble">{m.content}</div>
          </div>
        ))}
        {loading && (
          <div className="diag-msg diag-assistant">
            <div className="diag-bubble diag-typing">{t.thinking}</div>
          </div>
        )}
      </div>

      {!brief && (
        <div className="diag-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={t.placeholder}
            rows={1}
          />
          <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()}>
            {t.send}
          </button>
        </div>
      )}

      {brief && submitState !== 'done' && (
        <div className="diag-approve">
          <p className="diag-hint">{t.briefHint}</p>
          <input
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={t.emailPlaceholder}
          />
          <button className="btn btn-primary" onClick={approve} disabled={submitState === 'sending'}>
            {submitState === 'sending' ? t.sending : t.approve}
          </button>
        </div>
      )}

      {submitState === 'done' && <div className="diag-done">{t.sentOk}</div>}
    </div>
  );
}
