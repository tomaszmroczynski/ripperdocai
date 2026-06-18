import { cookies } from 'next/headers';
import { isAuthed, COOKIE_NAME } from '@/lib/access';
import { CV_PDF_BASE64 } from '@/lib/cv-pdf';

export const runtime = 'nodejs';

// Serves the branded CV PDF only to visitors who unlocked the dossier.
export async function GET() {
  const store = await cookies();
  if (!isAuthed(store.get(COOKIE_NAME)?.value)) {
    return new Response('Unauthorized', { status: 401 });
  }
  const bytes = Buffer.from(CV_PDF_BASE64, 'base64');
  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="CV-Tomasz-Mroczynski.pdf"',
      'Cache-Control': 'private, no-store'
    }
  });
}
