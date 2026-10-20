# Test results

Run on 20 October 2026 on macOS with Node 24.21 and Astro 7.4, branch `feat/handoff-gap-implementation`.

| Check                                          | Command                        | Result                                                                                           |
| ---------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ |
| Types, lint, format, content validation, tests | `npm run check`                | Pass. 0 errors, 62 content files validated, 3 of 3 unit tests pass.                              |
| Production build and dist audit                | `NO_INDEX=true npm run build`  | Pass. 69 pages built and audited: links, metadata, JSON-LD, nav, sitemap and robots.             |
| `noindex,nofollow` on every page               | grep on `dist/**/*.html`       | 69 of 69 pages. `robots.txt` is `Disallow: /`.                                                   |
| Accessibility (axe, WCAG 2.2 AA)               | `node scripts/axe-audit.mjs`   | 0 violations on 67 pages, in light and dark (134 runs). The 2 redirect pages are skipped.        |
| Print (Chrome, A4)                             | `node scripts/print-audit.mjs` | Pass on 14 routes, one for each template. Closed content is printed and textareas are hidden.    |
| Mobile and desktop widths, with and without JS | `node scripts/ux-audit.mjs`    | Pass. 67 routes at 320, 375, 430 and 1440 px: no horizontal overflow, core content without JS.   |
| Perspective tabs, keyboard and contrast        | `node scripts/ux-audit.mjs`    | Pass on 15 routes in light and dark. Arrow keys select "Wat ik vanbinnen voel"; contrast passes. |
| Handoff chapter 6 routes                       | link extraction from `dist`    | All 5 example routes connect page to page.                                                       |

## Not automated

- Safari print preview.
- Screen-reader smoke tests with VoiceOver and NVDA.
- Manual 200% and 400% zoom.
- Field Core Web Vitals. The site is not indexed or public yet, so there is no field data.
