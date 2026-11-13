# Testing

## Stack

| Tool                                                                                   | Role                                                                              |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [Jest 30](https://jestjs.io/) via `next/jest`                                          | Test runner; SWC transforms, path aliases, loads the Next.js config               |
| `jest-environment-jsdom`                                                               | Browser-like DOM                                                                  |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | Render components and query them like a user would                                |
| [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom)             | DOM matchers (`toBeInTheDocument`, `toHaveAttribute`…), loaded in `jest.setup.js` |

SVG imports resolve to `src/__mocks__/svg.tsx` (a plain `<svg>`) in tests. See the [testing ADR](../adr/202611131621-use-jest-and-testing-library-for-tdd.md).

## TDD workflow

```
Write the test (red) → minimum implementation (green) → refactor
```

1. Describe the behaviour in a test before writing the component.
2. Run it and watch it fail. A test that can't fail proves nothing.
3. Write just enough code to pass.
4. Refactor with the test green.

Use `pnpm test:watch` while working.

## What to test

The scope is deliberately small:

| Test            | When                                                         | Example                                                                                                        |
| --------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Unit**        | Reusable components with variants or behaviour               | Button renders an `<a>` with the right variant classes; SectionHeader renders the right heading level          |
| **Integration** | Crucial interactive flows, rendered with their real children | Mobile menu opens and closes, Esc closes it and focus returns; contact form shows errors, then a success state |
| **Route smoke** | The page renders its landmarks and single `<h1>`             | `src/app/__tests__/page.test.tsx`                                                                              |

Not tested in Jest: static markup with no logic (no snapshot tests), visual fidelity, responsiveness and performance. jsdom has no layout engine, so those are checked in a real browser (Chrome DevTools, Lighthouse) against the Figma design.

## Rules

- Query the way a user perceives the page, in this order: `getByRole` (with `name`), `getByLabelText`, `getByText`. Use `getByTestId` only as a last resort.
- Drive interactions with `@testing-library/user-event` (to be added with the first interactive test) rather than `fireEvent`.
- Assert on outcomes (text, roles, `aria-expanded`, focus), not implementation details (state, class names).
- Keep each test focused on one behaviour, with a name that reads as a sentence.

## Location

Tests live in a `__tests__/` folder next to the code they test, named `<subject>.test.tsx`.

## Example

```tsx
import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders a main landmark with a level-1 heading', () => {
    render(<HomePage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

## Commands

```bash
pnpm test                 # once
pnpm test -- menu         # files matching "menu"
pnpm test:watch           # TDD loop
```
