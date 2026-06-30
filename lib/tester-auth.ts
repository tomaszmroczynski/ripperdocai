import crypto from 'crypto';

export type TesterRole = 'admin' | 'tester';

export type TesterSession = {
  email: string;
  role: TesterRole;
  exp: number;
};

export const TESTER_SESSION_COOKIE = 'rd_tester_session';
export const TESTER_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const DEV_SECRET = 'ripperdoc-tester-session-local-only';

function authSecret(): string {
  const secret = process.env.TESTER_AUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('TESTER_AUTH_SECRET is not configured');
  }
  return DEV_SECRET;
}

export function normalizeEmail(value = ''): string {
  return value.trim().toLowerCase();
}

export function adminEmail(): string {
  return normalizeEmail(
    process.env.TESTER_ADMIN_EMAIL || 'tomaszmroczynski@complet-ai.no'
  );
}

export function isAdminEmail(email: string): boolean {
  return normalizeEmail(email) === adminEmail();
}

export function hashMagicToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function newMagicToken(): string {
  return crypto.randomBytes(32).toString('base64url');
}

function sign(value: string): string {
  return crypto
    .createHmac('sha256', authSecret())
    .update(value)
    .digest('base64url');
}

export function createSession(email: string, role: TesterRole): string {
  const payload: TesterSession = {
    email: normalizeEmail(email),
    role,
    exp: Math.floor(Date.now() / 1000) + TESTER_SESSION_MAX_AGE
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function readSession(cookieValue?: string): TesterSession | null {
  if (!cookieValue) return null;
  const [encoded, signature] = cookieValue.split('.');
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const givenBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    givenBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(givenBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as TesterSession;
    if (
      !parsed.email ||
      !['admin', 'tester'].includes(parsed.role) ||
      parsed.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

