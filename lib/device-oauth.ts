import crypto from 'crypto';
import type { DeviceProvider } from '@/lib/device-store';

type OAuthState = {
  email: string;
  provider: DeviceProvider;
  lang: string;
  exp: number;
  nonce: string;
};

export type OAuthTokenResult = {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  scopes: string[];
  externalUserId?: string;
};

const OURA_AUTHORIZE_URL = 'https://cloud.ouraring.com/oauth/authorize';
const OURA_TOKEN_URL = 'https://api.ouraring.com/oauth/token';
const WITHINGS_AUTHORIZE_URL =
  'https://account.withings.com/oauth2_user/authorize2';
const WITHINGS_API_URL = 'https://wbsapi.withings.net';

function stateSecret(): string {
  const secret =
    process.env.DEVICE_TOKEN_SECRET || process.env.TESTER_AUTH_SECRET;
  if (!secret) throw new Error('OAuth state secret is not configured');
  return secret;
}

function sign(value: string): string {
  return crypto
    .createHmac('sha256', stateSecret())
    .update(value)
    .digest('base64url');
}

export function createOAuthState({
  email,
  provider,
  lang
}: {
  email: string;
  provider: DeviceProvider;
  lang: string;
}): string {
  const payload: OAuthState = {
    email,
    provider,
    lang,
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
    nonce: crypto.randomBytes(16).toString('base64url')
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function readOAuthState(value: string): OAuthState | null {
  const [encoded, signature] = value.split('.');
  if (!encoded || !signature) return null;
  const expected = sign(encoded);
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (
    given.length !== wanted.length ||
    !crypto.timingSafeEqual(given, wanted)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as OAuthState;
    if (
      !payload.email ||
      !['oura', 'withings'].includes(payload.provider) ||
      payload.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function publicAppUrl(requestUrl: string): string {
  return (process.env.PUBLIC_APP_URL || new URL(requestUrl).origin).replace(
    /\/$/,
    ''
  );
}

export function providerConfigured(provider: DeviceProvider): boolean {
  if (provider === 'oura') {
    return Boolean(process.env.OURA_CLIENT_ID && process.env.OURA_CLIENT_SECRET);
  }
  return Boolean(
    process.env.WITHINGS_CLIENT_ID && process.env.WITHINGS_CLIENT_SECRET
  );
}

export function callbackUrl(
  provider: DeviceProvider,
  requestUrl: string
): string {
  return `${publicAppUrl(requestUrl)}/api/integrations/${provider}/callback`;
}

export function authorizationUrl({
  provider,
  state,
  requestUrl
}: {
  provider: DeviceProvider;
  state: string;
  requestUrl: string;
}): string {
  const redirectUri = callbackUrl(provider, requestUrl);

  if (provider === 'oura') {
    const url = new URL(OURA_AUTHORIZE_URL);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', process.env.OURA_CLIENT_ID!);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', 'daily heartrate workout session');
    url.searchParams.set('state', state);
    return url.toString();
  }

  const url = new URL(WITHINGS_AUTHORIZE_URL);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', process.env.WITHINGS_CLIENT_ID!);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'user.info,user.metrics,user.activity');
  url.searchParams.set('state', state);
  return url.toString();
}

async function exchangeOuraCode(
  code: string,
  requestUrl: string
): Promise<OAuthTokenResult> {
  const response = await fetch(OURA_TOKEN_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      authorization: `Basic ${Buffer.from(
        `${process.env.OURA_CLIENT_ID}:${process.env.OURA_CLIENT_SECRET}`
      ).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: callbackUrl('oura', requestUrl)
    }),
    cache: 'no-store'
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) {
    throw new Error(`Oura token exchange failed (${response.status})`);
  }
  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    tokenType: body.token_type,
    expiresIn: Number(body.expires_in) || undefined,
    scopes: String(body.scope || '')
      .split(/\s+/)
      .filter(Boolean)
  };
}

function withingsSignature(
  params: Record<string, string | number>,
  clientSecret: string
): string {
  const values = Object.keys(params)
    .sort()
    .filter((key) => ['action', 'client_id', 'timestamp', 'nonce'].includes(key))
    .map((key) => String(params[key]))
    .join(',');
  return crypto.createHmac('sha256', clientSecret).update(values).digest('hex');
}

async function withingsPost(
  pathname: string,
  params: Record<string, string | number>
) {
  const response = await fetch(`${WITHINGS_API_URL}${pathname}`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      )
    ),
    cache: 'no-store'
  });
  const body = await response.json();
  if (!response.ok || body.status !== 0) {
    throw new Error(`Withings API failed (${body.status || response.status})`);
  }
  return body.body;
}

async function exchangeWithingsCode(
  code: string,
  requestUrl: string
): Promise<OAuthTokenResult> {
  const clientId = process.env.WITHINGS_CLIENT_ID!;
  const clientSecret = process.env.WITHINGS_CLIENT_SECRET!;
  const timestamp = Math.floor(Date.now() / 1000);
  const nonceParams = {
    action: 'getnonce',
    client_id: clientId,
    timestamp
  };
  const nonceBody = await withingsPost('/v2/signature', {
    ...nonceParams,
    signature: withingsSignature(nonceParams, clientSecret)
  });
  const nonce = String(nonceBody.nonce);
  const tokenParams = {
    action: 'requesttoken',
    client_id: clientId,
    nonce
  };
  const body = await withingsPost('/v2/oauth2', {
    ...tokenParams,
    signature: withingsSignature(tokenParams, clientSecret),
    grant_type: 'authorization_code',
    code,
    redirect_uri: callbackUrl('withings', requestUrl)
  });

  if (!body.access_token) throw new Error('Withings did not return a token');
  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    tokenType: body.token_type,
    expiresIn: Number(body.expires_in) || undefined,
    scopes: String(body.scope || '')
      .split(/[,\s]+/)
      .filter(Boolean),
    externalUserId: body.userid ? String(body.userid) : undefined
  };
}

export async function exchangeAuthorizationCode({
  provider,
  code,
  requestUrl
}: {
  provider: DeviceProvider;
  code: string;
  requestUrl: string;
}): Promise<OAuthTokenResult> {
  return provider === 'oura'
    ? exchangeOuraCode(code, requestUrl)
    : exchangeWithingsCode(code, requestUrl);
}

