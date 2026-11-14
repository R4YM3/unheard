# Herkennen als gelijkwaardige ingang

## Aanleiding en afbakening

De volledige opdracht van 14 november vraagt expliciet om gelijkwaardige ingangen
Voelen, Herkennen en Begrijpen. Dit heropent de eerdere keuze in issue #44 om een
zelfstandige herkenningsingang uit te stellen. De bestaande woordenfinder blijft
een optionele ingang; een bezoeker hoeft geen vragen te beantwoorden.

De eerdere navigatie bevatte Wat voel ik?, Begrijp het, Herstel, Mijn verhaal en
Hulpmiddelen, naast Home en Hulp vinden. Herkenning zat vooral in homepagevoorbeelden,
startopties en links vanuit details. Dat is geen voorspelbare menubestemming voor
iemand die een gebeurtenis wil opzoeken zonder het begrip te kennen.

## Keuze in deze revisie

- Voeg **Wat herken ik?** toe naast **Wat voel ik?** en **Begrijp het**. Behoud de
  bestaande labels en URL's om tegelijk hernoemen, verhuizen en hergroeperen te vermijden.
- Gebruik een compact overzicht met zes situaties: gesprekken, eigen keuzes,
  netwerk, geld, contact na de relatie en ouderschap. Een kaart vertelt welke
  uitleg het artikel biedt. Het is geen signalenscore of vaststelling van misbruik.
- Geen detailartikelen in het hoofdmenu. De hub biedt de thematische selectie;
  Begrippen A–Z blijft voor bezoekers die een term kennen. Verdere ontbrekende
  onderwerpen krijgen pas een route nadat de inhoud is uitgewerkt en gereviewd.
- Geef ook de footer en de startopties een herkenningslink. Bestaande homepage-
  voorbeelden en de ingangen via gevoel of begrip blijven bestaan.
- Artikelen houden hun oorspronkelijke hiërarchie en breadcrumbs: een link vanuit
  Herkennen maakt een begrip geen kindpagina van Herkennen. Dat voorkomt wisselende
  breadcrumbs afhankelijk van de aankomstpagina.
- De nieuwe hub bevat navigatietekst en verwijst naar bestaande artikelen. Hij
  staat op `in_review`; geen menselijke goedkeuring wordt door de build geïmpliceerd.

## Structurele bevindingen

Zie de [routekaart](2026-11-14-routekaart-herkennen.md): 100 Nederlandse gebouwde
HTML-routes, waarvan 91 bereikbaar via hoofdmenubestemmingen en bodylinks op hubs.
De negen uitzonderingen zijn niet allemaal verweesde inhoud:

| Routegroep                                                  | Bestaande bereikbaarheid / betekenis                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Werkwijze                                                   | Submenu Mijn verhaal en footer; valt buiten de bodylinkmeting                  |
| Mannen in cijfers                                           | Submenu Begrijp het en footer                                                  |
| Zoeken                                                      | Header en footer; geen tussenstap in de hubmeting                              |
| Toegankelijkheid                                            | Footer                                                                         |
| Twee ontwerpvergelijkingen                                  | Interne onderzoeksroutes, geen hoofdinhoud                                     |
| Financieel-misbruik, herstel/therapie, groepsschematherapie | Bestaande redirects; geen reden om die als nieuwe inhoud in menu's op te nemen |

De meting bewijst dus geen ontbrekende gepubliceerde detailpagina zonder enige
overzichtsroute. Zij bewijst evenmin dat de huidige groepering goed werkt. Veel
begrippen worden via een alfabetische index bereikt; dat helpt wie de term al kent,
maar verklaart de behoefte aan een ingang in bezoekerstaal.

## Taken om met bezoekersvragen te controleren

| Bezoekersvraag                    | Verwachte route                                                   | Structurele stappen vanaf hoofdmenu |
| --------------------------------- | ----------------------------------------------------------------- | ----------------------------------- |
| Ik durf geen nee te zeggen        | Wat voel ik? → Ik durf geen nee te zeggen                         | 2                                   |
| Ik ga steeds minder naar vrienden | Wat herken ik? → contact met je omgeving / Isolatie               | 2                                   |
| Ik krijg geen overzicht van geld  | Wat herken ik? → Geld en zeggenschap → passend financieel artikel | 3                                   |
| Wat betekent gaslighting?         | Begrijp het → Gaslighting; ook submenu Begrippen A–Z              | 2–3                                 |
| Er blijft druk na onze breuk      | Wat herken ik? → Contact na een breuk                             | 2                                   |
| Ik wil iemand steunen             | Hulpmiddelen → Voor naasten via submenu                           | 2                                   |

Dit zijn testtaken, geen uitgevoerde gebruikerstest. Codex controleert de technische
routes; Raymond doorloopt de labels en geeft aan waar zijn verwachting afwijkt.

## Nog open

Technische controle op 14 november: `npm run check` geslaagd, 35 tests; Astro
0 fouten, waarschuwingen en hints. `NO_INDEX=true SITE_URL=https://unheard.support
npm run build` geslaagd met 109 HTML-pagina's en distributie-audit. Een gerichte
navigatiecontrole bevestigt de drie gelijkwaardige ingangen in menuvolgorde en
alleen Wat herken ik? als actieve sectie op de nieuwe hub. Dit vervangt de hieronder
genoemde browsercontroles niet.

De bredere contentopdracht blijft open: A–J onderwerpen, volledige bronvergelijking
per detailpagina, herkenning achteraf, uitbreiding van hubs op basis van nieuwe
inhoud en menselijke review. De nieuwe kernpagina over herkenning achteraf staat
in PR #103 ongepubliceerd en wordt hier nog niet gelinkt.

Een extra menu-item vraagt toetsenbord-, zoom-, mobiel- en visuele headercontrole.
De lokale browserhost was niet beschikbaar. GitHub CI heeft inmiddels de axe-,
print-, UX- en headercontroles uitgevoerd. De extra ingang bracht twee echte
headerproblemen aan het licht: het eerste submenu viel buiten het scherm bij
961px, en de navigatie brak af bij 1280px. Het eerste submenu is nu aan de
beginzijde uitgelijnd en de compacte desktopopmaak loopt door tot 1440px.
Run 43647100244 is volledig geslaagd, inclusief de ongewijzigde eisen voor
viewportgrenzen en navigatieregels. De verouderde telling van vijf secties is
vervangen door controle van de zes bedoelde bestemmingen.

Raymond heeft doorlopende merge- en releaseautorisatie gegeven. Deze branch is
bijgewerkt op main na #107. CI bewaart nu screenshots van de vijf gecontroleerde
desktopbreedtes en van de nieuwe hub op 390/1440px, plus de A4-uitvoer. Visuele
beoordeling van deze bestanden volgt; Safari en een echte screenreadersessie zijn
nog niet uitgevoerd. De automatische checks gelden daarvoor niet als bewijs.

### Visuele nacontrole en tabletmenu

Browserartifact van run 43648506278 visueel bekeken: de herkenningshub op 390px
is leesbaar, maar de header op 961px liet ondanks de geslaagde rijtest overlap
tussen logo en eerste navigatielink zien. De rijtest controleerde alleen verticale
posities en miste horizontale overlap. De compacte menupresentatie geldt daarom
nu tot en met 1120px. Vanaf 1121px controleert de browseraudit ook de afstand tussen
logo en eerste link. Op 961, 1024 en 1120px controleert hij dat het compacte menu
opent en Herkennen rechtstreeks bevat. De nieuwe browserrun moet deze correctie
nog bevestigen; de eerdere groene run bewijst de correctie niet.

De hub heeft nog een lange reeks van zes kaarten onder de generieke kop ‘Ook goed
om te weten’. In de volgende ontdekkingsronde moet dit de primaire situatiesectie
worden, met een passende kop en compactere keuzevorm. De huidige screenshot is
geen bewijs dat de nieuwste eis voor redactionele rust al volledig is gehaald.

### Herkenningsroutes als gewone artikelinhoud

De zes grote situatiekaarten zijn vervangen door zichtbare tekstlinks met korte
uitleg, gegroepeerd in gesprekken/keuzes, contacten/geld en na de relatie. Dit
hergebruikt de bestaande Markdown- en hubweergave: geen nieuwe component,
uitklapper of vragenlijst. De situaties blijven direct aanklikbaar en krijgen
geen eigen URL. Bekende onderwerpen zijn daarnaast expliciet bereikbaar via een
aparte sectie met directe begrippen, het onderwerpenoverzicht en A–Z.

De relatiecontext ‘na de relatie’ is een herkenbare groep en geen verplichte
selectiestap. De zes bestemmingen zijn behouden. De nieuwe presentatie moet nog
in de browser en op papier worden bekeken; dit is geen afgeronde gebruikerstest.

De algemene startkeuze is teruggebracht van zes gemengde uitklappers naar drie
contexten: nog in de relatie, na de relatie en zorgen om iemand. Gevoelens,
gebeurtenissen, bekende begrippen, geld en herstel hebben directe routes in de
kolom ‘Begin bij je vraag’. De bestaande woordenvinder-uitnodiging blijft op de
homepage zichtbaar; de functie zelf is ongewijzigd. De hulpmiddelenvariant
behoudt haar eigen taakgerichte keuzes. De browseraudit controleert de directe
routes én de drie contexten met toetsenbord zonder JavaScript.
