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

SVGs exported from Figma live in `src/assets/icons/` and are imported as React components through SVGR (configured for Turbopack in `next.config.js`). `src/assets/icons/index.ts` exports each one by name with an explicit type: Next declares `*.svg` imports as `any`, so import icons from there, never from the `.svg` file. See the [icons ADR](../adr/202611131621-use-figma-exported-svgs-instead-of-icon-libraries.md).

```tsx
import { ArrowRightIcon } from '@/assets/icons';

<ArrowRightIcon aria-hidden className='size-5' />;
```

- Every icon draws in `currentColor`, so color it with a `text-*` utility on the icon or its parent.
- SVGR drops `width`/`height`; size the icon with `size-*` (or `h-*`/`w-*` for the logo) at its Figma size.
- The `Deco*` icons are the FinalCTA's decorative shapes; they are always `aria-hidden`.
- `CloseIcon` is the one icon not exported from Figma (the design has no menu open state): it's drawn to match `MenuIcon`, 24 px with a 1.5 px round-capped stroke.
- To add an icon: export the SVG from Figma, clean it with svgo (`preset-default` with `removeViewBox` off, `convertColors` with `currentColor`, `prefixIds`), keep mask fills white, then add a typed export to `index.ts`.

## Images

Raster images are JPEG masters in `src/assets/images/`, imported statically and rendered with `next/image`. The optimizer serves AVIF, falling back to WebP, at quality 75 (`images` in `next.config.js`). See the [images ADR](../adr/202611141627-size-image-masters-to-rendered-size-times-density-and-serve-them-through-next-image.md).

```tsx
import Image from 'next/image';

import heroLearner from '@/assets/images/hero-learner.jpg';

<Image
  src={heroLearner}
  alt='…'
  loading='eager'
  fetchPriority='high'
  sizes='(min-width: 1024px) min(500px, calc(100vw - 668px)), min(346px, calc(100vw - 56px))'
  className='object-cover'
/>;
```

- **`sizes` is mandatory on every responsive image** and must match its CSS width at each breakpoint. Without it the browser assumes `100vw` and fetches a viewport-wide file.
- Below the first paint, keep the default `loading="lazy"` and start `sizes` with `auto, ` (`sizes='auto, (min-width: 1280px) 138px, 94px'`). Browsers that support it use the element's laid-out width, and the others use the fallback.
- Only the LCP image (the hero photo) loads early, with `loading='eager'` and `fetchPriority='high'`. Don't use `preload`: it adds a head preload but no fetch priority, and the image is already in the server HTML. `priority` is deprecated in Next 16.
- Fixed-size images (avatars) pass `width` and `height` and no `sizes`. `next/image` then generates 1x and 2x.
- A master is the Figma source, resized only when it's bigger than needed: max(desktop drawn width × 2, mobile drawn width × 3). Fixed-size images stop at 2×. Resized masters are re-encoded with sharp at JPEG quality 90.
- **`sizes` counts the frame, not the drawn photo.** With `object-cover`, a photo wider than its frame is drawn wider than the frame, and the browser under-fetches. So the collage masters are pre-cropped, centered, to the shape their frames show: the source's aspect ratio clamped between the narrowest and widest of its frames (desktop and mobile). If the width `next/image` serves for a frame would still fall short of the frame's target density, crop to the narrowest frame instead (`student-campus`). The course photo is cropped the same way, to the 13:10 of its frames. Re-crop a master when its frame's shape changes.

| Master                       | Size                        | Where                      | Rendered (desktop / mobile) |
| ---------------------------- | --------------------------- | -------------------------- | --------------------------- |
| `hero-learner.jpg`           | 900×1100                    | Hero, LCP                  | 356–500 wide / 346×380      |
| `featured-course.jpg`        | 650×500, cropped to 13:10   | FeaturedCourse             | ≤ 530×408 / 362×278         |
| `people/*.jpg` (10)          | 216–302 w, cropped to frame | People collage             | ≤ 138×207 / ≤ 94×129        |
| `avatars/learner-{1..4}.jpg` | 80×80                       | Hero (1–3), FinalCTA (all) | 32 / 40 px                  |
| `avatars/alex-morgan.jpg`    | 96×96                       | Testimonial                | 48 px                       |

The hero and course sources are smaller than 2× their desktop frames, so they're slightly soft on retina desktops. That's a known gap, because the design ships no larger originals.

## Fonts

Plus Jakarta Sans (headings) and Inter (body) load through `next/font/google` in `src/app/fonts.ts`. Each one exposes a CSS variable (`--font-jakarta`, `--font-inter`), set on `<html>` in the root layout. The `font-heading` and `font-body` tokens read those variables. See the [fonts ADR](../adr/202611141650-self-host-the-variable-fonts-with-next-font-without-a-weight-list.md).

- Both are variable fonts, so `fonts.ts` passes no `weight` and each family loads its full weight range from one file per subset. The design uses Jakarta 600/700/800 and Inter 400/600/700 (the type tokens set them). Check a new weight against the styleguide before using it.
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
