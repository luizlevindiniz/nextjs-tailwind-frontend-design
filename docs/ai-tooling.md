# AI tooling

This project is built with [Claude Code](https://claude.com/claude-code) as a pair programmer. The developer decides; the agent proposes, implements and verifies. Everything the agent produces passes the same gates as hand-written code.

## Agent instructions

`CLAUDE.md` at the repo root is read at the start of every session. It holds the rules (mobile first, Figma tokens only, TDD, semantic HTML and accessibility), the commands, the gotchas and the ADR workflow. Accepted [ADRs](adr/README.md) are binding: the agent must stop and ask before contradicting one.

## MCP servers

| Server              | Purpose                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Figma MCP           | Reads the design: frame structure, design variables (colors, type styles), section screenshots and code-oriented design context |
| Chrome DevTools MCP | Runs the page in Chrome: responsive checks, console and network, accessibility tree, Lighthouse and performance traces          |
| Playwright MCP      | Fallback browser driver when Chrome DevTools can't start: measurements, network and screenshots in real Chrome                  |
| context7            | Fetches current Next.js and Tailwind CSS v4 documentation on demand, so APIs aren't recalled from memory                        |

These are configured in the developer's Claude Code environment, not committed to the repo.

## Skills

| Skill                        | Used for                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `frontend-design`            | Visual and interaction quality for UI work                                                          |
| `figma:figma-design-to-code` | Translating a Figma section into code that uses this project's tokens and components                |
| `adr-setup`                  | Set up `docs/adr/` and the `adr:check` script                                                       |
| `review-that-runs`           | Reviews each finished task by running it: gates, then the app in Chrome. Mandatory after every task |
| `grilling`                   | Stress-tests a plan at the start of an unclear task                                                 |

## How AI output is checked

1. **Tests first.** Behaviour is specified in a failing test before the agent writes the component.
2. **Gates.** Lint (zero warnings), typecheck, format, ADR check, tests and production build, locally and in CI.
3. **In the browser.** Each section is compared against the Figma screenshot at mobile and desktop widths, and interactions are exercised with the keyboard.
4. **Review that runs.** `/review-that-runs` checks out the change, runs it and verifies every finding before reporting it.
5. **Human review.** The developer reads every diff and owns every commit.

## Hooks

No Claude Code hooks are configured. Git hooks (husky) are listed in [frontend/commands.md](frontend/commands.md#git-hooks-husky).
