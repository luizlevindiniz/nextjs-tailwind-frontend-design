import { resolveSiteUrl } from '@/lib/site';

describe('resolveSiteUrl', () => {
  it('prefers NEXT_PUBLIC_SITE_URL', () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: 'https://luma.dev',
        VERCEL_PROJECT_PRODUCTION_URL: 'luma.vercel.app',
      }),
    ).toBe('https://luma.dev');
  });

  it('drops a trailing slash', () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://luma.dev/' })).toBe(
      'https://luma.dev',
    );
  });

  it('falls back to the Vercel production host over https', () => {
    expect(
      resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'luma.vercel.app' }),
    ).toBe('https://luma.vercel.app');
  });

  it('falls back to localhost when nothing is set', () => {
    expect(resolveSiteUrl({})).toBe('http://localhost:3000');
  });

  it('ignores empty values', () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: '',
        VERCEL_PROJECT_PRODUCTION_URL: '',
      }),
    ).toBe('http://localhost:3000');
  });
});
