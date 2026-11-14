import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Without this list, tailwind-merge reads `text-mobile-h3` as a text color and
// drops it when `text-text-primary` follows.
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
      text: [
        ...['mobile', 'desktop'].flatMap((size) =>
          typeStyles.map((style) => `${size}-${style}`),
        ),
        'caption',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
