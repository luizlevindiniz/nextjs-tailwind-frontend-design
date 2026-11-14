import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { siteConfig } from '@/lib/site';
import { readThemeColors } from '@/lib/theme';

export const alt = `${siteConfig.name}: build skills that actually move you forward.`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const asset = (path: string) =>
  readFile(join(process.cwd(), 'src/assets', path));

export default async function OpengraphImage() {
  const [colors, logo, jakarta, inter] = await Promise.all([
    readThemeColors(),
    asset('icons/logo.svg'),
    asset('fonts/PlusJakartaSans-ExtraBold.ttf'),
    asset('fonts/Inter-Regular.ttf'),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(
    logo.toString('utf8').replaceAll('currentColor', colors['text-primary']),
  ).toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        backgroundColor: colors['background-light-yellow'],
        borderBottom: `16px solid ${colors['primary-blue']}`,
      }}
    >
      <img src={logoSrc} alt='' width={161} height={51} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: -1.8,
            color: colors['text-primary'],
            maxWidth: 900,
          }}
        >
          Build skills that actually move you forward.
        </div>
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: 28,
            lineHeight: 1.5,
            color: colors['text-secondary'],
            maxWidth: 860,
          }}
        >
          Practical courses taught by people who do the work every day.
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Plus Jakarta Sans', data: jakarta, weight: 800 },
        { name: 'Inter', data: inter, weight: 400 },
      ],
    },
  );
}
