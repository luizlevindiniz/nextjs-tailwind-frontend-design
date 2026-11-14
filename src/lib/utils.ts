import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge can't tell a custom font-size token from a text color, and
// drops `text-mobile-h3` when `text-text-primary` follows it. Name the type
// tokens declared in `@theme` (src/styles/globals.css) so it keeps both.
const typeStyles = [
  'h1',
  'h2',
  'h3',
  'h5',
  'quote',
  'subtitle-1',
  'subtitle-2',
  'body-1',
  'overline',
];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['mobile', 'desktop'].flatMap((size) =>
        typeStyles.map((style) => `${size}-${style}`),
      ),
    },
  },
});

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
