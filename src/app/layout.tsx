import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

import { SiteShell } from '@/components/layout/SiteShell';

import { inter, jakarta } from '@/app/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={cn(jakarta.variable, inter.variable)}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
