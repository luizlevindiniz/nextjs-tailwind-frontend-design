import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cn } from '@/lib/utils';

const css = readFileSync(join(process.cwd(), 'src/styles/globals.css'), 'utf8');
const tokens = (prefix: string) =>
  [...css.matchAll(new RegExp(`^\\s*--${prefix}-([a-z0-9-]+):`, 'gm'))]
    .map(([, name]) => name)
    .filter((name) => !name.includes('--'));

describe('cn', () => {
  it.each(tokens('text'))(
    'keeps the type token text-%s next to a text color',
    (name) => {
      expect(cn(`text-${name}`, 'text-text-primary')).toBe(
        `text-${name} text-text-primary`,
      );
    },
  );

  it.each(tokens('shadow'))(
    'keeps the shadow token shadow-%s next to a ring color',
    (name) => {
      expect(cn(`shadow-${name}`, 'inset-ring-line-1')).toBe(
        `shadow-${name} inset-ring-line-1`,
      );
    },
  );

  it('lets a later type token replace an earlier one', () => {
    expect(cn('text-mobile-h1', 'text-mobile-h3')).toBe('text-mobile-h3');
  });

  it('lets a later text color replace an earlier one', () => {
    expect(cn('text-text-primary', 'text-primary-blue')).toBe(
      'text-primary-blue',
    );
  });
});
