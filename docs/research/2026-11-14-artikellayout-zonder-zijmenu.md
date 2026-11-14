# Artikellay-out zonder concurrerende zijmenu's

Uitwerking van Raymonds aanvullingen op issue #44, 14 november 2026.

## Wat verandert

EntryLayout heeft één gecentreerde leeskolom. De permanente hoofdstukrail en
zustermenu's verdwijnen. ArticleContents toont bij minstens drie hoofdstukken
één standaard gesloten native details boven de tekst, ook op desktop. Breadcrumbs,
contextlinks en bestaande vervolgroutes blijven behouden. De voorbeeldgedachte
blijft op leesbreedte en wordt geen onbedoelde schermbrede kaart.

De horizontale voortgangsbalk is decoratief, drie pixels hoog en staat onder de
werkelijke onderrand van de sticky header. Hij gebruikt de beschikbare
vensterhoogte na aftrek van die header. Het gemeten bereik begint bij de
artikelkolom en eindigt na de inhoudelijke voorbeeld-/reflectiebanden, vóór de
bronnen. Bronnen, Verder lezen, hulpblok en footer tellen niet mee. Wijzigingen
in vensterbreedte, letterweergave en geopende onderdelen worden opnieuw gemeten.

Zonder JavaScript is de voortgangsbalk verborgen. De inhoudsopgave blijft met
toetsenbord en touch bruikbaar. Er is geen animatie, live-region, opgeslagen
leespositie of nieuwe vragenlijst. Op papier verdwijnen inhoudsopgave en balk.

## Validatie

De bestaande unitcontracten voor artikelvoortgang blijven behouden. De oude
verticale hoofdstukberekening en de uitsluitend daarvoor gebruikte tests worden
verwijderd. De UX-audit controleert nu op 390 en 1440 pixels: geen zijrail,
gesloten inhoudsopgave, nul voortgang vóór het artikel, tussenstand onder de
header en volledige voortgang terwijl bronnen/footer nog volgen. Ook wordt de
inhoudsopgave met Space geopend zonder JavaScript en worden de ankers gecontroleerd.

Lokaal geslaagd: `npm run check` (Astro 0 fouten/waarschuwingen/hints, 33 tests),
formatter/lint/contentvalidatie en productiebuild (108 HTML-pagina’s, distributie-audit).

CI bewaart begin- en middenbeelden en de bestaande A4-bestanden als
`browser-review`. De oude live layout heeft zichtbaar een zijrail op desktop;
de nieuwe browserasserties kunnen daarop niet slagen. CI-run 43649769611 is geslaagd, inclusief axe, print-, UX- en headeraudit.
De nieuwe voortgangsasserties en toetsenbordbediening zonder JavaScript zijn dus
in Chromium uitgevoerd. Visueel bekeken: artikelmidden op 1440px en artikelstart
op 390px, beide in donker thema. De leeskolom heeft geen concurrerend zijmenu;
de mobiele inhoudsopgave is compact en gesloten. De eerste A4-pagina van de
12 pagina's tellende emotie-PDF is bekeken: titel, kort antwoord en voorbeeld
passen zonder afsnijden; inhoudsopgave en voortgangsbalk zijn verborgen.
De kleurcorrectie van de voorbeeldgedachte voor zwart-witprint staat afzonderlijk
in #103 en moet bij integratie behouden blijven.
Safari, een echte screenreadersessie en bredere visuele dekking blijven open;
axe en deze steekproef vervangen die niet.

## Afbakening

Deze PR wijzigt geen inhoudelijke uitleg over misbruik, classificatie, URL, canonical of indexering. De toegankelijkheidspagina krijgt wel een correctie van de testverantwoording.
De volledige contentmatrix en clusterkeuzes staan in #109. Pijlers krijgen later
contextafhankelijke ontdekkingsroutes, voortbouwend op StartChooser en de bestaande
woordenvinder. De naam 'Verder ontdekken' en de rustige selectie van vervolgitems
worden in diezelfde navigatieronde meegenomen.

## Testverantwoording op de site

De toegankelijkheidspagina zei dat handmatige schermlezertests al worden uitgevoerd.
Dat is voor de huidige revisie niet aangetoond. De tekst benoemt nu afzonderlijk
automatische controles, visuele steekproeven en de nog open volledige handmatige
schermlezer-, zoom- en Safari-printcontrole. Geen claim van volledige conformiteit.
