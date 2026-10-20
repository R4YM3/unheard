# Copy-ready content templates

Copy a block into a new file, replace every value, then run
`node scripts/validate-content.mjs <file>`, `npm run check` and `npm run build`.
Field rules, slug prefixes and the key registry are in [CONTENT_GUIDE.md](CONTENT_GUIDE.md).
Only cite sources listed in [SOURCES_VERIFIED.md](SOURCES_VERIFIED.md), or verify new ones first.

## Knowledge article (`src/content/articles/<section>/<file>.md`)

```md
---
title: 'Een menselijke titel als vraag of herkenning'
description: 'Een concrete omschrijving van 30 tot 200 tekens voor zoekmachines en delen.'
locale: nl
translationKey: unieke-sleutel
slug: begrijp-het/unieke-sleutel
status: draft # draft | in_review | approved
published: false # true zodra de pagina zonder privégegevens of onbevestigde claims online mag
author: editorial # editorial = algemene uitleg, founder = persoonlijke ervaring
publishedAt: 2026-10-20
updatedAt: 2026-10-20
reviewedAt: null # ISO-datum na inhoudelijke review; verplicht voordat NO_INDEX=false kan
order: 10
cardTitle: 'Korte kaarttitel'
cardText: 'Eén herkenbare zin voor kaarten en zoekresultaten.'
summary: 'Een direct antwoord van twee of drie zinnen. Dit verschijnt bovenaan als “In het kort”.'
glossary: # optioneel: verschijnt in de begrippenindex en als DefinedTerm
  term: 'Begrip'
  definition: 'Een voorzichtige omschrijving van 20 tot 260 tekens, zonder diagnose.'
  aliases: []
  category: basis # patroon | controle | financieel | impact | labels | basis
scenarios: # optioneel, maximaal drie fictieve situaties
  - label: 'Korte situatienaam'
    outside: '“Wat er gezegd wordt.”'
    inside: 'Wat ik vanbinnen voel, in de ik-vorm.'
    context: 'Nuance die niets concludeert over de ander.'
reflection: # optioneel
  heading: 'Vragen om bij stil te staan'
  questions: ['Een vrijblijvende vraag?']
  writable: false # true toont lokale invulvelden; nooit opgeslagen of verstuurd
related: [zelftwijfel, hulp-vinden] # 2 tot 5 bestaande of geplande sleutels
sources:
  - label: 'Titel van de bron'
    url: 'https://www.voorbeeld-officiele-bron.nl/pagina'
    publisher: 'Uitgever'
    checkedAt: 2026-10-20
reviewNotes:
  - 'Vraag voor de oprichter of een inhoudelijk reviewer.'
---

## Wat is het?

## Hoe kan het eruitzien?

## Wanneer is het niet zomaar af te leiden?

## Wat het met je kan doen

## Wat kan helpen?
```

The URL in `sources` above is a placeholder. Replace it with a real, checked source before setting
`published: true`.

## Other collections

- **Emotion** (`src/content/emotions/`, slug `wat-voel-ik/...`): add `feeling`, `impacts`,
  `helps` and optionally `founderNote`. Body order: Herken je dit? → Wat gebeurt er om je heen? →
  Wat kan dit verklaren? → Wat het met je kan doen → Wanneer is het iets anders?
- **Pattern** (`src/content/patterns/`, slug `begrippen/...`): same fields as an article; always
  add a `glossary` block. Term articles are written on the `content/begrippen` branch.
- **Therapy** (`src/content/therapies/`, slug `herstel/therapievormen/...`): add `name`, `focus`,
  `professionalQuestions` (at least three) and an optional labelled `founder` passage.
- **Tool** (`src/content/tools/`, slug `hulpmiddelen/...`): add `purpose`, `usage`, `safety` and a
  `card` with at least three `prompts` (`kind: lines` or `kind: check`).
- **Stat** (`src/content/stats/*.yaml`): only with `verified: true` after checking the primary
  source; every field (definition, population, period, limitations, URL, checked date) is required.
