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

Add a Markdown file under `src/content/articles/` with schema-validated frontmatter. Include a `locale`, stable `translationKey`, route `slug`, `published` flag, author, date, related content keys, and sources. A page is generated only when `published: true`. Do not publish unreviewed translations as full articles.

## Publishing

GitHub Actions checks every pull request and builds/deploys to GitHub Pages on each push to `main`. Pages uses the Actions workflow as its publishing source. While it is hosted at the GitHub project URL, the build uses the repository subpath automatically.

After the custom domain is active, add a GitHub repository Actions variable named `SITE_URL` with the full origin (for example, `https://unheard.support`) and configure the same custom domain in GitHub Pages. The next deployment then uses `/` as its base path automatically.

A static Pages host cannot read the `Accept-Language` header on the server. The root page therefore selects a language in the browser using: explicit URL, saved preference, browser preferences, and English as a final fallback. An explicit locale URL is never overwritten. Fully reviewed content is currently Dutch; EN and AR are clear landing pages with a limitation notice, not uncontrolled translations.

## Project policies

`PROJECT_BRIEF.md`, `EDITORIAL_POLICY.md`, and `QUALITY_GATE.md` define the editorial and safety boundaries. Do not publish unverified facts, personal details, or medical/legal conclusions. Domain registration and DNS are not yet verified.
