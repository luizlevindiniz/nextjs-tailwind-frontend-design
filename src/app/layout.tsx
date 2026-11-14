import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

import { inter, jakarta } from '@/app/fonts';

export const metadata: Metadata = {
  title: 'Luma — Practical courses to build real skills',
  description:
    'Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={cn(jakarta.variable, inter.variable)}>
      <body>{children}</body>
    </html>
  );
}
