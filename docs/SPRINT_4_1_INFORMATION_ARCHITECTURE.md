# Sprint 4.1 — informatiearchitectuur en redactionele richting

Status: voorstel met drie proefpagina’s · 13 november 2026

## Besluit in één zin

Ongehoord biedt drie gelijkwaardige ingangen: **Voelen** voor wat iemand in zichzelf merkt, **Herkennen** voor een concrete situatie of terugkerend gedrag, en **Begrijpen** voor woorden en duiding. Het zijn geen stappen en geen diagnosepad. **Herstel**, hulp en hulpmiddelen blijven vanaf iedere ingang bereikbaar.

## Waarom deze indeling

De huidige site heeft sterke inhoud in `Wat voel ik?`, de gesprekssituaties op de homepage en `Begrijp het`, maar die drie taken zijn niet overal even zichtbaar als zelfstandige keuze. Iemand die via Google landt op een gevoel, een zin of een begrip moet direct een bruikbare volgende route zien, zonder eerst de homepage te hoeven begrijpen.

| Behoefte van de bezoeker                              | Gelijkwaardige ingang | Belofte                                                                     | Eerste bestemming          | Contextuele vervolgroutes                                 |
| ----------------------------------------------------- | --------------------- | --------------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------- |
| Ik merk iets, maar heb er geen woord voor.            | Voelen                | Vind woorden voor wat er in jou gebeurt.                                    | `nl/wat-voel-ik/`          | woordenhulp, passende gevoelspagina, Herkennen, Herstel   |
| Ik herken een gesprek, regel of terugkerende reactie. | Herkennen             | Lees een volledige situatie: wat er gebeurt en wat het met iemand kan doen. | nieuwe hub `nl/herkennen/` | passende gevoelspagina, patroonuitleg, hulp wanneer nodig |
| Ik wil begrijpen hoe dit patroon werkt.               | Begrijpen             | Orden gedrag en gevolgen zonder iemand te diagnosticeren.                   | `nl/begrijp-het/`          | begrippen, gevoelspagina, Herstel                         |

`Herstel` is geen vierde stap na Begrijpen. Het is een zelfstandige plek voor wat iemand nu nodig heeft — bijvoorbeeld steun, rouw, grenzen of leren voelen — en blijft daarom in de hoofdnavigatie en in iedere detailpagina zichtbaar.

## Navigatievoorstel

1. Houd de drie bestaande pijlers inhoudelijk zelfstandig en maak **Herkennen** een eigen, crawlbare hub in plaats van alleen een anker op de homepage.
2. Gebruik in hoofdmenu en mobiele navigatie de labels `Voelen`, `Herkennen`, `Begrijpen` met korte toelichting in de sectiebalk. De bekende titels blijven als H1 en in broodkruimels staan: `Wat voel ik?`, `Herken je dit?`, `Begrijp het`.
3. Houd `Herstel`, `Mijn verhaal`, `Hulpmiddelen` en `Hulp vinden` als directe, niet-verstopte routes. Zij zijn geen subcategorieën van één van de drie ingangen.
4. Bouw `Herkennen` met de bestaande fictieve situaties. Eén zin of een korte scène opent steeds de volledige context; er komt geen test, score of automatische conclusie.
5. Geef elke detailpagina drie vaste vervolgkeuzes met verschillende doelen: één naar een gevoel, één naar een patroon of begrip, en één naar herstel of hulp. De keuze volgt de inhoud van de pagina, niet een vaste kaartvolgorde.

De nieuwe route vraagt een aparte implementatie-PR nadat de richting is beoordeeld. Er worden geen bestaande URLs hernoemd of samengevoegd; bestaande directe landingen blijven bestaan en krijgen alleen betere contextlinks.

## Redactionele standaard voor detailpagina’s

Niet iedere pagina krijgt dezelfde lengte of exact dezelfde koppen. Wel moet elke laag op zichzelf leesbaar en bruikbaar zijn.

1. **Erkenning.** Benoem direct wat iemand kan merken, zonder voorbehoud dat de herkenning ontkracht.
2. **Voorbeeld.** Gebruik één of meer concrete fictieve scènes met het zichtbare gedrag, de reactie en de context. Markeer ze steeds als `Voorbeeld`.
3. **Wat gebeurt hier?** Leg het relevante gevoel, gedrag of begrip uit in gewone taal.
4. **Hoe wordt het een patroon?** Maak herhaling, context en gevolgen zichtbaar; één incident of gevoel bewijst niets.
5. **Waarom kan iemand vastlopen?** Beschrijf omstandigheden, behoeften, eerdere ervaringen en sterke eigenschappen zoals empathie, loyaliteit of zelfreflectie. Die eigenschappen veroorzaken nooit grensoverschrijdend gedrag en maken iemand er niet verantwoordelijk voor.
6. **Gevolgen.** Noem wat dit kan doen met keuzes, lichaam, relaties, geld of zelfbeeld, zonder een diagnose te stellen.
7. **Wat kan helpen.** Geef veilige, haalbare opties en verwijs bij gevaar of ontregeling naar passende hulp. Geen voorschrift, confrontatie-advies of geheime bewijsverzameling.
8. **Vervolgroutes.** Link doelgericht naar de andere twee ingangen en naar Herstel of Hulp vinden. Een bezoeker hoeft niet alles te lezen om verder te kunnen.

## Begrippen en toetsing

- Noem **emotionele mishandeling**, **financieel/economisch misbruik** en **dwingende controle** wanneer het beschreven patroon dat ondersteunt. Leg uit dat het om gedrag en impact gaat, niet om een diagnose van een persoon.
- Gebruik terughoudendheid alleen waar die inhoudelijk nodig is: bij een los voorbeeld, alternatieve verklaringen of professionele/medische grenzen. Vermijd een opeenstapeling van `misschien` en `mogelijk` in de herkenning zelf.
- Houd persoonlijke passages uitsluitend bij de oprichter, met bestaande reviewmarkering.
- Laat klinische review kijken naar langdurige somberheid, trauma-/stressreacties, lichamelijke alertheid en therapieverwijzingen. Laat veiligheidsreview kijken naar digitale controle, vertrek, geld en kinderen. Laat juridische review kijken naar scheiding, documenten en procedures.

## Inventaris en volgorde

| Onderdeel                                     | Huidige kern                     | Sprint 4.1-behandeling                                                                                                                                                                 |
| --------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9 gevoelspagina’s                             | woorden voor een eigen ervaring  | herwerken volgens de gelaagde standaard; grenzen tussen zelftwijfel/bevestiging en gemis/pijn bewaken                                                                                  |
| 26 begrippen/patroonpagina’s                  | uitleg van gedrag en impact      | prioriteren op dwingende controle, emotionele mishandeling, financiële/economische controle, isolatie, gaslighting en schuldverschuiving; overige pagina’s krijgen dezelfde linklogica |
| Begrijp-het-artikelen en financiële artikelen | context en praktische informatie | expliciete koppeling naar gevoel en veilige vervolgstap; dubbele uitleg samenvoegen in plaats van nieuwe dunne pagina’s                                                                |
| 13 herstelpagina’s en therapievormen          | herstel, steun en begeleiding    | herstel als zelfstandige ingang; duidelijk onderscheid tussen algemene informatie en de ervaring van de oprichter                                                                      |
| hubs, homepage, woordenvinder en Mijn verhaal | start- en terugroutes            | de drie ingangen zichtbaar maken, zonder bestaande directe ingangen weg te nemen                                                                                                       |

## Proef en beoordelingsvragen

De proef bestaat uit `Ik herken mezelf niet meer` (Voelen), `Dwingende controle` (Begrijpen) en `Van begrijpen naar voelen` (Herstel). Beoordeel per pagina:

- voelt de eerste alinea als erkenning, zonder een conclusie over de ander op te leggen?
- maakt het voorbeeld een patroon en de gevolgen begrijpelijk?
- staat verantwoordelijkheid voor grensoverschrijdend gedrag niet bij de lezer?
- kan iemand die alleen deze pagina leest een veilige, concrete volgende stap vinden?
- zijn de drie vervolgbehoeften zichtbaar zonder dat ze een volgorde suggereren?

Na redactionele en inhoudelijke beoordeling wordt deze richting toegepast op de overige detailpagina’s en de nieuwe Herkennen-hub. Daarna volgen link-, metadata-, no-JavaScript-, toegankelijkheids- en printcontroles.
