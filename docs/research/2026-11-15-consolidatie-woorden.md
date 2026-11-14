# Woorden om te ordenen opnemen in Begrijp het

De matrix in #109 concludeert dat beide pagina’s dezelfde introductie en routes
bieden. Deze eerste uitvoering bouwt op #104: de hub heeft al vraaggroepen,
context en rechtstreeks bereikbare onderwerpen. De voorbeeldgedachte, erkenning
en ruimte om in eigen tempo te lezen krijgen daar een plek. De oude bron blijft
ongepubliceerd beschikbaar in Git; de oude URL wordt een statische redirect.

## Behoud en migratie

- Oude URL: `/nl/begrijp-het/woorden-om-te-ordenen/` → `/nl/begrijp-het/`.
- Alle drie bestaande H2-ankers staan op de doelpagina. Met JavaScript blijft
  het oorspronkelijke fragment in de redirect behouden. Zonder JavaScript
  werkt de statische meta-refresh met een gewone fallbacklink naar de hub;
  behoud van scrollpositie wordt niet beloofd.
- De oude `deeper`-verwijzing is verwijderd. Zoekdata en artikellijsten gebruiken
  gepubliceerde content en nemen de dubbele tekst niet meer op.
- Sitemap sluit de redirect uit. Canonical wijst naar de hub. De bestaande
  redirectcomponent gebruikt noindex; indexeringsinstellingen van content en
  robots.txt veranderen niet.
- Geen nieuwe medische, juridische of persoonlijke claim. De voorbeeldgedachte
  blijft expliciet fictief van aard door haar label; geen oprichtersgetuigenis.

## Validatie

Projectcheck, productiebuild, routes/metadata/sitemap/zoekdata en browserredirect
met en zonder JavaScript worden op deze branch gecontroleerd. Visuele controle
van de uitgebreidere hub blijft nodig. Dit is uitvoering van één matrixbesluit,
geen afronding van de volledige clustering of contentreview.

Lokale resultaten: `npm run check` geslaagd (35 tests, Astro zonder fouten,
waarschuwingen of hints); noindex-productiebuild en audit van 109 HTML-pagina’s
geslaagd. Gericht gecontroleerd: canonical/refresh naar de hub, alle drie oude
H2-ankers precies eenmaal aanwezig, één H1, oude artikelroute afwezig in zoekdata
en sitemap. De HTML-telling blijft gelijk omdat de oude route als redirect
bestaat. Browserbewijs van fragmentbehoud en no-JavaScript volgt via CI.
