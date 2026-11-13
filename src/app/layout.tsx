import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Luma — Practical courses to build real skills',
  description:
    'Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
