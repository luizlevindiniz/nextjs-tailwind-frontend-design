# Styling

## Overview

- **Tailwind CSS v4** through the PostCSS plugin (`postcss.config.js`). There's no `tailwind.config.js`; configuration lives in CSS.
- **Design tokens** are CSS-first `@theme` variables in `src/styles/globals.css`, taken from the Figma file's variables. See the [Tailwind ADR](../adr/202611131621-use-tailwind-css-v4-with-figma-tokens-in-theme.md).
- **No component library** and no CSS modules or CSS-in-JS: utility classes only.

## Design tokens

Every color, font family, type style, shadow and the content width from Figma is declared in `@theme`. Tailwind's default colors, families, font sizes and shadows are removed, so only design tokens generate utilities. The full reference, with the type pairings and recurring patterns, is the [styleguide](styleguide.md).

Rules:

- Use the generated utilities (`bg-*`, `text-*`, `font-*`). Don't write a raw hex value or an arbitrary value (`text-[37px]`) for anything that exists as a token.
- A value the design needs but Figma doesn't define becomes a new token, named for its role, not its value.
- Token names follow Figma's variable names with typos corrected (`backgrounnd-*` becomes `background-*`).
- Type is mobile first and paired explicitly: `text-mobile-h1 lg:text-desktop-h1`. Each `text-*` token sets size, line height, weight and letter spacing; add `font-heading` for Plus Jakarta Sans.
- `docs/` is excluded from Tailwind's source scanning, so class examples in the docs don't generate CSS.

## Responsive strategy: mobile first

The design has a 402 px mobile frame and a 1280 px desktop frame, with no tablet frame.

- Unprefixed classes implement the **mobile** design.
- The mobile layout stays fluid up to `md` (768 px).
- Sections switch to the **desktop** layout at `lg` (1024 px). A section may switch at `md` when its 2-column layout clearly fits.
- Check every section at 375, 768, 1024 and 1280 px.

## Composing classes

`cn()` (`src/lib/utils.ts`) merges conditional classes and resolves Tailwind conflicts, so a `className` prop can override a component's defaults:

```tsx
<a
  className={cn(
    'rounded-full px-6 py-3',
    variant === 'primary' && 'bg-primary-blue text-text-white-primary',
    className,
  )}
/>
```

Class order is not a style choice: `prettier-plugin-tailwindcss` sorts classes on format.

## Icons

SVGs exported from Figma, imported as React components through SVGR (configured for Turbopack in `next.config.js`). See the [icons ADR](../adr/202611131621-use-figma-exported-svgs-instead-of-icon-libraries.md).

```tsx
import ArrowIcon from '@/assets/icons/arrow-right.svg';

<ArrowIcon aria-hidden className='size-4' />;
```

Use `currentColor` in the SVG so the icon follows the text color.

## Fonts

_Planned:_ Plus Jakarta Sans (headings) and Inter (body) through `next/font/google`, exposed as CSS variables that the `@theme` font tokens use. See the [fonts ADR](../adr/202611131621-self-host-fonts-with-next-font.md).

## Motion

Any transition or animation must respect reduced motion. Use the `motion-safe:` variant (or `motion-reduce:` to turn an effect off):

```tsx
<div className='motion-safe:transition-transform motion-safe:hover:-translate-y-1' />
```

## Focus and states

Every interactive element needs a visible `focus-visible:` style (an outline or ring with enough contrast on its background). Hover styles never replace focus styles.
