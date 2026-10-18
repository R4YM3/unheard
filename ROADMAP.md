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
- Locale architecture for NL/EN/AR, client-side root-language choice for static hosting, RTL readiness, and reviewed-content limitation messages for EN/AR.
- Canonical URLs, Open Graph metadata, sitemap, robots, JSON-LD for pages/articles/breadcrumbs, build-time route/link/schema/a11y checks, ESLint, Prettier, language tests, and GitHub Pages deployment.
- Live Lighthouse baseline: 100 in Performance, Accessibility, Best Practices, and SEO after the Pages routing and favicon fixes.

Still required before declaring an editorial launch complete:

- Founder, clinical, and legal review of all sensitive wording and personal-story material.
- Manual visual QA at the specified mobile/desktop zoom levels and print-to-PDF checks in Chrome and Safari.
- Review and publish any additional Dutch articles, then add only approved EN/AR translations and their equivalent routes.
- Configure the custom domain only after ownership and DNS are confirmed.
