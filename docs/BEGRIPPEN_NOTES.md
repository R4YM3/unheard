# Notes for `content/begrippen`

Working notes for the term articles ("begrippen") written on branch `content/begrippen`. This
file is for whoever merges this branch and for the owner of `feat/handoff-gap-implementation`.

## Base and rebase

- This branch was first written against `main` with a few additive schema fields. All five
  batches passed `npm run check` and `npm run build` there. That version is kept as branch
  `backup/begrippen-main-base`.
- When `docs/SCHEMA_CHANGES.md` appeared on `feat/handoff-gap-implementation` (commit
  `578fe69`), this branch was rebased onto it. My own schema, validator and component changes
  were dropped, because the new schema covers them.
- **This branch needs no schema, template or script changes.** Everything is content in
  `src/content/patterns/` plus these two docs.
- Rechecked on 2026-10-20 at 09:35 against the uncommitted update of `SCHEMA_CHANGES.md` in
  `../unheard-site`, which adds rendering notes and says "No field changes for `patterns`". No
  body contains an H1. The hero action anchors match generated heading ids. Each glossary
  definition matches the opening of the article body.

## Frontmatter mapping

Moving from the first draft to the patterns schema:

| First draft                       | Patterns schema                                              |
| --------------------------------- | ------------------------------------------------------------ |
| `src/content/articles/begrippen/` | `src/content/patterns/`                                      |
| `kind: concept`                   | removed                                                      |
| `sources[].organisation`          | `sources[].publisher`                                        |
| `aliases: [...]`                  | `glossary.aliases`, plus `glossary.term/definition/category` |
| body section `## Gerelateerd`     | removed (the template renders `related`)                     |
| descriptions over 200 characters  | shortened                                                    |

All articles use `status: in_review`, `author: editorial`, `reviewedAt: null`, and
`published: true`, except the two merged files listed below. The site stays `NO_INDEX`.
The validator already blocks indexing until every page is `approved` and has a `reviewedAt`.

## Merges

| Canonical article                                                                | Merged in                                                                  | Reason                                                                                                                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `begrippen/narcisme` (`narcisme`)                                                | narcistische persoonlijkheidsstoornis (NPS), covert/vulnerable narcisme    | One page keeps everyday language, traits and the clinical diagnosis apart. Pincus & Lukowitsky (2010) argue against treating overt and covert narcissism as separate types. |
| `begrippen/sociopathie-en-psychopathie` (`antisociale-persoonlijkheidsstoornis`) | sociopathie, antisociale persoonlijkheidsstoornis, psychopathische trekken | ASPD and psychopathy overlap but are not synonymous (Werner e.a. 2015). Sociopathy is not a diagnosis. Separate pages would invite self-diagnosis checklists.               |
| `begrippen/financieel-economisch-misbruik` (`economisch-misbruik`)               | financieel misbruik, economisch misbruik (as definitions)                  | The 2024 handreiking distinguishes the two; one definition page explains the difference. The practical hub stays at `begrijp-het/financieel-misbruik`.                      |
| `begrijp-het/emotioneel-misbruik` (other branch)                                 | `patterns/emotioneel-misbruik.md` → `published: false`                     | The other branch already publishes this topic with the same glossary term. A second page would compete for the same search intent.                                          |
| `begrijp-het/conflict-of-patroon` (other branch)                                 | `patterns/conflict-of-controle.md` → `published: false`                    | Same as above.                                                                                                                                                              |

**What the other branch could still take from the two unpublished files:**

- From `emotioneel-misbruik.md`:
  - the politie.nl definition of geestelijk geweld;
  - the LKAH signals for psychische mishandeling and psychische verwaarlozing;
  - the paragraph about the June 2026 bill.
- From `conflict-of-controle.md`:
  - the comparison table;
  - the two contrasting situations;
  - the demand/withdraw meta-analysis (Schrodt e.a. 2014);
  - Movisie's "macht en controle, maar ook stress".

Merge or delete them as you see fit.

## Relation keys

- Published keys from this branch:
  - Patterns: `gaslighting`, `darvo`, `schuldverschuiving`, `projectie`, `triangulatie`, `framing`, `hoovering`, `silent-treatment`, `love-bombing`, `psychische-manipulatie`.
  - Control: `dwingende-controle`, `isolatie`, `sociale-druk`, `macht-en-afhankelijkheid`.
  - Financial: `economisch-misbruik`, `schulden-op-naam`, `controle-over-uitgaven`.
  - Impact: `traumabinding`, `fawn-respons`, `hyperwaakzaamheid`, `begrip-zelftwijfel`, `emotionele-uitputting`.
  - Clinical language: `narcisme`, `antisociale-persoonlijkheidsstoornis`.
- **`psychopathie`** in `plannedKeys` never gets its own page, because it is merged into
  `antisociale-persoonlijkheidsstoornis`. Please replace `psychopathie` with that key wherever
  it is used, then remove it from `plannedKeys`.
- `begrip-zelftwijfel` is the term page. `zelftwijfel` stays the emotion page
  (`wat-voel-ik/ik-twijfel-aan-mezelf`). They link to each other.
- Not written on this branch, because they were not in my brief: `conflictvermijding`,
  `verlies-van-identiteit`, `schaamte`. They stay as planned keys.
- My articles link to these routes owned by the other branch:
  - `nl/begrijp-het/emotioneel-misbruik/`
  - `nl/begrijp-het/conflict-of-patroon/`
  - `nl/begrijp-het/financieel-misbruik/`
  - `nl/herstel/therapievormen/`

  They exist in the other branch's working tree but are **not yet in its committed history**
  (`578fe69`), so this branch only builds once those pages are committed.

## Build status on this base

Commit `578fe69` on `feat/handoff-gap-implementation` is a work-in-progress snapshot and does
not build on its own. The emotion files don't match the new schema, and the hubs miss
`translationKey`, `publishedAt` and `updatedAt`. Everything that fails is in files owned by that
branch. To QA my files anyway, I built a throwaway copy of the other branch's working tree
(2026-10-20, 09:31) with my patterns added and three local patches to their files. See
`BEGRIPPEN_REVIEW.md` for the patches and results.

## Notes for the template owner

- Article bodies use Markdown blockquotes for the fictional dialogues (`> **Illustratief
voorbeeld — verzonnen, geen echt gesprek**`). Blockquotes need a visible style on screen and
  in print.
- `conflict-of-controle.md` contains a Markdown table. It is unpublished now, but if its table
  moves to `begrijp-het/conflict-of-patroon`, tables need responsive and print styles.
- The validator's "labels a person" lint also catches quoted counter-examples such as "mijn
  partner is een narcist". I rephrased those; the lint itself is fine.

## Naming rules used

- File name = last slug segment, e.g. `src/content/patterns/schulden-op-naam.md` →
  `nl/begrippen/schulden-op-naam/`.
- `translationKey` = the planned key from `SCHEMA_CHANGES.md` where one exists. Otherwise it is
  the shortest unambiguous kebab-case name (`economisch-misbruik`, `begrip-zelftwijfel`).
- Fictional dialogues always start with the label "Illustratief voorbeeld — verzonnen, geen echt
  gesprek" and are followed by a sentence explaining why one example proves nothing.
