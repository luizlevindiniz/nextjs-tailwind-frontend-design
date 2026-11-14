# Architecture

Luma is a single, statically rendered landing page. There is no backend, database or CMS: content ships with the build, and the only form simulates its submission.

## Tech stack

| Layer           | Choice                                               | Version | Decision                                                                     |
| --------------- | ---------------------------------------------------- | ------- | ---------------------------------------------------------------------------- |
| Framework       | Next.js, App Router                                  | 16.4    | [ADR](adr/202611131621-use-nextjs-app-router-with-typescript.md)             |
| UI library      | React (Server Components by default)                 | 19.3    | same                                                                         |
| Language        | TypeScript, `strict`                                 | 6.0     | same                                                                         |
| Styling         | Tailwind CSS v4 (PostCSS plugin), tokens in `@theme` | 4.3     | [ADR](adr/202611131621-use-tailwind-css-v4-with-figma-tokens-in-theme.md)    |
| Icons           | Figma-exported SVGs through SVGR                     | 8.1     | [ADR](adr/202611131621-use-figma-exported-svgs-instead-of-icon-libraries.md) |
| Fonts           | `next/font` (Plus Jakarta Sans, Inter; self-hosted)  |         | [ADR](adr/202611131621-self-host-fonts-with-next-font.md)                    |
| Tests           | Jest + React Testing Library                         | 30 / 16 | [ADR](adr/202611131621-use-jest-and-testing-library-for-tdd.md)              |
| Package manager | pnpm, Node 24                                        | 12      | [ADR](adr/202611131621-use-pnpm-as-package-manager.md)                       |

## Directory structure

```text
src/
├── app/                 # App Router: layout, page, error and not-found boundaries,
│   │                    # metadata files (favicon, icon, apple-icon, opengraph-image, sitemap, robots)
│   └── __tests__/       # tests for the route and its metadata
├── assets/icons/        # Figma SVGs (SVGR components), typed and exported from index.ts
├── assets/images/       # JPEG masters for next/image (hero, course, people/, avatars/)
├── assets/fonts/        # static TTFs read only by the generated share image
├── components/layout/   # SiteShell: skip link, header, main, footer
├── components/header/   # Header
├── components/footer/   # Footer
├── components/ui/       # primitives: Container, Button, ButtonLink, ArrowLink, SectionHeader
├── lib/site.ts          # site name, title, description and URL (see below)
├── lib/theme.ts         # reads color tokens from globals.css for generated images
├── lib/utils.ts         # cn(): clsx + tailwind-merge that knows the type tokens
├── styles/globals.css   # Tailwind entry + @theme design tokens
└── __mocks__/svg.tsx    # Jest stand-in for SVGR imports
docs/                    # this folder; ADRs in docs/adr/
scripts/adr.sh           # ADR check (pnpm adr:check)
```

_Planned_ (added by the tasks that need them):

- `src/components/<section>/`: one folder per page section.
- `src/data/`: typed content modules (navigation, categories, steps, stats, footer links).

## Rendering model

- The only route, `/`, is prerendered at build time (`○ Static` in `next build`). Nothing uses request-time data.
- Sections are Server Components and send no JavaScript. Only interactive leaves (the mobile menu toggle, the contact form) are Client Components, marked with `'use client'` at the smallest boundary possible.
- Metadata comes from the root layout's `metadata` export (title template, description, canonical, Open Graph, Twitter card). The sitemap, robots, icons and Open Graph image are App Router metadata files, all prerendered ([ADR](adr/202611131621-generate-sitemap-and-robots-with-app-router-metadata-files.md)). Next.js reuses the Open Graph image for `twitter:image`.
- The site URL is one constant, `siteConfig.url` in `src/lib/site.ts`: `NEXT_PUBLIC_SITE_URL` if set, else `https://` + Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000`. See `.env.example`.

## What is mocked

See the [mock data ADR](adr/202611131621-serve-content-from-typed-local-mock-data.md).

| Concern                                                     | Today                                                                                   | Real-world replacement                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Page content (categories, steps, stats, testimonial, links) | Typed TypeScript modules in `src/data/` (_planned_)                                     | A CMS or API returning the same types, fetched in a Server Component |
| Contact form submission                                     | Client-side validation and a simulated success/error state; nothing is sent (_planned_) | A Server Action or API route posting to an email or CRM service      |
| Auth ("Log in", "Start learning")                           | Links only                                                                              | An auth provider; out of scope                                       |
| Navigation targets                                          | In-page anchors where a section exists, `#` otherwise                                   | Real routes                                                          |

## Quality gates

Locally and in CI (`.github/workflows/lint.yml`, on every push to `main` and every pull request): ESLint (zero warnings), TypeScript, Prettier, the ADR check, Jest and a production build. See [frontend/commands.md](frontend/commands.md).
