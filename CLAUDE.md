@README.md

A one-page responsive landing page ("luma.") built from Figma with Next.js App Router, TypeScript and Tailwind CSS v4. No backend: content is typed local data.

`docs/README.md` maps every document to the question it answers; read the one that matches the work before changing it. Keep docs true: update them in the same change as the code.

# Start of every session

Context is cleared between sessions. Before doing anything, read these local, gitignored working notes:

1. `tmp/README.md`: the handoff and the user's rules.
2. `tmp/state.md`: where we are, what's next, open findings.
3. `tmp/roadmap.md`: every task and the definition of done.
4. `tmp/figma.md`: **how to load the design** (file key, node IDs per section, tokens, MCP workflow). The original Figma link in `tmp/task.md` is view-only and fails; use the copy named in `tmp/figma.md`.
5. `tmp/design-issues.md`: design problems and the decisions taken on them.

`tmp/README.md` is the handoff for a clean session, including the user's working rules; `tmp/task.md` holds the original requirements. When something is ambiguous, follow them strictly and ask; don't assume.

At the end of a task, update `tmp/state.md` and tick `tmp/roadmap.md`.

# Commands

- `pnpm dev`, `pnpm build`, `pnpm test` (`pnpm test -- <pattern>` for one file)
- Gates, all required before a commit:
  `pnpm lint:strict && pnpm typecheck && pnpm format:check && pnpm test && pnpm build && pnpm adr:check`

# Rules

- **Mobile first.** Build at the 402 px mobile frame, then layer up to the 1280 px desktop frame. There's no tablet frame: the mobile layout stays fluid up to `md` (768 px), and sections switch to the desktop layout at `lg` (1024 px), earlier only where a 2-column layout clearly fits.
- **Figma is the source of truth.** Use only tokens declared in `@theme` (`src/styles/globals.css`); no arbitrary values that duplicate a token. If the design is unclear, ask the user and log it in `tmp/design-issues.md`.
- **Tests are mandatory, TDD preferred.** Unit tests for main components, integration tests for crucial flows (menu, contact form). Query by role/label/text.
- **Semantic HTML and accessibility:** landmarks, one `h1`, ordered headings, keyboard-operable controls, visible focus, alt text (`alt=""` for decorative images), `aria-hidden` decorative SVGs, `motion-safe:` for animation.
- **Performance and SEO:** Server Components by default, `'use client'` only on the smallest interactive leaf, `next/image` with correct `sizes`, `next/font`, App Router `metadata`.
- Load the `frontend-design` skill for UI work and `figma:figma-design-to-code` before `get_design_context`.
- After each task, run `/review-that-runs` on its commits. `/grilling` is available at the start of an unclear task.
- Commits go straight to `main` as Conventional Commits. Commit only when the user asks.
- **The user is the sole author of every commit. Never add a `Co-Authored-By` trailer or any AI attribution to commits.**

# Gotchas

- `tmp/` is gitignored. Never link to it from committed docs or ADRs; readers of the repo won't have it.
- Keep committed files project-agnostic: never mention the company or context the requirements in `tmp/` came from, or the starter template the repo was created from.
- Deleting files with `rm` is denied by the permission settings; move them out of the repo instead.
- The Figma page metadata is ~77 KB. Use the offline dump and parse script in `tmp/figma.md` instead of requesting it again.
- Figma isn't always right: decided deviations (copy language, step numbering, placeholder text, link targets, interaction states) are in `tmp/design-issues.md`. Follow those decisions over the literal frame, and log every new deviation there.

# Conventions not written elsewhere

- All copy is English, at every breakpoint.
- Links point to in-page anchors (`#how-it-works`…) when a matching section exists, and to `#` otherwise. Each section's `<section>` carries the `id` that anchors target.
- Repeated content lives in typed modules under `src/data/`. Copy that appears once stays in its component.

## Architecture Decision Records

Architectural decisions are recorded in `docs/adr/`, indexed in `docs/adr/README.md`.

- Before an architectural change (new dependency, data model, module boundaries, infrastructure, cross-cutting patterns), read the index and the relevant ADRs.
- Follow Accepted ADRs. If a requested change conflicts with one, say so and stop for confirmation instead of silently breaking it.
- When your work makes a decision future developers will need the "why" for, or one that is architecturally significant, cross-team, or hard to reverse, write an ADR:
  - copy `docs/adr/template.md` to `docs/adr/$(date +%Y%m%d%H%M)-<decision-slug>.md`, naming the decision, not the topic;
  - status Proposed unless the user has agreed to it;
  - describe the real context and the alternatives considered, not generic pros and cons;
  - add it to the index.
- Don't write ADRs for tiny, temporary, or already-documented decisions.
- Never edit an existing ADR except its status. To change a decision, write a new ADR and set the old one's status to `Superseded by [title](./file.md)`.
- After adding an ADR or changing a status, regenerate the index table from the files.

### The ADR check

`pnpm adr:check` checks the records, the index, the links in every file agents read, and every place code or docs cite a record. CI runs it on every push to `main` and every pull request; run it before committing.

- `pnpm adr:new "<decision title>"` creates a record from the template and adds it to the index.
- `pnpm adr:index` regenerates the index after a status change.
- Cite a record by its file name without `.md` (`YYYYMMDDHHMM-<decision-slug>`), never by a sequence number. The check fails a citation that names no record. It warns on one that names a superseded or deprecated record, since that comment now points at a decision that no longer stands.
- Once a record is merged, the check allows changes to its Status section only, and only forward:
  - Proposed → Accepted or Rejected
  - Accepted → Deprecated or Superseded
  - Deprecated → Superseded
