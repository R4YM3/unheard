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

De nieuwe kernartikelen over herkenning achteraf en seksuele druk blijven
ongepubliceerd. De build test hun zichtbare artikeluitvoer daarom nog niet.
Bronchecks zijn geen klinische of juridische goedkeuring. Raymond bevestigt de
bestaande persoonlijke passages en wijst gekwalificeerde reviewers toe aan de
medische, juridische en veiligheidsvragen in de afzonderlijke PR’s.

Nieuwe gecombineerde browser-/printuitvoer, Safari, handmatige screenreader en
zoomcontrole blijven te beoordelen. De matrix bevat ook nog niet uitgewerkte
A–J-lacunes en redactionele vervolgwerkzaamheden. Deze integratie sluit #44 of de
brede goal niet af. Niet automatisch mergen of publiceren als CI groen wordt.

## PR-werkvoorraad vereenvoudigd op 15 november

Op verzoek van Raymond worden afgeronde wijzigingen gemerged zodra dit logisch
is en worden dubbele reviewbranches niet onbeperkt open gehouden. #109 is naar
main gemerged (3b10e7e); deze integratie bevat die actuele main. #104 (ingangen) en
#110 (artikellayout) blijven afzonderlijk beoordeelbaar voor een technische
release. De inhoudelijke wijzigingen van #103, #105, #106, #108, #111, #112,
#113, #114 en #116 zijn volledig opgenomen in deze branch. Hun oude PR’s kunnen
na het pushen van deze integratie als vervangen worden gesloten, zonder branches
of werkbomen te verwijderen. Dat is geen publicatie of inhoudelijke goedkeuring.

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
