# Review: Help me woorden vinden

Status: **concept, niet gecontroleerd**. Alles hieronder staat live op
`nl/hulpmiddelen/help-me-woorden-vinden/` met `NO_INDEX=true`. Niets mag geïndexeerd worden
voordat redactie en een clinicus dit document hebben afgetekend.

## Waar de tekst staat

| Wat                                         | Bestand                                          |
| ------------------------------------------- | ------------------------------------------------ |
| Vragen, opties, routes, teksten             | `src/content/finder/help-me-woorden-vinden.yaml` |
| Paginatitel, intro, metadata                | `src/content/hubs/help-me-woorden-vinden.md`     |
| Regels (welke route, welke links, volgorde) | `src/lib/word-finder.mjs`                        |
| Vaste teksten in de interface               | `src/components/WordFinder.astro`                |
| Hulpregels in de download                   | `src/scripts/word-finder.ts` (`help`)            |

Tekst aanpassen gebeurt alleen in de YAML. `npm run check` faalt als een link naar een
niet-gepubliceerde pagina wijst, als een route onbereikbaar wordt of als er een score,
percentage, uitslag of label in de tekst sluipt.

## Hoe de uitkomst werkt

- Elke aangeklikte optie hoort bij nul of meer routes. Routes die vaker voorkomen staan eerst.
  Er worden maximaal drie routes, drie gevoelspagina’s, vijf begrippen en drie vragen getoond.
- De telling wordt nooit getoond. Er is geen score, percentage, risicoklasse of uitslag.
- Opties met `exclusive` (“Geen van deze past”) wissen de andere keuzes bij die vraag.
- Niets aangeklikt geeft een rustig algemeen overzicht (`empty`, `general`).
- De veiligheidsvraag bepaalt alleen welk hulpblok bovenaan staat. 112, 113 en Veilig Thuis
  staan daarnaast altijd op de pagina, boven de vragen en onderaan.

## Te controleren

### Wat het wel en niet is

- Kan: “Je helpt jezelf woorden te vinden voor wat je voelt en meemaakt.” · “Je krijgt pagina’s
  om over te lezen die passen bij wat je aanklikt.” · “Je krijgt een paar open vragen en
  mogelijke volgende stappen.”
- Kan niet: “Dit is geen test. Er komt geen score, geen percentage en geen uitslag uit.” · “Het
  zegt niet of er wel of geen sprake is van misbruik.” · “Het zegt niets over wat iemand anders
  bedoelt of wat voor persoon diegene is.” · “Het vervangt geen gesprek met een huisarts,
  therapeut of Veilig Thuis.”
- Privacy: “Je antwoorden blijven in dit tabblad. Ze worden niet opgeslagen, niet verstuurd en
  niet geteld. Ververs je de pagina, ga je weg of klik je op ‘Wis alles’, dan zijn ze weg. Op een
  gedeeld apparaat kan iemand je scherm, een download of een afdruk zien.”
  - **Vraag aan redactie:** klopt “ga je weg” in elke browser? De pagina wist bij terugkeer uit
    de terug-knop-cache, maar een browser kan formulierdata in een sessieherstel bewaren.

### De zes vragen

| #   | Vraag                                                      | Opties → route                                                                                                                                                                      | Reviewvraag                                                                                                                          |
| --- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Wat voel je de laatste tijd vaak?                          | twijfel → zelftwijfel · schuldig → schuld · voortdurend aan → spanning · mezelf niet herkennen → identiteit · alleen → eenzaamheid · geen van deze                                  | Zijn dit de juiste vijf startgevoelens? Ontbreekt schaamte?                                                                          |
| 2   | Wat gebeurt er vaak na een gesprek dat misging?            | herhalen → spanning, zelftwijfel · excuses → schuld, grenzen · anders herinnerd → zelftwijfel · lange stilte → grenzen, spanning · geen van deze                                    | “Ik hoor dat het anders ging dan ik het me herinner” verwijst naar gaslighting. Is dat te sturend?                                   |
| 3   | Hoe is het om nee te zeggen of iets voor jezelf te vragen? | bijna niet meer → grenzen, identiteit · opzien tegen daarna → grenzen, spanning · aanpassen → grenzen, identiteit · lukt meestal                                                    | —                                                                                                                                    |
| 4   | Hoe vrij voel je je in je dagelijkse keuzes?               | uitleggen waar/met wie → controle · minder mensen → eenzaamheid, controle · meekijken → controle · niemand om te vertellen → eenzaamheid · vrij genoeg                              | Moet “meekijken” een veiligheidstip over telefoons tonen (veilig-gebruik)? Nu staat die via de route controle.                       |
| 5   | Hoe gaat het met geld en papieren?                         | weinig zicht → financieel · toestemming → financieel, controle · contracten/schulden op naam → financieel · niet over geld beginnen → financieel, spanning · speelt geen rol        | —                                                                                                                                    |
| 6   | Hoe veilig voel je je op dit moment?                       | veilig genoeg · soms gespannen of bang → spanning + hulpblok Veilig Thuis · nu niet veilig → hulpblok 112/Veilig Thuis · “Ik denk soms dat ik er niet meer wil zijn” → hulpblok 113 | **Klinisch:** is deze vraag in deze vorm verantwoord? Is de formulering rond suïcidale gedachten passend, en is het hulpblok genoeg? |

Elke optie heeft een erkenningszin (`ack`) die in “Wat je herkende” verschijnt, bijvoorbeeld
“Je twijfelt soms aan je eigen herinnering of oordeel.” Controleer alle 23 zinnen in de YAML op
toon: erkennend, niet concluderend.

### De acht routes

| Route                      | Erkenningstekst (kort)                                        | Links                                                                                                                                                                        | Reflectievragen                                                                                         |
| -------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Twijfel aan jezelf         | “…dat zegt iets over wat er gebeurt, niet over je verstand.”  | ik twijfel aan mezelf · gaslighting · zelftwijfel · framing · zelfvertrouwen · kaart zelfreflectie                                                                           | Wanneer vertrouw je je eigen herinnering wel? · Wat zou je opschrijven als niemand het hoefde te lezen? |
| Schuld                     | “Een gevoel van schuld is geen bewijs dat je iets fout deed.” | ik voel me schuldig · schuldverschuiving · DARVO · projectie · erkenning · kaart pijn na inzicht                                                                             | Waarvoor voel je je verantwoordelijk, en is dat van jou? · Wat zou je zeggen tegen een vriend?          |
| Grenzen                    | “…een manier om de rust te bewaren, geen zwakte.”             | ik durf geen nee te zeggen · fawn-respons · silent treatment · grenzen leren stellen · kaart zelfreflectie                                                                   | Waar zeg je ja terwijl je nee bedoelt? · Wat gebeurt er in je lichaam?                                  |
| Controle                   | “…het helpt om te zien welke keuzes nog van jou zijn.”        | dwingende controle · isolatie · macht en afhankelijkheid · conflict of patroon · veilig gebruik                                                                              | Welke keuzes maak je nog zelf? · Wat zou je doen als je niets hoefde uit te leggen?                     |
| Jezelf kwijtraken          | “Dat kan terugkomen, stap voor stap.”                         | ik herken mezelf niet meer · emotionele uitputting · traumabinding · leren voelen · rouw                                                                                     | Wat deed je vroeger graag? · Wanneer voelde je je de laatste keer jezelf?                               |
| Spanning                   | “…een lichaam dat zich probeert te beschermen.”               | ik sta voortdurend aan · hyperwaakzaamheid · emotionele uitputting · triggers · kaart hulpverlener                                                                           | Wanneer word je rustiger? · Waar let je op als je thuiskomt?                                            |
| Financiële afhankelijkheid | “…overzicht krijgen kan in kleine, veilige stappen.”          | ik durf niet over geld te praten · financieel/economisch misbruik · controle over uitgaven · schulden op naam · signalen · kaart financieel · juridisch en financieel advies | Welke informatie zou je zelf willen hebben? · Bij wie kun je veilig een vraag stellen?                  |
| Eenzaamheid                | “Je kunt je alleen voelen, ook met mensen om je heen.”        | isolatie · sociale druk · steunnetwerk · hulp vinden                                                                                                                         | Wie zou je kunnen bellen zonder alles uit te leggen? · Welk contact mis je het meest?                   |

Reviewvragen bij de routes:

- **Traumabinding** bij “Jezelf kwijtraken”: past dit begrip daar, of is het te zwaar als eerste
  leessuggestie?
- **DARVO** en **projectie** bij “Schuld”: deze begrippen gaan over gedrag van een ander. De
  uitleg erbij zegt dat ze niets zeggen over wat iemand bedoelt. Is dat genoeg?
- Er is geen aparte gevoelspagina voor controle en eenzaamheid. Moet die er komen?

### Overige teksten

- Leeg resultaat: “Je hebt niets aangeklikt. Dat is ook goed. …” met links naar _wat het met je
  kan doen_, _conflict of patroon_ en _wat voel ik_.
- Algemene vragen: “Wat heb je vandaag nodig, ook als het klein is?” · “Met wie zou je één zin
  hiervan kunnen delen?” · “Wat wil je onthouden van wat je hier las?”
- Hulpblokken (`safety.concern`, `safety.danger`, `safety.crisis`): controleer nummers en
  formulering. 112, Veilig Thuis 0800-2000, 113 en 0800-0113.
- Overzicht: “Dit is geen uitslag en geen diagnose. …” en de toelichting bij patronen: “Ze zeggen
  niet wat er bij jou gebeurt, en niets over wat iemand anders bedoelt of voor iemand is.”
- Verdieping “Wat heb ik eigenlijk meegemaakt?”: vijf open vragen zonder detailvragen. Controleer
  of “Wat ben je kwijtgeraakt dat je terug wilt?” niet te confronterend is.
- Downloadtekst: begint met “Gemaakt in je eigen browser. Niet opgeslagen en niet verstuurd. Dit
  is geen test, geen uitslag en geen diagnose.” Eigen tekst gaat alleen mee als de bezoeker dat
  aanvinkt.

## Wat getest is

- `test/word-finder.test.mjs`: geldig model, alle links gepubliceerd, alle routes bereikbaar,
  lege uitkomst, exclusieve opties, volgorde, limieten, veiligheidsvolgorde, geen score of label
  in de uitkomst, download met en zonder eigen tekst.
- `scripts/validate-content.mjs`: dezelfde modelregels bij elke `npm run check`.
- `scripts/audit-dist.mjs`: geen netwerk- of opslagcode in clientscripts, formulier verstuurt
  nooit, stapknoppen verborgen zonder JavaScript, hulpnummers aanwezig.
- `scripts/ux-audit.mjs`: hele route met alleen het toetsenbord, focus per vraag en op het
  overzicht, geen opslag, geen netwerkverkeer, geen antwoorden in de URL, links werken, “Wis
  alles” wist, axe WCAG 2.2 AA in licht en donker, geen horizontale scroll op 320–1440 px, en
  zonder JavaScript alle vragen en routes zichtbaar.
- `scripts/print-audit.mjs`: lege vragenkaart print met alle vragen; overzicht print zonder
  vragen en knoppen; eigen tekst alleen na aanvinken.

## Bekende beperkingen

- Een download of afdruk verlaat de browser. De pagina waarschuwt hiervoor, maar kan het niet
  voorkomen.
- Sommige browsers zetten aangevinkte opties terug na een crash of sessieherstel.
- Er is alleen een Nederlandse versie.
