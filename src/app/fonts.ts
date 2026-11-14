import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

/* Headings: H1–H3 (800), H5 (700), quotes (600). */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});

/* Body: text (400), overline (600), buttons and labels (700). */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});
