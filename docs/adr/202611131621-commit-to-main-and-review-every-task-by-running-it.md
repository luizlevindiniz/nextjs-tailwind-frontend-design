# Commit to main and review every task by running it

## Status

Accepted

## Context

One developer builds the project with an AI coding agent, across many sessions whose context is cleared in between. Work is split into small tasks in a local, gitignored roadmap (`tmp/roadmap.md`), and progress is tracked in `tmp/state.md`; both are working notes, not deliverables. The developer chose not to use per-task branches or pull requests.

## Decision

- Work lands on `main` in small Conventional Commits (enforced by commitlint and Husky).
- A task is done only when lint, typecheck, format check, tests and `pnpm build` pass, and `/review-that-runs` has reviewed the task's commit range by running the app, with its findings fixed or recorded in `tmp/state.md`.
- `/grilling` may be used at the start of a task whose behaviour or layout is unclear.
- `tmp/state.md` and `tmp/roadmap.md` are updated at the end of every task, so the next session can resume from them.

## Consequences

- History stays linear and easy to review commit by commit.
- Without pull requests there is no forge gate. CI runs on push to `main`, so local gates and the review are the real protection.
