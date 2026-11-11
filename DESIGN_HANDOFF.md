# Design handoff voor Claude Design

11 november 2026 · Volgende ontwerpronde · Referentie: gepubliceerde versie `fd02fbf`

Werk onderstaande beslissingen uit als prototypes. Gebruik de bijlage als verzameling ontwerpvarianten. Het [Design Decision Report](docs/research/2026-11-11-design-decision-report.md) bevat de argumenten, risico’s en bronverwijzingen.

## Homepage

1. Teken drie gelijkwaardige ingangen onder de hero. Gebruik ‘Gevoelens bekijken’ → `#gevoelens`, ‘Voorbeelden van gesprekken bekijken’ → `#perspectief` en ‘Begrijpen wat er gebeurt’ → `/nl/begrijp-het/`. Laat ieder label in één korte regel voorspellen wat er achter zit. Behoud ‘Help me woorden vinden’ en ‘Lees mijn verhaal’ als hero-acties. Test of de vijf acties samen scanbaar blijven.
2. Houd de zes gevoelenskaarten, de vrijwillige vragenroute en het voorbeeldenblok. Maak het verschil duidelijk via de taak: direct een gevoel kiezen, via vragen woorden vinden of vanuit een concrete situatie lezen. Houd de toestemming om vragen over te slaan en de uitleg over opslag zichtbaar.
3. Teken twee versies met dezelfde vier situaties: de huidige bediening als referentie, en B-light met vier concrete koppen, een kort fragment en maximaal één uitklapniveau. Gebruik ‘Een gesprek begrijpen’, ‘Een grens aangeven’, ‘Over geld praten’ en ‘Je eigen mensen zien’. Laat een geopende situatie de uitspraak, het gevoel en de context tonen. Vermijd herhaling van de zin en tellingen of links naar acht voorbeelden. Test de groepsnamen als situatiekoppen, zonder geneste keuzes.
4. Behoud de introductie, landschapsillustratie, zes kaartlinks, vragenroute, voorbeelden, persoonlijke tekst, verhaal- en tijdlijnlinks, drie vervolgkaarten, hulpafsluiting en footer. Behoud globaal zoeken, skiplink, thema, conceptmelding waar van toepassing, hulp en snelle uitgang. Gebruik de werkelijke footer als checklist, inclusief Begrippen, In cijfers, Zoeken en Voor naasten. Bewaar ongebruikte brondata voor introductie, topics en cijfers buiten de zichtbare variant.

## Gevoelspagina’s en persoonlijke inhoud

- Gebruik A bij drie voorbeelden: directe knoppen met zichtbare en programmatische selectie, zonder extra vorige/volgende-bediening. Laat de eerste situatie direct lezen. Toon ‘Je hoort’ en ‘Je voelt’ samen met context. Behoud toegankelijke HTML en printfallback.
- Teken C alleen als onderzoek naar één directe keuze vanuit een gehoorde zin. De zin opent een volledig voorbeeld. Geef C pas een zelfstandige plek bij aangetoonde meerwaarde ten opzichte van de voorbeelden en de vragenroute.
- Gebruik de bestaande scheurrand boven persoonlijke blokken. ‘Mijn zoektocht’ hoort bij ‘Therapievormen’ en kan vóór de groepen als duiding dienen. De titel is geen vast onderdeel onder ieder artikel. Bewaar persoonlijke bewoordingen en maak herkomst duidelijk.
- Gebruik één rustige omlijnde vervolgactie onder kaartenbanden, zoals ‘Bekijk alle gevoelens’. Kaarten blijven klikbaar met een zichtbaar pijltje en een linknaam die het onderwerp noemt. Iedere getoonde ‘Verder lezen’-band krijgt minstens drie verschillende, passende bestemmingen. Controleer ook automatisch aangevulde links op relevantie.

## Mobiele hulp en navigatie

- Toon ‘Hulp vinden’ ook bij gesloten menu. Maak de hulpkaart in het menu compact, met bedienbare links voor bestaande acute en adviesroutes en toegang tot alle hulp.
- Houd ‘Verlaat site’ zelfstandig en direct bereikbaar. Reserveer ruimte tussen het dock en het laatste bedienbare menu-item. Leg beperkingen van snel weggaan uit bij Veilig gebruik.
- Teken open en gesloten toestanden met herkenbare namen en actuele status. Gebruik één link per bestemming. Markeer alleen de huidige pagina met `aria-current="page"`. Behoud de actieve sectie als aparte visuele aanwijzing. Laat Escape een geopend menu sluiten en focus teruggeven. Toets een afzonderlijke aangekondigde sneltoets voordat je die als snelle uitgang kiest.
- Controleer bediening bij 320 en 390 px, een kort liggend scherm en 200% zoom. Toets beide thema’s, touch, toetsenbord, schermlezer en werking zonder JavaScript. Maak belangrijke mobiele acties minimaal 44×44 CSS-pixels.

## Acceptatie voor de volgende ronde

- Test eerste klik en verwachte bestemming voor voelen, herkennen en begrijpen. Gebruik fictieve taken en verzamel geen persoonlijke ervaringen.
- Vergelijk B-light met de vier huidige voorbeelden op tijd tot een passend voorbeeld, omwegen, contextbegrip en leeslast. Kies B-light alleen bij aantoonbare meerwaarde.
- Toon bij de handoff de gesloten en geopende toestanden, zichtbare focus, actieve voorbeeldkeuze en inhoud zonder JavaScript en in print. Controleer het behoud van de homepagebestemmingen aan de hand van de inventaris in het rapport.
- Lever de prototypes, waarnemingen en open beslissingen op vóór een voorstel tot productieaanpassing.
