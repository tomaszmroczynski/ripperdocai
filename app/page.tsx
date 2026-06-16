import { redirect } from 'next/navigation';

// Real route for "/" so the domain root always resolves (redirects to default locale).
export default function RootPage() {
  redirect('/no');
}
