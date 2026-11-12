# Homepage: one story in six chapters

Issue: R4YM3/unheard#71. Design canvas artboards: Story-Flow, Pijlers-Patronen, Home-Verhaal-Desktop, Home-Verhaal-Mobiel, Chat-Mobiel, Beginnen.

## Chapters (Dutch homepage)

| Chapter      | Section id     | Band (token)                     | Pattern                                                    |
| ------------ | -------------- | -------------------------------- | ---------------------------------------------------------- |
| Hero         | `#top`         | `--hero-bg` (mist)               | `hero.svg` / `hero-mobile.svg`: contours, as on the canvas |
| Herkennen    | `#gevoelens`   | page paper (breather)            | none                                                       |
| Hulpmiddelen | `#beginnen`    | `--chapter-tools` (sand)         | `roads.svg`: dotted routes along the top                   |
| Begrijpen    | `#perspectief` | `--chapter-understanding` (rose) | `strata.svg`: layers down the end side                     |
| Mijn verhaal | `#verhaal`     | `--chapter-story` (linnen)       | `ridge.svg`: hill line along the bottom                    |
| Herstel      | `#herstel`     | `--chapter-recovery` (salie)     | `ripples.svg`: rings behind the cards                      |
| Hulp         | `#hulp`        | `--band-bg` (pine)               | none                                                       |

Rules:

- Colour marks a chapter and paper is a breather.
- Neighbouring chapters never share a colour; `scripts/header-audit.mjs` checks this.
- Warm sits next to warm and cool next to cool.
- On a phone a pattern only shows at the top of a band and fades into the band colour. The exception is the ridge, which stays along the bottom.
- Print removes every pattern.

## Patterns

- The SVGs in `src/assets/patterns/` are generated from the canvas drawing code by `scripts/generate-patterns.mjs`:
  ```bash
  node scripts/generate-patterns.mjs src/assets/patterns
  ```
- Each pattern has a desktop, mobile, light and dark variant. Dark uses a cream stroke at 60% of the light opacity.

## Components

**`HomePerspectiveCarousel.astro`**: "Wat je hoort. Wat je voelt."

- One example at a time, with arrows beside it on desktop and below it on a phone, plus dots, a count and pause.
- Auto-advances every 6 seconds, but not on hover or focus, off screen, in a hidden tab, or with reduced motion.
- Each example keeps its anchor `#perspectief-scene-N`, and the carousel opens on the example in the URL.
- Without JavaScript, and in print, all examples are listed.

**`StartChooser.astro` with `chapter`**: the needs list and the situations sit on cards. The word finder moved in as the dark card, so the separate `#woorden-vinden` band is gone.

**`HomeHeroConversations.astro`, phone layout (Voorstel 1)**

- The heading and lead come first, then the conversation as one card with two solid bubbles, dots, a count and pause.
- The card can be swiped.

## Text that moved (founder review)

These texts moved unchanged:

- The hero description ("Ik begon Ongehoord vanuit mijn eigen zoektocht …") is now the last paragraph of the "Ook ik zocht woorden" card.
- The two quotes now open the Mijn verhaal chapter.

Chapter eyebrows are now pillar names: Wat voel ik?, Hulpmiddelen, Begrijp het, Mijn verhaal, Herstel. They replace "Begin bij jezelf", "Twee kanten van één gesprek" and "Herstel & hulpmiddelen" on the Dutch homepage only.
