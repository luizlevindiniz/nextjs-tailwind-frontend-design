import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Generated images can't use Tailwind classes, so they read the tokens here.
export async function readThemeColors(): Promise<Record<string, string>> {
  const css = await readFile(
    join(process.cwd(), 'src/styles/globals.css'),
    'utf8',
  );
  return Object.fromEntries(
    [...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{3,8});/gi)].map(
      ([, name, value]) => [name, value],
    ),
  );
}
