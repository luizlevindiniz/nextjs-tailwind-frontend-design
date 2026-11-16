import { cn } from '@/lib/utils';

export type LinkTone = 'light' | 'dark';

const outlines: Record<LinkTone, string> = {
  light: 'outline-primary-blue',
  dark: 'outline-text-white-primary',
};

export function linkClasses(tone: LinkTone, className?: string) {
  return cn(
    'underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2',
    outlines[tone],
    className,
  );
}
