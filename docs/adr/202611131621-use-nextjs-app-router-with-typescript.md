# Use Next.js App Router with TypeScript

## Status

Accepted

## Context

Luma is a single responsive marketing landing page built from a Figma design, with desktop and mobile layouts. It is mostly static content plus a couple of interactions (mobile menu, contact form) and has no backend. Accessibility, Core Web Vitals, SEO metadata and design accuracy matter more than application features.

As of November 2026 the current versions are Next.js 16.4, React 19.3 and TypeScript 6.

## Decision

Build the page with the Next.js App Router and strict TypeScript.

- Components are React Server Components by default. `'use client'` is added only to the smallest leaf that needs state, effects or browser APIs (interactive islands), never to a whole section or page.
- The route is statically prerendered (`○ Static` in `next build`); nothing opts into dynamic rendering.
- Page metadata uses the App Router `metadata` export, not hand-written `<head>` tags.
- Every component has a typed props interface; no `any`.

Alternatives considered:

- A Vite + React SPA: client-side rendering would delay content and hurt LCP and SEO for a page that is almost entirely static.
- A static site generator such as Astro: a good fit for static content, but React and the Next.js tooling (image optimization, fonts, metadata files) cover the interactive parts with one framework.
- The Pages Router: superseded by the App Router; no Server Components.

## Consequences

- Most of the page ships zero client JS; interactive parts are isolated and testable on their own.
- Contributors must keep the server/client boundary deliberate: passing functions or non-serializable props into a client component fails at build time.
- Tests render Server Components as plain functions in jsdom; async Server Components or server-only APIs would need a different approach if they are ever introduced.
