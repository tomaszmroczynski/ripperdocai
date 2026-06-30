import { NextResponse } from 'next/server';
import {
  removeDeviceConnection,
  type DeviceProvider
} from '@/lib/device-store';
import { activeTesterSession } from '@/lib/tester-session';

export const runtime = 'nodejs';

export async function DELETE(
  req: Request,
  context: { params: Promise<{ provider: string }> }
) {
  const session = await activeTesterSession();
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  const { provider } = await context.params;
  if (provider !== 'oura' && provider !== 'withings') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({
    ok: await removeDeviceConnection(
      session.email,
      provider as DeviceProvider
    )
  });
}

