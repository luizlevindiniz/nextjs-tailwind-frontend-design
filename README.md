# Luma

A responsive landing page for "luma.", a fictional platform of practical online courses. Built from a Figma design (a 1280 px desktop frame and a 402 px mobile frame) with Next.js (App Router), TypeScript and Tailwind CSS v4. There's no backend: content is typed local data.

## Install, run and build

Requires Node 24.15 and pnpm 12.18 (pinned in `.tool-versions`).

```bash
pnpm install
pnpm dev      # dev server at http://localhost:3000
pnpm build    # production build (the page is prerendered as static)
pnpm start    # serve the production build
pnpm test     # Jest + Testing Library
```

Every commit has to pass the same gates CI runs:

```bash
pnpm lint:strict && pnpm typecheck && pnpm format:check && pnpm test && pnpm build && pnpm adr:check
```

### Environment

Copy the example file to set the site's public URL, used for the canonical URL, social cards, sitemap and robots.txt:

```bash
cp .env.example .env.local
```

It's optional: without it the URL is Vercel's production URL on Vercel, and `http://localhost:3000` elsewhere.

## What's built

One page with ten parts: header with a mobile menu, hero, categories, featured course, how it works, testimonial and stats, people, contact (info and form), final call to action and footer.

- **Server Components by default.** The page's only client components are the mobile menu and the contact form (plus the error boundary, which Next requires to be one).
- **Design tokens only.** Tailwind's default palette, type scale and shadows are removed. `@theme` holds only the Figma tokens, so a class outside the design (`text-red-500`) generates no CSS. See the [styleguide](docs/frontend/styleguide.md).
- **Images.** Each master image is sized to its rendered size times the screen density. `next/image` serves the masters as AVIF/WebP with the right `sizes`, and the hero photo loads eagerly at high priority.
- **Fonts and metadata.** Fonts come through `next/font`. Metadata uses the App Router API: an Open Graph image generated at build time, a favicon, a sitemap and robots.txt.
- **Accessibility.** The page has landmarks, a skip link, one `h1`, ordered headings and a keyboard-operable menu (Esc closes it and focus returns to the toggle). Focus rings are visible, and decorative images and SVGs are hidden from assistive tech. Buttons and fields stay visible in Windows high-contrast mode.
- **Motion.** The three transitions on the page run only under `motion-safe:`. A test fails if motion is added without that guard.
- **Tests.** 236 tests, written test-first where there's behaviour:
  - unit tests for the components;
  - integration tests for the menu and the contact form;
  - source guards for motion and forced colors.

Last audit (production build, Lighthouse 12.8):

|         | Performance | Accessibility | Best practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Mobile  | 95          | 100           | 100            | 100 |
| Desktop | 100         | 100           | 100            | 100 |

Other results:

- **Layout shift:** CLS is 0 at both sizes.
- **Mobile LCP:** 1.8 s in a Chrome trace on Slow 4G with a 4× CPU slowdown.
- **Page weight:** about 300–380 KB transferred, including every lazy image.
- **axe-core** (WCAG 2.2 AA): 0 violations, including with the menu open and the form in its error and success states.

## Key decisions

The design leaves some things open and gets some things wrong, so I made a call in each case. The [styleguide](docs/frontend/styleguide.md) records every deviation from the frames, and the [ADRs](docs/adr/README.md) record the architecture.

- **Tablet.** There is no tablet frame. The mobile layout stays fluid up to 768 px, and sections switch to the desktop layout at 1024 px. A few sections switch earlier where two columns clearly fit: categories go 2×2, the featured course and the footer go to columns, and the contact cards sit side by side. Desktop elements that don't fit at 1024 wait until 1280: the large photo collage and the decorations around the final call to action.
- **Copy.** The mobile form is in Portuguese and the People text is lorem ipsum. The page uses English everywhere, and the People text is new copy of about the same length. All three steps were labelled "Step 01", so they're numbered 01–03 in an ordered list. Where mobile and desktop disagree on wording or colour, the desktop version wins.
- **Interactions the design doesn't draw:**
  - **Mobile menu:** the open menu is a dropdown panel, and the toggle turns into an X.
  - **Hover:** buttons tint, the secondary button's border darkens and links get an underline.
  - **Contact form:**
    - Validation runs on submit, then live as you fix each field.
    - A simulated 1 s send. `fail@example.com` fails on purpose, so the error state can be seen.
    - "Sending…" while busy, a success message that clears the form, and an error message that keeps what was typed.
- **Accessibility over the frame.** Wherever a Figma colour pair misses WCAG AA, it was darkened to the nearest token that passes. Affected: text on blue, step labels, placeholders, field borders and the response time line. Form fields are 16 px on mobile so iOS doesn't zoom on focus. The section without a heading gets a visually hidden one, and the category cards are links named "Explore ‹category›".
- **Links.** Links point to in-page sections where one exists (Courses → categories, Community → people…) and to `#` otherwise.
- **Width.** Three sections draw a 1136 px column that overflows the page gutter. Everything uses the 1120 px container instead.

## Known gaps

- **Placeholder links.** Links with no matching section go to `#`. Log in, Start learning and Join Luma have no auth behind them.
- **Simulated contact form.** It sends nothing. The data is mocked, and [architecture.md](docs/architecture.md#what-is-mocked) lists what each mock would become.
- **Image resolution.** The hero and featured course source images are under 2× their desktop size, so they're slightly soft on high-density desktop screens. Fixed-size images (avatars, the collage) get at most 2× on 3× phones, which is a `next/image` limit.
- **Unused JavaScript.** Lighthouse flags about 50 KB of unused JS and 13 KB of polyfills inside Next.js's own framework chunks. Neither can be configured from the app.
- **Not checked on real devices.** Testing used Chrome on desktop with mobile emulation, plus Lighthouse and axe. There was no real iOS, Safari or screen-reader pass.
- **Small offsets from Figma.** Some sections are 1–12 px off in height: Figma's own text overflows its frames, and some mobile/desktop differences were evened out. The styleguide lists each case.

## Time spent

About 5–6 hours.

## AI tools

Built with [Claude Code](https://claude.com/claude-code) as a pair programmer: I made the decisions, and the agent proposed, implemented and verified.

**Tools:**

- **Figma MCP:** design tokens, section structure, assets and screenshots.
- **Chrome DevTools MCP and Playwright:** layout measurements, Lighthouse, traces and accessibility checks in a real browser.
- **context7:** current Next.js and Tailwind docs.

**How the output was checked:**

- Tests first.
- The six gates above, locally and in CI.
- Each section measured in Chrome against the Figma frames at 402 and 1280 px.
- A review of every task that runs it (gates and browser) before reporting anything.
- I read every diff.

Details: [docs/ai-tooling.md](docs/ai-tooling.md).

## Docs

Start at [`docs/README.md`](docs/README.md): it maps every question to the document that answers it.
