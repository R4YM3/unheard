# Autonomous development roadmap

## Phase 0 — Audit & foundation

Review reference versions; create Astro + TypeScript project, content collections or MDX, design tokens, global layout, header/mobile navigation, footer, button/card components, print CSS. Add lint, formatting, typecheck and test tooling. Build must pass.

## Phase 1 — Complete NL vertical slice

Implement home + “Ik twijfel aan mezelf” with three selectable situations, two proper tabs and full print view. Route internal links only to real pages. QA mobile (320/375/430px) and desktop (768/1280/1440px).

## Phase 2 — Narrative and recovery

Implement Mijn verhaal + deep expandable timeline with milestone markers aligned, therapy hub with 9 founder-reported modalities, personal note to children, thoughtful content caveats. No invented outcomes.

## Phase 3 — Knowledge and safety

Implement DARVO and Financial Abuse pages, glossary taxonomy structure, support page with Dutch safety and suicide contacts, page for friends/bystanders, accessible printables. Publish only reviewed glossary entries; leave others as editorial backlog.

## Phase 4 — Hardening

Real metadata and validated JSON-LD, crawlable HTML even JS-off, A4 print checks, Playwright viewport/a11y tests, color contrast, Lighthouse, privacy review, source and factual checks, ensure no broken links, high-performing production build. Add localization architecture without showing fake translations.

## Phase 5 — Editorial handoff

Create a clear content-editing workflow and TODO list of questions for founder/clinician/lawyer. Prepare deployment documentation but DO NOT deploy or register domains without explicit owner approval.

## Explicit out of scope for v1

AI chatbot, story submission, community forums, user accounts, automated therapy recommendations, diagnoses, analytics storing reflection responses, automatic translation publication.

## Current delivery status — 2026-10-19

Completed:

- Astro static build, typed Content Collection, semantic token system, theme selection, reduced-motion styling, print stylesheet, and public GitHub Pages workflow.
- Dutch home, self-doubt, DARVO, financial abuse, recovery, therapy, founder-story, help, friends/family, and printable support-tools routes.
- Native keyboard-operable perspective tabs, related-content cards, safety links, direct-call help contacts, source lists, and no stored reflection data.
- The custom domain is serving the site over HTTPS.
- Locale architecture for NL/EN/AR, NL-only public entry while translations are incomplete, RTL readiness, and noindex review stubs for EN/AR.
- Canonical URLs, Open Graph metadata, sitemap, robots, JSON-LD for pages/articles/breadcrumbs, build-time route/link/schema/a11y checks, ESLint, Prettier, language tests, and GitHub Pages deployment.
- Local Lighthouse baseline: 100 in Performance and Accessibility. SEO is intentionally reduced while `NO_INDEX=true` blocks discovery; it is not a launch-quality SEO signal until editorial approval removes that safeguard.

Still required before declaring an editorial launch complete:

- Founder, clinical, and legal review of all sensitive wording and personal-story material.
- Manual visual QA at the specified mobile/desktop zoom levels and print-to-PDF checks in Safari. Chrome A4 PDF smoke checks passed for the home, founder-story, therapy and article templates on 2026-10-19.
- Review and publish any additional Dutch articles, then add only approved EN/AR translations and their equivalent routes.

## Active roadmap and AI handoff — 2026-11-11

- Start with [AGENTS.md](AGENTS.md), [CODEX_GOAL.md](CODEX_GOAL.md), [EDITORIAL_POLICY.md](EDITORIAL_POLICY.md), the current GitHub issues and pull requests, and this roadmap. Verify remote status before selecting work. Keep decisions, test evidence and the next executable task on the linked issue or PR.
- [Sprint 3.1 issue #42](https://github.com/R4YM3/unheard/issues/42) and [PR #43](https://github.com/R4YM3/unheard/pull/43) cover mobile menu focus and Escape, the explicit exit, the calmer homepage hero and link styles. PR #43 was merged after a targeted diff review and green PR CI. [Pages run 212](https://github.com/R4YM3/unheard/actions/runs/43086629431) successfully deployed. A live check confirmed that repeated Escape keeps the homepage open and that the two hero actions and the four examples remain available. Real zoom, assistive technology and cross-browser checks remain open.
- [Sprint 4 issue #44](https://github.com/R4YM3/unheard/issues/44) contains the inventory, research references, priorities and acceptance criteria. [PR #46](https://github.com/R4YM3/unheard/pull/46) covers the first content change. Example labels, editorial provenance, contextual links and digital-control guidance have shipped. Keep feeling, recognition and understanding equally available in any order. Preserve the four examples and variant A. Use the small Voorbeeld label and centralize editorial provenance on Werkwijze. The owner will review B-light and pillar colors in the live walkthrough before deciding on broad rollout.
- Work uses GitHub as its handoff. ChatGPT Work owns execution and coordination. Bring in Claude Design for specialist visual work. Use the original QA and validation reports linked from #42 when accessible. The issues contain the actionable criteria for sessions without access to those files.
- Release authorization was given on 11 November 2026 for tested work in this roadmap. Continue through authorized tasks, merge and verify deployments. Editorial and safety review requirements for sensitive content and indexing remain part of the release gates. Run targeted tests during changes and broader release audits once structure and visual design are stable.

## Sprint 4 owner walkthrough

Track decisions in [#44](https://github.com/R4YM3/unheard/issues/44). The owner will walk through the live site. Recruitment and formal sessions are cancelled. The current production presentation stays in use while the comparison pages are available for review.

- **Homepage routes.** On the [homepage](https://unheard.support/nl/), where would you click first if you felt something was wrong and could not name it yet?
- **B-light.** Compare [variant A](https://unheard.support/nl/ontwerp-systeem/herkenning/#vergelijk-a) and [B-light](https://unheard.support/nl/ontwerp-systeem/herkenning/#vergelijk-b). Which makes it easier to find the money example and understand the context?
- **Pillar colors.** Compare the colored and neutral bands in the [design workshop](https://unheard.support/nl/ontwerp-systeem/#pijlerkleuren). Does the accent help you predict where the link leads?

Sprint 4 changes are live through [PR #57](https://github.com/R4YM3/unheard/pull/57) and [Pages run 252](https://github.com/R4YM3/unheard/actions/runs/43116231543). Use the walkthrough to decide whether route labels, B-light or pillar accents should change. Keep the manual browser matrix, zoom, screen-reader and visual print checks open in [#42](https://github.com/R4YM3/unheard/issues/42) until the routes and design stabilize. Keep existing CI enabled.

## Sprints 5–8

- **Sprint 5 — Editorial review.** Run `npm run audit:editorial` for the per-entry inventory. Resolve recorded review questions with the founder, clinical reviewer or legal reviewer as applicable. Use [Editorial handoff](EDITORIAL_HANDOFF.md) for sign-off.
- **Sprint 6 — Findability.** Improve and validate visible answers, page metadata and matching structured data while keeping the indexing gate in place.
- **Sprint 7 — Quality checks.** Keep automated CI running. Complete the deferred manual QA in #42 when the routes and design are stable.
- **Sprint 8 — Release.** Confirm the approved Dutch scope, editorial sign-offs and launch checks before enabling indexing. Keep untranslated or unreviewed equivalents at their current publication status.
