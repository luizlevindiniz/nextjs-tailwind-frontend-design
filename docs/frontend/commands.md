# Commands

Requires Node 24 and pnpm 12 (pinned in `.tool-versions`).

## Scripts

| Command                             | What it does                                                          |
| ----------------------------------- | --------------------------------------------------------------------- |
| `pnpm install`                      | Install dependencies; also installs the Git hooks (`prepare` → husky) |
| `pnpm dev`                          | Dev server (Turbopack) at http://localhost:3000                       |
| `pnpm build`                        | Production build; the page must report `○ Static`                     |
| `pnpm start`                        | Serve the production build                                            |
| `pnpm test`                         | Run Jest once (`pnpm test -- <pattern>` for matching files)           |
| `pnpm test:watch`                   | Jest in watch mode, for the TDD loop                                  |
| `pnpm lint` / `pnpm lint:strict`    | ESLint on `src/`; strict fails on any warning                         |
| `pnpm lint:fix`                     | ESLint autofix, then Prettier on everything                           |
| `pnpm typecheck`                    | Generate Next route types, then `tsc --noEmit`                        |
| `pnpm format` / `pnpm format:check` | Prettier write / check (sorts Tailwind classes too)                   |
| `pnpm adr:check`                    | Validate ADRs, the index, links and citations                         |
| `pnpm adr:new "<title>"`            | Create an ADR from the template                                       |
| `pnpm adr:index`                    | Regenerate the ADR index                                              |

## All gates (run before committing)

```bash
pnpm lint:strict && pnpm typecheck && pnpm format:check && pnpm test && pnpm build && pnpm adr:check
```

## Git hooks (husky)

| Hook         | Runs                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `pre-commit` | `lint-staged`: ESLint (`--max-warnings=0`) and Prettier on staged files                                                  |
| `commit-msg` | `commitlint`: Conventional Commits (`feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `perf`, `revert`) |
| `post-merge` | `pnpm install`, so dependencies follow the lockfile after a pull                                                         |

## CI

`.github/workflows/lint.yml` runs on every push to `main` and every pull request, in this order: install (frozen lockfile), lint, typecheck, format check, ADR check, tests, production build.
