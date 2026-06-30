import {
  adminEmail,
  hashMagicToken,
  isAdminEmail,
  newMagicToken,
  normalizeEmail,
  type TesterRole
} from '@/lib/tester-auth';
import { sendTesterAccessEmail } from '@/lib/tester-mail';
import {
  findTester,
  updateTester,
  upsertTester,
  type TesterRecord
} from '@/lib/tester-store';

const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;

export async function issueAccessLink({
  email,
  lang,
  origin,
  invitedBy,
  createIfMissing = false
}: {
  email: string;
  lang: string;
  origin: string;
  invitedBy?: string;
  createIfMissing?: boolean;
}): Promise<{ sent: boolean; record?: TesterRecord }> {
  const normalized = normalizeEmail(email);
  const admin = isAdminEmail(normalized);
  let record = await findTester(normalized);

  if (!record && !admin && !createIfMissing) return { sent: false };

  const now = new Date();
  const token = newMagicToken();
  const role: TesterRole = admin ? 'admin' : 'tester';
  const next: TesterRecord = {
    email: normalized,
    role,
    status: record?.status === 'suspended' ? 'suspended' : record?.status || 'invited',
    invitedAt: record?.invitedAt || now.toISOString(),
    invitedBy: record?.invitedBy || invitedBy || adminEmail(),
    verifiedAt: record?.verifiedAt,
    lastLoginAt: record?.lastLoginAt,
    lastEmailSentAt: now.toISOString(),
    magicTokenHash: hashMagicToken(token),
    magicTokenExpiresAt: new Date(now.getTime() + TOKEN_LIFETIME_MS).toISOString()
  };

  if (next.status === 'suspended') return { sent: false, record: next };

  record = await upsertTester(next);
  const verifyUrl = new URL('/api/tester-auth/verify', origin);
  verifyUrl.searchParams.set('token', token);
  verifyUrl.searchParams.set('lang', lang);

  await sendTesterAccessEmail({
    to: normalized,
    verifyUrl: verifyUrl.toString(),
    lang
  });

  return { sent: true, record };
}

export async function consumeAccessToken(
  token: string
): Promise<TesterRecord | null> {
  const hash = hashMagicToken(token);
  const now = Date.now();
  let matched: TesterRecord | undefined;

  const candidates = [adminEmail()];
  const admin = await findTester(adminEmail());
  if (admin) candidates[0] = admin.email;

  // The store is intentionally small during the test program.
  const { listTesters } = await import('@/lib/tester-store');
  const records = await listTesters();
  matched = records.find(
    (record) =>
      record.magicTokenHash === hash &&
      record.magicTokenExpiresAt &&
      new Date(record.magicTokenExpiresAt).getTime() > now &&
      record.status !== 'suspended'
  );

  if (!matched) return null;

  return updateTester(matched.email, (record) => ({
    ...record,
    status: 'active',
    verifiedAt: record.verifiedAt || new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    magicTokenHash: undefined,
    magicTokenExpiresAt: undefined
  }));
}

