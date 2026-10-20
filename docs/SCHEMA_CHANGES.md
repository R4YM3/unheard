# Schema changes for `content/begrippen`

Branch `feat/handoff-gap-implementation` replaces the two original collections (`articles`
with a `kind` field, and `pages`) with typed collections. Term and pattern articles now live
in their own `patterns` collection. Rebase `content/begrippen` onto this branch and move term
files as described below.

## What moved

| Before | After |
| --- | --- |
| `src/content/articles/begrippen/*.md` (`kind: concept`) | `src/content/patterns/*.md` |
| `src/content/articles/wat-voel-ik/*.md` | `src/content/emotions/*.md` |
| `src/content/pages/nl/*.md` | `src/content/hubs/*.md` and `src/content/story/mijn-verhaal.md` |
| `/nl/financieel-misbruik/` | `/nl/begrijp-het/financieel-misbruik/` (old URL redirects) |
| `/nl/herstel/therapie/` | `/nl/herstel/therapievormen/` (old URL redirects) |

`src/content/patterns/darvo.md` is the existing DARVO article, moved unchanged apart from the
new fields. Edit it there.

## Pattern frontmatter

Everything below `slug` is optional unless marked required. Unknown fields such as the old
`kind` are ignored, and `author: Ongehoord` is still accepted (it maps to `editorial`).

```yaml
---
title: 'Gaslighting: als je gaat twijfelen aan wat je zelf hebt meegemaakt' # required, ≥ 8 chars
description: 'Wat gaslighting betekent, hoe het eruit kan zien en waarom één verschil in herinnering niet genoeg is.' # required, 30–200 chars
locale: nl # default nl
translationKey: gaslighting # required, kebab-case, unique per locale
slug: begrippen/gaslighting # required, must start with begrippen/
status: draft # draft | in_review | approved (editorial state)
published: true # build flag; false keeps the file out of the build
author: editorial # editorial (neutral knowledge text) | founder (first person)
publishedAt: 2026-10-20 # required
updatedAt: 2026-10-20 # required
reviewedAt: null # ISO date after founder/clinical review
summary: 'Eén of twee zinnen die de kernvraag direct beantwoorden.' # optional answer box, 40–420 chars
glossary: # strongly recommended; this is what /nl/begrippen/ lists
  term: Gaslighting
  definition: 'Een patroon waarbij iemand herhaaldelijk jouw herinnering of waarneming ondermijnt, waardoor je aan jezelf gaat twijfelen.' # 20–260 chars
  aliases: [Realiteit ontkennen] # extra index entries that point to this page
  category: patroon # patroon | controle | financieel | impact | labels | basis
related: [zelftwijfel, darvo, hulp-vinden] # or grouped: { emotions: [zelftwijfel], help: [hulp-vinden] }
sources:
  - label: 'Auteur — titel'
    url: 'https://…' # HTTPS only
    publisher: 'Uitgever' # optional
    checkedAt: 2026-10-20 # optional, date the URL and claim were checked
scenarios: # optional, max 3; renders the "Wat er gezegd wordt / Wat ik vanbinnen voel" switcher
  - label: Een gesprek begrijpen # button text, ≤ 48 chars
    outside: '“Dat heb ik nooit gezegd.”' # fictional, illustrative
    inside: 'Ik weet wat ik hoorde, maar ik begin te twijfelen.'
    context: 'Uitleg die één voorbeeld niet tot bewijs maakt.'
reflection: # optional private mini-reflection; never stored
  questions: ['Wat merkte ik bij mezelf na dat gesprek?']
  writable: false # true shows optional local text fields
reviewNotes: ['Vraag voor de oprichter of clinicus, komt in CONTENT_REVIEW.md']
---
```

Body: Markdown with `##` headings in the knowledge-article order from the content handoff:
wat is het → hoe kan het eruitzien → wanneer is het niet zomaar af te leiden → impact →
wat kan helpen. Sources and related links are rendered by the template; do not repeat them in
the body.

## Relation keys

`related` keys must resolve to a published entry, or the build fails. These term keys are
pre-registered in `src/lib/content.ts` (`plannedKeys`) so other pages can already point to them;
they render as soon as a published entry with that `translationKey` exists. Please use these
exact keys:

`gaslighting`, `hoovering`, `triangulatie`, `framing`, `schuldverschuiving`, `projectie`,
`silent-treatment`, `love-bombing`, `dwingende-controle`, `isolatie`, `sociale-druk`,
`traumabinding`, `hyperwaakzaamheid`, `fawn-respons`, `conflictvermijding`,
`emotionele-uitputting`, `verlies-van-identiteit`, `schaamte`, `narcisme`,
`antisociale-persoonlijkheidsstoornis`, `psychopathie`.

If you use a different key, add it to `plannedKeys` or the pages linking to it will not show
it. Keys owned by this branch that term articles can link to:

| Key | Route |
| --- | --- |
| `zelftwijfel`, `schuldgevoel`, `identiteit`, `grenzen`, `gemis`, `pijn-na-inzicht`, `bevestiging`, `spanning`, `geld-praten` | `/nl/wat-voel-ik/…` |
| `begrijp-het`, `emotioneel-misbruik`, `conflict-of-patroon`, `wat-het-met-je-kan-doen` | `/nl/begrijp-het/…` |
| `financieel-misbruik` and `financieel-*` subarticles | `/nl/begrijp-het/financieel-misbruik/…` |
| `herstel`, `herstel-*`, `therapievormen`, `therapie-*` | `/nl/herstel/…` |
| `hulp-vinden`, `voor-naasten`, `hulpmiddelen`, `kaart-*` | help, loved ones, tools |

## Rendering notes for term articles

- The page H1 is `title`; `summary` and the `glossary` definition appear together in an
  "In het kort" box directly under the hero, and the definition is emitted as `DefinedTerm`
  JSON-LD. Keep the definition identical to what the body says.
- `/nl/begrippen/` lists every published `patterns` entry whose slug is exactly
  `begrippen/<segment>` (direct children only), and builds the A–Z index from the `glossary`
  blocks of all collections.
- `hero` (`eyebrow`, `paragraphs`, `actions`) is optional; without it the hero shows only the
  breadcrumbs and title. Anchor actions must match a heading id generated from the body
  (lowercase, spaces become hyphens, punctuation removed), e.g. `## Wat is het?` → `#wat-is-het`.
- Do not put an `#` H1 in the body; the validator rejects it.

## Changelog

- 2026-10-20: introduced `emotions`, `patterns`, `articles`, `therapies`, `tools`, `stats`,
  `hubs`, `story`; added `status`, `reviewedAt`, extended `sources`, grouped `related`,
  `glossary`, `scenarios`, `reflection`, `reviewNotes`.
- 2026-10-20 (later): templates and catch-all route landed; hub `listings` show direct
  children only; robots meta is now exactly `noindex,nofollow`; top navigation points
  "Begrijp het" to `/nl/begrijp-het/`. No field changes for `patterns`.
