# Content guide

How content is organised, which frontmatter each page type needs, and the editorial rules
every page must follow. The schema itself lives in `src/content.config.ts`; build-time
relation checks live in `src/lib/content.ts`.

## Workflow

1. Copy the example for the page type below into the right folder. The file name is free;
   the route comes from `slug`.
2. Fill in frontmatter and write the body in Markdown (`##` for sections, never `#`; the
   template renders the only H1 from `title`).
3. Run `npm run check`. It validates frontmatter, relation keys, links and formatting.
4. Run `NO_INDEX=true npm run build`. The build fails on broken relations, duplicate routes,
   missing sources or broken internal links.
5. With `published: true` the page appears at `/<locale>/<slug>/`, in its hub listing, in
   `/nl/zoeken/`, in the glossary when it has a `glossary` block, and in the sitemap.
6. Add the page to `CONTENT_REVIEW.md` with its review questions.

`published` is the build flag. `status` (`draft`, `in_review`, `approved`) is the editorial
state and is shown on the page. Everything is `noindex,nofollow` while `NO_INDEX=true`.

## Folders and routes

| Collection | Folder | `slug` must start with | Template |
| --- | --- | --- | --- |
| `emotions` | `src/content/emotions/` | `wat-voel-ik/` | Emotion page |
| `patterns` | `src/content/patterns/` | `begrippen/` | Knowledge page (term articles: `content/begrippen` branch) |
| `articles` | `src/content/articles/` | any | Knowledge page |
| `therapies` | `src/content/therapies/` | `herstel/therapievormen/` | Therapy page |
| `tools` | `src/content/tools/` | `hulpmiddelen/` | Tool page with A4 card |
| `hubs` | `src/content/hubs/` | any (`home` = `/nl/`) | Hub page with listings |
| `story` | `src/content/story/` | `mijn-verhaal` | Founder story |
| `stats` | `src/content/stats/*.yaml` | — | Figures on `/nl/mannen-in-cijfers/` |

Breadcrumbs are derived from the slug: `begrijp-het/financieel-misbruik/signalen` shows
Home → Begrijp het → Financieel misbruik → Signalen, as long as the parent slugs exist.

## Shared frontmatter (all routed collections)

```yaml
title: 'Menselijke titel, wordt de H1' # ≥ 8 chars
description: 'Meta description en kaarttekst, 30–200 tekens.'
locale: nl
translationKey: zelftwijfel # unique key used in `related`
slug: wat-voel-ik/ik-twijfel-aan-mezelf
status: draft # draft | in_review | approved
published: true
author: editorial # editorial = neutrale uitleg; founder = ik-vorm van de oprichter
publishedAt: 2026-10-20
updatedAt: 2026-10-20
reviewedAt: null
order: 10 # optional sort order within a hub listing
cardTitle: 'Korte titel voor kaarten' # optional
cardText: 'Korte kaarttekst.' # optional, ≤ 200 chars
summary: 'Kort, direct antwoord op de kernvraag (40–420 tekens).' # optional answer box
hero: # optional; without it the template uses title + description
  eyebrow: 'Wat voel ik? / Zelftwijfel'
  paragraphs: ['Eerste alinea (lead).', 'Tweede alinea.']
  actions:
    - { href: '#herkenning', label: 'Herken je dit? ↓' }
    - { href: 'nl/hulp-vinden/', label: 'Hulp vinden', quiet: true }
glossary: # optional; lists the page in /nl/begrippen/
  term: Zelftwijfel
  definition: 'Korte, niet-diagnostische definitie (20–260 tekens).'
  aliases: []
  category: impact # patroon | controle | financieel | impact | labels | basis
related: [darvo, grenzen, hulp-vinden] # 2–5 keys from the registry below
sources:
  - label: 'Thuisarts — Ik wil beter omgaan met stress'
    url: 'https://www.thuisarts.nl/stress/ik-wil-beter-omgaan-met-stress'
    publisher: Thuisarts
    checkedAt: 2026-10-20
reviewNotes:
  - 'Concrete vraag aan oprichter/clinicus/jurist.'
```

Internal links (`href`, Markdown links) are **relative to the site base**: write
`nl/hulp-vinden/`, never `/nl/hulp-vinden/`. Phone links: `[113](tel:113)`.

### Extra fields per collection

**emotions**: `feeling` (short label, e.g. `Zelftwijfel`), `scenarios` (0–3, see below),
`impacts` (`[{title, text}]`), `reflection` (`{heading?, questions[], note?, writable}`),
`helps` (`[{title, text}]`), `founderNote` (`{eyebrow?, heading, paragraphs[], needsReview}`).

**patterns**: `scenarios`, `reflection`, legacy `darvo` block. See `docs/SCHEMA_CHANGES.md`.

**articles**: `scenarios`, `reflection`, `cards` (`[{eyebrow?, title, text, href?, label?}]`),
`founderNote`.

**therapies**: `name`, `focus` (one sentence, ≤ 220 chars), `professionalQuestions` (≥ 3),
`founder` (`{text: [paragraphs], needsReview: true}`) for the labelled first-person passage.

**tools**: `purpose`, `usage` (list), `safety`, and `card`:

```yaml
card:
  title: 'Wat voel ik en wat heb ik nodig?'
  intro: 'Neem de tijd. Je hoeft niet alles in te vullen.'
  prompts:
    - question: 'Wat merk ik vandaag in mijn lichaam?'
      hint: 'Bijvoorbeeld spanning, moeheid, rust.'
      kind: lines # lines | check
      lines: 3
  closing: 'Je mag deze kaart weggooien, bewaren of aan iemand laten zien.'
```

**hubs**: `heading`, `eyebrow`, `lead`, `listings`
(`[{collection, prefix?, eyebrow?, heading, lead?, tone?}]`), `cards`, `scenarios`,
`reflection`, `chooser`, `glossaryIndex`, `stats`, `searchIndex`, `founderNote`, `home`.

**Scenarios** (perspective switcher, max 3, fictional and illustrative only):

```yaml
scenarios:
  - label: 'Een grens aangeven' # ≤ 48 chars, button text
    outside: '“Waarom doe je nu zo moeilijk?”' # Wat er gezegd wordt
    inside: 'Ik voel spanning als ik nee wil zeggen.' # Wat ik vanbinnen voel
    context: 'Duiding die geen conclusie trekt over de ander.'
```

## Key registry

Use these `translationKey` values in `related`. Unknown keys fail the build (term keys of the
parallel branch are pre-registered, see `docs/SCHEMA_CHANGES.md`).

| Key | Collection | Slug |
| --- | --- | --- |
| `home` | hubs | `home` (→ `/nl/`) |
| `wat-voel-ik` | hubs | `wat-voel-ik` |
| `zelftwijfel` | emotions | `wat-voel-ik/ik-twijfel-aan-mezelf` |
| `schuldgevoel` | emotions | `wat-voel-ik/ik-voel-me-schuldig` |
| `identiteit` | emotions | `wat-voel-ik/ik-herken-mezelf-niet-meer` |
| `grenzen` | emotions | `wat-voel-ik/ik-durf-geen-nee-te-zeggen` |
| `gemis` | emotions | `wat-voel-ik/ik-mis-iemand-die-mij-pijn-heeft-gedaan` |
| `pijn-na-inzicht` | emotions | `wat-voel-ik/ik-begrijp-het-maar-het-blijft-pijn-doen` |
| `bevestiging` | emotions | `wat-voel-ik/ik-zoek-steeds-bevestiging` |
| `spanning` | emotions | `wat-voel-ik/ik-sta-voortdurend-aan` |
| `geld-praten` | emotions | `wat-voel-ik/ik-durf-niet-over-geld-te-praten` |
| `begrijp-het` | hubs | `begrijp-het` |
| `emotioneel-misbruik` | articles | `begrijp-het/emotioneel-misbruik` |
| `conflict-of-patroon` | articles | `begrijp-het/conflict-of-patroon` |
| `wat-het-met-je-kan-doen` | articles | `begrijp-het/wat-het-met-je-kan-doen` |
| `begrippen` | hubs | `begrippen` |
| `darvo` | patterns | `begrippen/darvo` |
| `financieel-misbruik` | hubs | `begrijp-het/financieel-misbruik` |
| `financieel-signalen` | articles | `begrijp-het/financieel-misbruik/signalen` |
| `financieel-geldruzie-of-controle` | articles | `begrijp-het/financieel-misbruik/geldruzie-of-controle` |
| `financieel-documenten` | articles | `begrijp-het/financieel-misbruik/toegang-tot-documenten` |
| `financieel-overzicht` | articles | `begrijp-het/financieel-misbruik/overzicht-inkomsten-en-schulden` |
| `financieel-afhankelijkheid` | articles | `begrijp-het/financieel-misbruik/afhankelijkheid` |
| `financieel-na-scheiding` | articles | `begrijp-het/financieel-misbruik/druk-na-scheiding` |
| `financieel-herstel` | articles | `begrijp-het/financieel-misbruik/veilig-financieel-herstel` |
| `financieel-advies` | articles | `begrijp-het/financieel-misbruik/juridisch-en-financieel-advies` |
| `herstel` | hubs | `herstel` |
| `herstel-erkenning` | articles | `herstel/erkenning` |
| `herstel-zelfvertrouwen` | articles | `herstel/zelfvertrouwen` |
| `herstel-grenzen` | articles | `herstel/grenzen-leren-stellen` |
| `herstel-triggers` | articles | `herstel/triggers-en-moeilijke-berichten` |
| `herstel-rouw` | articles | `herstel/rouw` |
| `herstel-leren-voelen` | articles | `herstel/leren-voelen` |
| `herstel-contact-na-breuk` | articles | `herstel/contact-na-een-breuk` |
| `herstel-ouderschap` | articles | `herstel/herstel-als-ouder` |
| `herstel-steunnetwerk` | articles | `herstel/steunnetwerk` |
| `therapievormen` | hubs | `herstel/therapievormen` |
| `therapie-schematherapie` | therapies | `herstel/therapievormen/schematherapie` |
| `therapie-groepsschematherapie` | therapies | `herstel/therapievormen/groepsschematherapie` |
| `therapie-emdr` | therapies | `herstel/therapievormen/emdr` |
| `therapie-exposure` | therapies | `herstel/therapievormen/exposuretherapie` |
| `therapie-cgt` | therapies | `herstel/therapievormen/cognitieve-gedragstherapie` |
| `therapie-psycholoog` | therapies | `herstel/therapievormen/gesprekken-met-een-psycholoog` |
| `therapie-beeldend` | therapies | `herstel/therapievormen/beeldende-therapie` |
| `therapie-boksen` | therapies | `herstel/therapievormen/boksen-met-emoties` |
| `therapie-meditatie` | therapies | `herstel/therapievormen/meditatie` |
| `mijn-verhaal` | story | `mijn-verhaal` |
| `hulpmiddelen` | hubs | `hulpmiddelen` |
| `kaart-zelfreflectie` | tools | `hulpmiddelen/wat-voel-ik-en-wat-heb-ik-nodig` |
| `kaart-partnergesprek` | tools | `hulpmiddelen/vragen-voor-een-gesprek-met-je-partner` |
| `kaart-hulpverlener` | tools | `hulpmiddelen/voorbereiding-gesprek-huisarts-of-therapeut` |
| `kaart-naaste` | tools | `hulpmiddelen/iemand-steunen` |
| `kaart-financieel` | tools | `hulpmiddelen/financieel-overzicht-en-veiligheid` |
| `kaart-pijn-na-inzicht` | tools | `hulpmiddelen/ik-begrijp-het-maar-het-blijft-pijn-doen` |
| `hulp-vinden` | articles | `hulp-vinden` |
| `voor-naasten` | articles | `ik-maak-me-zorgen-om-iemand` |
| `mannen-in-cijfers` | hubs | `mannen-in-cijfers` |
| `over` | articles | `over` |
| `werkwijze` | articles | `werkwijze` |
| `veilig-gebruik` | articles | `veilig-gebruik` |
| `toegankelijkheid` | articles | `toegankelijkheid` |
| `zoeken` | hubs | `zoeken` |

## Editorial rules (from the content handoff)

- **Voice.** Calm, serious, human, warm, not clinical. Address the reader as `je` where it
  fits. Leave room for uncertainty. No clickbait, no promises of healing, no lecturing.
- **First person only for the founder** (`ik`). Never `wij`, `ons team`, `onze redactie`.
  Knowledge pages are written neutrally.
- **No diagnoses of others.** Never suggest that a partner or ex "is" a narcissist,
  sociopath or abuser. Describe behaviour and its effect on the reader. One example or one
  feeling never proves abuse; say so where it matters.
- **Examples are fictional and illustrative**, never autobiographical, unless the founder
  confirmed it. Keep them unidentifiable (no names, places, ages of children, amounts).
- **Founder facts that may be used** (high level only): schema therapy for self-discovery;
  group schema therapy; EMDR felt insufficient for him, after which exposure followed;
  cognitive therapy to handle thoughts; boxing with emotions to notice how much energy
  emotions cost; art therapy to discover his own wants; psychologist; meditation. He is a
  father and rebuilding his life. **Nothing else.** No dates, diagnoses, exercises, outcomes,
  names, ages, places, legal or financial details. Where a passage needs his memories, write
  `[OPRICHTER REVIEW NODIG]` plus a concrete question in `reviewNotes`.
- **Facts need a verified source** from `docs/SOURCES_VERIFIED.md`. No statistics outside
  `/nl/mannen-in-cijfers/`. No causal link between domestic violence and suicide. No rankings
  of groups. No fabricated citations or URLs.
- **Safety.** Never advise confrontation, secretly collecting evidence, or changing shared
  accounts when that could be unsafe; advise confidential advice first. Mention help quietly,
  not as a warning on every paragraph. 112 for direct danger; 113 (free, 24/7, chat via
  113.nl) for thoughts of suicide; Veilig Thuis 0800-2000 (free, anonymous, 24/7) for
  domestic violence and abuse.
- **Everyone is welcome; male stigma is central.** Write so a man recognises himself
  without excluding women and non-binary readers.
- **Structure.** Short paragraphs, clear `##` headings, summary sentences, a next step,
  2–5 related keys. Long is fine; padded is not. No lorem ipsum, no thin duplicate pages.
- **Knowledge article order:** wat is het? → hoe kan het eruitzien? → wanneer is het *niet*
  zomaar af te leiden? → impact → wat kan helpen?
- **Emotion page order:** hoe voelt het? → wat gebeurt er om je heen? → wat kan dit
  verklaren? → gevolgen; the template then adds the perspective switcher, impacts,
  reflection questions, `helps`, related routes, help and sources.
