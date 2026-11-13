# Serve content from typed local mock data

## Status

Accepted

## Context

The project has no backend or CMS, and one is out of scope. The page has repeated content (navigation, categories, steps, stats, footer links) and one form (contact) whose submission has nowhere to go.

## Decision

- Repeated content lives in typed TypeScript modules under `src/data/`, and sections render it with `map`. Copy that appears once stays in its component.
- There is no API, database or CMS. The contact form validates on the client and simulates a submission, with success and error states, without sending data anywhere. The exact mechanism is decided in the contact form task.
- What is mocked, and how a real backend would replace it, is documented in `docs/architecture.md`.

## Consequences

- Content types document the shape a future CMS or API would need to return.
- The contact form cannot be tested end to end against a real service; tests cover validation and the simulated states.
