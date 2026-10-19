# Project

A public, statically generated Astro website.

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

Run `npm run audit:print` to create and check A4 PDFs for the home, founder-story, generic emotion, self-doubt, DARVO, financial-abuse, and therapy templates. It verifies that navigation and fixed controls are absent while tab and timeline content remain printable. PDFs are written to ignored `work/print-audit/`.

Use `npm run lint:fix` to apply safe lint fixes and `npm run format` to rewrite files in the shared Prettier style.

## Adding content

Add an article Markdown file under `src/content/articles/` with schema-validated frontmatter. Include a `locale`, stable `translationKey`, route `slug`, `published` flag, author, date, related content keys, and sources. An article page is generated only when `published: true`. Do not publish unreviewed translations as full articles.

Start from the copy-ready [article template](docs/ARTICLE_TEMPLATE.md). It includes the required
frontmatter, safe-copy constraints, and the local validation steps.

Reusable home, hub, tool, support, therapy, and founder-story copy lives in `src/content/pages/`. Its validated frontmatter keeps document metadata (`title` and `description`) separate from visible headings, leads, cards, timeline layers, and safety callouts. The Astro templates render this content but do not own its copy.

## Publishing

GitHub Actions checks every pull request and builds/deploys to GitHub Pages on each push to `main`. Pages uses the Actions workflow as its publishing source. While it is hosted at the GitHub project URL, the build uses the repository subpath automatically.

The temporary deployment is protected with `noindex, nofollow` and a blocking `robots.txt`. This is controlled by the `NO_INDEX` Actions variable, which defaults to `true`; set it to `false` only when the site is ready to be discoverable.

Before changing `NO_INDEX` to `false`, add a real ISO `reviewedAt` date to every published article after founder, clinical, and legal review. Content validation deliberately fails if a discoverable build contains an unreviewed published article.

The GitHub Pages configuration uses `unheard.support` and the `SITE_URL` Actions variable to produce root-relative custom-domain URLs. DNS and the TLS certificate can take time to propagate; verify the Pages domain status in GitHub before treating the custom domain as live. The GitHub project URL may redirect before the domain itself resolves.

The published edition is Dutch only. The root page therefore opens `/nl/`, and the visible language marker is deliberately non-interactive until a complete translation is approved. EN and AR routes remain technical, `noindex` review stubs with RTL readiness; they are not advertised in navigation or `hreflang`.

## Privacy-friendly analytics

The layout supports Cloudflare Web Analytics without a cookie banner or visitor profiling. It remains inactive unless the repository Actions variable `PUBLIC_CLOUDFLARE_BEACON_TOKEN` is configured with the site token supplied by Cloudflare. The workflow passes that value to the static build; no analytics identifier is stored in the repository.

## Project policies

`PROJECT_BRIEF.md`, `EDITORIAL_POLICY.md`, `QUALITY_GATE.md`, and `EDITORIAL_HANDOFF.md` define the editorial and safety boundaries. Do not publish unverified facts, personal details, or medical/legal conclusions. Keep `NO_INDEX=true` until editorial and safety review explicitly approves discovery.
