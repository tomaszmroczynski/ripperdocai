import { NextResponse } from 'next/server';
import type { DeviceProvider } from '@/lib/device-store';
import {
  authorizationUrl,
  createOAuthState,
  providerConfigured
} from '@/lib/device-oauth';
import { activeTesterSession } from '@/lib/tester-session';

export const runtime = 'nodejs';

function providerFrom(value: string): DeviceProvider | null {
  return value === 'oura' || value === 'withings' ? value : null;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await context.params;
  const provider = providerFrom(rawProvider);
  const langParam = new URL(req.url).searchParams.get('lang') || 'pl';
  const lang = ['pl', 'en', 'no'].includes(langParam) ? langParam : 'pl';
  const session = await activeTesterSession();

  if (!provider || !session) {
    return NextResponse.redirect(
      new URL(`/${lang}/testers?error=access`, req.url)
    );
  }
  if (!providerConfigured(provider)) {
    return NextResponse.redirect(
      new URL(`/${lang}/testers?error=not-configured&provider=${provider}`, req.url)
    );
  }

  const state = createOAuthState({
    email: session.email,
    provider,
    lang
  });
  return NextResponse.redirect(
    authorizationUrl({ provider, state, requestUrl: req.url })
  );
}

