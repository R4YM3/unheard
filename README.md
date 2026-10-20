# Ongehoord

A statically generated Astro website: a Dutch knowledge and recognition platform about emotional and financial abuse, with particular attention to men and open to everyone.

## Local development

```sh
npm install
npm run dev
npm run check
npm run build
```

`check` runs Astro type checking, ESLint, Prettier verification, content validation, and language-routing tests. `build` additionally audits static HTML, metadata, JSON-LD, language attributes, and GitHub Pages-safe links.

Run `npm run audit:lighthouse` after a build for a local desktop Lighthouse audit of `/nl/`. It requires Chrome. The script requires accessibility 100 and performance at least 90. While `NO_INDEX=true`, its lower SEO result is expected and does not fail the audit.

Run `npm run audit:a11y` for an Axe WCAG 2.0/2.1/2.2 A/AA audit of every generated HTML route in both light and dark themes. It requires Chrome and runs entirely locally.

Run `npm run audit:print` to create and check A4 PDFs for every content template (home, story, emotion, hubs, glossary, pattern, knowledge, therapy, tool, help, statistics and search). It verifies that navigation and fixed controls are absent, that tab, timeline and accordion content is printed in full, and that typed reflection answers are left out unless the reader opts in. PDFs are written to ignored `work/print-audit/`.

Run `npm run audit:ux` for browser checks the static audit cannot do: no horizontal scrolling at 320, 375, 430 and 1440 px with JavaScript on and off, full content coverage without JavaScript, keyboard behaviour of the perspective tabs, and Axe colour contrast of the "Wat ik vanbinnen voel" panel in light and dark themes.

Use `npm run lint:fix` to apply safe lint fixes and `npm run format` to rewrite files in the shared Prettier style.

## Adding content

All copy lives in `src/content/` as Markdown or YAML with Zod-validated frontmatter (`src/content.config.ts`). There is one folder per collection: `emotions`, `patterns`, `articles`, `therapies`, `tools`, `hubs`, `story` and `stats`. A single route, `src/pages/[locale]/[...slug].astro`, generates a page for every entry with `published: true` and picks the template by collection.

The workflow is: add a Markdown file, run `node scripts/validate-content.mjs <file>`, then `npm run check` and `npm run build`. The page then appears at `/<locale>/<slug>/`, in hub listings for its parent route, in the search page, in the glossary index when it has a `glossary` block, and as a related card wherever another page lists its `translationKey` in `related`.

Read [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) first. It documents every field, the slug prefixes per collection, the full key registry and the editorial rules. Copy-ready examples are in [docs/ARTICLE_TEMPLATE.md](docs/ARTICLE_TEMPLATE.md). Verified sources and crisis numbers, with the date they were checked, are in [docs/SOURCES_VERIFIED.md](docs/SOURCES_VERIFIED.md). Schema changes that affect the `content/begrippen` branch are logged in [docs/SCHEMA_CHANGES.md](docs/SCHEMA_CHANGES.md).

The build fails on duplicate keys or routes and on `related` keys that do not resolve to a published page. The only exception is the list of planned term keys in `src/lib/content.ts`, which may be linked before their articles exist; such links are skipped until the article is published.

Every page shows its author role, status (`draft`, `in_review` or `approved`), update date and review date. A per-route review overview for the founder is in `CONTENT_REVIEW.md`.

## Publishing

GitHub Actions checks every pull request and builds/deploys to GitHub Pages on each push to `main`. Pages uses the Actions workflow as its publishing source. While it is hosted at the GitHub project URL, the build uses the repository subpath automatically.

The temporary deployment is protected with `<meta name="robots" content="noindex,nofollow">` on every page and a blocking `robots.txt`. This is controlled by the `NO_INDEX` Actions variable, which defaults to `true`; set it to `false` only when the site is ready to be discoverable.

Before changing `NO_INDEX` to `false`, add a real ISO `reviewedAt` date to every published article after founder, clinical, and legal review. Content validation deliberately fails if a discoverable build contains an unreviewed published article.

The GitHub Pages configuration uses `unheard.support` and the `SITE_URL` Actions variable to produce root-relative custom-domain URLs. DNS and the TLS certificate can take time to propagate; verify the Pages domain status in GitHub before treating the custom domain as live. The GitHub project URL may redirect before the domain itself resolves.

The published edition is Dutch only. The root page therefore opens `/nl/`, and the visible language marker is deliberately non-interactive until a complete translation is approved. EN and AR routes remain technical, `noindex` review stubs with RTL readiness; they are not advertised in navigation or `hreflang`.

## Privacy-friendly analytics

The layout supports Cloudflare Web Analytics without a cookie banner or visitor profiling. It remains inactive unless the repository Actions variable `PUBLIC_CLOUDFLARE_BEACON_TOKEN` is configured with the site token supplied by Cloudflare. The workflow passes that value to the static build; no analytics identifier is stored in the repository.

## Project policies

`PROJECT_BRIEF.md`, `EDITORIAL_POLICY.md`, `QUALITY_GATE.md`, and `EDITORIAL_HANDOFF.md` define the editorial and safety boundaries. Do not publish unverified facts, personal details, or medical/legal conclusions. Keep `NO_INDEX=true` until editorial and safety review explicitly approves discovery.
