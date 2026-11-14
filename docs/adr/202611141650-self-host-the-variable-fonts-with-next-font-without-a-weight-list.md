# Self-host the variable fonts with next/font without a weight list

## Status

Accepted

## Context

[Self-host fonts with next/font](./202611131621-self-host-fonts-with-next-font.md) loads Plus Jakarta Sans and Inter through `next/font/google`. It also lists only the weights the design uses: Jakarta 600/700/800 and Inter 400/600/700.

Both families are variable fonts. In Next 16.4 (2026-11), a production build makes the same files with or without the list: one variable woff2 per family and subset, and the same two latin files preloaded (Inter about 48 KB, Jakarta about 27 KB). So the list saves no bytes. What it does change:

- The generated CSS has one `@font-face` rule per listed weight and subset (35 rules) instead of one per subset with the full weight range (13 rules).
- A weight outside the list doesn't render at its own weight. The browser picks the nearest listed face, so a later `font-medium` (500) would come out as 400 or 600.
- The Next docs say a variable font doesn't need a `weight`, and describe weight arrays as being for fonts that aren't variable.

## Decision

Load both families with `next/font/google`, exposed as the CSS variables `--font-jakarta` and `--font-inter`, which the `@theme` font tokens read. Pass the latin subset and `display: 'swap'`, and no `weight`, so each family loads its full variable weight range.

The rest of the earlier decision still holds: the files are downloaded at build time and served from the app, the latin files are preloaded, and `next/font` generates size-adjusted fallbacks.

The weights the design uses are recorded in the styleguide's type tokens, not in the font call.

Alternatives considered:

- Keep the weight list as a record of the design's weights. Rejected: the type tokens already record them. The list costs CSS rules and snaps any other weight to the nearest listed one.
- A narrower `weight` range string (`'400 800'`). Rejected: it serves the same files and adds a value to keep in step with the tokens.

## Consequences

- Any weight in the font's range renders at its real weight with no config change. Before using a weight the design doesn't use, check it against the styleguide.
- Fewer `@font-face` rules in the CSS. Downloads and preloads are unchanged.
- If a family is ever swapped for one that isn't variable, it needs an explicit `weight` list again.
