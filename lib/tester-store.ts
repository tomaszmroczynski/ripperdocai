import { mkdir, readFile, rename, rm, writeFile } from 'fs/promises';
import path from 'path';
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

const EMPTY_STORE: TesterStore = { version: 1, testers: [] };
let mutationQueue: Promise<void> = Promise.resolve();

export function privateDataDir(): string {
  return process.env.TESTER_DATA_DIR || path.join(process.cwd(), 'data');
}

function storePath(): string {
  return path.join(privateDataDir(), 'testers.json');
}

async function readStore(): Promise<TesterStore> {
  try {
    const parsed = JSON.parse(await readFile(storePath(), 'utf8')) as TesterStore;
    return {
      version: 1,
      testers: Array.isArray(parsed.testers) ? parsed.testers : []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return structuredClone(EMPTY_STORE);
    }
    throw error;
  }
}

async function writeStore(store: TesterStore): Promise<void> {
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

export async function listTesters(): Promise<TesterRecord[]> {
  const store = await readStore();
  return [...store.testers].sort((a, b) =>
    b.invitedAt.localeCompare(a.invitedAt)
  );
}

export async function findTester(
  email: string
): Promise<TesterRecord | undefined> {
  const normalized = normalizeEmail(email);
  const store = await readStore();
  return store.testers.find((item) => item.email === normalized);
}

export async function mutateTesters(
  mutation: (records: TesterRecord[]) => void
): Promise<TesterRecord[]> {
  const previous = mutationQueue;
  let release!: () => void;
  mutationQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;

  try {
    const store = await readStore();
    mutation(store.testers);
    await writeStore(store);
    return store.testers;
  } finally {
    release();
  }
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

