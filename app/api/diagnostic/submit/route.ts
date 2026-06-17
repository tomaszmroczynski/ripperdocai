import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Emails the client-approved brief to the site owner via Resend (if configured).
// Env: RESEND_API_KEY, LEAD_EMAIL_TO, optional LEAD_EMAIL_FROM.
// If not configured, returns ok with emailed:false so the client still sees the brief.
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
  const b = body as { brief?: string; contact?: string; lang?: string };
  const brief = String(b?.brief || '').slice(0, 8000);
  const contact = String(b?.contact || '').slice(0, 200);
  const lang = String(b?.lang || '').slice(0, 8);
  if (!brief) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM || 'Ripperdoc <onboarding@resend.dev>';
  if (!key || !to) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from,
        to,
        subject: 'Ripperdoc — new diagnostic brief',
        text: `Language: ${lang}\nContact: ${contact || '(not provided)'}\n\n${brief}`
      })
    });
    return NextResponse.json({ ok: true, emailed: res.ok });
  } catch {
    return NextResponse.json({ ok: true, emailed: false });
  }
}
