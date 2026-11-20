# AGENTS.md
Rules for every agent working in this repository (Claude Code, Codex or any other).

## Product
A one-page list app. People add items and delete them; the list is saved in the browser (localStorage).
Top jobs: 1) add an item, 2) delete an item, 3) come back later and still see the list.

## Setup & commands
- Install: `npm ci` (one dev dependency: playwright, for the browser test; Node 20+).
- Run the app: `npm run dev`
- Open it: http://localhost:3000 (set `PORT` to change)
- Unit tests: `npm test`
- Smoke test (CLI): `npm run smoke` (starts the app on a free port and checks it responds)
- Browser test: `npm run e2e` (Playwright; first time on a machine run `npx playwright install chromium`)
- Lint / types: `npm run lint` (syntax check of every JS file; no types in this repo)
- Everything CI runs: `npm run ci`
- Needed services and how to start them: none
- Test accounts or seed data: none; there are no accounts
- Agent working folder: .scratch/ (plans, logs, screenshots; gitignored)
- Spend budget per task (paid APIs, cloud): $0

## Architecture
- `server.js`: tiny static file server (no dependencies).
- `public/index.html`: the page, its styles and wiring; `public/list.js`: pure add/remove logic.
- `test/`: unit tests (node:test). `scripts/`: lint and smoke scripts.
- Data lives only in the browser's localStorage under the key `items`.

## Rules
Start small. Build step by step.
1. Goal = product, not green checks. Done means a user can do the thing. Write the product goal first in every plan and PR.
2. Failed? Change the approach. Never repeat an attempt that changed nothing. After two failures with the same approach, find the real cause or try a different route.
3. No invented flags or fallbacks. One direct behavior. No new feature flags, legacy and new paths side by side, silent fallbacks or extra retries unless a human asked.
4. Fix the root cause. A patch that hides the symptom is not a fix.
5. One GitHub round per PR. Find bugs locally; CI confirms finished work, it is not the tester.
6. Big file? Split it first. Over ~800 lines consider extracting; over ~1500 extract the part you touch first; over ~2000 leave it smaller than you found it.
7. Reports fit on a phone: outcome first, plain words, screenshots.
Also: write in the plan what NOT to build. Test like a user, not like the diff. New pure logic gets a focused test.

## Questions
Ask a human when information is missing that changes the result. Ask everything at once, with a suggested answer each. Decide reversible details yourself and note them.

## Stop rules
Work on your own: build, test, fix, open branches and draft PRs. Stop and ask a human before:
- merging any PR
- touching production (deploys, prod data, prod config)
- adding a new dependency (test tools the task asked for are fine)
- changing a public API, schema or contract
- anything with secrets, credentials or user data
- deleting anything you did not create in this task
- spending beyond the budget above
Never print, commit or screenshot tokens, cookies or personal data.
Blocked is a state, not a reason to stop: report what is blocked, keep going on the rest.

## Local review gate
Before any push: run the full CI command locally, then the code-review skill (3 fresh-context reviewers, 2+ models when available, 3 approvals on the same commit, max 10 fix rounds; open security findings keep the PR a draft). Push once.

## Verification
Run the real product, not only tests: click through the changed flow in a browser, check the console, reload, check desktop and phone width, screenshot before and after. Up to 10 fix rounds. Never call work verified if you did not see it work.

## Skills
cto-office (plan), cto-exec (run a PR train), ship-loop (one task to a PR), code-review (local review gate), verify (prove it works), investigate (bugs), deep-qa (whole-product QA), garden-codebase (cleanup), pr-body (PR text). No screenshot, no review.
Skills live in `.agents/skills/`; `.claude/skills` is a symlink to it.
