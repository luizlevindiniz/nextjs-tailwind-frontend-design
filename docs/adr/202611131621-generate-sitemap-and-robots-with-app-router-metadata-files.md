# Generate sitemap and robots with App Router metadata files

## Status

Accepted

## Context

The page needs good SEO metadata: title, description, canonical URL, social cards, icons, sitemap and robots rules. Packages such as `next-sitemap` generate `sitemap.xml` and `robots.txt` in a `postbuild` step. The App Router has built-in metadata file conventions (`app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.*`, `app/icon.*`).

## Decision

Use the App Router metadata files for the sitemap, robots, icons and Open Graph image, and the page's `metadata` export for the title, description, canonical URL and social tags. The site URL comes from one constant. No sitemap package.

## Consequences

- One less dependency and build step; metadata is typed and colocated with the app.
- The production site URL must be known (or a placeholder documented in the README) before the sitemap is meaningful.
