# Design Decision Report — Ongehoord

11 november 2026 · Ontwerpbeoordeling voor Claude Design

**Advies.** Test drie gelijkwaardige ingangen met verschillende bestemmingen. Gebruik de huidige vier homepagevoorbeelden als referentie voor een eenvoudiger B. Houd A op gevoelspagina’s. Onderzoek bij C alleen de ingang vanuit een gehoorde zin.

## Referentie

Alle 14 pagina’s van de bijlage zijn uitgelezen en visueel bekeken. De varianten zijn hypothesen. De interactietellingen en oordelen op p. 8 gaan uit van acht homepagevoorbeelden en zijn geen bezoekersonderzoek. De publieke URL was vanuit deze omgeving geblokkeerd. Voor de vergelijking is de daadwerkelijke HTML uit de laatste geslaagde Pages-publicatie onderzocht, samen met de broncode van commit `fd02fbf`. De lokale preview op poort 4321 is een afzonderlijke werkversie met acht voorbeelden. De actuele publicatie heeft er vier en toont ‘Bekijk alle gevoelens’ al als omlijnde knop. De mobiele observaties hieronder zijn gedaan in de lokale preview. De betreffende navigatielogica is ook gecontroleerd in de publicatiebron. [Pages-publicatie](https://github.com/R4YM3/unheard/actions/runs/42922097793) · [Homepagegegevens](https://github.com/R4YM3/unheard/blob/fd02fbf/src/content/hubs/home.md) · [Homepaginasjabloon](https://github.com/R4YM3/unheard/blob/fd02fbf/src/templates/HomePage.astro)

## D1 · Drie ingangen — aanpassen en testen

**Onderbouwing.** De eerste twee kaarten op p. 9 en 12 beloven beide herkenning. De derde verwijst naar herstel en hulpmiddelen terwijl iemand die wil begrijpen vooral uitleg zoekt. ‘Ik begrijp al iets’ legt bovendien een onnodige voorwaarde op.

| Behoefte | Linktekst om te testen | Bestemming | Verwachting bij de link |
| --- | --- | --- | --- |
| Voelen | Gevoelens bekijken | `#gevoelens` op home | Ik kan bladeren door gevoelens en iets kiezen wat bij mij past. |
| Herkennen | Voorbeelden van gesprekken bekijken | `#perspectief` op home | Ik lees wat iemand zegt en wat dat vanbinnen kan doen. |
| Begrijpen | Begrijpen wat er gebeurt | `/nl/begrijp-het/` | Ik vind uitleg over patronen en emotioneel en financieel misbruik. |

**Verwachte impact.** Drie concrete uitkomsten maken instappen vanuit elke behoefte mogelijk.

**Risico.** Samen met de twee hero-acties kunnen drie extra links opnieuw veel keuze geven. ‘Woorden vinden’ als naam voor de eerste ingang kan verwarring geven met het hulpmiddel.

**Claude Design.** Geef de drie links evenveel visueel gewicht en stapel ze op mobiel. Gebruik geen stappen of nummers. Toon een korte belofte per link en behoud de bestaande hero-acties. Vergelijk de vijf acties als geheel met de huidige hero. Laat bezoekers vóór de klik voorspellen waar ze uitkomen. Controleer de ankers in de prototypeversie. [PDF p. 9, 12 en 14] · [Begrijp het](https://unheard.support/nl/begrijp-het/)

## D2 · De drie homepageonderdelen — behouden en verduidelijken

**Onderbouwing.** ‘Wat herken jij?’ geeft directe toegang tot gevoelspagina’s. ‘Help me woorden vinden’ helpt via vrijwillige vragen als iemand nog moeilijk kan kiezen of formuleren. ‘Wat je hoort. Wat je voelt.’ koppelt een concrete situatie aan een binnenperspectief. De overlap zit in termen rond herkenning en in twee ingangen naar hetzelfde hulpmiddel. De taken zelf vullen elkaar aan.

**Verwachte impact.** Bezoekers kunnen bladeren, begeleid zoeken of een situatie lezen. De uitnodiging na de kaarten helpt wie daar geen passende ingang vindt.

**Risico.** Vergelijkbare koppen kunnen de onderdelen als herhaling of opeenvolgende stappen laten voelen.

**Claude Design.** Behoud voorlopig kaarten → uitnodiging → voorbeelden. Geef elk blok één taakgerichte zin. Houd de vragenroute vrijwillig, met overslaan en de uitleg over opslag. Behoud de aanduiding dat situaties fictief zijn en houd de context bij elk voorbeeld. Test of de drie functies zonder uitleg van de onderzoeker te onderscheiden zijn. [Homepaginasjabloon](https://github.com/R4YM3/unheard/blob/fd02fbf/src/templates/HomePage.astro) · [Vragenroute](https://unheard.support/nl/hulpmiddelen/help-me-woorden-vinden/)

## D3 · B op de homepage — testen

**Onderbouwing.** B laat vóór de eerste klik vier fragmenten zien. Dat is een zinvolle hypothese voor herkenning, maar het voordeel boven de huidige vier keuzes is onbewezen. De extra groepslaag en ‘Bekijk alle acht’ zijn voor vier situaties overbodig. Op p. 4–5 herhaalt het geopende paneel de zin uit de groepskop. De oudere werkende site heeft op smal mobiel bij meer dan drie voorbeelden een selectielijst, waardoor de acht mobiele pills op p. 3 niet de huidige bediening representeren.

**Verwachte impact.** Zichtbare fragmenten kunnen herkenning versnellen. De bestaande aanpak toont meteen één compleet paar en vraagt minder leesruimte bij binnenkomst.

**Risico.** Vier fragmenten en een open paneel kunnen de scroll- en leeslast vergroten. Een korte zin zonder context kan te stellig overkomen.

**Claude Design.** Vergelijk de huidige bediening met B-light. Gebruik in beide exact dezelfde vier situaties. Toon in B-light vier situatiekoppen met een herkenbaar fragment en één uitklapniveau. Toon bij openen meteen ‘Je hoort’, ‘Je voelt’ en context, zonder een tweede keuzerij of herhaalde zin. Verwijder verwijzingen naar acht. Toets herkenning, contextbegrip, aantal acties en ervaren inspanning op 320 en 390 px. [PDF p. 4–5, 8, 10 en 12] · [PerspectiveSwitch](https://github.com/R4YM3/unheard/blob/fd02fbf/src/components/PerspectiveSwitch.astro)

## D4 · Groepsnamen van B — aanpassen

**Onderbouwing.** ‘In een gesprek’ past ook bij geld en grenzen. ‘Grenzen en jezelf’ is breed. ‘Geld en je mensen’ voegt twee verschillende situaties samen. ‘Na de breuk’ is begrijpelijk, maar het voorbeeld zit niet in de huidige vier. Bij de oude acht past het als losse situatie, zonder subkeuze.

**Verwachte impact.** Situatietitels maken de bestemming voorspelbaar.

**Risico.** Een brede titel laat verschillende verwachtingen toe. Een te specifieke titel kan verwante herkenning uitsluiten.

**Claude Design.** Gebruik de huidige labels ‘Een gesprek begrijpen’, ‘Een grens aangeven’, ‘Over geld praten’ en ‘Je eigen mensen zien’ als vertrekpunt. Test de voorspelbaarheid van vooral de eerste en laatste titel. Voeg een voorbeeld na de breuk alleen toe na een aparte inhoudskeuze. [PDF p. 4–5 en 14] · [Huidige labels](https://github.com/R4YM3/unheard/blob/fd02fbf/src/content/hubs/home.md)

## D5 · A op gevoelspagina’s — behouden

**Onderbouwing.** De drie situaties op een gevoelspagina gaan over één gevoel. Eén compleet voorbeeld kan direct zichtbaar zijn. De drie keuzes bieden al toegang tot ieder voorbeeld. Vorige/volgende uit A herhaalt die bediening.

**Verwachte impact.** Lezers vinden snel een concreet voorbeeld terwijl uitspraak, gevoel en context bij elkaar blijven.

**Risico.** Lange labels kunnen afbreken. Een live regio rond het hele voorbeeld kan onnodig veel tekst voorlezen.

**Claude Design.** Gebruik drie directe knoppen, met zichtbare en programmatische selectie via bijvoorbeeld `aria-pressed`. Houd focus op de geactiveerde knop en toets of een korte statusmelding nodig is. Zet de perspectieven naast elkaar op breed scherm en onder elkaar op mobiel. Maak alle voorbeelden toegankelijk zonder JavaScript en in print. [PDF p. 2–3 en 8] · [PerspectiveSwitch](https://github.com/R4YM3/unheard/blob/fd02fbf/src/components/PerspectiveSwitch.astro)

## D6 · C als zelfstandige route — afwijzen in de huidige vorm

**Onderbouwing.** ‘Bij wat ik voel’ overlapt met de gevoelenskaarten en de vragenroute. ‘Bij wat ik hoor’ kan wel waarde hebben voor wie een concrete uitspraak herkent en nog geen gevoel kan benoemen. Het ontwerp vraagt twee keuzes tot het eerste voorbeeld. De in de PDF genoemde 27 zinnen zijn een voorgestelde verzameling en vragen om selectie en broncontrole.

**Verwachte impact.** Een korte directe ingang via een zin kan een ontbrekende startmogelijkheid bieden.

**Risico.** De stapindicator kan een test suggereren. Een tweede vragenroute geeft extra keuze en onderhoud. Losse zinnen verliezen snel nuance.

**Claude Design.** Test alleen een korte lijst met zichtbare zinnen binnen de voorbeelden. Laat één klik leiden naar het volledige paar met context. Vergelijk met de huidige voorbeelden en ‘Help me woorden vinden’. Werk pas een aparte voorziening uit als deze ingang een aantoonbare lacune vult. [PDF p. 6–8 en 14] · [WordFinder](https://github.com/R4YM3/unheard/blob/fd02fbf/src/components/WordFinder.astro)

## D7 · Homepage-inventaris — behouden en toestanden aanvullen

**Onderbouwing.** De zeven hoofddelen staan in p. 9–12. De ontwerpen tonen onvoldoende van de globale navigatie en van de interactieve toestanden om behoud daarvan te bevestigen.

| Onderdeel | Actuele publicatie en aandachtspunt in het voorstel |
| --- | --- |
| Hero | Kop, lead, oprichtersintro, landschapsillustratie en twee acties. Aanwezig. Gebruik goedgekeurde persoonlijke tekst. De drie ingangen zijn nieuw. |
| Wat herken jij? | Zes kaarten en omlijnde link naar alle gevoelens. Aanwezig. Bewaar alle zes bestemmingen. |
| Help me woorden vinden | Eigen voorwaardelijke band met uitleg over vrijwilligheid, overslaan en opslag. Aanwezig. Bewaar uitleg en bestemming. |
| Wat je hoort. Wat je voelt. | Vier situaties met uitspraak, gevoel, context en selectie. In de mock-up verschijnen fragmenten van de oudere set. De open toestand en terugval zijn onvoldoende uitgewerkt op de home-artboards. |
| Mijn verhaal | Persoonlijke tekst, verhaalactie en aparte tijdlijnlink. Aanwezig. Bewaar beide bestemmingen. |
| Herstel en hulpmiddelen | Drie kaarten naar herstel, vragenkaarten en hulp voor naasten. Aanwezig. |
| Afsluitende hulp | Eigen band met informatie, hulpactie en tekst over veilig gebruik. Aanwezig. Bewaar de bedienbare route. |
| Globale bediening | Logo, menu, zoeklink, skiplink, themakeuze, snelle uitgang en conceptmelding. De beelden tonen een deel. Schets ook ontbrekende en actieve toestanden. |
| Footer | Hulp en links naar onder meer Begrippen, In cijfers, Zoeken en Voor naasten. De getoonde footer laat deze vier bestemmingen weg. |

**Voorwaardelijk of alleen in data.** De uitnodiging verschijnt bij aanwezige WordFinder-data. Het voorbeeldenblok vereist scenario’s. HeroArt heeft een illustratie als terugval. Menu-inhoud wisselt per sectie en schermbreedte. Conceptmelding hangt af van de publicatie-instelling. Thema, menu open/dicht, gekozen voorbeeld, zonder JavaScript en print zijn afzonderlijke toestanden. `introduction`, `topics`, `facts`, de kop en omschrijving van de tijdlijnteaser en de eyebrow van de voorbeelden worden niet als zelfstandige homepagecontent gerenderd. De tijdlijnlink is wel zichtbaar. Bronnen en reviewnotities staan in de data. De homepage gebruikt een eigen afsluitende hulpband en toont geen generieke samenvattings- of bronnenband.

**Verwachte impact.** Bestaande routes blijven vindbaar, ook wanneer de standaardweergave ze niet toont.

**Risico.** Een mock-up kan onderdelen verliezen die alleen na een actie verschijnen. Het terugplaatsen van ongebruikte cijfers en topics vraagt een eigen redactionele beslissing.

**Claude Design.** Werk licht/donker, mobiel menu open/dicht, zichtbare focus, actieve voorbeeldkeuze, uitgeschakelde JavaScript en print uit. Gebruik de gepubliceerde HTML als checklist. Laat de ongebruikte homepagevelden buiten deze variant. [PDF p. 9–14] · [Homepaginasjabloon](https://github.com/R4YM3/unheard/blob/fd02fbf/src/templates/HomePage.astro) · [Globale layout](https://github.com/R4YM3/unheard/blob/fd02fbf/src/layouts/BaseLayout.astro)

## D8 · Mobiele navigatie, hulp en veilige uitgang — aanpassen en testen

**Onderbouwing.** De PDF geeft hulp een eigen ingang naast het menu en een hulpkaart bovenin het paneel. Dat is vindbaar, maar kost paneelhoogte. Lokaal meet het paneel bij 320×568 circa 376 px voor 442 px inhoud, en bij 667×375 circa 183 px. Het veiligheidsdock kruist de rand van het paneel bij 320×568. Dat is een risico op afdekking, geen vastgestelde WCAG-overtreding. Het native menu werkt zonder JavaScript. De naam ‘Menu openen’ blijft lokaal ook na openen staan. Op ‘Grenzen leren stellen’ zijn twee links ‘Herstel’ gemarkeerd als huidige pagina. Zoeken staat op twee plekken. Escape start lokaal ook bij een geopend mobiel menu de snelle uitgang, terwijl op desktop eerst het submenu wordt gesloten. Op p. 13 kruist het dock de veiligheidstip.

**Verwachte impact.** Een herkenbare hulproute, één juiste actuele markering en voorspelbare toetsenbordbediening verminderen omwegen.

**Risico.** De vaste uitgang kan focus of links afdekken. Onverwacht vertrek kan leespositie en invoer kosten. Een snelle uitgang beperkt direct meekijken. Browsersporen kunnen blijven bestaan.

**Claude Design.** Gebruik ‘Hulp vinden’ als zelfstandige link naast de menuknop. Probeer in het paneel een compacte hulproute met de bestaande acute en advieslinks als herkenbaar benoemde telefoonlinks, plus toegang tot alle hulp. Behoud ‘Verlaat site’ als afzonderlijke direct bereikbare actie. Maak menu open/dicht herkenbaar en gebruik gewone navigatielinks met disclosure-bediening. Markeer alleen een werkelijke huidige pagina met `aria-current="page"`. Laat Escape in een open menu sluiten en focus teruggeven. Toets een afzonderlijke, aangekondigde sneltoets voor de uitgang voordat je die kiest. Leg de grenzen van snel weggaan uit bij Veilig gebruik.

Test 320×568, 390×844, liggend 667×375 en 200% zoom. Controleer scrollruimte boven het dock, Tab en Shift+Tab, zichtbare focus, VoiceOver/TalkBack, aanraking, contrast in beide thema’s en bediening zonder JavaScript. Ontwerp belangrijke mobiele acties op 44×44 CSS-pixels. WCAG 2.2 AA vereist bij 2.5.8 24×24 CSS-pixels of een geldige uitzondering. [PDF p. 12–14] · [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [WAI-disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) · [Safety Net Project](https://www.techsafety.org/resources-agencyuse/victim-service-agencies)

## D9 · Mijn zoektocht, verder lezen en bandlinks — behouden en gericht toepassen

**Onderbouwing.** ‘Mijn zoektocht’ is een apart blok waar persoonlijke inhoud beschikbaar is. Op ‘Therapievormen’ staat het in de publicatie verderop en lokaal vóór de therapiegroepen. ‘Grenzen leren stellen’ heeft dit blok niet. De publicatie heeft al een scheurrand voor oprichtersblokken, een aanvulling naar drie vervolgopties en een omlijnde link ‘Bekijk alle gevoelens’.

**Verwachte impact.** De rand markeert de overgang naar persoonlijke ervaring. Een herkenbare vervolgactie helpt na een kaartenband.

**Risico.** Automatisch aangevulde links kunnen inhoudelijk te ver afstaan van het onderwerp. Veel even opvallende acties maken een band druk.

**Claude Design.** Gebruik de rustige scheurrand boven bestaande persoonlijke blokken. Plaats ‘Mijn zoektocht’ waar het de therapiegroepen helpt duiden. Controleer bij iedere ‘Verder lezen’-band minstens drie verschillende, relevante bestemmingen. Gebruik een rustige omlijnde link voor een zelfstandige vervolgactie onder een overzicht. Behoud een zichtbare kaartpijl met een schermlezernaam die het onderwerp benoemt. [Publicatiewijziging #39](https://github.com/R4YM3/unheard/pull/39)

## Beslisproef

Laat bezoekers vanuit voelen, herkennen en begrijpen beginnen. Vraag vóór de klik wat ze verwachten. Laat hen daarna een gevoel vinden zonder de naam te kennen, een passende gesprekssituatie lezen en uitleg over een patroon vinden. Wissel de volgorde van de huidige vier voorbeelden en B-light af. Noteer eerste keuze, omwegen, tijd tot een betekenisvol voorbeeld, begrepen context en ervaren inspanning. Gebruik fictieve taken zonder persoonlijke ervaringen op te vragen of gevoelige antwoorden te bewaren.

Kies B-light alleen als passende voorbeelden sneller vindbaar worden en de context begrijpelijk blijft op smal mobiel en met toetsenbord. Geef C alleen een eigen plaats als de zin-ingang iets vindt wat de twee bestaande routes missen. Laat hulp en uitgang bij open én gesloten menu afzonderlijk slagen. De instructies voor de volgende ontwerpronde staan in `DESIGN_HANDOFF.md`.
