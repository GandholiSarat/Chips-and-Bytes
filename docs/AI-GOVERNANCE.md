# Safe website repository maintenance

Maintain the connected production website without damaging existing work. Treat code, content, routes, media, design, tests, structure, deployment, and user changes as protected. Make the smallest verified change that satisfies the request.

Do not assume a framework, package manager, host, CMS, styling method, or layout. Discover them from GitHub. Before editing, read applicable `AGENTS.md`, `config/ai-architecture-policy.json`, and existing project documentation. Follow the strictest rule.

## Safe workflow

1. Treat the connected GitHub repository as source of truth unless told otherwise. Discover the production branch/deployment target; never create a parallel site when asked to maintain the current one.
2. Fetch remote state read-only, record the production SHA, and inspect branch/status/diff/untracked files. Never overwrite user or concurrent work.
3. Create a named feature branch. Never edit or push directly to production.
4. Search for the existing owner, definitions, consumers, tests, and documentation of requested behavior.
5. State a change contract: outcome, expected files, preserved invariants, non-goals, and verification. Capture a browser baseline before visual, responsive, motion, navigation, or scrolling changes.
6. Apply focused patches. Keep the diff inside the contract and stop before expanding scope.
7. Review the complete diff, run all checks, compare affected and sentinel routes with baseline, and open a draft PR. Never merge or deploy without explicit authorization.

## Non-destructive rules

- Preserve directory responsibilities. Do not add catch-all utilities, duplicate systems, or top-level folders without approval.
- Do not delete, rename, move, mass-format, migrate, redesign, upgrade dependencies, or clean unrelated work.
- Never use destructive Git/filesystem actions: reset, clean, force push, history rewrite, broad recursive deletion, or commands that discard changes.
- Never expose or modify secrets, environment variables, production data, domains, analytics, storage, deployment, or repository settings without explicit authorization.
- Do not weaken tests, guards, accessibility, typing, linting, allowlists, or visual thresholds merely to pass.
- Do not mix a focused fix with content edits, dependency changes, broad refactors, or cleanup. Disclose lockfile, generated, move, content, and deployment changes first.

## Architecture ownership

During adoption, identify owners for routes, layouts, components, global styles, tokens, responsive rules, motion, interactions, content, media, APIs, tests, build, and documentation. Record required paths, style owners, protected paths, browser routes, and narrow exceptions in `config/ai-architecture-policy.json`. Treat this map as an interface; change the established owner rather than reorganizing.

### One global design system

- Pages/components consume shared colors, fonts, spacing, containers, breakpoints, layers, focus states, durations, easing, and motion; they do not redefine them independently.
- Do not add raw colors/copied font stacks outside token files, page-local global CSS, duplicate keyframes, another reset/animation system, or late override stylesheets.
- Unique page structure may be locally scoped only if permitted; shared styling and motion remain global.
- Search all definitions/consumers before adding a selector, token, keyframe, listener, or controller.
- Modify the authoritative owner and remove superseded code in the same patch. Do not stack overrides, raise specificity, add delayed JavaScript, or use `!important` merely to win.
- Update design/architecture documentation when an authoritative decision changes.

### One behavior owner

- Each behavior has one controller and initialization path. Reuse or replace existing scroll, reveal, cursor, navigation, gallery, modal, progress, resize, and animation logic; never compete with it.
- Prefer CSS and native browser behavior. Do not hijack wheel/touch scrolling, globally call `preventDefault()` for storytelling, or lock document/body overflow.
- Avoid duplicate listeners, observers, timers, subscriptions, and animation loops. Persistent work must clean up and stop when inactive.
- Essential content must remain visible and operable without animation, under `prefers-reduced-motion`, and when client JavaScript fails.

## Viewport, zoom, and scrolling

“Full viewport” means a section fills at least the available viewport when content fits; it never means clipping content to a fixed height.

- Use intrinsic sizing, `min-height`, flexible layout, logical spacing, container limits, and fluid scales. Let sections grow for zoom, text scaling, translation, and short heights.
- The document is normally the only vertical scroll owner. Nested vertical scrolling requires an explicit accessible need and narrow policy exception.
- Horizontal document overflow is a defect. Do not hide it globally; fix the offending element.
- Sticky/fixed UI needs short-height/high-zoom fallbacks and must not cover content, trap scroll, hide focus, or block the footer.
- Fullscreen/sticky media sequences should use normal document scroll with deterministic entry, progression, final state, and exit.
- At every configured route/effective CSS viewport verify: no horizontal overflow or unintended scrollbar; wheel/touch-equivalent/keyboard scrolling reaches the footer; essential content/focus remains visible; sticky/fullscreen sequences exit; reduced motion works; and console/page/network errors fail tests.
- Use Chromium at minimum; add Firefox/WebKit for browser-sensitive behavior. Review screenshot baselines in a consistent environment.

## Content and media

- Treat prose, records, slugs, routes, redirects, captions, alt text, links, metadata, schema, ordering, and media references as authored content.
- Do not change content during style, interaction, architecture, build, or testing work; hard-code CMS data; or create a second registry.
- Do not copy, rename, recompress, migrate, or delete media during unrelated work.
- Route/content/schema/media migrations require inventory, dry run, backup, reversible plan, verification, and approval.

## Replacement and verification

For replacements: locate all implementations/consumers; choose the owner; record old behavior with a test/baseline; modify the owner; update only necessary consumers; remove old code; search for duplicates; then run architecture, functional, visual, accessibility, performance, and regression checks. Version control—not duplicate code—is rollback.

Run:

```sh
node scripts/ai-architecture-check.mjs --self-test
node scripts/ai-architecture-check.mjs
```

Also run every repository-documented format, lint, typecheck, unit, integration, E2E, and production-build command. Add a regression test when practical. Use browser assertions for behavior and reviewed screenshots for visuals; never auto-update snapshots or broaden exceptions merely to pass.

Every AI mutation uses a feature branch and PR. Keep it draft until architecture, project, browser, accessibility, visual, build, and preview checks pass. Production rules should require PRs/status checks and block force pushes/deletion, without impossible self-approval for single maintainers. Roll back by reverting the reviewed merge/squash commit.

Stop and ask if remote state changed, work overlaps, protected files need deletion/moves, a dependency/account permission/deployment target/migration is required, baseline evidence is missing, tests fail unexpectedly, broad reorganization is needed, or unrelated behavior cannot be preserved. Never hide blockers or invent evidence.

Finish with: outcome; base SHA; branch; changed files; owner reused/replaced; old code removed; exact checks/browser matrix; preview/PR link; untouched areas; skipped checks; risks; and rollback method.
