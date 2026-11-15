# Eén kernartikel over zelftwijfel

Beide volledige teksten zijn opnieuw vergeleken. De begrippenpagina herhaalt de
bezoekersvraag, het bewijszoekvoorbeeld, gevolgen en stappen van de gevoelspagina.
De eigen waarde zit in de definitie, broncontext en korte uitleg van begrippen.
Die blijft behouden in Ik twijfel aan mezelf. Bevestiging zoeken blijft apart:
dat gaat over herhaald geruststelling vragen, niet primair herinnering/oordeel.

## Migratie

- `/nl/begrippen/zelftwijfel/` verwijst statisch naar de bestaande gevoelspagina.
- Zeven oude H2-ankers blijven behouden bij de passende secties.
- De gevoelspagina had al glossary-metadata. Aliassen zijn aangevuld; A–Z heeft
  voortaan één Zelftwijfel-item en leidt rechtstreeks naar het kernartikel.
- Interne links wijzen naar het doel; geen onnodige redirectstap. In Mijn verhaal
  verandert uitsluitend de linkbestemming, geen persoonlijke tekst.
- Related-keys bij gaslighting, DARVO en projectie zijn omgezet/ontdubbeld.
- Woordenvinder behoudt zelftwijfel als gevoelsingang; het verwijderde dubbele
  begrip-item verdwijnt uit de patroonsuggesties. Geen nieuwe vragen of scores.
- Canonical verwijst naar het doel; oude URL uit sitemap/zoeklijst. Bronbestand
  blijft ongepubliceerd bewaard. Geen overige indexeringswijziging.

## Broncontrole en grenzen

Op 15 november is het abstract van Sweet (2019) bij SAGE gelezen: gaslighting
wordt behandeld in de context van machtsongelijkheid. De volledige paper is niet
opnieuw gelezen. DOI Harsey et al. (2017) gaf 403; daarom is het abstract bij het
publicatieoverzicht van coauteur Freyd (University of Oregon) gelezen. Dat meldt
een verband tussen gerapporteerd DARVO en zelfbeschuldiging bij studenten.
Geen causale uitspraak over individuele lezers en geen gelijkstelling van
zelfbeschuldiging aan onbetrouwbaar geheugen. De bronsectie noemt deze beperking.

Raymond bevestigt de bestaande founderNote Ook ik bleef bevestiging zoeken;
die is niet herschreven of als goedgekeurd aangemerkt. Een door Raymond aan te
wijzen klinische reviewer controleert de bestaande passages over slaap,
somberheid/angst, eigen waarneming en de formulering van onderzoeksverbanden.

## Validatie

Projectcheck, build, A–Z, woordenvinder, oude URL en ankers worden gericht
gecontroleerd. Een browsercontrole met en zonder JavaScript is toegevoegd.
Dit is een conceptwijziging bovenop #111; geen publicatie of afgeronde
klinische/visuele beoordeling.

Lokaal: check geslaagd (35 tests, Astro 0 fouten/waarschuwingen/hints), build en
distributie-audit van 109 pagina’s geslaagd. Zeven oude ankers precies eenmaal
behouden; redirectcanonical correct. Oude URL ontbreekt in A–Z, zoekdata en
sitemap; vervallen translationKey ontbreekt in gebouwde woordenvinderdata.
Browseraudit controleert ook één A–Z-ingang en een echte klik naar het kernartikel,
met en zonder JavaScript. Die nieuwe CI-resultaten en visuele controle zijn nog open.
