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
- Locale architecture for NL/EN/AR, NL-only public entry while translations are incomplete, RTL readiness, and noindex review stubs for EN/AR.
- Canonical URLs, Open Graph metadata, sitemap, robots, JSON-LD for pages/articles/breadcrumbs, build-time route/link/schema/a11y checks, ESLint, Prettier, language tests, and GitHub Pages deployment.
- Local Lighthouse baseline: 100 in Performance and Accessibility. SEO is intentionally reduced while `NO_INDEX=true` blocks discovery; it is not a launch-quality SEO signal until editorial approval removes that safeguard.

Still required before declaring an editorial launch complete:

- Founder, clinical, and legal review of all sensitive wording and personal-story material.
- Manual visual QA at the specified mobile/desktop zoom levels and print-to-PDF checks in Safari. Chrome A4 PDF smoke checks passed for the home, founder-story, therapy and article templates on 2026-10-19.
- Review and publish any additional Dutch articles, then add only approved EN/AR translations and their equivalent routes.
- Verify the custom-domain TLS certificate before directing anyone to HTTPS; DNS can be correct while GitHub Pages is still provisioning that certificate.

## Active roadmap and AI handoff — 2026-11-11

- Start with [AGENTS.md](AGENTS.md), [CODEX_GOAL.md](CODEX_GOAL.md), [EDITORIAL_POLICY.md](EDITORIAL_POLICY.md), the current GitHub issues and pull requests, and this roadmap. Verify remote status before selecting work. Keep decisions, test evidence and the next executable task on the linked issue or PR.
- [Sprint 3.1 issue #42](https://github.com/R4YM3/unheard/issues/42) and [PR #43](https://github.com/R4YM3/unheard/pull/43) cover mobile menu focus and Escape, the explicit exit, the calmer homepage hero and link styles. PR #43 was merged after a targeted diff review and green PR CI. [Pages run 212](https://github.com/R4YM3/unheard/actions/runs/43086629431) successfully deployed. A live check confirmed that repeated Escape keeps the homepage open and that the two hero actions and the four examples remain available. Real zoom, assistive technology and cross-browser checks remain open.
- [Sprint 4 issue #44](https://github.com/R4YM3/unheard/issues/44) contains the inventory, research references, priorities and acceptance criteria. [PR #46](https://github.com/R4YM3/unheard/pull/46) covers the first content change. Continue with the example labels, editorial provenance and contextual links. Keep feeling, recognition and understanding equally available in any order. Preserve the four examples and variant A. Use the small Voorbeeld label and centralize editorial provenance on Werkwijze. B-light and pillar colors require user validation before broad rollout.
- Work uses GitHub as its handoff. ChatGPT Work owns execution and coordination. Bring in Claude Design for specialist visual work. Use the original QA and validation reports linked from #42 when accessible. The issues contain the actionable criteria for sessions without access to those files.
- Release authorization was given on 11 November 2026 for tested work in this roadmap. Continue through authorized tasks, merge and verify deployments. Editorial and safety review requirements for sensitive content and indexing remain part of the release gates. Run targeted tests during changes and broader release audits once structure and visual design are stable.

## Sprint 4 study handoff

Track outcomes in [issue #44](https://github.com/R4YM3/unheard/issues/44). The deployed changes and the color comparison provide the starting point. Use a private test setting with fictional scenarios and identical content and start positions across variants. Keep the public comparison pages as references for the facilitator.

- **Visitor routes.** Add two direct-entry tasks to the existing first-click study. From Zelftwijfel, ask where Sam could learn why doubt after conversations keeps returning. From Voor naasten, ask where someone can get advice before deciding what to do. Capture the expected destination, first click, unassisted completion within 90 seconds, and detours.
- **B-light.** Alternate which version is shown first and swap the money and boundaries tasks across versions. Use the same Voorbeeld label and supporting copy. Capture time, actions, and whether the participant can explain the statement, the feeling, and the context. Use the paired results and the existing decision rule in #44.
- **Pillar colors.** Compare the tinted and neutral bands from the [design workshop](https://unheard.support/nl/ontwerp-systeem/#pijlerkleuren) separately. Keep the heading and destination identical and alternate the order. Ask what the link will open before activation and whether color helped or was interpreted as a required next step. Keep the current treatment if expectations and independent navigation show no consistent improvement.

Pilot once, then run 8–10 adult sessions. Record participant codes and task observations. Ask about the fictional situation and avoid collecting relationship history. Record results as observations with denominators, then link each proposed rollout decision to the evidence. Recruitment and sessions are pending.

The manual browser matrix, real zoom, screen readers, and visual print checks remain open in [issue #42](https://github.com/R4YM3/unheard/issues/42). Run them after visitor routes and design stabilize. Existing CI remains in use.
