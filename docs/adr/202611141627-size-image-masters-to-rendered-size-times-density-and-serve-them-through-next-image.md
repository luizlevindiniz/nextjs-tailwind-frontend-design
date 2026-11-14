# Size image masters to rendered size times density and serve them through next/image

## Status

Accepted

## Context

The page shows 17 raster photos from the Figma file: a hero photo, a course photo, a 10-photo collage and 5 avatars. The Figma sources range from 80 px avatars to 1880 px collage photos shown in frames no wider than 138 px. The hero (900 px) and course (700 px) sources are already smaller than twice their desktop frames (500 and 538 px).

`next/image` doesn't size images by itself. Without `sizes`, a responsive image falls back to `100vw` and the browser fetches a variant as wide as the viewport, however small the frame. Next 16 also requires `images.qualities` and serves only WebP by default. For an image with a fixed `width` and no `sizes`, it generates 1x and 2x candidates only, never 3x.

## Decision

- Commit one master per image in `src/assets/images/`, imported statically so the build knows its dimensions and makes a blur placeholder. `next/image` generates the variants (Next 16.4, 2026-11).
- Master width = max(desktop drawn width × 2, mobile drawn width × 3), never more than the Figma source. Fixed-size images (avatars) stop at 2× their largest CSS width, because `next/image` never requests 3x for them. Masters that need resizing are re-encoded once at JPEG quality 90; the rest are the untouched sources.
- A photo shown with `object-cover` in fixed frames (the collage) is pre-cropped, centered as Figma's fill is, to the region its frames show: the source's aspect ratio clamped between its narrowest and widest frame. `sizes` describes the frame's width, but a photo wider than its frame is drawn wider than that, so an uncropped landscape photo in a portrait frame got a third of the pixels it needed. After the crop, the drawn width exceeds the frame width by at most 12.5% (desktop), and the master is sized for the drawn width. A density check over `next/image`'s width buckets, using whole-pixel frame sizes, confirms every frame gets its target density at DPR 1–2 on desktop and 1–3 on mobile. Where it doesn't (one photo, whose desktop frame lands exactly on the 128/256 buckets), the master is cropped to its narrowest frame instead, so its mobile frame shows a slightly tighter crop than Figma.
- `next.config.js` serves AVIF, then WebP, at quality 75 (`formats`, `qualities`). Default `deviceSizes` and `imageSizes`.
- Every responsive image passes an accurate `sizes` built from its CSS widths at each breakpoint. Images outside the first paint stay lazy (the default) and prefix `sizes` with `auto, `. Only the LCP image loads early, with `loading='eager'` and `fetchPriority='high'`. The Next 16 docs prefer these to `preload`, which adds a `<link rel=preload>` to the head but no fetch priority, and gains little for an image already in the server HTML. `priority` is deprecated.

Alternatives considered:

- Pre-generated variants written by a sharp script and served with plain `<img srcset>`. Rejected: more code to own, no blur placeholder, and the optimizer already does it.
- 2× everywhere. Rejected: soft on DPR-3 phones, which are common, for little saving on images this small.
- Committing the Figma sources untouched. Rejected: about 3 MB of pixels no screen uses, though the optimizer would still size the delivered variants.
- WebP only (the Next default). Rejected: AVIF is about 20% smaller; the slower first encode is cached.

## Consequences

- Shipped image bytes follow the layout, provided each `sizes` value is kept in step with the CSS. A layout change means updating `sizes` in the same change, and re-cropping a collage master if its frame's aspect ratio changes.
- The hero and course photos are not pre-cropped: their mobile frames are fluid up to `lg`, so their shape is settled when those sections are built.
- A frame that grows past its master's cap serves the master at a lower density. Re-derive the master from the source rather than upscale it.
- The hero and course photos are below 2× on desktop retina screens because their sources are; this is a known gap.
- AVIF and WebP are cached separately, so the optimizer cache is larger, and a CDN in front of a self-hosted server must forward the `Accept` header.
