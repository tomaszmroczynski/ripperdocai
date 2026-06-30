import { NextResponse } from 'next/server';
import { TESTER_SESSION_COOKIE } from '@/lib/tester-auth';

export async function POST(req: Request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(TESTER_SESSION_COOKIE, '', {
    httpOnly: true,
    path: '/',
    maxAge: 0
  });
  return response;
}

