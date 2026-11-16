import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src');
const files = readdirSync(root, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.(tsx?|css)$/.test(file) && !file.includes('__tests__'))
  .map((file) => join(root, file));

const transitionUtility =
  /^!?-?(transition(-\S+)?|(duration|delay|ease)-\S+)!?$/;
const animationUtility = /^!?animate-\S+$/;
const guards = ['motion-safe', 'motion-reduce'];

function kindOf(token: string) {
  const variants = token.split(':');
  const utility = variants.pop() ?? '';
  if (variants.some((v) => guards.includes(v))) return null;
  if (variants.includes('starting') || transitionUtility.test(utility))
    return 'transition';
  if (animationUtility.test(utility)) return 'animate';
  if (utility === 'scroll-smooth') return 'scroll';
  return null;
}

function unguardedClasses(source: string) {
  const strings = source.match(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g) ?? [];
  return strings.flatMap((literal) => {
    const tokens = literal.slice(1, -1).split(/\s+/);
    return tokens.filter((token) => {
      const kind = kindOf(token);
      return kind && !tokens.includes(`motion-reduce:${kind}-none`);
    });
  });
}

function unguardedScript(source: string) {
  return (
    source.match(
      /(?<![\w-])(transition|animation)[A-Z]?\w*\s*:|behavior\s*:\s*['"]smooth['"]|\.animate\(/g,
    ) ?? []
  );
}

function withoutBlocks(source: string, opening: RegExp) {
  let result = source;
  for (let match = opening.exec(result); match; match = opening.exec(result)) {
    let depth = 1;
    let end = match.index + match[0].length;
    while (depth > 0 && end < result.length) {
      if (result[end] === '{') depth++;
      if (result[end] === '}') depth--;
      end++;
    }
    result = result.slice(0, match.index) + result.slice(end);
  }
  return result;
}

function unguardedCss(source: string) {
  const checked = withoutBlocks(
    source,
    /@theme[^{]*\{|@media[^{]*prefers-reduced-motion:\s*no-preference[^{]*\{/,
  );
  return (
    checked.match(
      /@keyframes[^{]*|(?<![\w-])(transition|animation)(-[\w-]+)?\s*:[^;]*|scroll-behavior\s*:\s*smooth/g,
    ) ?? []
  );
}

function findMotion(source: string, css: boolean) {
  return css
    ? unguardedCss(source)
    : [...unguardedClasses(source), ...unguardedScript(source)];
}

describe('motion', () => {
  it.each(files.map((file) => [relative(process.cwd(), file), file]))(
    '%s only animates under motion-safe or motion-reduce',
    (_name, file) => {
      const source = readFileSync(file, 'utf8');

      expect(findMotion(source, file.endsWith('.css'))).toEqual([]);
    },
  );

  it.each([
    "'transition-colors'",
    "'transition-[opacity]'",
    "'duration-[250ms]'",
    "'animate-[spin_1s]'",
    "'transition!'",
    "'hover:starting:opacity-0'",
    "'motion-safe:transition motion-reduce:transition-none animate-spin'",
    "<div style={{ transition: 'opacity 1s' }} />",
    "<div style={{ animationName: 'spin' }} />",
    "el.scrollIntoView({ behavior: 'smooth' })",
    'el.animate([{ opacity: 0 }], 300)',
  ])('flags unguarded motion in %s', (source) => {
    expect(findMotion(source, false)).not.toEqual([]);
  });

  it.each([
    "'motion-safe:transition-[opacity] motion-safe:duration-300'",
    "'motion-safe:starting:opacity-0'",
    "'transition-colors motion-reduce:transition-none'",
    "'animate-spin motion-reduce:animate-none'",
    "'translate-y-2 -translate-x-1/2'",
  ])('accepts %s', (source) => {
    expect(findMotion(source, false)).toEqual([]);
  });

  it.each([
    'a { transition: color 1s; }',
    'a { animation-name: spin; }',
    '@keyframes spin { to { rotate: 1turn; } }',
    'html { scroll-behavior: smooth; }',
  ])('flags unguarded motion in the CSS %s', (source) => {
    expect(findMotion(source, true)).not.toEqual([]);
  });

  it.each([
    '@theme { --default-transition-duration: 200ms; }',
    '@theme { --animate-wiggle: wiggle 1s; @keyframes wiggle { to { rotate: 3deg; } } }',
    '@media (prefers-reduced-motion: no-preference) { a { transition: color 1s; } }',
  ])('accepts the CSS %s', (source) => {
    expect(findMotion(source, true)).toEqual([]);
  });
});
