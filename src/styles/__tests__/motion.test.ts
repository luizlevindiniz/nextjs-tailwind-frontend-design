import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src');
const files = readdirSync(root, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.(tsx?|css)$/.test(file) && !file.includes('__tests__'))
  .map((file) => join(root, file));

const motionUtility =
  /^-?(transition(-[\w-]+)?|animate-[\w-]+|duration-\d+|delay-\d+|ease-[\w-]+|scroll-smooth)$/;
const guards = ['motion-safe', 'motion-reduce'];
const reducedOff = /(^|\s)motion-reduce:(transition|animate)-none(\s|$)/;

function unguardedClasses(source: string) {
  const strings = source.match(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g) ?? [];
  return strings
    .map((literal) => literal.slice(1, -1))
    .filter((classes) => !reducedOff.test(classes))
    .flatMap((classes) => classes.split(/\s+/))
    .filter((token) => {
      const variants = token.split(':');
      const utility = variants.pop() ?? '';
      const animates =
        motionUtility.test(utility) || variants.includes('starting');
      return animates && !variants.some((v) => guards.includes(v));
    });
}

function unguardedCss(source: string) {
  return (
    source.match(
      /@keyframes[^{]*|\b(transition|animation)(-[\w-]+)?\s*:[^;]*|scroll-behavior\s*:\s*smooth/g,
    ) ?? []
  );
}

describe('motion', () => {
  it.each(files.map((file) => [relative(process.cwd(), file), file]))(
    '%s only animates under motion-safe or motion-reduce',
    (_name, file) => {
      const source = readFileSync(file, 'utf8');
      const found = file.endsWith('.css')
        ? unguardedCss(source)
        : unguardedClasses(source);

      expect(found).toEqual([]);
    },
  );
});
