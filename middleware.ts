import { NextResponse } from 'next/server';

// Locale redirect is handled in next.config.mjs (redirects), not here.
// This middleware is intentionally inert: the matcher below never matches a
// real request path, so the Edge function is never invoked.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/__inert_never_match__']
};
