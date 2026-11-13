# Use pnpm as the package manager

## Status

Accepted

## Context

Installs must be reproducible locally and in CI, and some dependencies run native build scripts (`sharp`, `@tailwindcss/oxide`) that should be allow-listed explicitly rather than run by default.

## Decision

Use pnpm 12 for every install and script. Node and pnpm versions are pinned in `.tool-versions`, `.nvmrc` and `packageManager`; native build scripts are allow-listed in `pnpm-workspace.yaml`. Do not commit other lockfiles.

Alternatives: npm (slower, no build-script allow-list) and Yarn (no advantage here).

## Consequences

- Reproducible installs in CI via `pnpm install --frozen-lockfile`.
- Contributors need pnpm 12 (via Corepack or asdf/mise).
