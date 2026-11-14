# Styleguide

The design tokens taken from the Figma file, as declared in `@theme` in `src/styles/globals.css`, and the recurring patterns built from them. For how to apply styles (mobile first, `cn()`, focus, motion), see [styling.md](styling.md).

Token names follow the Figma variable names, with typos fixed (`backgrounnd-*` becomes `background-*`). Tailwind's default colors, font families, font sizes and shadows are removed, so only these tokens produce utilities. Spacing, radii and breakpoints keep Tailwind's defaults because the design's values fall on them.

## Colors

| Token                     | Value     | Used for                                                                |
| ------------------------- | --------- | ----------------------------------------------------------------------- |
| `primary-blue`            | `#3157f6` | Primary buttons, overlines, stats, FeaturedCourse section               |
| `primary-blue-light`      | `#e2e8ff` | Number badges, icon tiles, image placeholders                           |
| `primary-orange`          | `#ff704d` | Decorative shapes                                                       |
| `secondary-yellow`        | `#ffee7e` | "Featured course" tag, CTA button on blue                               |
| `accent-yellow-dark`      | `#e9d659` | HowItWorks step 3 icon (not a Figma variable, see below)                |
| `background-orange`       | `#ffcb9f` | Decorative blocks behind images                                         |
| `background-yellow`       | `#fff1c2` | Icon tiles                                                              |
| `background-light-yellow` | `#f9f8f3` | Header, Hero, HowItWorks backgrounds; form inputs                       |
| `background-white`        | `#ffffff` | Page background, cards, secondary buttons                               |
| `background-darkblue`     | `#171b2c` | Footer                                                                  |
| `text-primary`            | `#171b2c` | Headings and body text on light backgrounds                             |
| `text-secondary`          | `#656770` | Leads and supporting copy                                               |
| `text-tertiary`           | `#6d7384` | Card descriptions, stat labels, placeholders                            |
| `text-white-primary`      | `#ffffff` | Text on blue and dark backgrounds                                       |
| `text-white-secondary`    | `#e7e7ec` | Secondary text on blue and dark backgrounds                             |
| `text-white-tertiary`     | `#9e9faa` | Footer muted text                                                       |
| `line-1`                  | `#dbdfeb` | Borders, dividers                                                       |
| `line-input`              | `#7c8ab6` | Form field borders (not a Figma variable, see accessibility deviations) |

Utilities take the token name after the property: `bg-primary-blue`, `text-text-secondary`, `border-line-1`. The doubled `text-text-*` is the price of keeping Figma's names.

Two tokens aren't Figma variables. `accent-yellow-dark` is a color the design uses without a variable. `line-input` is an accessibility deviation (see below). Each is named for its role instead of written as a raw hex value.

## Typography

Two families, loaded with `next/font` (`src/app/fonts.ts`):

| Token          | Family            | Used for                             |
| -------------- | ----------------- | ------------------------------------ |
| `font-heading` | Plus Jakarta Sans | H1–H5, quotes, stats                 |
| `font-body`    | Inter             | Everything else (the `body` default) |

Figma defines a mobile and a desktop version of each text style. Each one is a `text-*` token that sets size, line height, weight and letter spacing together. The family is set separately with `font-heading`.

| Figma style | Mobile token             | Mobile size / line | Desktop token             | Desktop size / line | Weight | Tracking            |
| ----------- | ------------------------ | ------------------ | ------------------------- | ------------------- | ------ | ------------------- |
| H1          | `text-mobile-h1`         | 40 / 44            | `text-desktop-h1`         | 64 / 70             | 800    | -0.025em            |
| H2          | `text-mobile-h2`         | 36 / 40            | `text-desktop-h2`         | 56 / 64             | 800    | -0.025em            |
| H3          | `text-mobile-h3`         | 32 / 36            | `text-desktop-h3`         | 48 / 56             | 800    | -0.025em            |
| H5          | `text-mobile-h5`         | 20 / 28            | `text-desktop-h5`         | 20 / 32             | 700    | 0                   |
| quotes      | `text-mobile-quote`      | 20 / 32            | `text-desktop-quote`      | 30 / 44             | 600    | 0 / -0.025em        |
| subtitle 1  | `text-mobile-subtitle-1` | 16 / 26            | `text-desktop-subtitle-1` | 18 / 28             | 400    | 0                   |
| subtitle 2  | `text-mobile-subtitle-2` | 14 / 24            | `text-desktop-subtitle-2` | 16 / 28             | 400    | 0                   |
| body 1      | `text-mobile-body-1`     | 14 / 24            | `text-desktop-body-1`     | 14 / 24             | 400    | 0                   |
| Overline    | `text-mobile-overline`   | 12 / 16            | `text-desktop-overline`   | 12 / 16             | 600    | 0.12em, `uppercase` |

Sizes are in px for comparison with Figma; the tokens are in rem. Pair the two explicitly, mobile first:

```tsx
<h1 className='font-heading text-mobile-h1 lg:text-desktop-h1'>…</h1>
<p className='text-mobile-overline uppercase lg:text-desktop-overline'>…</p>
```

The pairing follows each element in Figma, not the style name. For example, section titles use H3 at both sizes, the FinalCTA title uses Mobile/H2, the stats use H1, and the mobile contact form header uses Desktop/H5. Check the element before you assume.

Bold variants (button labels, form labels, names) aren't separate Figma styles: they're `body 1` or `subtitle` with `font-bold`.

## Radii

Tailwind's default radius scale matches the design:

| Utility        | Value | Used for                                               |
| -------------- | ----- | ------------------------------------------------------ |
| `rounded-md`   | 6 px  | Number badges, "Featured course" tag, step icon        |
| `rounded-lg`   | 8 px  | Buttons, inputs, meta chips, icon tiles                |
| `rounded-xl`   | 12 px | Floating badges, icon tiles                            |
| `rounded-2xl`  | 16 px | Cards, form container, course image, mobile hero image |
| `rounded-3xl`  | 24 px | Desktop hero image                                     |
| `rounded-full` | —     | Avatars, circles                                       |

## Shadows

| Token             | Value                                                        | Used for                                                    |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| `shadow-floating` | `0 4px 12px rgb(0 0 0 / 0.1)`                                | Floating badges on the Hero                                 |
| `shadow-card`     | `0 12px 16px rgb(23 27 44 / 0.04)`                           | Contact form container                                      |
| `shadow-dark-m`   | `0 0 4px rgb(0 0 0 / 0.07), 0 4px 6px -1px rgb(0 0 0 / 0.1)` | People section collage (the Figma `Shadow/Dark/M` variable) |

## Layout

| What            | Mobile (402 frame)  | Desktop (1280 frame) | Classes                 |
| --------------- | ------------------- | -------------------- | ----------------------- |
| Content column  | fluid               | 1120 px max          | `max-w-content mx-auto` |
| Side gutters    | 20 px               | 80 px                | `px-5 lg:px-20`         |
| Section padding | 60 px               | 100 px               | `py-15 lg:py-25`        |
| Header height   | 68 px + 1 px border | 70 px                |                         |

Breakpoints are Tailwind's defaults. The layout is fluid up to `md` (768 px) and switches to desktop at `lg` (1024 px). Some Figma sections draw a 1136 px column. This is treated as a slip, and every section uses the 1120 px column.

## Recurring patterns

These are the values to build the primitives and sections from.

- **Section header:** overline in `primary-blue`, then the title 16 px below, then the lead 16–24 px below in `text-secondary` subtitle 1.
- **Button:** `px-7 py-3.5 rounded-lg`, body 1 bold, centered.
  - **Primary:** `bg-primary-blue` with white text.
  - **Secondary:** `bg-background-white`, `border border-line-1`, `text-text-primary`.
  - **On blue:** `bg-secondary-yellow`, `text-text-primary`.
  - **Text link with arrow:** `px-4 py-3.5`, 8 px gap, 20 px arrow. On `primary-blue`, use `text-text-white-primary`. Figma's `text-white-secondary` there is 4.46:1, below the 4.5:1 AA minimum.
  - Mobile Hero buttons are full width.
- **Card:** `bg-background-white border border-line-1 rounded-2xl p-7`, minimum height 260 px on desktop.
- **Number badge:** `bg-primary-blue-light rounded-md px-2 py-1`, overline in `primary-blue`.
- **Meta chip:** `border border-line-1 rounded-lg px-3.5 py-1.5`, body 1.
- **Floating badge:** `bg-background-white rounded-xl px-4 py-3 shadow-floating`.
- **Form field:**
  - Label: body 1 bold.
  - Gap between label and control: 8 px.
  - Control: `bg-background-light-yellow border border-line-input rounded-lg px-4 py-3`.
  - Placeholder: `placeholder:text-text-secondary` (5.30:1 on the field background).
  - Focus: a ring in `primary-blue`.
  - Textarea height: 120 px.
- **Form container:** `bg-background-white border border-line-1 rounded-2xl shadow-card`, padding 40 px on desktop and 24 px vertical / 20 px horizontal on mobile.

## Accessibility deviations

Where a Figma pairing misses WCAG AA, the build deviates from the frame and the pattern above says so.

| Element                     | Figma                           | Built                                                            | Why                                                                                                                    |
| --------------------------- | ------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Text link on `primary-blue` | `text-white-secondary` (4.46:1) | `text-white-primary` (5.49:1)                                    | SC 1.4.3 needs 4.5:1 for 14 px bold text                                                                               |
| Form field placeholder      | `text-tertiary` (4.45:1)        | `text-secondary` (5.30:1)                                        | SC 1.4.3 covers placeholder text                                                                                       |
| Form field border           | `line-1` (1.33:1 on the card)   | `line-input` `#7c8ab6` (3.40:1 on the card, 3.20:1 on the field) | SC 1.4.11: the border is what shows the input, so it needs 3:1. The field background alone is 1.06:1 against the card. |
