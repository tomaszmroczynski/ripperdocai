import { NextResponse } from 'next/server';
import {
  createSession,
  TESTER_SESSION_COOKIE,
  TESTER_SESSION_MAX_AGE
} from '@/lib/tester-auth';
import { consumeAccessToken } from '@/lib/tester-invitations';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') || '';
  const lang = ['pl', 'en', 'no'].includes(url.searchParams.get('lang') || '')
    ? url.searchParams.get('lang')!
    : 'pl';

  const record = token ? await consumeAccessToken(token) : null;
  if (!record) {
    return NextResponse.redirect(
      new URL(`/${lang}/testers?error=invalid-link`, url.origin)
    );
  }

  const destination =
    record.role === 'admin'
      ? `/${lang}/admin/testers`
      : `/${lang}/testers?verified=1`;
  const response = NextResponse.redirect(new URL(destination, url.origin));
  response.cookies.set(
    TESTER_SESSION_COOKIE,
    createSession(record.email, record.role),
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: TESTER_SESSION_MAX_AGE
    }
  );
  return response;
}

