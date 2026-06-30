import { cookies } from 'next/headers';
import {
  readSession,
  TESTER_SESSION_COOKIE,
  type TesterSession
} from '@/lib/tester-auth';
import { findTester } from '@/lib/tester-store';

export async function activeTesterSession(): Promise<TesterSession | null> {
  const cookieStore = await cookies();
  const session = readSession(
    cookieStore.get(TESTER_SESSION_COOKIE)?.value
  );
  if (!session) return null;
  if (session.role === 'admin') return session;

  const tester = await findTester(session.email);
  return tester?.status === 'active' ? session : null;
}

