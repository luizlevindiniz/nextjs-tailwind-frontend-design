import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { readThemeColors } from '@/lib/theme';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const [colors, svg] = await Promise.all([
    readThemeColors(),
    readFile(join(process.cwd(), 'src/app/icon.svg')),
  ]);

  // iOS rounds the corners itself and fills transparent ones with black.
  return new ImageResponse(
    <div style={{ display: 'flex', backgroundColor: colors['primary-blue'] }}>
      <img
        src={`data:image/svg+xml;base64,${svg.toString('base64')}`}
        alt=''
        width={size.width}
        height={size.height}
      />
    </div>,
    size,
  );
}
