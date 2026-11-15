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
| `error`                   | `#c0362c` | Form error text and invalid field borders (not a Figma variable)        |

Utilities take the token name after the property: `bg-primary-blue`, `text-text-secondary`, `border-line-1`. The doubled `text-text-*` is the price of keeping Figma's names.

Three tokens aren't Figma variables. `accent-yellow-dark` is a color the design uses without a variable. `line-input` is an accessibility deviation (see below). `error` covers a state the design doesn't draw: the palette has no error color, and `primary-orange` is 2.6:1 on white, so `error` is a red at 5.5:1 on white and 5.2:1 on the field. Each is named for its role instead of written as a raw hex value.

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

One more token isn't a Figma style: `text-caption` (13 / 19.5, 400) is the footer copyright, the same at both sizes, so it isn't paired.

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

| What            | Mobile (402 frame)  | Desktop (1280 frame) | Classes                        |
| --------------- | ------------------- | -------------------- | ------------------------------ |
| Content column  | fluid               | 1120 px max          | `max-w-content mx-auto`        |
| Side gutters    | 20 px               | 80 px                | `px-5 lg:px-20`                |
| Section padding | 60 px               | 100 px               | `py-15 lg:py-25`               |
| Header height   | 68 px + 1 px border | 69 px + 1 px border  | `h-17 lg:h-17.25`              |
| Footer padding  | 60 top / 20 bottom  | 80 top / 40 bottom   | `pt-15 pb-5 lg:pt-20 lg:pb-10` |

Breakpoints are Tailwind's defaults. The layout is fluid up to `md` (768 px) and switches to desktop at `lg` (1024 px). Some Figma sections draw a 1136 px column. This is treated as a slip, and every section uses the 1120 px column.

## Recurring patterns

These are the values to build the primitives and sections from.

- **Section header:** overline in `primary-blue`, then the title (H3) 16 px below, then the lead 16 px below in `text-secondary` subtitle 1. Contact sets its lead in body 1 on mobile (`leadSize="compact"`). The People header groups the overline with the title instead: the title 8 px below, the lead 24 px below (32 px from `lg`). On `primary-blue` (FeaturedCourse) every line is `text-white-primary` and the lead is subtitle 2, 20 px below.
- **Button:** `px-7 py-3.5 rounded-lg`, body 1 bold, centered.
  - **Primary:** `bg-primary-blue` with white text.
  - **Secondary:** `bg-background-white`, `inset-ring inset-ring-line-1`, `text-text-primary`. Figma draws the stroke inside the box, so an inset ring (not a border) keeps it the same 52 px height as the other buttons.
  - **On blue:** `bg-secondary-yellow`, `text-text-primary`.
  - **Text link with arrow:** `px-4 py-3.5`, 8 px gap, 20 px arrow. On `primary-blue`, use `text-text-white-primary`. Figma's `text-white-secondary` there is 4.46:1, below the 4.5:1 AA minimum.
  - Mobile Hero buttons are full width (a stretched column, up to the mobile frame's 362 px).
  - **Hover** (not in Figma): filled buttons tint their own token to 90% (`hover:bg-primary-blue/90`, 4.58:1 or more for the white label), the secondary button's ring darkens to `text-tertiary`, and the text link underlines. Colors animate only under `motion-safe:`.
  - **Focus:** a 2 px outline 2 px out, `primary-blue` on light backgrounds and `text-white-primary` on blue.
- **Card:** `bg-background-white border border-line-1 rounded-2xl p-7`, minimum height 260 px on desktop.
- **Number badge:** `bg-primary-blue-light rounded-md px-2 py-1`, overline in `primary-blue`.
- **Meta chip:** `border border-line-1 rounded-lg px-3.5 py-1.5`, body 1.
- **Floating badge:** `bg-background-white rounded-xl px-4 py-3 shadow-floating`.
- **Form field:**
  - Label: body 1 bold.
  - Gap between label and control: 8 px.
  - Control: `bg-background-light-yellow inset-ring inset-ring-line-input rounded-lg px-4 py-3`, 48 px tall. Typed text is body 1 from `lg` and subtitle 1 (16 px) below it, with `py-2.75` to keep 48 px: iOS Safari zooms the page into any field under 16 px. Figma strokes inside the box, so an inset ring (as on the secondary button) keeps that height.
  - Placeholder: `placeholder:text-text-secondary` (5.30:1 on the field background).
  - Focus: a 2 px `primary-blue` outline 2 px out.
  - Textarea height: 100 px on mobile, 120 px from `lg`.
  - Invalid (not in Figma): the ring turns `error` and the message sits 8 px under the control in body 1 `error`.
- **Form container:** `bg-background-white inset-ring inset-ring-line-1 rounded-2xl shadow-card`, padding 40 px on desktop and 24 px vertical / 20 px horizontal on mobile.

## Primitives

The patterns above are built once in `src/components/ui/`. Sections compose them instead of repeating the classes.

| Component       | Renders                   | Props (besides the native element's)                                                                                                                            |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Container`     | `<div>`                   | — (1120 px column with 20 / 80 px gutters, outside the 1120 px)                                                                                                 |
| `Button`        | `<button type='button'>`  | `variant`: `primary` (default), `secondary`, `onBlue`                                                                                                           |
| `ButtonLink`    | `<a>`                     | `href`, `variant` (same as `Button`)                                                                                                                            |
| `ArrowLink`     | `<a>` + hidden arrow icon | `href`, `tone`: `light` (default), `onBlue`                                                                                                                     |
| `SectionHeader` | overline, `<h2>`, lead    | `id` (for the section's `aria-labelledby`), `overline`, `title`, `lead`, `align`: `start` / `center`, `tone`: `light` / `onBlue`, `spacing`: `even` / `grouped` |

Every primitive takes a `className`, merged last with `cn()`, for section-specific spacing or width. The Hero builds its own `<h1>` block: its type and layout differ from a section header.

Icons are listed in [styling.md](styling.md#icons).

## Page shell

`SiteShell` (`src/components/layout/`) wraps every route from the root layout: a skip link, `Header`, `<main id="main">`, `Footer`. Pages render their content without their own `<main>`.

- **Skip link:** the first link on the page, hidden until focused, then shown top-left as a primary button. It moves focus to `<main>`.
- **Header:** `background-light-yellow` with a `line-1` bottom border. The logo links home (`aria-label="Luma home"`). Links come from `src/data/navigation.ts`: Courses → `#categories`, Community → `#people`, the rest `#`.
  - **Desktop (`lg` and up):** logo, then the main nav centered (body 1 `text-secondary`, 32 px gaps, underline on hover), then "Log in" (the same link style, `px-4 py-2.5`) and a primary "Start learning" button at `px-5 py-2.5` (44 px tall, smaller than the standard button), 8 px apart.
  - **Mobile menu (below `lg`):** a 36 px toggle (`p-1.5`, 24 px icon) labelled "Menu", with `aria-expanded` and `aria-controls`, inside the `<nav aria-label="Main">` landmark so the landmark exists while the menu is closed; its icon swaps from the hamburger to an X while open. Figma has no open state, so the panel is a design decision: it drops down over the page under the header border (`background-light-yellow`, `line-1` bottom border, `shadow-floating`), with the nav links as 44 px rows, a `line-1` divider, then full-width secondary "Log in" and primary "Start learning" buttons. It closes on Esc (focus returns to the toggle), on a link, on a tap outside, and when focus leaves it. It fades and slides in 8 px only under `motion-safe:`.
- **Footer:** `background-darkblue`. Logo in `text-white-primary`, tagline in `text-white-tertiary` body 1 (240 px wide on desktop), then a `text-secondary` top border and the copyright in `text-caption` `text-white-secondary`, centered on mobile and left on desktop. Mobile Figma draws the copyright in white; it's unified to `text-white-secondary`.
- **Favicon and share image:** `src/app/icon.svg` is an "l." monogram (the wordmark's own "l" and dot) in white on `primary-blue`; `favicon.ico` holds it at 16, 32 and 48 px for clients that request `/favicon.ico` directly, and `apple-icon.tsx` renders it full-bleed at 180 px. `opengraph-image.tsx` renders the 1200 × 630 share image at build time, reading colors from `globals.css` (`src/lib/theme.ts`) and fonts from `src/assets/fonts/`.

## Sections

### Hero

`src/components/hero/Hero.tsx`, `background-light-yellow`, `py-15 lg:py-25`. It holds the page's only `<h1>`, and the section is named by it.

- **Copy column:** overline (`primary-blue`), H1 16 px below, subtitle 1 lead in `text-secondary` 24 px below (480 px max), the two buttons 32 px below ("Explore courses" → `#categories`, "See how it works" → `#how-it-works`), then 32 px below the trust row: three overlapping 32 px learner avatars (`-space-x-2`, 2 px `background-light-yellow` ring, `alt=""`) and "**Trusted by 24,000+** learners" in body 1.
- **Image block:** the photo (`rounded-2xl`, `rounded-3xl` on desktop, `object-cover`) sits on a `background-orange` block offset to the right and a `primary-blue-light` circle at the bottom left. Two floating badges overlap it: "120+ expert-led courses" (top left, the number in a `primary-blue-light` chip) and "4.9 avg rating" (bottom right, five `secondary-yellow` stars, `aria-hidden` because the text carries the rating).
- **Mobile (below `lg`):** the image block comes first visually (`flex-col-reverse`, so the DOM and reading order still start with the heading). The image block, the buttons and the trust row keep the mobile frame's 362 px width at every width up to `lg` (the photo is 346 × 380), so the composition doesn't stretch on tablets. Buttons stack full width; the trust row is centered.
- **Desktop (`lg` and up):** two columns, 60 px apart, top-aligned. The copy column keeps at least 448 px (`min-w-md`); the image takes 500 px and the 500:520 shape at 1280, and shrinks with the viewport below that (about 356 px at 1024), with the decorations and badges anchored to its edges. The decorations and the rating badge reach up to 58 px past the image into the 80 px gutter.

### Categories

`src/components/categories/Categories.tsx`, `background-white`, `py-15 lg:py-25`, `id="categories"` (the header's "Courses" link). Content comes from `src/data/categories.ts`.

- **Header:** `SectionHeader`, 560 px max (`max-w-140`). The cards start 48 px below it on mobile and 40 px below on desktop.
- **Card:** the card pattern, as a list item (`<ul>`): `p-6` and 200 px minimum height on mobile, `p-7` and 260 px on desktop. Inside: the number badge (`01`–`04`, `aria-hidden`: the order means nothing), the title as an `h3` in H5 20 px below, the description in `text-tertiary` body 1 12 px below, and "Explore" with a 20 px arrow (body 1 bold, 8 px gap) 24 px below. "Explore" sits at the bottom of every card (`justify-between`), so it lines up across a row whatever the description length.
- **Link:** each card has one link, "Explore", whose `::after` covers the whole card, so a click anywhere follows it. Its accessible name is "Explore <category>" (the title is `sr-only` after the visible word). The focus ring is drawn on the card (`has-focus-visible:`), not the word. No category pages exist, so each points to `#`.
- **Hover** (not in Figma): the border darkens from `line-1` to `text-tertiary` and "Explore" underlines; the color animates only under `motion-safe:`.
- **Grid:** one column with 16 px gaps; 2 × 2 from `md`; 4 in a row with 20 px gaps from `lg`. At 1024 px the cards are about 200 px wide and "Product Design" wraps to two lines; "Explore" still lines up.

### FeaturedCourse

`src/components/featured-course/FeaturedCourse.tsx`, `primary-blue`, `py-15 lg:py-25`, `id="featured-course"`. Copy that appears once stays in the component.

- **Image column:** the course photo (`rounded-2xl`, `object-cover`, lazy) in a 13:10 frame at every width (Figma draws 362 × 280 on mobile and 538 × 408 on desktop, in its 1136 px column; 530 × 408 in the 1120 px column; all about 13:10). The "Featured course" tag (`secondary-yellow`, `rounded-md`, overline in `text-primary`) overlaps its top-left corner by 12 px.
- **Copy column:** `SectionHeader` with `tone='onBlue'`, then the instructor line (subtitle 2) 24 px below, the course details 24 px below as a list of chips (`line-1` border, `rounded-lg`, body 1 in `text-white-primary` at every width; the mobile frame's `text-white-secondary` fails AA), then the actions 32 px below: "View course" (`ButtonLink` `onBlue`, `#`: no course page exists) and "Browse all courses" (`ArrowLink` `onBlue`, `#categories`).
- **Mobile:** image first, copy below, 40 px apart; the actions stack full width.
- **`md` and up:** two columns, vertically centered, 40 px apart (60 px from `lg`); mobile type until `lg`. The actions sit in a row and wrap when the column is too narrow for both (at 768, "Browse all courses" drops to its own line).

### HowItWorks

`src/components/how-it-works/HowItWorks.tsx`, `background-light-yellow`, `py-15 lg:py-25`, `id="how-it-works"` (the hero's "See how it works" link). Content comes from `src/data/steps.ts`.

- **Header:** `SectionHeader`, centered, no lead. The steps start 40 px below it on mobile and 108 px below on desktop.
- **Steps:** an `<ol>`, numbered "Step 01" to "Step 03" (Figma labels all three "Step 01"). Each step: a 56 px icon drawn in CSS (`aria-hidden`), the label (overline in `text-secondary`) 24 px below, the title as an `h3` in H5 8 px below, and the description in subtitle 2 `text-secondary` 12 px below. The icons: a `primary-blue-light` circle with a `primary-blue` square (`rounded-md`); a `background-orange` tile (`rounded-lg`, rotated 12°) with a `primary-orange` dot; a `background-yellow` square (`rounded-xl`) with an `accent-yellow-dark` dot. The mobile frame tints the second tile `primary-orange` at 15%; the build uses `background-orange` everywhere.
- **Connector:** a 1 px `line-1` line drawn by each step but the last (`::after`). On mobile it's vertical, 50 px tall, under the icon's center, ending at the next icon (steps 76 px apart). From `lg` it's horizontal through the icons' centers, from the icon's edge to the next icon's center, which covers its end.
- **Layout:** stacked until `lg` (no tablet frame; a 3-column row at 768 would leave about 190 px per step); three equal columns 80 px apart from `lg`. Copy is the desktop frame's (the mobile frame says "who actually use these skills").

### Testimonial

`src/components/testimonial/Testimonial.tsx`, `background-white`, `py-15 lg:py-25`, `id="testimonial"`. Figma gives the section no heading, so it's named by an `sr-only` `h2`, "What learners say", which keeps it in the heading outline. Stats come from `src/data/stats.ts`.

- **Quote:** a `<figure>`, 600 px max: the quote mark (`QuoteIcon`, 24 × 22, `primary-blue`, `aria-hidden`), the quote in a `<blockquote>` 16 px below (quotes, `text-primary`), then the `<figcaption>` 32 px below: a 48 px round avatar (`primary-blue-light` behind it, `alt=""` because the caption names the person), 16 px gap, the name (Inter bold: subtitle 1 on mobile, subtitle 2 on desktop) over the role (body 1 `text-secondary`).
- **Stats:** a `<ul>`; each item is the value (H1, `primary-blue`) over its label (body 1 `text-tertiary`) 4 px below.
- **Mobile (below `lg`):** the quote, then the stats 60 px below as three equal columns (120.7 px each at 402). Each stat keeps at least its longest word plus a 16 px right padding (`min-w-min pr-4`) and the row wraps, so below about 370 px the third stat moves to its own line instead of the values overlapping.
- **Desktop (`lg` and up):** the quote on the left, vertically centered against the stats column on the right: 401 px wide with a `line-1` left border, 48 px left padding and 20 px between stats. Figma clips each label into a 25 px box, so its column is about 325 px tall; the built one is 334.

### People

`src/components/people/People.tsx`, `background-light-yellow`, `py-15 lg:py-25`, `id="people"` (the header's "Community" link). Figma's body copy is lorem ipsum; the built copy is written in the page's tone at about the same length.

- **Copy column (560 px max):** `SectionHeader` with `spacing="grouped"` (overline, the title 8 px below, the lead in `text-secondary` 24 px below, 32 px from `lg`), then the secondary button "Explore teachers and students" (`#`) 24 px below (32 px from `lg`). The mobile frame sets the lead in `text-primary`; the build uses the desktop's `text-secondary` at every width. Figma's button is 54 px tall (a 1 px border outside the 52 px button); the build uses the 52 px secondary button.
- **Collage:** decorative, so the whole block is `aria-hidden` and every photo has `alt=""`. A `primary-blue-light` circle centered behind four columns of photos (`rounded-sm`, `object-cover`, `shadow-dark-m`, lazy, `sizes='(min-width: 1280px) <desktop width>px, <mobile width>px'` without `auto`, see styling.md "Images"). The first column is right-aligned and pushed down, the second pushed down on desktop only, and the columns are vertically centered against each other. The mobile frame rounds the photos 5 px and the desktop 4 px; the build uses 4 px at both.
  - **Mobile size (below `xl`):** 330 px circle, capped to the collage width below 370 px; photos 72 px wide (94 and 88 for the two larger ones), 8 px apart, columns spread across 362 px (`justify-between`).
  - **Desktop size (`xl` and up):** 500 px circle; photos 103 px wide (138 and 128), 13 px apart, 16 px between columns. Sizes are Figma's rounded to whole pixels.
- **Layout:** stacked below `lg` (copy, then the collage 32 px below, centered). From `lg` the copy and the collage sit side by side, 60 px apart, vertically centered. The desktop collage is about 520 px wide and doesn't fit the 1024 px column, so it keeps its mobile size until `xl` (1280 px).

### Contact

`src/components/contact/Contact.tsx`, white background, `py-15 lg:py-25`, `id="contact"`. The form is the client leaf `ContactForm.tsx`. The mobile frame's form copy is Portuguese; the build uses the desktop's English copy at every width.

- **Info column (480 px max):** `SectionHeader` (overline "Contact", "Get in touch", lead in body 1 on mobile and subtitle 1 from `lg`), then a list (`<ul>`) of two cards 32 px below (40 px from `lg`), 16 px apart: `bg-background-light-yellow rounded-xl`, padding 16 px (20 px from `lg`), a 40 px `primary-blue-light` tile (`rounded-lg`) holding the message icon (24 px) or the clock (20 px) in `primary-blue`, then the label in `text-primary` and the value 2 px below (4 px from `lg`). The email is a `mailto:` link in `primary-blue`; the response time is `text-secondary` (Figma's `text-tertiary` is 4.45:1 on the card).
- **Form (540 px max):** the form container, holding the `h3` "Contact us" (H5 at both sizes) and its line in body 1 `text-secondary` 8 px below, then the three fields 24 px below (20 px apart), then the full-width primary button 24 px below. The form is named by its `h3`.
- **States (not in Figma):** no errors until the first submit; then every invalid field is flagged and the first one focused, and each field re-validates as it changes. While sending, the button reads "Sending…" and is `aria-disabled`, and the fields are read-only so nothing typed is lost when the form clears. Success shows a message on `primary-blue-light` above the button, inside an always-rendered `role="status"` region (a live region must be in the accessibility tree before its content changes), and clears the form; failure shows a `role="alert"` message in `error` with an `error` border and keeps the values.
- **Layout:** stacked below `lg` (info, then the form 40 px below). From `lg` the two columns sit side by side, vertically centered, at least 40 px apart; both shrink below 1280.

### FinalCTA

`src/components/final-cta/FinalCta.tsx`, `background-yellow`, `py-15 lg:py-25`, `id="get-started"`, named by its `h2`. No overline, so it doesn't use `SectionHeader`.

- **Copy (656 px max, centered):** four overlapping 40 px learner avatars (`-space-x-2`, 2 px `secondary-yellow` border, `primary-blue-light` behind, `alt=""`: decorative), the title "What will you learn next?" 32 px below (H2 at both sizes, the only H2-styled title on the page), the lead in subtitle 1 `text-secondary` 16 px below, then the actions 40 px below: "Explore all courses" (primary, `#categories`) and "Join Luma" (secondary, `#`: no sign-up page exists).
- **Actions:** stacked full width below `md`; a centered row of natural-width buttons, 12 px apart, from `md` (no tablet frame; a full-width stack would reach 720 px).
- **Decorations:** desktop only, and only from `xl` (1280 px): eight CSS shapes (rings, discs and 12°-rotated tiles) and five icons (`DecoLetterBIcon` rotated 15°, `DecoChatIcon`, `DecoDropIcon`, `DecoCubeIcon`, `DecoPanelsIcon`), all `background-orange`, placed at Figma's coordinates on a 1280 px box centered in the section (`aria-hidden`, clipped by the section's `overflow-hidden`). On wider screens they stay around the copy instead of drifting to the edges. Below 1280 the inner shapes would crowd the copy, and the mobile frame has none.

## Accessibility deviations

Where a Figma pairing misses WCAG AA, the build deviates from the frame and the pattern above says so.

| Element                | Figma                           | Built                                                            | Why                                                                                                                    |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Text on `primary-blue` | `text-white-secondary` (4.46:1) | `text-white-primary` (5.49:1)                                    | SC 1.4.3 needs 4.5:1 for 14 px text (FeaturedCourse link and chips)                                                    |
| Step labels            | `text-tertiary` (4.45:1)        | `text-secondary` (5.30:1)                                        | SC 1.4.3 needs 4.5:1 for 12 px text (HowItWorks "Step 0n" on `background-light-yellow`)                                |
| Form field placeholder | `text-tertiary` (4.45:1)        | `text-secondary` (5.30:1)                                        | SC 1.4.3 covers placeholder text                                                                                       |
| Contact response time  | `text-tertiary` (4.45:1)        | `text-secondary` (5.30:1)                                        | SC 1.4.3 needs 4.5:1 for 14 px text on `background-light-yellow`                                                       |
| Form field text size   | body 1 (14 px) at every width   | subtitle 1 (16 px) below `lg`                                    | iOS Safari zooms the page when a field under 16 px gets focus                                                          |
| Form field border      | `line-1` (1.33:1 on the card)   | `line-input` `#7c8ab6` (3.40:1 on the card, 3.20:1 on the field) | SC 1.4.11: the border is what shows the input, so it needs 3:1. The field background alone is 1.06:1 against the card. |
