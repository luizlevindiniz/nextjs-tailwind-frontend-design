'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 text-center'>
      <h1 className='text-4xl font-bold'>Something went wrong</h1>
      <button type='button' onClick={reset} className='underline'>
        Try again
      </button>
    </main>
  );
}
