import { NextResponse } from 'next/server';
import { issueAccessLink } from '@/lib/tester-invitations';
import { findTester } from '@/lib/tester-store';
import { isAdminEmail, normalizeEmail } from '@/lib/tester-auth';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = '';
  let lang = 'pl';
  try {
    const body = await req.json();
    email = normalizeEmail(typeof body?.email === 'string' ? body.email : '');
    lang = ['pl', 'en', 'no'].includes(body?.lang) ? body.lang : 'pl';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const record = await findTester(email);
  const authorized = isAdminEmail(email) || Boolean(record);
  const sentRecently =
    record?.lastEmailSentAt &&
    Date.now() - new Date(record.lastEmailSentAt).getTime() < 5 * 60_000;

  if (authorized && !sentRecently && record?.status !== 'suspended') {
    try {
      await issueAccessLink({
        email,
        lang,
        origin: new URL(req.url).origin
      });
    } catch (error) {
      console.error('Could not send tester access email', error);
      return NextResponse.json({ ok: false, reason: 'mail' }, { status: 503 });
    }
  }

  // The same response is returned for unknown addresses to avoid exposing the
  // private tester list.
  return NextResponse.json({ ok: true });
}
