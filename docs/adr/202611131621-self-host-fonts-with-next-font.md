# Self-host fonts with next/font

## Status

Accepted

## Context

Fonts and page loading must be efficient. The design uses two families: Plus Jakarta Sans for headings and Inter for body text. A hand-written `@font-face` with `font-display: block` hides text while the font loads, and without adjusted fallback metrics the layout shifts when the web font swaps in. Loading from the Google Fonts CDN at runtime adds a third-party connection on the critical path.

## Decision

Load the fonts with `next/font/google`, exposed as CSS variables that the `@theme` font tokens reference.

- Only the weights and subsets the design uses are loaded.
- `next/font` downloads the files at build time and serves them from the app (no request to Google at runtime), preloads them and generates size-adjusted fallbacks to avoid layout shift.

## Consequences

- No third-party font requests, and fewer CLS and LCP problems from late font swaps.
- Adding a weight means changing the `next/font` call, not dropping a file into `public/`.
