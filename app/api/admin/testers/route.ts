import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  normalizeEmail,
  readSession,
  TESTER_SESSION_COOKIE
} from '@/lib/tester-auth';
import { issueAccessLink } from '@/lib/tester-invitations';
import {
  listTesters,
  removeTester,
  updateTester
} from '@/lib/tester-store';
import { removeAllDeviceConnections } from '@/lib/device-store';

export const runtime = 'nodejs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function adminSession() {
  const store = await cookies();
  const session = readSession(store.get(TESTER_SESSION_COOKIE)?.value);
  return session?.role === 'admin' ? session : null;
}

export async function GET() {
  if (!(await adminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, testers: await listTesters() });
}

export async function POST(req: Request) {
  const admin = await adminSession();
  if (!admin) return NextResponse.json({ ok: false }, { status: 401 });

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
    return NextResponse.json(
      { ok: false, reason: 'invalid-email' },
      { status: 400 }
    );
  }

  try {
    const result = await issueAccessLink({
      email,
      lang,
      origin: new URL(req.url).origin,
      invitedBy: admin.email,
      createIfMissing: true
    });
    return NextResponse.json({ ok: result.sent, tester: result.record });
  } catch (error) {
    console.error('Could not invite tester', error);
    return NextResponse.json({ ok: false, reason: 'mail' }, { status: 503 });
  }
}

export async function PATCH(req: Request) {
  const admin = await adminSession();
  if (!admin) return NextResponse.json({ ok: false }, { status: 401 });

  let email = '';
  let action = '';
  let lang = 'pl';
  try {
    const body = await req.json();
    email = normalizeEmail(typeof body?.email === 'string' ? body.email : '');
    action = typeof body?.action === 'string' ? body.action : '';
    lang = ['pl', 'en', 'no'].includes(body?.lang) ? body.lang : 'pl';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (action === 'resend') {
    try {
      const result = await issueAccessLink({
        email,
        lang,
        origin: new URL(req.url).origin,
        invitedBy: admin.email
      });
      return NextResponse.json({ ok: result.sent, tester: result.record });
    } catch (error) {
      console.error('Could not resend tester invite', error);
      return NextResponse.json({ ok: false, reason: 'mail' }, { status: 503 });
    }
  }

  if (action !== 'suspend' && action !== 'activate') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const tester = await updateTester(email, (record) => ({
    ...record,
    status: action === 'suspend' ? 'suspended' : 'active',
    magicTokenHash: action === 'suspend' ? undefined : record.magicTokenHash,
    magicTokenExpiresAt:
      action === 'suspend' ? undefined : record.magicTokenExpiresAt
  }));
  return tester
    ? NextResponse.json({ ok: true, tester })
    : NextResponse.json({ ok: false }, { status: 404 });
}

export async function DELETE(req: Request) {
  if (!(await adminSession())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const email = normalizeEmail(new URL(req.url).searchParams.get('email') || '');
  if (!email) return NextResponse.json({ ok: false }, { status: 400 });
  const removed = await removeTester(email);
  if (removed) await removeAllDeviceConnections(email);
  return NextResponse.json({ ok: removed });
}
