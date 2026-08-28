# Chips & Bytes website maintenance guide

ChatGPT Work must explicitly read this file before every repository mutation; do not assume automatic instruction discovery.

## Repository boundaries

- `Frontend/` is the Create React App public/admin client. Preserve React Router routes and Vercel SPA rewrites.
- `Backend/` is the Express/Mongoose API. Preserve authentication, models, routes, cache behavior, API contracts, and environment-variable interfaces.
- Do not edit committed build output in `Frontend/build/`; production output must come from `Frontend` source and `npm run build`.
- Preserve club copy, members, mentors, events, projects, blogs, images, logos, video, fallbacks, and admin data unless explicitly requested.
- Never expose or modify `.env`, credentials, JWT/Mongo/Resend configuration, Vercel settings, or production data without explicit authorization.

## Design and interaction ownership

- `Frontend/src/theme.css` is the shared theme/token owner. Global foundations belong in `index.css`/`style.css`; component/page structure stays in the existing colocated CSS files.
- Reuse shared color, typography, spacing, motion, focus, and responsive decisions. Do not create duplicate tokens/keyframes, a second reset/theme, page-local global overrides, or late cascade patches.
- Search for existing definitions and consumers before adding CSS, animation, listeners, hooks, caching, or API behavior. Modify the owner and remove superseded code in the same patch.
- Each interaction has one controller/initialization path. Avoid duplicate scroll/resize/wheel/touch listeners, observers, timers, or animation loops.
- Do not hijack wheel/touch scrolling or lock document/body overflow. Respect keyboard focus and reduced motion.

## Viewport and scrolling contract

- The document is normally the only vertical scroll owner. Nested scrolling requires an explicit accessible need and policy exception.
- Use intrinsic layout and `min-height`; do not clip content to fixed viewport height at browser zoom or short heights.
- No horizontal document overflow. Fix the element instead of hiding it globally.
- Sticky/fullscreen media must enter and exit predictably and release scrolling to following content/footer.
- Navigation, cards, text, images, admin controls, and footer must remain reachable at configured effective viewports.

## Safe Git and scope rules

- Read `docs/AI-GOVERNANCE.md` and `config/ai-architecture-policy.json` before editing.
- Fetch and record the latest `main` SHA. Work only on a feature branch; never push directly to `main`.
- Preserve concurrent work. Never reset, clean, force push, rewrite history, broadly delete, or discard changes.
- State outcome, expected files, preserved invariants, and checks before editing. Keep the patch focused.
- Do not combine content, dependencies, frontend/backend refactors, redesign, migration, generated build output, or cleanup without explicit scope.
- Do not edit original/upstream repository settings from this fork unless explicitly requested.

## Verification

Run:

```sh
node scripts/ai-architecture-check.mjs --self-test
node scripts/ai-architecture-check.mjs
cd Frontend && npm ci && CI=true npm test -- --watchAll=false && npm run build
cd ../Backend && npm ci && npm run build
```

For UI changes test `/`, `/blogs`, `/projects`, `/events`, their detail routes, admin login/dashboard where credentials are available, configured effective viewports, console/network, focus, reduced motion, horizontal overflow, nested scroll owners, and footer reachability. Backend changes require focused API contract/error/cache checks without using production data.

Every AI change uses a draft pull request. Do not merge/deploy until checks and preview QA pass and the user explicitly authorizes it. Report exact results, skipped checks, preview link, untouched areas, risk, and revert method.

## Code Review Rules

- Flag direct edits to `Frontend/build`, duplicate design/interaction owners, unscoped content/media changes, frontend/backend contract drift, secret exposure, nested scrolling, fixed-height clipping, direct production changes, weakened checks, and missing browser evidence.
- Mechanical checks belong in CI; do not approve around failing architecture or build checks.
