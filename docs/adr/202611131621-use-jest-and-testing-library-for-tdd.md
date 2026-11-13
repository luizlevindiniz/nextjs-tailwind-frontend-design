# Use Jest and Testing Library for test-driven development

## Status

Accepted

## Context

The page is small, but its interactions (mobile navigation menu, contact form) and its accessibility must not regress while the layout is iterated against the design. Tests are written first where there is behaviour: a few unit tests for the main components and integration tests for the crucial flows.

## Decision

- Use Jest 30 with `next/jest` (SWC transforms, path aliases), `jest-environment-jsdom`, React Testing Library and `jest-dom`.
- Write the failing test first, then the minimum code to pass, then refactor.
- Query by role, label and text (what a user or assistive technology perceives), not by class names or test IDs. Role-based queries double as accessibility checks.
- Scope stays small: unit tests for reusable components with behaviour or variants, integration tests for interactive flows. Static presentational markup is not snapshot-tested.
- `pnpm test` runs in CI next to lint, typecheck, format check and the production build.

Alternative: Vitest. Faster and ESM-native, but this project has no Vite config to share, and `next/jest` already handles the Next.js transforms; switching would not change what the tests can prove.

## Consequences

- Behaviour is pinned before markup is styled, which protects interactions while the layout changes.
- jsdom does not do layout: responsiveness, visual fidelity and Lighthouse scores are verified in a real browser (Chrome tooling), not in Jest.
