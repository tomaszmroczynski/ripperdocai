import { NextRequest, NextResponse } from 'next/server';

const locales = ['no', 'en', 'pl'];
const defaultLocale = 'no';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const accept = (req.headers.get('accept-language') || '').toLowerCase();
  const detected = locales.find((l) => accept.includes(l)) || defaultLocale;

  const url = req.nextUrl.clone();
  url.pathname = `/${detected}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any path containing a dot (static files, bio-scan-3d.html, images)
  matcher: ['/((?!_next|.*\\..*).*)']
};
