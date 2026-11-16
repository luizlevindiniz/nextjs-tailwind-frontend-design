# Coding conventions

## Components

- One component per file, named export, PascalCase. Next.js route files (`page.tsx`, `layout.tsx`, `error.tsx`…) are the exception: they need a default export. Props are typed with an `interface <Name>Props`, with no `any`.
- **Server Components by default.** Add `'use client'` only to the smallest leaf that needs state, effects or browser APIs. A section stays a Server Component and renders its interactive child.
- Primitives (buttons, containers, headings) take a `className` prop merged with `cn()`, and extend the native element's props where that makes sense (`ComponentPropsWithoutRef<'a'>`).
- Links that look like buttons are `<a>` (`next/link` for routes, a plain `<a>` for in-page anchors). A `next/link` to the page it sits on gets `prefetch={false}`, or it prefetches that page after load. Actions are `<button type='button'>`. Never put an `onClick` on a `div`.

## Data-driven sections

Repeated content (navigation, cards, steps, stats, footer columns) is a typed array in `src/data/`, rendered with `map` and a stable `key`. Copy that appears once stays inline in its component. See the [mock data ADR](../adr/202611131621-serve-content-from-typed-local-mock-data.md).

## Semantic HTML and accessibility

- Landmarks: one `<header>`, one `<main>`, one `<footer>`; every section is a `<section>` with an `id` (the target of in-page links) and an accessible name (`aria-labelledby` pointing to its heading).
- Headings: exactly one `<h1>` (the hero). Section titles are `<h2>`, card titles `<h3>`. Never skip a level for styling; style with classes instead.
- Lists are lists: navigation, cards, steps (`<ol>`), stats and footer links.
- Quotes use `<figure>`, `<blockquote>` and `<figcaption>`.
- Images: meaningful images get a descriptive `alt`; decorative images get `alt=""`. Decorative SVGs get `aria-hidden`.
- Forms: every field has a `<label>`. Errors are linked with `aria-describedby` and announced, and required fields are marked.
- Everything works with a keyboard alone, in visual order, with a visible focus indicator.
- All copy is English, and the page is `lang="en"`.

## Images

Every raster image uses `next/image` with a static import from `src/assets/images/`. Responsive images need an accurate `sizes` value, and lazy ones prefix it with `auto, ` (except the People collage photos). Only the hero image (the LCP element) gets `loading='eager'` and `fetchPriority='high'`. The rules and the master list are in [styling.md](styling.md#images).

## Imports

- Use the `@/` alias for `src/`; no deep relative paths.
- ESLint (`simple-import-sort`) enforces import order: packages, CSS, `@/lib` and `@/hooks`, `@/data`, `@/components`, other `@/`, relative, types. `pnpm lint:fix` sorts them.
- Unused imports and variables are lint warnings, and CI fails on any warning. Prefix intentionally unused arguments with `_`.
- `console` calls are warnings; don't commit them.

## Commits

Conventional Commits, checked by commitlint (types listed in [commands.md](commands.md#git-hooks-husky)). Small commits straight on `main`. See the [process ADR](../adr/202611131621-commit-to-main-and-review-every-task-by-running-it.md).
