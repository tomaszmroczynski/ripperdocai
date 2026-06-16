import type { Metadata } from 'next';
import './globals.css';
import ClientEnhancements from '@/components/ClientEnhancements';

export const metadata: Metadata = {
  metadataBase: new URL('https://ripperdoc.ai'),
  title: 'Ripperdoc — Human First. Intelligence Amplified.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        {children}
        <ClientEnhancements />
      </body>
    </html>
  );
}
