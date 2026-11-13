# Use Tailwind CSS v4 with Figma tokens declared in @theme

## Status

Accepted

## Context

The page must match its Figma design closely: typography, spacing, colors and imagery. The Figma file defines variables for colors and type styles. Tailwind CSS 4.3 configures themes in CSS (`@theme`) instead of a `tailwind.config.js`, and `prettier-plugin-tailwindcss` keeps class order consistent.

## Decision

- Style with Tailwind utility classes only; no CSS modules, CSS-in-JS or component library.
- Every design value (colors, font families, type scale, radii, shadows, container widths) taken from Figma is declared once as a token in `@theme` in `src/styles/globals.css`, and components use the generated utilities (`bg-brand`, `text-heading-xl`…). Arbitrary values (`text-[37px]`) are not allowed for values that exist as tokens.
- Mobile first: base classes target the mobile design, `md:`/`lg:` prefixes layer the tablet and desktop layout on top.
- Class merging for component variants goes through `cn()` (`clsx` + `tailwind-merge`, `src/lib/utils.ts`).

Alternative: a UI kit such as shadcn/ui. Rejected: the design is a bespoke marketing page, and a kit would add dependencies and default styles that must then be overridden to match Figma.

## Consequences

- One source of truth for design values, documented in the styleguide.
- Adding a value that is missing from Figma means adding a token, which makes design deviations visible in review.
- Tailwind v4 docs must be used, not v3 ones (`@theme`, `@utility`, no `theme.extend`).
