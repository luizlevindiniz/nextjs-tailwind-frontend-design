import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'src');
const files = readdirSync(root, { recursive: true, encoding: 'utf8' })
  .filter((file) => /\.tsx?$/.test(file) && !file.includes('__tests__'))
  .map((file) => join(root, file));

const ringEdge = /^!?(inset-)?ring(-\d+)?!?$/;

function edgesWithoutBorder(source: string) {
  const strings = source.match(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g) ?? [];
  return strings.filter((literal) => {
    const tokens = literal.slice(1, -1).split(/\s+/);
    return (
      tokens.some((token) => ringEdge.test(token)) &&
      !tokens.includes('forced-colors:border')
    );
  });
}

describe('forced colors guard', () => {
  it.each([
    ["'rounded-lg inset-ring inset-ring-line-1'", 1],
    ["'rounded-lg ring-2 ring-line-1'", 1],
    ["'inset-ring inset-ring-line-1 forced-colors:border'", 0],
    ["'focus-visible:ring-2 hover:inset-ring-text-tertiary'", 0],
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
