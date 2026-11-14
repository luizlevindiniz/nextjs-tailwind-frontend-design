# Luma

A responsive landing page for "luma.", a fictional platform of practical online courses. Built from a Figma design with Next.js (App Router), TypeScript and Tailwind CSS.

> Work in progress.

## Quick start

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm test     # jest
```

### Environment

Copy the example file to set the site's public URL, used for the canonical URL, social cards, sitemap and robots.txt:

```bash
cp .env.example .env.local
```

It's optional: without it the URL is Vercel's production URL on Vercel, and `http://localhost:3000` elsewhere.

## Docs

Start at [`docs/README.md`](docs/README.md): it maps every question to the document that answers it. Architecture decisions live in [`docs/adr/`](docs/adr/README.md).
