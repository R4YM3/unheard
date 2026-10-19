# Visual audit

Run `npm run audit:visual` after a production build. It captures the approved local
reference and the matching generated route at 1440px, 768px and 390px. Screenshots
are intentionally written to ignored `work/visual-audit/`, so references and audit
artefacts do not inflate the published site or repository history.

## Reference map

| Priority | Approved reference                            | Generated route                          | Status on 2026-10-19                                                                                                                                                                                            |
| -------- | --------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | `references/homepage.html`                    | `/nl/`                                   | Partial: composition, content structure, palette and CTA hierarchy match. The heading is intentionally capped at 64px following the later product decision, so it does not use the original 90px desktop scale. |
| 2        | `references/mijn-verhaal.html`                | `/nl/mijn-verhaal/`                      | Partial: the layered timeline, reflection layers and colour bands are implemented; remaining checks concern exact spacing and mobile timeline alignment.                                                        |
| 3        | `references/zelftwijfel.html`                 | `/nl/wat-voel-ik/ik-twijfel-aan-mezelf/` | Partial: three situations, connected tabs and print perspectives are implemented; contrast and narrow-screen geometry require screenshot review.                                                                |
| 4        | `references/design-system.html`               | Shared components                        | In progress: tokens, cards, buttons and type scale are reused; it remains the comparison source for shared refinements.                                                                                         |
| 5        | DARVO, therapy and financial-abuse references | Matching article routes                  | Structural/content alignment only: these are wireframes rather than approved high-fidelity pages.                                                                                                               |

## Audit procedure

1. Build the site with `SITE_URL=https://unheard.support NO_INDEX=true npm run build`.
2. Run `npm run audit:visual`.
3. Compare each `*-reference.png` with its `*-current.png` in the same viewport.
4. Record a mismatch before changing a shared token. Re-run all three viewports after
   a component or token change, because the header, cards and typography are shared.

## Known visual constraints

- The approved homepage uses a larger heading scale, but the product decision caps
  the largest heading at 64px. This is intentional and should not regress.
- The production header includes a Home route, an accessible mobile menu and a
  fixed three-state theme control; these are deliberate functional additions.
- Dark/system themes are production requirements. The reference screenshots are
  light-mode baselines, so they must be evaluated separately rather than treated as
  pixel-diff failures.
