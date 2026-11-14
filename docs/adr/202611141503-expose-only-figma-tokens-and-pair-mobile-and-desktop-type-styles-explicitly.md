# Expose only Figma tokens and pair mobile and desktop type styles explicitly

## Status

Accepted

## Context

The [Tailwind ADR](./202611131621-use-tailwind-css-v4-with-figma-tokens-in-theme.md) puts Figma values in `@theme`, but it leaves two questions open.

First, Tailwind ships a full default palette, type scale and shadow set. With those in place, `bg-blue-500` or `text-4xl` compile without complaint, so a value that isn't in the design gets through review unnoticed.

Second, the Figma file defines every text style twice, as `Mobile/*` (402 px frame) and `Desktop/*` (1280 px frame). The pairing between the two isn't uniform across elements:

- Section titles use H3 at both sizes, but the FinalCTA title uses Mobile/H2.
- The stats use H1.
- The mobile contact form header uses Desktop/H5.

Each style fixes size, line height, weight and letter spacing together.

## Decision

- Reset Tailwind's `--color-*`, `--font-*`, `--text-*` and `--shadow-*` namespaces in `@theme` and declare only the Figma tokens. Keep the default spacing, radius and breakpoint scales, because the design's values (4 px grid; radii 6/8/12/16/24; 768/1024 breakpoints) fall on them.
- Declare one `--text-*` token per Figma style, named after it (`text-mobile-h1`, `text-desktop-h1`). Each token carries `--line-height`, `--font-weight` and `--letter-spacing` sub-properties. Components pair them mobile first: `text-mobile-h1 lg:text-desktop-h1`.
- Add a value the design uses without a variable as a token named for its role (`accent-yellow-dark`), never as a raw value.

Alternative considered: responsive role utilities (`@utility heading-1`) that switch from mobile to desktop at `lg` on their own. Rejected because they hide the breakpoint and would need exceptions for the irregular pairings above.

## Consequences

- A class that isn't a design token generates no CSS, so off-design values show up as missing styles in the browser.
- Class lists are longer: every text element names two tokens.
- Color utilities repeat Figma's prefix (`text-text-secondary`), which is the cost of keeping Figma's names.
- A new Figma style means adding both of its tokens and documenting them in `docs/frontend/styleguide.md`.
