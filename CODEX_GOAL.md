# Goal to give Codex

You are now the lead implementer for **Ongehoord**, a Dutch-first website for recognition, understanding and recovery after emotional and financial abuse, with particular attention to the stigma faced by men and an inclusive welcome to everyone.

Read **AGENTS.md**, **PROJECT_BRIEF.md**, **ROADMAP.md**, **EDITORIAL_POLICY.md** and all relevant files under **references/** before starting. Treat the latest prototypes as visual/content references, not production code to paste together blindly.

**Deliver a working, responsive, production-quality Astro + TypeScript website in this directory** following the phased roadmap. Start by setting up the project, then implement integrated reusable components and real routed pages, build and test regularly, fix problems, and continue through phases without stopping after a plan. Keep an explicit checklist in ROADMAP.md and update completed items. You may choose implementation details but must honor product decisions and editorial constraints.

Required initial routes: homepage; feeling/self-doubt; founder's story with layered timeline; therapy/recovery; DARVO; financial abuse; safety/help. Add friends/family help if time permits. Content in Dutch first, with NL/EN/AR architecture prepared but no unreviewed translations published. Semantic HTML, SEO/GEO, JSON-LD, accessible components, print.css, mobile-first and no sensitive data storage are non-negotiable. Tension cards must have a very subtle full-height jagged edge; keep terracotta CTA and modern sans typography. Keep a genuine working three-situation/two-tab interface on self-doubt pages and correct print expansion.

Never invent biography, statistics, sourced claims, diagnoses, testimonials or external links. Mark draft content and requests for review clearly. No deploy/publish or paid services without approval.

When done, provide a concise summary of completed routes, how to run/build/test, known content-review blockers, and exact outstanding tasks. Do not claim a phase is complete until its checks pass.

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
