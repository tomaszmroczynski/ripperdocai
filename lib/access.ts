import crypto from 'crypto';

// Shared access code (printed on the business card) + a server secret used to
// derive the cookie token. Both come from env in production; the defaults keep
// local dev working. Set ACCESS_CODE and ACCESS_SECRET on Vercel.
export const ACCESS_CODE = process.env.ACCESS_CODE || 'RIPPERDOC';
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'ripperdoc-dossier-dev-secret';

export const COOKIE_NAME = 'rd_access';

export function normalize(s = ''): string {
  return s.trim().toUpperCase();
}

// The cookie value: a hash that cannot be forged without the server secret.
export function expectedToken(): string {
  return crypto
    .createHash('sha256')
    .update(`${ACCESS_SECRET}:${normalize(ACCESS_CODE)}`)
    .digest('hex');
}

export function codeMatches(input: string): boolean {
  return normalize(input) === normalize(ACCESS_CODE);
}

export function isAuthed(cookieValue?: string): boolean {
  return !!cookieValue && cookieValue === expectedToken();
}
