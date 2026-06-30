import { NextResponse } from 'next/server';
import {
  saveDeviceConnection,
  type DeviceProvider
} from '@/lib/device-store';
import {
  exchangeAuthorizationCode,
  readOAuthState
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
  const url = new URL(req.url);
  const state = readOAuthState(url.searchParams.get('state') || '');
  const session = await activeTesterSession();
  const lang = state?.lang && ['pl', 'en', 'no'].includes(state.lang)
    ? state.lang
    : 'pl';

  if (
    !provider ||
    !state ||
    state.provider !== provider ||
    !session ||
    session.email !== state.email ||
    url.searchParams.get('error')
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}/testers?error=authorization&provider=${provider || ''}`, url.origin)
    );
  }

  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(
      new URL(`/${lang}/testers?error=authorization&provider=${provider}`, url.origin)
    );
  }

  try {
    const token = await exchangeAuthorizationCode({
      provider,
      code,
      requestUrl: req.url
    });
    await saveDeviceConnection({
      email: session.email,
      provider,
      scopes: token.scopes,
      expiresIn: token.expiresIn,
      externalUserId: token.externalUserId,
      tokens: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        tokenType: token.tokenType
      }
    });
    return NextResponse.redirect(
      new URL(`/${lang}/testers?connected=${provider}`, url.origin)
    );
  } catch (error) {
    console.error(`Could not connect ${provider}`, error);
    return NextResponse.redirect(
      new URL(`/${lang}/testers?error=exchange&provider=${provider}`, url.origin)
    );
  }
}

