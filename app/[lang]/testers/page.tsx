import Link from 'next/link';
import { cookies } from 'next/headers';
import QRCode from 'qrcode';
import TesterAccessForm from '@/components/TesterAccessForm';
import TesterConfigurator from '@/components/TesterConfigurator';
import {
  readSession,
  TESTER_SESSION_COOKIE
} from '@/lib/tester-auth';
import { findTester } from '@/lib/tester-store';
import { listDeviceConnections } from '@/lib/device-store';
import { providerConfigured } from '@/lib/device-oauth';

export default async function TestersPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  const query = await searchParams;
  const cookieStore = await cookies();
  const session = readSession(
    cookieStore.get(TESTER_SESSION_COOKIE)?.value
  );
  const tester =
    session?.role === 'tester' ? await findTester(session.email) : null;
  const hasAccess =
    session?.role === 'admin' ||
    (session?.role === 'tester' && tester?.status === 'active');
  const connections =
    session && hasAccess ? await listDeviceConnections(session.email) : [];
  const androidAppUrl = (() => {
    try {
      const candidate = process.env.ANDROID_APP_URL;
      if (!candidate) return undefined;
      const parsed = new URL(candidate);
      return ['http:', 'https:'].includes(parsed.protocol)
        ? parsed.toString()
        : undefined;
    } catch {
      return undefined;
    }
  })();
  const androidQr = androidAppUrl
    ? await QRCode.toDataURL(androidAppUrl, {
        width: 320,
        margin: 2,
        color: { dark: '#07090C', light: '#F4F5F7' }
      })
    : undefined;
  const notice = query.connected
    ? 'success'
    : query.error
      ? 'error'
      : undefined;

  return (
    <main className="access-page">
      <canvas
        data-neural-field
        data-sparks="2"
        data-density="0.00007"
        data-speed="0.1"
        className="bg-field"
      />
      <div className={`wrap access-wrap${session && hasAccess ? ' wide' : ''}`}>
        <Link className="gate-back" href={`/${lang}/ripper-sync`}>
          ← RipperSync
        </Link>
        {session && hasAccess ? (
          <TesterConfigurator
            email={session.email}
            role={session.role}
            lang={lang}
            providers={[
              {
                id: 'oura',
                name: 'Oura',
                description:
                  'Sen, gotowość, aktywność, tętno i historia treningów.',
                configured: providerConfigured('oura'),
                connection: connections.find((item) => item.provider === 'oura')
              },
              {
                id: 'withings',
                name: 'Withings',
                description:
                  'Masa ciała, skład ciała, ciśnienie, aktywność i sen.',
                configured: providerConfigured('withings'),
                connection: connections.find(
                  (item) => item.provider === 'withings'
                )
              }
            ]}
            androidAppUrl={androidAppUrl}
            androidQr={androidQr}
            notice={notice}
          />
        ) : (
          <TesterAccessForm lang={lang} />
        )}
      </div>
    </main>
  );
}
