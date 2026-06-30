import {
  BlobPreconditionFailedError,
  get,
  put
} from '@vercel/blob';
import { normalizeEmail, type TesterRole } from '@/lib/tester-auth';

export type TesterStatus = 'invited' | 'active' | 'suspended';

export type TesterRecord = {
  email: string;
  role: TesterRole;
  status: TesterStatus;
  invitedAt: string;
  invitedBy?: string;
  verifiedAt?: string;
  lastLoginAt?: string;
  lastEmailSentAt?: string;
  magicTokenHash?: string;
  magicTokenExpiresAt?: string;
};

type TesterStore = {
  version: 1;
  testers: TesterRecord[];
};

type StoreSnapshot = {
  store: TesterStore;
  etag?: string;
};

const STORE_PATH = 'ripperdoc-access/testers.json';
const EMPTY_STORE: TesterStore = { version: 1, testers: [] };

function configured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)
  );
}

async function readSnapshot(): Promise<StoreSnapshot> {
  if (!configured()) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Private tester storage is not configured');
    }
    return { store: structuredClone(EMPTY_STORE) };
  }

  const result = await get(STORE_PATH, { access: 'private' });
  if (!result || result.statusCode !== 200 || !result.stream) {
    return { store: structuredClone(EMPTY_STORE) };
  }

  const store = (await new Response(result.stream).json()) as TesterStore;
  return {
    store: {
      version: 1,
      testers: Array.isArray(store.testers) ? store.testers : []
    },
    etag: result.blob.etag
  };
}

async function writeSnapshot(snapshot: StoreSnapshot): Promise<void> {
  if (!configured()) {
    throw new Error('Private tester storage is not configured');
  }

  await put(STORE_PATH, JSON.stringify(snapshot.store), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: Boolean(snapshot.etag),
    ifMatch: snapshot.etag,
    contentType: 'application/json',
    cacheControlMaxAge: 60
  });
}

export async function listTesters(): Promise<TesterRecord[]> {
  const { store } = await readSnapshot();
  return [...store.testers].sort((a, b) =>
    b.invitedAt.localeCompare(a.invitedAt)
  );
}

export async function findTester(
  email: string
): Promise<TesterRecord | undefined> {
  const normalized = normalizeEmail(email);
  const { store } = await readSnapshot();
  return store.testers.find((item) => item.email === normalized);
}

export async function mutateTesters(
  mutation: (records: TesterRecord[]) => void
): Promise<TesterRecord[]> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const snapshot = await readSnapshot();
    mutation(snapshot.store.testers);
    try {
      await writeSnapshot(snapshot);
      return snapshot.store.testers;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError && attempt < 3) {
        continue;
      }
      throw error;
    }
  }
  throw new Error('Could not update tester storage');
}

export async function upsertTester(
  record: TesterRecord
): Promise<TesterRecord> {
  const normalized = normalizeEmail(record.email);
  await mutateTesters((records) => {
    const index = records.findIndex((item) => item.email === normalized);
    const next = { ...record, email: normalized };
    if (index >= 0) records[index] = next;
    else records.push(next);
  });
  return { ...record, email: normalized };
}

export async function updateTester(
  email: string,
  update: (record: TesterRecord) => TesterRecord
): Promise<TesterRecord | null> {
  const normalized = normalizeEmail(email);
  let result: TesterRecord | null = null;
  await mutateTesters((records) => {
    const index = records.findIndex((item) => item.email === normalized);
    if (index < 0) return;
    result = update(records[index]);
    records[index] = result;
  });
  return result;
}

export async function removeTester(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email);
  let removed = false;
  await mutateTesters((records) => {
    const index = records.findIndex((item) => item.email === normalized);
    if (index >= 0) {
      records.splice(index, 1);
      removed = true;
    }
  });
  return removed;
}

