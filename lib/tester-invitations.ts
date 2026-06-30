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
  mutateTesters,
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
  const previousLastEmailSentAt = record?.lastEmailSentAt;

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
  const publicOrigin = (process.env.PUBLIC_APP_URL || origin).replace(/\/$/, '');
  const verifyUrl = new URL('/api/tester-auth/verify', publicOrigin);
  verifyUrl.searchParams.set('token', token);
  verifyUrl.searchParams.set('lang', lang);

  try {
    await sendTesterAccessEmail({
      to: normalized,
      verifyUrl: verifyUrl.toString(),
      lang
    });
  } catch (error) {
    await updateTester(normalized, (current) => ({
      ...current,
      lastEmailSentAt: previousLastEmailSentAt,
      magicTokenHash: undefined,
      magicTokenExpiresAt: undefined
    }));
    throw error;
  }

  return { sent: true, record };
}

export async function consumeAccessToken(
  token: string
): Promise<TesterRecord | null> {
  const hash = hashMagicToken(token);
  const now = Date.now();
  let consumed: TesterRecord | null = null;

  await mutateTesters((records) => {
    const index = records.findIndex(
      (record) =>
        record.magicTokenHash === hash &&
        record.magicTokenExpiresAt &&
        new Date(record.magicTokenExpiresAt).getTime() > now &&
        record.status !== 'suspended'
    );
    if (index < 0) return;

    consumed = {
      ...records[index],
      status: 'active',
      verifiedAt: records[index].verifiedAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      magicTokenHash: undefined,
      magicTokenExpiresAt: undefined
    };
    records[index] = consumed;
  });

  return consumed;
}
