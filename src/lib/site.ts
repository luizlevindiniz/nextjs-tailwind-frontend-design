type SiteEnv = Partial<
  Record<'NEXT_PUBLIC_SITE_URL' | 'VERCEL_PROJECT_PRODUCTION_URL', string>
>;

export function resolveSiteUrl(env: SiteEnv) {
  const url =
    env.NEXT_PUBLIC_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:3000';
  return url.replace(/\/+$/, '');
}

export const siteConfig = {
  name: 'Luma',
  title: 'Luma — Practical courses to build real skills',
  description:
    'Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.',
  url: resolveSiteUrl({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  }),
};
