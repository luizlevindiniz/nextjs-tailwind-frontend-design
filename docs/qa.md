# Manual QA

A short pass to run before a release, on the production build. The tests cover the details; this checks what only a person in a browser sees.

```bash
pnpm build && pnpm start   # http://localhost:3000
```

Use Chrome with DevTools device mode. Tick each box; anything that fails is a bug or a missing entry in the [styleguide](frontend/styleguide.md)'s deviations.

## Design

- [ ] At 1280 px and 402 px, each of the ten parts matches its Figma frame in order, type, colours, spacing and imagery. Recorded deviations (copy, step numbers, contrast) are expected.
- [ ] Fonts are Plus Jakarta Sans (headings, quotes, stats) and Inter (body). No fallback font is visible after load.
- [ ] Images are sharp at 2× and nothing is stretched or cropped oddly.

## Responsive

- [ ] Drag the width from 320 to 1920 px: no horizontal scrollbar, no overlapping or clipped text, no orphaned single-column block.
- [ ] Tablet (768 and 1023 px): categories 2×2, featured course and footer in columns, contact cards side by side, mobile menu still in use.
- [ ] At 1024 px the desktop nav replaces the menu button. At 1280 px the large collage and the call to action decorations appear.

## Interactions

- [ ] **Mobile menu:**
  - The button opens the panel and its icon turns into an X.
  - It closes on a link, a tap outside, Esc (focus returns to the button), or widening past 1024 px.
- [ ] **In-page links:**
  - Header, hero, featured course, call to action and footer links scroll to their section.
  - Placeholder links (`#`) stay on the page.
- [ ] **Hover:** buttons tint, the secondary button's border darkens, links and category cards underline.
- [ ] **Contact form:**
  - **Empty submit:** every field shows an error and the first field gets focus.
  - **Fixing a field:** its error clears as you type.
  - **Valid send:** the button reads "Sending…" for about a second, then a success message appears and the form clears.
  - **`fail@example.com`:** an error message appears and what was typed is kept.

## Accessibility

- [ ] **Keyboard only:**
  - The first Tab shows "Skip to content" and Enter jumps to the main content.
  - Every link, button and field is reachable in visual order, each with a visible focus ring.
  - The menu and the form work without a mouse.
- [ ] **Screen reader or DevTools accessibility tree:**
  - One `h1`, headings in order.
  - Landmarks are present: banner, navigation, main, contentinfo.
  - Images have a description, and decorative ones are silent.
  - Form errors and the send result are announced.
- [ ] **Rendering settings** (DevTools): with `prefers-reduced-motion: reduce` nothing animates. With `forced-colors: active` buttons and fields keep a visible edge.
- [ ] Lighthouse accessibility: 100 on mobile and desktop.

## Performance and metadata

- [ ] **Lighthouse (mobile and desktop):**
  - Performance ≥ 90, best practices and SEO at 100.
  - CLS 0 and LCP on the hero photo.
- [ ] **Network tab:**
  - Images are AVIF or WebP at the size they're shown, and only the hero image loads eagerly.
  - Two font files are preloaded.
  - The console has no errors or warnings.
- [ ] **Metadata routes:**
  - The tab shows the title and favicon.
  - `/opengraph-image`, `/sitemap.xml` and `/robots.txt` respond.
  - A missing URL shows the 404 page.
