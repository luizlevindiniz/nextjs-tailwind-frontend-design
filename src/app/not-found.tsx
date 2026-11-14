import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 text-center'>
      <h1 className='font-heading text-mobile-h3 lg:text-desktop-h3'>
        Page not found
      </h1>
      <Link href='/' className='underline'>
        Back to home
      </Link>
    </main>
  );
}
