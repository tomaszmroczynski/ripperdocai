import crypto from 'crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'fs/promises';
import path from 'path';
import { normalizeEmail } from '@/lib/tester-auth';
import { privateDataDir } from '@/lib/tester-store';

export type DeviceProvider = 'oura' | 'withings';

type TokenPayload = {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
};

type StoredConnection = {
  email: string;
  provider: DeviceProvider;
  connectedAt: string;
  updatedAt: string;
  scopes: string[];
  expiresAt?: string;
  externalUserId?: string;
  encryptedTokens: string;
};

export type DeviceConnectionSummary = Omit<
  StoredConnection,
  'encryptedTokens'
>;

type DeviceStore = {
  version: 1;
  connections: StoredConnection[];
};

const EMPTY_STORE: DeviceStore = { version: 1, connections: [] };
let mutationQueue: Promise<void> = Promise.resolve();

function storePath(): string {
  return path.join(privateDataDir(), 'device-connections.json');
}

function encryptionKey(): Buffer {
  const secret =
    process.env.DEVICE_TOKEN_SECRET || process.env.TESTER_AUTH_SECRET;
  if (!secret) {
    throw new Error('DEVICE_TOKEN_SECRET or TESTER_AUTH_SECRET is required');
  }
  return crypto.createHash('sha256').update(secret).digest();
}

function encryptTokens(payload: TokenPayload): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), 'utf8'),
    cipher.final()
  ]);
  return [
    iv.toString('base64url'),
    cipher.getAuthTag().toString('base64url'),
    encrypted.toString('base64url')
  ].join('.');
}

function decryptTokens(value: string): TokenPayload {
  const [iv, tag, encrypted] = value.split('.');
  if (!iv || !tag || !encrypted) throw new Error('Invalid encrypted token');
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    encryptionKey(),
    Buffer.from(iv, 'base64url')
  );
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'base64url')),
      decipher.final()
    ]).toString('utf8')
  ) as TokenPayload;
}

async function readStore(): Promise<DeviceStore> {
  try {
    const parsed = JSON.parse(await readFile(storePath(), 'utf8')) as DeviceStore;
    return {
      version: 1,
      connections: Array.isArray(parsed.connections) ? parsed.connections : []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return structuredClone(EMPTY_STORE);
    }
    throw error;
  }
}

async function writeStore(store: DeviceStore): Promise<void> {
  const directory = privateDataDir();
  const target = storePath();
  const temporary = `${target}.${process.pid}.${Date.now()}.tmp`;
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await writeFile(temporary, JSON.stringify(store, null, 2), {
    encoding: 'utf8',
    mode: 0o600
  });
  try {
    await rename(temporary, target);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== 'EEXIST' && code !== 'EPERM') throw error;
    await rm(target, { force: true });
    await rename(temporary, target);
  }
}

async function mutateStore(
  mutation: (connections: StoredConnection[]) => void
): Promise<void> {
  const previous = mutationQueue;
  let release!: () => void;
  mutationQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    const store = await readStore();
    mutation(store.connections);
    await writeStore(store);
  } finally {
    release();
  }
}

export async function listDeviceConnections(
  email: string
): Promise<DeviceConnectionSummary[]> {
  const normalized = normalizeEmail(email);
  const store = await readStore();
  return store.connections
    .filter((connection) => connection.email === normalized)
    .map(({ encryptedTokens: _tokens, ...summary }) => summary);
}

export async function saveDeviceConnection({
  email,
  provider,
  scopes,
  expiresIn,
  externalUserId,
  tokens
}: {
  email: string;
  provider: DeviceProvider;
  scopes: string[];
  expiresIn?: number;
  externalUserId?: string;
  tokens: TokenPayload;
}): Promise<void> {
  const normalized = normalizeEmail(email);
  const now = new Date();
  await mutateStore((connections) => {
    const index = connections.findIndex(
      (item) => item.email === normalized && item.provider === provider
    );
    const previous = index >= 0 ? connections[index] : undefined;
    const next: StoredConnection = {
      email: normalized,
      provider,
      connectedAt: previous?.connectedAt || now.toISOString(),
      updatedAt: now.toISOString(),
      scopes,
      expiresAt: expiresIn
        ? new Date(now.getTime() + expiresIn * 1000).toISOString()
        : undefined,
      externalUserId,
      encryptedTokens: encryptTokens(tokens)
    };
    if (index >= 0) connections[index] = next;
    else connections.push(next);
  });
}

export async function getDeviceTokens(
  email: string,
  provider: DeviceProvider
): Promise<TokenPayload | null> {
  const normalized = normalizeEmail(email);
  const store = await readStore();
  const connection = store.connections.find(
    (item) => item.email === normalized && item.provider === provider
  );
  return connection ? decryptTokens(connection.encryptedTokens) : null;
}

export async function removeDeviceConnection(
  email: string,
  provider: DeviceProvider
): Promise<boolean> {
  const normalized = normalizeEmail(email);
  let removed = false;
  await mutateStore((connections) => {
    const index = connections.findIndex(
      (item) => item.email === normalized && item.provider === provider
    );
    if (index >= 0) {
      connections.splice(index, 1);
      removed = true;
    }
  });
  return removed;
}

export async function removeAllDeviceConnections(
  email: string
): Promise<number> {
  const normalized = normalizeEmail(email);
  let removed = 0;
  await mutateStore((connections) => {
    for (let index = connections.length - 1; index >= 0; index -= 1) {
      if (connections[index].email === normalized) {
        connections.splice(index, 1);
        removed += 1;
      }
    }
  });
  return removed;
}
