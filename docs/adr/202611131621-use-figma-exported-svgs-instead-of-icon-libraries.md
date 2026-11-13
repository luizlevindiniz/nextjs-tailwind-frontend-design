# Use Figma-exported SVGs instead of icon libraries

## Status

Accepted

## Context

The design has its own icons (arrows, menu, mail, clock, rating stars, decorative shapes). Generic icon libraries rarely match a design's exact glyphs and stroke widths, and the page needs only a handful of icons. SVGR is configured for Turbopack (`next.config.js`) and mocked for Jest (`src/__mocks__/svg.tsx`).

## Decision

Export the icons the design uses from Figma as SVG files and import them as React components through SVGR. No icon library is installed.

- Decorative icons get `aria-hidden`; icons that carry meaning get an accessible name (through the control's label or SVGR's `title` prop).
- Each SVG is cleaned up before commit: fixed fills replaced with `currentColor` where the icon follows text color, and no embedded raster data.

Alternatives: `lucide-react` or `react-icons`. Rejected for fidelity and to avoid a dependency for a handful of icons.

## Consequences

- Icons match Figma exactly and ship only what the page uses.
- Every new icon needs a manual export from Figma.
