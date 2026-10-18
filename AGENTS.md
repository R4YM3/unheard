# AGENTS.md — Ongehoord

You are implementing a real, production-oriented multilingual content platform from the supplied `PROJECT_BRIEF.md` and `references/`. Work autonomously in clear vertical slices, run tests and build after meaningful changes, and do not stop after making a plan. Do not deploy or publish without approval.

## Priorities

1. Read PROJECT_BRIEF.md, ROADMAP.md, EDITORIAL_POLICY.md and inspect references before writing code.
2. Latest authority for look and feel: `references/homepage.html`, `references/mijn-verhaal.html`, `references/zelftwijfel.html`, `references/design-system.html`. Earlier articles are content references, not design authorities.
3. Create clean Astro + TypeScript project (unless this repo already has a mature compatible stack). Organize content separately, componentize interactive UX, use native HTML and progressive enhancement.
4. All critical article content must be rendered as crawlable HTML and printable without requiring interaction or hydration. Never rely on client-side text for SEO.
5. Preserve the founder's first-person voice. Never invent therapy results, childhood or relationship details, medical diagnoses of third parties, community submissions, or factual personal claims. Where necessary mark editorial TODOs.
6. Don't publish a functioning 'submit story' form, chatbot, automated victim diagnosis or therapy matching at launch.
7. No fake statistics, unsupported evidence, fabricated citation, unpublished translation or dummy hrefs. Use editorial TODOs for unavailable pages and human review.
8. Security & privacy: no persistent storage of reflectors/checklist responses or sensitive analytics; don't embed external trackers by default; accessible safe-exit UX should not promise to erase browser history.
9. Maintain responsive Dutch site, scaffold EN/AR without exposing incomplete translations as available; Arabic is RTL.
10. Deliver validated build, accessible keyboard flows, meaningful tests, print screenshots or print checks, and accurate README for local dev.

## Working practice

Implement roadmap phase by phase. At the end of each phase, run `npm run build`, lint/typecheck/test if configured, and report what is complete vs blocked. Request author/legal/clinical review on sensitive passages before real publication. Don't overwrite source prototypes; preserve them as references.

## Non-negotiable engineering contract (v2)

- Astro static output by default; TypeScript strict mode; Astro content collections with schema-validated Markdown and MDX only when components are needed; generate content routes at build-time.
- Reusable page templates and typed modular components. No duplicated page-specific CSS; tokens have primitive + semantic layers; styles adapt to light/dark/system and independent content tones. Respect `prefers-color-scheme` on first paint and `prefers-reduced-motion`. Keep contrast AA in every theme and card state.
- Core content must be present in prerendered HTML and readable without JavaScript; interactive enhancements are keyboard/screen-reader accessible. Design for stressed readers: plain language, manageable sections, no forced questionnaires, visible safe help route.
- SEO: unique metadata, one meaningful H1, descriptive canonical URLs, sitemap, robots, crawlable contextual internal links, proper 404, noindex drafts, and accurate `hreflang` only for published translations. No dead links.
- GEO: clear answers and definitions, visible dates/authorship, qualified citations, related concept links, specific references instead of unsupported medical assertions. Relevant accurate JSON-LD (WebSite/WebPage/Article/BreadcrumbList/DefinedTerm if appropriate); validate rendered JSON-LD against visible content. No claims of guaranteed AI-search exposure.
- Accessible semantic HTML: main/header/nav/footer, heading order, form labels, tab patterns with correct ARIA + keyboard semantics, accessible skip links and focus, zoom and 320px narrow viewport, RTL readiness, understandable error and help states. Target WCAG 2.2 AA.
- Performance: minimize client JS and font files; image optimization and dimensions; test LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75 when field data are available. Lighthouse is lab QA, not field Core Web Vitals.
- Printing: a single print.css for A4, black-on-white, legible type, hidden navigation, visible source links/URLs, fully expanded timeline, perspectives, accordion text and reference notes; explicitly exclude sensitive optional form responses by default. Print-test Chrome and Safari.
- Privacy/safety: do not collect or persist sensitive questionnaire answers; no uncontrolled third-party trackers; avoid public preview indexing; human medical/legal/editorial review before publication. Users of any gender welcome while centering male stigma.
- Content maintenance: typed frontmatter schema, documented naming rules, sample copy-ready Markdown content file, published/draft flags, author/source attribution, updated/review dates, and related content IDs. Production build must reject broken content relations.

## Release gates

1. `npm run check` and production build pass.
2. Route/link and metadata audits pass, no broken internal links or invalid schema.
3. Axe accessibility checks plus manual tab/keyboard, high zoom and screen-reader smoke checks; contrast verified in light/dark.
4. Mobile viewports and print-to-PDF visual QA for all content templates.
5. Documented content editing workflow: add Markdown file -> validate -> build -> route appears with nav/search relation when published.
6. Deploy only after user's explicit approval.
