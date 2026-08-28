## Change contract

- User-requested outcome:
- Production base SHA:
- Change classification: <!-- content | token/theme | shared style | interaction | component | route/data | test | infrastructure | architecture -->
- Expected file/path boundary:
- Explicit non-goals:
- Existing authoritative owner reused or replaced:

## Preserved invariants

- [ ] Existing authored content, routes, metadata, links, and media are unchanged unless listed below.
- [ ] No unrelated move, deletion, rename, reformat, dependency, or generated-file churn.
- [ ] Directory responsibilities and global design/interaction owners were preserved.
- [ ] Superseded behavior was removed; no duplicate implementation remains.
- [ ] Document scrolling, browser zoom, focus, and reduced-motion contracts remain valid.
- [ ] No secret, production data, account, deployment-target, DNS, analytics, or storage setting changed.

Intentional exceptions (write “none” if empty):

## Deterministic evidence

- [ ] `node scripts/ai-architecture-check.mjs --self-test`
- [ ] `node scripts/ai-architecture-check.mjs`
- [ ] Repository format/lint/typecheck/test commands
- [ ] Production build command
- [ ] Focused regression check fails before and passes after, where practical

Exact commands and results/links:

## Browser and visual evidence

- Preview URL:
- Routes:
- Engines: <!-- Chromium / Firefox / WebKit -->
- Effective viewport sizes:
- Motion settings:
- [ ] No horizontal document overflow.
- [ ] No unintended nested vertical scroll owner.
- [ ] Repeated wheel/touch/keyboard scrolling reaches footer/end.
- [ ] Essential content and focus remain visible.
- [ ] Sticky/fullscreen sequences enter and exit.
- [ ] Console, page errors, and failed requests are clean.
- Screenshots/traces:

## Complete diff review

- [ ] Every changed/deleted/renamed file and lockfile line was reviewed.
- [ ] No broad allowlist, weakened test, raised threshold, disabled check, or automatic snapshot update.
- [ ] Skipped checks and remaining risks are disclosed.

Skipped checks / remaining risk:

## Rollback

Revert this pull request's merge/squash commit. Do not reconstruct old files or rewrite history.
