# Implementation notes

Branch `feat/handoff-gap-implementation`. Implements chapters 5 (sitemap and scope) and 7 (tooling) of `INHOUDELIJKE_HANDOFF.md`. The starting point and the gaps are in `docs/GAP_MATRIX.md`; schema changes are in `docs/SCHEMA_CHANGES.md`.

## What changed

- **Typed content model.** Eight Astro content collections (`emotions`, `patterns`, `articles`, `therapies`, `tools`, `stats`, `hubs`, `story`) share a base schema: `status` (`draft`, `in_review`, `approved`), `published`, author, dates, `reviewedAt`, `sources` with `checkedAt`, `related` keys and `reviewNotes`. See `src/content.config.ts`.
- **Relations fail the build.** An unknown `related` key throws during the build. The only exception is the list of term keys in `plannedKeys` (`src/lib/content.ts`), which branch `content/begrippen` delivers. Planned keys are left out of the rendered "related" block until the article exists, so no link ever points to a missing page.
- **One catch-all route.** `src/pages/[locale]/[...slug].astro` renders every entry through a template in `src/templates/` (Emotion, Knowledge, Therapy, Tool, Hub, Story, Home). `src/layouts/EntryLayout.astro` owns metadata, breadcrumbs, JSON-LD, review status, summary, related content, sources and the help block.
- **Hubs are content.** A hub lists its direct children (`listings.prefix`), and can add cards, the start chooser, the A–Z glossary, statistics or the search index. Adding a Markdown file under a hub's slug is enough to list it.
- **Redirects.** `/nl/financieel-misbruik/` and `/nl/herstel/therapie/` keep old links working with a `noindex` meta refresh and a canonical to the new URL. They are excluded from the sitemap.

## Design decisions

- **No-JS first.** All perspective scenarios, both panels, timeline lenses, glossary items and search items are in the HTML. JavaScript only adds the tab and filter behaviour (`src/components/PerspectiveSwitch.astro`, `src/scripts/filter.ts`). The start chooser and timeline use native `<details>`.
- **Tabs.** The perspective switch becomes an ARIA tab pattern only after enhancement. Arrow keys, Home and End move between tabs. Without JS it is two labelled sections.
- **Tokens.** `src/styles/tokens.css` holds the primitives and `themes.css` the semantic light and dark tokens. Component CSS has no hex values. The inside-perspective panel and its eyebrow have their own tokens and pass AA in both themes.
- **Reflection and tool cards.** Textareas use `autocomplete="off"` and are never stored or sent. They are left off the printout unless the reader ticks the print option. "Wis mijn antwoorden" clears them. The only `localStorage` key is `ongehoord-theme`.
- **Print.** `src/styles/print.css` gives A4 black-on-white, hides chrome, shows link URLs and opens every `details`. A `beforeprint` script also opens closed and exclusive (`name`) details and restores them afterwards.
- **No contact channel, form, chatbot or diagnosis tool.** This follows handoff chapter 7. The "about" page promises no contact route until the founder picks one.

## Known limitations

- **Review markers in Markdown bodies are plain text.** Astro 7's default Markdown processor does not run `markdown.rehypePlugins` without the extra `@astrojs/markdown-remark` package, so `[OPRICHTER REVIEW NODIG]` is only highlighted in frontmatter fields (via `Marked.astro`). In body text it shows as literal text. That is acceptable for a noindex concept site.
- **Glossary duplicates.** Until `content/begrippen` merges, terms such as gaslighting only appear inside other articles. After that merge, check the A–Z index for duplicates and remove the matching keys from `plannedKeys`.
- **Only Dutch is published.** `en` and `ar` stay unpublished. `hreflang` lists Dutch only, and the sitemap excludes the other locales. The card tension edge flips for RTL, but Arabic has not been translated or visually tested.
- **Canonical domain.** A local build uses the fallback `https://r4ym3.github.io`. The Pages workflow sets `SITE_URL` (`unheard.support`) from the repository variable. Check that variable before any real publication.
- **Indexing.** Every page has `<meta name="robots" content="noindex,nofollow">` and `robots.txt` disallows everything. `robots.txt` blocks crawling, so a crawler may never fetch the page and read the noindex tag. A URL that is linked elsewhere can therefore still show up as a bare result. Before launch, decide whether to drop the `Disallow` and rely on `noindex`. `NO_INDEX` was never set to `false`.
- **Safari print** has not been automated. Chrome print-to-PDF is covered by `npm run audit:print`; run a manual Safari check before launch.

## Ownership with the other branch

Branch `content/begrippen` (worktree `../unheard-begrippen`) writes the individual term articles in `src/content/patterns/`. This branch owns the schema, templates, hubs, glossary index and every other page. The only term page here is `begrippen/darvo`, which predates the split.
