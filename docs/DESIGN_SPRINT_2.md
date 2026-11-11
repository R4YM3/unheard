# Design implementation sprint 2

11 november 2026 · Branch `design/sprint2-implementation` · Bron: [Design Decision Report](research/2026-11-11-design-decision-report.md) en [DESIGN_HANDOFF.md](../DESIGN_HANDOFF.md)

Deze ronde voert de goedgekeurde verbeteringen uit in prioriteitsvolgorde. Identiteit, inhoud, componenten en architectuur blijven gelijk. Niets is gepubliceerd of naar `main` gemerged.

## P1 · Mobiele veiligheid

| Vóór (main `fd02fbf`)                                                                           | Na                                                                                                                    |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Escape met open mobiel menu verliet de site                                                     | Escape sluit het menu en zet de focus terug op de menuknop; een tweede Escape verlaat de site                         |
| Paneel liep op 320×568 13 px onder het dock door                                                | Paneelhoogte reserveert onderaan ruimte voor het dock, op elke scrollpositie (`--menu-top` wordt bij openen gezet)    |
| Menuknop bleef ‘Menu openen’ heten als het menu open was                                        | Naam volgt de toestand: ‘Menu openen’ / ‘Menu sluiten’                                                                |
| Op ‘Grenzen leren stellen’ hadden twee ‘Herstel’-links `aria-current="page"`                    | Alleen de pagina zelf krijgt `aria-current="page"`; de actieve sectie is een aparte visuele aanwijzing (`.is-active`) |
| ‘Herstel’ (en ‘Gevoelens’, ‘Het verhaal’) stonden twee keer in het paneel, naar dezelfde pagina | Eén link per bestemming; subonderdelen staan genest onder hun sectie                                                  |
| Zoeken stond in de header én in het paneel                                                      | Op mobiel alleen in het paneel; op desktop alleen in de header                                                        |
| ‘Hulp vinden’ alleen in het paneel                                                              | ‘Hulp vinden’ zichtbaar naast de menuknop; in het paneel een compacte hulpkaart: 112, Veilig Thuis, Alle hulp         |

De knop ‘Verlaat site’ draagt `aria-keyshortcuts="Escape"`, zodat schermlezers de sneltoets kunnen aankondigen. De tekst op Veilig gebruik (NL en EN) beschrijft nu de plek van het dock (rechtsonder) en de nieuwe volgorde van Escape.

## P2 · Ingangen onder de hero

Drie gelijkwaardige tekstlinks onder de hero-acties, onder elkaar, zonder nummers: ‘Gevoelens bekijken’ → `#gevoelens`, ‘Voorbeelden van gesprekken bekijken’ → `#perspectief`, ‘Begrijpen wat er gebeurt’ → `nl/begrijp-het/`. De ankers bestaan. ‘Help me woorden vinden’ en ‘Lees mijn verhaal’ blijven de hero-acties. De labels komen uit de handoff; het kopje ‘Of begin hier’ is nieuwe microcopy en staat als reviewnotitie in `home.md`.

## P3 · Herkenningssectie: huidige variant en B-light

De homepage houdt het huidige blok als referentie. B-light staat als aparte component (`PerspectiveSituations.astro`) op de interne, niet-geïndexeerde pagina `nl/ontwerp-systeem/herkenning/`, met dezelfde vier situaties uit `home.md`, direct onder de huidige variant.

| Aspect                        | Huidige variant (referentie)                    | B-light                                              |
| ----------------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| Eerste indruk                 | Eén voorbeeld open, vier knoppen erboven        | Vier koppen, elk met de gehoorde zin                 |
| Kiezen                        | Knop indrukken; op mobiel een keuzelijst        | Eén situatie openklappen (native `<details>`)        |
| Na kiezen                     | Je hoort, je voelt en context van één voorbeeld | Je voelt en context erbij, onder de gehoorde zin     |
| Vergelijken                   | Eén voorbeeld tegelijk                          | Meerdere situaties tegelijk open                     |
| Herhaling                     | Geen                                            | Geen: de zin staat alleen in de kop                  |
| Zonder JavaScript en in print | Alle voorbeelden onder elkaar                   | Alle situaties open                                  |
| Leeslast bij binnenkomst      | Laag: één voorbeeld                             | Middel: vier zinnen tegelijk zichtbaar               |
| Desktop                       | Volle breedte                                   | Twee kolommen; een geopende kaart maakt de rij hoger |

Geen tweede keuzerij, geen tellingen en geen verwijzingen naar ‘acht’. Er is nog geen keuze gemaakt.

## P4 · Gevoelspagina’s: variant A

`PerspectiveSwitch layout="split"` op alle gevoelspagina’s: directe knoppen met `aria-pressed`, geen vorige/volgende en geen keuzelijst. Het eerste voorbeeld is direct leesbaar en de naam van het voorbeeld blijft zichtbaar. ‘Je hoort’ en ‘Je voelt’ staan vanaf 52rem naast elkaar en op mobiel onder elkaar. De focus blijft op de geactiveerde knop. Een korte, beleefde statusmelding (‘Voorbeeld getoond: …’) noemt het getoonde voorbeeld; het voorbeeld zelf is geen live-regio. Zonder JavaScript en in print staan alle voorbeelden onder elkaar. Alle teksten zijn behouden.

## P5 · Consistentie

- ‘Mijn zoektocht’ staat op Therapievormen nu vóór de groepen, als duiding (nieuw veld `founderNote.placement`). De scheurrand zit boven ieder persoonlijk blok.
- Kop ‘Mijn ervaring met emdr’ hield de afkorting niet: acroniemen blijven nu in hoofdletters (‘Mijn ervaring met EMDR’).
- De hero van Therapievormen toonde de introtekst twee keer (lead en alinea’s). Een alinea die alleen de lead herhaalt, wordt nu één keer getoond. De inhoud is niet gewijzigd.
- Keuzelijsten (`select`) krijgen dezelfde focusring als knoppen en links.
- Gecontroleerd en in orde: vervolgacties onder kaartenbanden zijn rustige omlijnde knoppen; kaarten zijn volledig klikbaar, met zichtbaar pijltje en de titel in de linknaam; iedere ‘Verder lezen’-band heeft minstens drie bestemmingen.

## Variant C · alleen gedocumenteerd

C (één directe keuze vanuit een gehoorde zin) krijgt geen eigen route. Zo zou C kunnen aansluiten op ‘Help me woorden vinden’, zonder nieuwe opslag of nieuwe inhoud:

1. **Bron.** De gehoorde zinnen staan al als `scenarios[].outside` in de negen gevoelspagina’s. Een build-time lijst koppelt elke zin aan zijn gevoelspagina (`translationKey`) en voorbeeldindex. Er komt geen nieuwe tekst bij.
2. **Plek.** Een optionele, overslaanbare eerste stap in de vragenroute: ‘Herken je een zin?’. Die stap toont maximaal zes zinnen als knoppen, met ‘Geen van deze’ als exclusieve optie. Het blijft één keuze, zonder geneste keuzes.
3. **Gevolg.** Kiezen opent het volledige voorbeeld (je hoort, je voelt en de context) met een link naar de gevoelspagina. Daarna gaat de route verder. In `lib/word-finder.mjs` telt de keuze als een gevoel in `routes[].feelings`, net als een antwoord op een vraag. Er komt geen score of oordeel bij, en er wordt niets opgeslagen.
4. **Zonder JavaScript.** De zinnen staan als gewone links naar `nl/wat-voel-ik/<gevoel>/#perspectief`.
5. **Voorwaarde voor een eigen plek.** C krijgt pas een zelfstandige plek als een test met fictieve taken laat zien dat bezoekers sneller of met minder omwegen een passend voorbeeld vinden dan via de voorbeelden of de vragenroute.

## Bekende beperkingen

- De statusmelding bij variant A is gebouwd, maar nog niet getest met VoiceOver, NVDA of TalkBack. Of hij nodig is, blijft een open vraag.
- In B-light staan kop en zin in een `<summary>`. Sommige schermlezers lezen die als één knop. De kop is dan niet bereikbaar via kopnavigatie.
- Print zonder JavaScript opent B-light via `::details-content`. Chrome ondersteunt dat. Safari opent de situaties in print alleen met JavaScript (`beforeprint`).
- 200% zoom is getest op een desktopvenster (1280×800, dus 640 CSS-pixels breed) en op een telefoon (390 breed, dus 195 CSS-pixels). De header past in beide gevallen. Onder 320 CSS-pixels lopen sommige kaarten en de vorige/volgende-links buiten beeld. Dat was op `main` al zo, en het valt onder de reflow-grens van WCAG (320 px).
- De labels van de ingangen en ‘Of begin hier’ zijn nog niet door de oprichter bevestigd.

## Open ontwerpbeslissingen

1. B-light of de huidige variant op home. Dat hangt af van een test met fictieve taken: tijd tot een passend voorbeeld, omwegen, contextbegrip en leeslast.
2. B-light op desktop in twee kolommen of in één.
3. Of de statusmelding bij variant A blijft, na een test met een schermlezer.
4. Escape als snelle uitgang, of een aparte aangekondigde sneltoets. Voorlopig blijft Escape de sneltoets, met de nieuwe volgorde (eerst menu sluiten).
5. ‘Voorbeelden van gesprekken bekijken’ of ‘Gesprekssituaties herkennen’.
6. Of zoeken op mobiel ook bij een gesloten menu zichtbaar moet zijn.

## Tests en resultaten

| Controle                                                                         | Resultaat                                           |
| -------------------------------------------------------------------------------- | --------------------------------------------------- |
| `npm run check` (astro check, eslint, prettier, contentvalidatie, 35 unit-tests) | geslaagd                                            |
| `npm run build` met dist-audit (links, metadata, schema)                         | 104 pagina’s, geslaagd                              |
| `scripts/axe-audit.mjs`, licht en donker                                         | 0 schendingen op alle pagina’s                      |
| axe op geopend mobiel menu (320, 390) en geopende B-light, licht en donker       | 0 schendingen                                       |
| `scripts/print-audit.mjs`, `scripts/ux-audit.mjs`                                | geslaagd                                            |
| `scripts/header-audit.mjs` (nieuw: mobiel menu, variant A, B-light)              | geslaagd                                            |
| Escape op 320×568, 390×844, 667×375 en 200% zoom                                 | menu sluit, focus terug op ‘Menu openen’, geen exit |
| Tabvolgorde in open menu                                                         | 112 → Veilig Thuis → Alle hulp → Home → …           |
| Print-PDF gevoelspagina en vergelijking                                          | alle voorbeelden en situaties volledig              |
