import { siteConfig } from '@/lib/site';

import { metadata } from '@/app/layout';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

describe('site metadata', () => {
  it('sets the base URL, canonical and social cards', () => {
    expect(String(metadata.metadataBase)).toBe(`${siteConfig.url}/`);
    expect(metadata.alternates?.canonical).toBe('/');
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      url: '/',
      siteName: siteConfig.name,
    });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('lists the home page in the sitemap', () => {
    expect(sitemap().map(({ url }) => url)).toEqual([siteConfig.url]);
  });

  it('allows crawling and points robots at the sitemap', () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    });
  });
});
