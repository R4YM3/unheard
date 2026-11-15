# Gezamenlijke controle van Sprint 4.1

Deze checkout combineert de afzonderlijke reviewbranches. Zij is een technische
integratieproef, geen inhoudelijke goedkeuring of publicatiebesluit. De oorspronkelijke PR’s blijven als geschiedenis van de afzonderlijke wijzigingen
beschikbaar; de inhoudelijke review wordt in deze integratie gebundeld.

## Opgenomen werk

| PR   | Onderdeel                                        | Opgenomen broncommit |
| ---- | ------------------------------------------------ | -------------------- |
| #103 | Herkenning achteraf, fragmenten, printkleuren    | a5e3334              |
| #104 | Ontdekkingsroutes en compacte overzichten        | 678b1c9              |
| #105 | Grenzen en concept seksuele druk/dwang           | 44b435b              |
| #106 | Rouw, erkenning en steun                         | a0d24b5              |
| #108 | Contact, ouderschap en druk na een breuk         | ec12901              |
| #109 | Contentmatrix en clustering                      | d2a8d7f              |
| #110 | Artikellayout, leesvoortgang, hulpblok bij print | 4a04a22              |
| #111 | Introducties Begrijp het/Herstel                 | af7170c              |
| #112 | Zelftwijfel                                      | e274ad1              |
| #113 | Aanhoudende alertheid                            | 05623ff              |
| #114 | Financiële uitleg/signalen                       | 3dc2c3a              |
| #116 | Concept digitale controle en stalking            | f589ac0              |

Origin/main was 09590d8 bij aanvang. #107 is daarin al opgenomen. De originele
lokale werkbomen zijn ongemoeid gelaten; nieuwe checkout in /private/tmp.

## Opgeloste integratieconflicten

- Printaudit: behoud van alle hub-/artikelroutes, mobiele beelden en controle van
  zowel nieuwe alertheidstekst als het hulpblok. Geen dubbele route-entry.
- Vier detailtemplates: ArticleContents uit #110 blijft; ArticleBody uit #103
  verzorgt de fragmenten. Geen herintroductie van PageRail of zusternavigatie.
- Waarom overkwam dit mij: inhoudelijke herschrijving uit #103 behouden, zonder
  de vervangen oude alinea terug te zetten alleen vanwege een gewijzigde link.
- Steunnetwerk: herschreven passage uit #106 behouden met actuele financiële URL.
- Printregels: zwart-witte herkenningsfragmenten én bijeenhouden van hulpblok.

Automatisch samengevoegde contentrelaties en interne links moeten eveneens door
content- en buildaudit worden gecontroleerd. Alleen conflictvrij samenvoegen is
geen bewijs van juiste werking.

## Resterende grenzen

De nieuwe kernartikelen over herkenning achteraf, seksuele druk en digitale controle blijven
ongepubliceerd. De gewone build bevat ze niet; de afzonderlijke geïsoleerde conceptaudit
test hun tijdelijke uitvoer zonder publicatie (zie hieronder).
Bronchecks zijn geen klinische of juridische goedkeuring. Raymond bevestigt de
bestaande persoonlijke passages en wijst gekwalificeerde reviewers toe aan de
medische, juridische en veiligheidsvragen in de afzonderlijke PR’s.

De nieuwste gecombineerde browser-/printuitvoer en de handmatige screenreadercontrole
blijven te beoordelen. Chrome-zoom is gericht gecontroleerd (zie hieronder); Safari
is niet getest. De gebruiker heeft Chrome als testbrowser aangewezen. De matrix bevat ook nog niet uitgewerkte
A–J-lacunes en redactionele vervolgwerkzaamheden. Deze integratie sluit #44 of de
brede goal niet af. Niet automatisch mergen of publiceren als CI groen wordt.

## PR-werkvoorraad vereenvoudigd op 15 november

Op verzoek van Raymond worden afgeronde wijzigingen gemerged zodra dit logisch
is en worden dubbele reviewbranches niet onbeperkt open gehouden. #109 is naar
main gemerged (3b10e7e); deze integratie bevat die actuele main. #104 (ingangen) en
#110 (artikellayout) blijven afzonderlijk beoordeelbaar voor een technische
release. De inhoudelijke wijzigingen van #103, #105, #106, #108, #111, #112,
#113, #114 en #116 zijn volledig opgenomen in deze branch. Hun oude PR’s zijn als vervangen gesloten; #116 is in de integratiebranch gemerged,
zonder branches of werkbomen te verwijderen. Dat is geen publicatie of inhoudelijke goedkeuring.

De reviewopvolging staat voortaan in #115 en issue #44:

| Eigenaar                                         | Te beoordelen vóór publicatie                                                                            | Concrete vervolgstap                                                                                                              |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Raymond                                          | Bestaande persoonlijke passage over bevestiging zoeken en therapie                                       | Eigen tekst bevestigen of corrigeren; geen nieuwe persoonlijke feiten toevoegen                                                   |
| Raymond wijst klinische reviewer aan             | Herkenning achteraf, grenzen, seksuele druk, rouw, zelftwijfel, alertheid en gevolgen in nieuwe relaties | Passages en adviezen in de genoemde broncontroledocumenten beoordelen; bevindingen per bestand vastleggen                         |
| Raymond wijst juridische/veiligheidsreviewer aan | Contact en ouderschap na de breuk, financiële druk, digitale controle en stalking                        | Veiligheid, toestemming, bewijs, noodzakelijke communicatie en lokale hulpverwijzingen beoordelen                                 |
| Codex                                            | Browser-, print- en routecontrole en verwerking van review                                               | Resterende controles uitvoeren en concrete correcties testen; ongepubliceerde artikelen pas na inhoudelijke goedkeuring activeren |

CI-run 43657620220 op 1070f61 is geslaagd, inclusief browser-, axe-, print-, UX-
en headercontrole. Op 15 november zijn de resulterende mobiele middenweergave
van het twijfelartikel en de laatste A4-pagina’s van alertheid en financieel
misbruik visueel bekeken. Het hulpblok staat nu bijeen; er resteert geen los
laatste noodhulpkaartje. Dit is een gerichte steekproef, geen controle van alle
PDF-pagina’s. De lokale Chrome-weergave van #110 is eveneens bekeken; verdere
handmatige toetsenbordbediening is onderbroken doordat de browser door de
gebruiker werd bediend. Safari-toegang is door Computer Use geweigerd met
`Computer Use was not approved to use Safari`. Geen Safari-, zoom- of volledige
schermlezerreview claimen op basis van de geautomatiseerde controles.

De nieuwe digitale conceptpagina uit #116 blijft ongepubliceerd. Haar tijdelijke
noindex-render is afzonderlijk gecontroleerd; de gewone geïntegreerde build
bevat de drie nieuwe conceptartikelen niet. Nog uit te voeren: visuele en
accessibilitycontrole van die conceptartikelen in een geïsoleerde preview.

Na samenvoeging met actuele main en #116: `npm run check` opnieuw geslaagd
(Astro 0 fouten/waarschuwingen/hints en 33 tests); noindex-productiebuild
109 HTML-pagina’s met geslaagde distributie-audit.

## Geïsoleerde conceptpreview

`scripts/audit-draft-previews.mjs` kopieert de checkout naar een tijdelijke map,
activeert daar uitsluitend de drie genoemde conceptartikelen en forceert noindex.
De echte Markdown-bestanden en normale dist blijven onaangeraakt. De tijdelijke
build levert 112 pagina’s en passeert de distributie-audit; de gewone build
behoudt 109 pagina’s. Een lokale `--build-only`-controle bevestigde dit.

Een apart PR-only CI-job voert op die tijdelijke build de bestaande print-,
axe- en UX-audits uit. De printaudit krijgt drie expliciete routes en bewaart
A4-PDF’s plus mobiele/desktopbeelden als `draft-browser-review`. Deze job heeft
alleen leesrechten op de repository, uploadt geen Pages-artifact en kan niet
deployen. De tijdelijke HTML wordt opgeruimd. De preview geeft reviewers zicht
op de concepten; zij is geen inhoudelijke goedkeuring of publicatieroute.

### Eerste conceptbeelden beoordeeld

CI 43693728200 op 187b8a2: job `draft-review` geslaagd, inclusief print, axe in
licht/donker en UX met/zonder JavaScript. Visueel bekeken: bovenkant van alle
drie mobiele conceptartikelen (390px), desktopbovenkant digitale controle
(1440px), A4-pagina 1 seksuele druk, A4-pagina 2 digitale controle en A4-pagina 2
herkenning achteraf. In die beelden zijn titel, kort antwoord, voorbeeldgedachte
en lopende tekst leesbaar; het digitale herkenningsfragment staat correct en
zwart op wit in de afdruk. Dit is een steekproef, geen handmatige inspectie van
alle pagina’s. De PDF’s tellen respectievelijk 6, 7 en 7 pagina’s. Geen nieuwe
Safari- of schermlezercontrole en geen inhoudelijke publicatiegoedkeuring.

## Vervolgdekking E, H en I

- E: isolatie en sociale druk verdiept, triangulatie scherper afgebakend en twee ongefundeerde formuleringen bij framing geschrapt (61ac4b8). CI 43694949158 geslaagd. Visueel bekeken: A4-pagina 4 isolatie (na de relatie/nieuwe relatie) en A4-pagina 3 sociale druk (groei en herkenningsfragment). In deze twee beelden geen afgesneden of overlappende tekst; geen claim van volledige handmatige browsercontrole.
- H: zorg en lichamelijke autonomie verwerkt in dwingende controle, seksuele druk (ongepubliceerd) en uitputting (7f51c07). Lokale check, gewone build 109 en geïsoleerde conceptbuild 112 geslaagd. CI 43695615994 was bij vastlegging nog actief.
- I: context en hulproutes toegevoegd aan Hulp vinden en Voor naasten, zonder nieuwe pagina's. Lokale check inclusief 33 tests en build van 109 pagina's geslaagd. Bestaande telefoonnummers niet opnieuw geverifieerd en niet gewijzigd.

Per cluster staan bronbereik, beperkingen en concrete reviewvragen in de bijbehorende bronnotitie en frontmatter. Raymond wijst de inhoudelijke/veiligheidsreviewers aan; H vraagt ook klinische review. Deze wijzigingen zijn geen publicatiegoedkeuring. Safari is niet getest; de gebruiker heeft Chrome aangewezen. Laatste native Chrome-poging gaf cgWindowNotFound; de browserhost was eveneens niet beschikbaar.

## Aanvullende verificatie — 15 november

CI 43696560066 op layoutcommit d44d18a en integratie-CI 43696593281 op bac5005 zijn geslaagd. Chrome-zoomfix dus ook geïntegreerd gecontroleerd; de CI vervangt de open schermlezercontrole niet.

H: A4-pagina 4 Dwingende controle (11 pagina's totaal) en A4-pagina 3 Seksuele druk (7 pagina's totaal) uit CI 43695615994 visueel bekeken. De zorg-/rustsectie en reproductieve-autonomiesectie staan leesbaar in zwart op wit, zonder afgesneden tekst in deze beelden. Dit zijn specifieke pagina's, geen volledige handmatige audit en geen inhoudelijke goedkeuring.

J: stilte en aandacht verdiept in c6dba72; korte sectie over dreiging met zelfdoding voorbereid in Dwingende controle. Lokale check/33 tests en 109-pagina-build geslaagd. Raymond wijst een klinische/veiligheidsreviewer aan voor acute hulp, eigen veiligheid en het vermijden van verantwoordelijkheid voor het leven van de ander. Overige zelfbeschadiging is daarmee niet automatisch afgedekt. Bronbereik staat in de notitie over stilte en voorwaardelijke aandacht.

## Gerichte visuele controle J — 15 november

CI 43697130640 op d29c9be is geslaagd. Uit het artifact browser-review zijn A4-pagina 2 silent treatment, A4-pagina 2 love bombing en A4-pagina 5 dwingende controle daadwerkelijk als PNG bekeken. De getoonde tekst is leesbaar, zonder afgesneden regels of overlap. Het stiltevoorbeeld loopt door naar de volgende pagina; die vervolgpagina is in deze ronde niet visueel beoordeeld. Mobiele volledige screenshots op 390px van stilte en love bombing zijn bekeken: tekstkolom en herkenningsfragmenten blijven binnen de viewport. De vaste verlaatknop ligt bij de beginpositie over een deel van de voorbeeldgedachte; dit blijft een UX-aandachtspunt, geen afgetekende volledige mobiele controle.

De controle maakte een redactionele doublure zichtbaar: beide pagina's hadden een oud dialoogvoorbeeld direct vóór een nieuw voorbeeld met dezelfde ontwikkeling. Het oude dialoogblok is verwijderd; de concrete groei, herkenningsfragmenten en afzonderlijke nieuwe-relatiescènes blijven. De beelden hierboven bewijzen de versie vóór die inkorting, niet de definitieve paginering erna. Nieuwe printuitvoer moet opnieuw worden bekeken.

Recente inhoudscorrecties a14ec3c, 942d68f, 894fcde en 4517a70 hebben elk lokale check/33 tests en gewone build/109-pagina-audit doorlopen. Dat is geen nieuwe handmatige visuele of inhoudelijke goedkeuring. De integratie blijft in review.

## Hoofdmenu inhoudelijk — eerste correctie

Op verzoek van Raymond blijft de inhoudelijke hoofdmenuherziening onderdeel van de goal. Eerste correctie: Begrijp het biedt emotioneel misbruik, financieel misbruik, begrippen A–Z en dwingende controle. Dwingende controle vervangt In cijfers; cijfers blijven via de footer bereikbaar. De selectie blijft vier bestemmingen en biedt zowel kernuitleg als rechtstreeks zoeken naar een bekend begrip. Geen ongepubliceerde seksuele/digitale concepten in het menu.

Bij Hulpmiddelen wordt Vragenkaarten vervangen door Alle hulpmiddelen: de bestaande bestemming bevat ook de woordenvinder. Voelen en Herkennen blijven gelijkwaardige hoofdingangen. Dit is een concrete correctie, geen afgetekende volledige menuherziening. De definitieve selectie en labels moeten nog tegen alle categorieën, mobiele presentatie en realistische zoektaken worden getoetst. Deze correctie staat in de integratiebranch; de afzonderlijke technische PR #104 moet bij verdere oplevering hiermee worden afgestemd.
