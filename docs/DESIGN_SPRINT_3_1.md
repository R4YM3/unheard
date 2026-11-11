# Sprint 3.1: veiligheid, toegankelijkheid en visuele verfijning

11 november 2026 · Issue [#42](https://github.com/R4YM3/unheard/issues/42) · Branch `fix/sprint3.1-safety-a11y-links` · Basis `main` @ `d723ed1`

Issue #42 is de bron van waarheid. De vier gekoppelde rapporten op `chatgpt.com/library` waren vanuit de ontwikkelomgeving niet bereikbaar: ze tonen alleen een inlogpagina. Die rapporten zijn daarom niet gebruikt en er zijn geen onderzoeksresultaten aangevuld. Dit is gemeld in het issue.

## P0 · Mobiele navigatie en veilig verlaten

| Criterium                                      | Vóór (`d723ed1`)                                  | Na                                                                                                                                                                                         |
| ---------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| QA-01 · paneelhoogte bij 320 × 200             | 2 px binnenhoogte; Tab bereikte onzichtbare links | 125 px, scrollbaar; iedere link zichtbaar bij Tab en Shift+Tab                                                                                                                             |
| QA-01 · focus zichtbaar                        | Focus viel weg achter de rand of het dock         | Paneel scrolt mee met de focus; de focusring staat binnen het paneel                                                                                                                       |
| QA-01 · dock dekt niets af                     | Dock lag over menu en inhoud bij lage hoogte      | Bij een schermhoogte van 30rem of minder en een open menu verdwijnt het dock en staat ‘Verlaat site’ bovenaan in het paneel. Op hogere schermen houdt het paneel ruimte vrij voor het dock |
| QA-01 · pagina verschuift bij tabben           | Tabben door het menu scrolde de pagina eronder    | Met JavaScript staat het paneel vast in beeld (`position: fixed`), zodat de pagina niet meescrolt                                                                                          |
| QA-02 · Escape bij open menu                   | Sloot het menu, focus terug                       | Ongewijzigd, nu zonder scrollsprong (`focus({ preventScroll: true })`)                                                                                                                     |
| QA-02 · Escape bij gesloten menu, ook herhaald | Verliet de site                                   | Doet niets: pagina en scrollpositie blijven; getypte tekst in een zoekveld blijft staan                                                                                                    |
| QA-02 · ‘Verlaat site’                         | Link plus Escape-sneltoets (`aria-keyshortcuts`)  | Alleen de expliciete native link: muis, touch, Enter, zonder JS. Klikken met Ctrl, Cmd of Shift laat de site aan de browser over. `aria-keyshortcuts` is verwijderd                        |
| QA-02 · Veilig gebruik                         | Beschreef Escape als uitgang                      | NL en EN: Esc sluit alleen een menu; uitleg over de terugknop met en zonder JS; geen belofte dat de geschiedenis wordt gewist                                                              |

**Ontwerpbeslissingen:**

- In zoekvelden laten browsers Escape de tekst wissen. De site onderdrukt dat, omdat het issue vraagt om invoer te behouden.
- Bij schermen lager dan 480 px schuift de pagina bij het openen van het menu omhoog tot de sticky header bovenaan staat. Bij sluiten keert de oude positie terug.

## P1 · Homepage-hero

De rij met ‘Gevoelens bekijken’, ‘Voorbeelden van gesprekken bekijken’ en ‘Begrijpen wat er gebeurt’ (Sprint 2) is verwijderd, samen met het schemaveld, de content en de CSS. De hero toont weer alleen de introductie en de twee bestaande acties. De bestemmingen blijven bereikbaar:

- de secties `#gevoelens` en `#perspectief` direct onder de hero;
- ‘Begrijp het’ in de hoofdnavigatie.

De zes gevoelenskaarten, de vragenroute, de vier homepagevoorbeelden, variant A op de gevoelspagina’s en de B-light-vergelijking zijn ongewijzigd.

## P1 · Linkstijlen

De hiërarchie is vastgelegd in [CONTENT_GUIDE.md](CONTENT_GUIDE.md#linkstijlen) en geldt via gedeelde stijlen:

1. **Inline links in lopende tekst** blijven onderstreept.
2. **Zelfstandige links** (`.text-link`) hebben linkkleur, zijn vet en krijgen een pijl. Ze zijn niet permanent onderstreept, alleen bij hover. Het gaat om ‘Ontdek de tijdlijn’, ‘Alle 9 gevoelens’, de begrippenindex en de resultaten van de vragenroute.
3. **Navigatie** gebruikt plaats en vorm, met onderstreping bij hover. Het gaat om de footerlijsten, het kruimelpad, de zoekresultaten en de actieve link in het desktopsubmenu (die al een achtergrond heeft). De actieve hoofdsectie in de header houdt haar onderstreping als staatsaanduiding.
4. **Kaarten en knoppen** zijn ongewijzigd.

Twee links stonden midden in een zin maar hadden de zelfstandige stijl: de verwijzing naar ‘Help me woorden vinden’ in de startkeuze en de bronlink bij een cijfer. Die gebruiken nu `.inline-link`. Een scan van alle NL-pagina’s vindt geen links in lopende tekst zonder onderstreping meer, en geen zelfstandige links met een vaste onderstreping.

## Screenshots

In `docs/screenshots/sprint-3.1/` staan voor-en-na-paren (links `main`, rechts deze branch) en losse beelden (prefix `na-`). Ze zijn gemaakt met Chromium:

- menu bij 320 × 200 (eerste en laatste focus), 667 × 375 en 320 × 568;
- menu bij 390 × 844 in donker;
- homepage op desktop en mobiel;
- linkstijlen: kruimelpad, pager, footer en proza, in licht en donker.

## Tests

Alle tests zijn uitgevoerd op commit `cd0791e`, met Chromium. Zie de PR voor de laatste commit.

| Controle                                                                                                                             | Resultaat                                |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `npm run check`: astro check, eslint, prettier, contentvalidatie en 35 unit-tests                                                    | geslaagd                                 |
| `npm run build` met de dist-audit (interne links, metadata, schema)                                                                  | 104 pagina’s, geslaagd                   |
| `scripts/axe-audit.mjs`, alle pagina’s, licht en donker                                                                              | 202 runs, 0 schendingen                  |
| axe op het geopende menu bij 320 × 200, 320 × 568, 390 × 844 en 667 × 375, licht en donker                                           | 0 schendingen                            |
| `scripts/print-audit.mjs`, `scripts/ux-audit.mjs`                                                                                    | geslaagd                                 |
| 640 × 400 (≈ 200% zoom van 1280 × 800): header op één rij, menu opent, Tab start bij ‘Verlaat site’, Escape sluit zonder weg te gaan | geslaagd                                 |
| `scripts/header-audit.mjs`, uitgebreid (zie hieronder)                                                                               | geslaagd; dezelfde audit faalt op `main` |

Nieuwe regressiedekking in `scripts/header-audit.mjs`:

- **Menu:** bij 320 × 200, 320 × 568, 360 × 740, 390 × 844, 430 × 932 en 667 × 375 blijft elk item zichtbaar bij Tab en Shift+Tab, binnen het paneel, in beeld en niet onder het dock. Er is precies één zichtbare ‘Verlaat site’.
- **Escape:** sluit het menu en geeft de focus terug. Herhaald Escape houdt pagina en positie, op desktop en mobiel. Escape in het zoekveld laat de tekst staan.
- **‘Verlaat site’:** werkt met Enter en zonder JavaScript.
- **Homepage:** de hero heeft geen ingangenrij, en de ankers en de navigatie naar Begrijp het bestaan.
- **Linkhiërarchie:**
  - proza is onderstreept;
  - footer, kruimelpad, kaarten en hoofdnavigatie zijn niet onderstreept;
  - `.text-link` is niet onderstreept en heeft een pijl.

## Niet getest (handmatig nog open)

- Firefox en Safari. In deze omgeving is alleen Chromium beschikbaar.
- VoiceOver op iOS, NVDA en TalkBack.
- Echte browserzoom van 200% en 400%. Die is benaderd met kleinere viewports: 640 × 400 en 320 × 200 komen overeen met 1280 × 800 op 200% en 400%.
- Echte touchbediening op een telefoon.
- Of de terugknop na ‘Verlaat site’ zich in iOS Safari gedraagt zoals beschreven op Veilig gebruik.

## Open ontwerpvragen

1. Moet ‘Verlaat site’ bij een open menu op lage schermen bovenaan het paneel staan of onderaan? Bovenaan is direct bereikbaar, maar de eerste Tab gaat dan naar de uitgang en niet naar ‘Direct gevaar 112’.
2. Moet Escape in zoekvelden de standaardwerking van de browser houden (tekst wissen)?
3. Moeten zoekresultaten een pijl krijgen, net als zelfstandige links, of volstaat de lijstvorm?
4. Moet de huidige pagina in het mobiele menu onderstreept blijven, of volstaat de balk van de actieve sectie?
