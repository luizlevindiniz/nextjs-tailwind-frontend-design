import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Without these lists, tailwind-merge reads custom tokens as colors:
// `text-mobile-h3` is dropped when `text-text-primary` follows, and
// `shadow-card` when `shadow-primary-blue` follows.
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
      shadow: ['floating', 'card', 'dark-m'],
      container: ['content'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
