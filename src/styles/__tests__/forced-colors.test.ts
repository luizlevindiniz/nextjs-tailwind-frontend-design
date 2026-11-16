import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src');
const files = readdirSync(root, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.tsx?$/.test(file) && !file.includes('__tests__'))
  .map((file) => join(root, file));

const ringEdge = /^!?(inset-)?ring(-\d+|-\[[^\]]+\])?!?$/;
const stateVariant =
  /^(hover|active|visited|disabled|checked|invalid|focus(-\w+)?|(aria|data|group|peer|has|not)-.+)$/;

function drawsRingEdge(token: string) {
  const variants = token.split(':');
  const utility = variants.pop() ?? '';
  return (
    !variants.some((variant) => stateVariant.test(variant)) &&
    ringEdge.test(utility)
  );
}

function edgesWithoutBorder(source: string) {
  const strings = source.match(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g) ?? [];
  return strings.filter((literal) => {
    const tokens = literal.slice(1, -1).split(/\s+/);
    return (
      tokens.some(drawsRingEdge) && !tokens.includes('forced-colors:border')
    );
  });
}

describe('forced colors guard', () => {
  it.each([
    ["'rounded-lg inset-ring inset-ring-line-1'", 1],
    ["'rounded-lg ring-2 ring-line-1'", 1],
    ["'inset-ring inset-ring-line-1 forced-colors:border'", 0],
    ["'focus-visible:ring-2 hover:inset-ring-text-tertiary'", 0],
    ["'aria-invalid:inset-ring-error group-hover:ring'", 0],
    ["'lg:inset-ring lg:inset-ring-line-1'", 1],
    ["'ring-[2px] ring-line-1'", 1],
    ["'!inset-ring-[3px]'", 1],
    ["'ring-[2px] ring-line-1 forced-colors:border'", 0],
  ])('checks %s', (source, count) => {
    expect(edgesWithoutBorder(source)).toHaveLength(count);
  });

  it.each(files.map((file) => [relative(root, file), file]))(
    '%s draws no ring edge that forced colors would remove',
    (_, file) => {
      expect(edgesWithoutBorder(readFileSync(file, 'utf8'))).toEqual([]);
    },
  );
});
