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

Use `npm run lint:fix` to apply safe lint fixes and `npm run format` to rewrite files in the shared Prettier style.

## Adding content

Add an article Markdown file under `src/content/articles/` with schema-validated frontmatter. Include a `locale`, stable `translationKey`, route `slug`, `published` flag, author, date, related content keys, and sources. An article page is generated only when `published: true`. Do not publish unreviewed translations as full articles.

Reusable hub, tool, and support-page copy lives in `src/content/pages/`. Its validated frontmatter keeps document metadata (`title` and `description`) separate from the visible `heading`, lead text, cards, and optional safety callout. The Astro templates render this content but do not own its copy.

## Publishing

GitHub Actions checks every pull request and builds/deploys to GitHub Pages on each push to `main`. Pages uses the Actions workflow as its publishing source. While it is hosted at the GitHub project URL, the build uses the repository subpath automatically.

The temporary deployment is protected with `noindex, nofollow` and a blocking `robots.txt`. This is controlled by the `NO_INDEX` Actions variable, which defaults to `true`; set it to `false` only when the site is ready to be discoverable.

The GitHub Pages configuration uses `unheard.support` and the `SITE_URL` Actions variable to produce root-relative custom-domain URLs. DNS and the TLS certificate can take time to propagate; verify the Pages domain status in GitHub before treating the custom domain as live. The GitHub project URL may redirect before the domain itself resolves.

A static Pages host cannot read the `Accept-Language` header on the server. The root page therefore selects a language in the browser using: explicit URL, saved preference, browser preferences, and English as a final fallback. An explicit locale URL is never overwritten. Fully reviewed content is currently Dutch; EN and AR are clear landing pages with a limitation notice, not uncontrolled translations.

## Privacy-friendly analytics

The layout supports Cloudflare Web Analytics without a cookie banner or visitor profiling. It remains inactive unless the repository Actions variable `PUBLIC_CLOUDFLARE_BEACON_TOKEN` is configured with the site token supplied by Cloudflare. The workflow passes that value to the static build; no analytics identifier is stored in the repository.

## Project policies

`PROJECT_BRIEF.md`, `EDITORIAL_POLICY.md`, and `QUALITY_GATE.md` define the editorial and safety boundaries. Do not publish unverified facts, personal details, or medical/legal conclusions. Keep `NO_INDEX=true` until editorial and safety review explicitly approves discovery.
