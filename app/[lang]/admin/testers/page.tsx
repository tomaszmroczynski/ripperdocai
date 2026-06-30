import Link from 'next/link';
import { cookies } from 'next/headers';
import AdminTesterPanel from '@/components/AdminTesterPanel';
import TesterAccessForm from '@/components/TesterAccessForm';
import {
  adminEmail,
  readSession,
  TESTER_SESSION_COOKIE
} from '@/lib/tester-auth';
import { listTesters } from '@/lib/tester-store';

export const dynamic = 'force-dynamic';

export default async function AdminTestersPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const session = readSession(
    cookieStore.get(TESTER_SESSION_COOKIE)?.value
  );
  const isAdmin = session?.role === 'admin';

  return (
    <main className="access-page">
      <canvas
        data-neural-field
        data-sparks="2"
        data-density="0.00006"
        data-speed="0.1"
        className="bg-field"
      />
      <div className="wrap access-wrap wide">
        <Link className="gate-back" href={`/${lang}/ripper-sync`}>
          ← RipperSync
        </Link>
        {isAdmin ? (
          <AdminTesterPanel
            initialTesters={await listTesters()}
            adminEmail={adminEmail()}
            lang={lang}
          />
        ) : (
          <TesterAccessForm lang={lang} admin />
        )}
      </div>
    </main>
  );
}

