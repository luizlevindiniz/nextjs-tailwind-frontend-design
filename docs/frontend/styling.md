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

`cn()` uses a tailwind-merge instance that knows the type tokens. Out of the box, tailwind-merge reads `text-mobile-h3` as a text color and drops it when a color such as `text-text-primary` follows. A new `--text-*` token must be added to the list in `src/lib/utils.ts`; `src/lib/__tests__/utils.test.ts` reads `globals.css` and fails if one is missing.

## Icons

SVGs exported from Figma live in `src/assets/icons/` and are imported as React components through SVGR (configured for Turbopack in `next.config.js`; typed in `src/types/svg.d.ts`). `src/assets/icons/index.ts` exports each one by name. See the [icons ADR](../adr/202611131621-use-figma-exported-svgs-instead-of-icon-libraries.md).

```tsx
import { ArrowRightIcon } from '@/assets/icons';

<ArrowRightIcon aria-hidden className='size-5' />;
```

- Every icon draws in `currentColor`, so color it with a `text-*` utility on the icon or its parent.
- SVGR drops `width`/`height`; size the icon with `size-*` (or `h-*`/`w-*` for the logo) at its Figma size.
- The `Deco*` icons are the FinalCTA's decorative shapes; they are always `aria-hidden`.
- To add an icon: export the SVG from Figma, clean it with svgo (`preset-default` with `removeViewBox` off, `convertColors` with `currentColor`, `prefixIds`), keep mask fills white, then add it to `index.ts`.

## Fonts

Plus Jakarta Sans (headings) and Inter (body) load through `next/font/google` in `src/app/fonts.ts`. Each one exposes a CSS variable (`--font-jakarta`, `--font-inter`), set on `<html>` in the root layout. The `font-heading` and `font-body` tokens read those variables. See the [fonts ADR](../adr/202611131621-self-host-fonts-with-next-font.md).

- The weights listed are the ones the design uses: Jakarta 600/700/800, Inter 400/600/700. Both are variable fonts, so Google serves one file per family and subset. Each listed weight points to it, so adding a weight costs no bytes, but list it anyway to record what the design uses.
- Only the Latin files are preloaded (about 48 KB Inter and 27 KB Jakarta). The other subsets load only if a page uses their characters.
- The font tokens are declared with `@theme inline`, so they resolve on the element, and the stack falls back to `ui-sans-serif` before the fonts load.
- Body text gets Inter from the `body` base style. Headings, quotes and stats need `font-heading`.

## Motion

Any transition or animation must respect reduced motion. Use the `motion-safe:` variant (or `motion-reduce:` to turn an effect off):

```tsx
<div className='motion-safe:transition-transform motion-safe:hover:-translate-y-1' />
```

## Focus and states

Every interactive element needs a visible `focus-visible:` style (an outline or ring with enough contrast on its background). Hover styles never replace focus styles.
