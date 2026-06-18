import { NextResponse } from 'next/server';
import { codeMatches, expectedToken, COOKIE_NAME } from '@/lib/access';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let code = '';
  try {
    const body = await req.json();
    code = typeof body?.code === 'string' ? body.code : '';
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!codeMatches(code)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === 'production'
  });
  return res;
}

// Allow signing out (clears the access cookie).
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
