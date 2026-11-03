# Verbeterplan Ongehoord (unheard.support)

Review van 3 november 2026. Canvas met de ontwerpen: https://claude.ai/artifact/AtadU1WZPw4zwvPFp53nZX

## Besluiten

- **Het hoofdmenu blijft:** Home · Wat voel ik? · Begrijp het · Herstel · Mijn verhaal · Hulpmiddelen, plus de knop "Hulp vinden".
- **Erbij komt** een vaste knop "Verlaat site", die ook met de Esc-toets werkt. Het "NL"-vak verdwijnt tot er een vertaling is.
- **Het palet blijft** (salie, papier, terracotta). Koppen komen in een serif (Fraunces), tekst in een rustige sans (Source Sans 3).

## Fase 1 — Snelle winst (laag risico)

1. Knop "Verlaat site" plus de Esc-toets: `location.replace()` naar een neutrale site.
2. `LocaleSelector` verbergen. Het kader om Home weghalen. De themaknop met label naar de footer.
3. Homepage van 11 naar 6 secties: hero en welkomstblok samenvoegen, met de kop "Je hoeft het nog geen misbruik te noemen."
4. `StartChooser` ("Waar kan ik beginnen?") van de homepage naar Hulpmiddelen.
5. Een eigen plus/min-icoon voor de uitklappers. De lege gradientbeelden weg (tot er een eigen foto is).
6. Het cijferblok laten beginnen met 4,9% van de mannen, of het van de homepage halen.

## Fase 2 — Subnavigatie (zie bord 6)

- `sectionGroups` uit `BaseLayout.astro` halen en in `src/lib/navigation.ts` zetten, als één bron.
- Per sectie maximaal 4 tabs, op elke pagina binnen de sectie hetzelfde:
  - Wat voel ik?: Gevoelens · Help me woorden vinden · Wat je hoort, wat je voelt
  - Begrijp het: Emotioneel misbruik · Financieel misbruik · Begrippen A–Z · In cijfers
  - Herstel: Herstel · Therapievormen
  - Mijn verhaal: Het verhaal · Tijdlijn · Waarom Ongehoord
  - Hulpmiddelen: Vragenkaarten · Voor naasten · Veilig gebruik
- Een nieuw frontmatter-veld `group`. `PageRail` toont dan "Op deze pagina" en de pagina's in dezelfde groep. Onderaan komen vorige/volgende-links binnen de groep.
- Het kruimelpad vervalt op pagina's met een sectiebalk.
- Bug: Hulpmiddelen-pagina's tonen nu "Binnen Herstel".

## Fase 3 — Inhoud (zie bord 5)

- **Verhuizen:**
  - Help me woorden vinden → Wat voel ik?
  - Tijdlijn → Mijn verhaal
  - Mannen in cijfers → Begrijp het
  - Over Ongehoord → Mijn verhaal
  - Voor naasten en Veilig gebruik → Hulpmiddelen
- **Dubbele pagina's samenvoegen** (doorverwijzen met `RedirectPage`):
  1. `begrijp-het/conflict-of-patroon` ↔ `begrippen/conflict-of-controle` (dezelfde titel)
  2. `begrijp-het/emotioneel-misbruik` ↔ `begrippen/emotioneel-misbruik`
  3. `begrijp-het/financieel-misbruik` ↔ `begrippen/financieel-economisch-misbruik`
  4. `wat-voel-ik/ik-twijfel-aan-mezelf` ↔ `begrippen/zelftwijfel`: het begrip inkorten tot ±200 woorden
  5. De kaart `hulpmiddelen/ik-begrijp-het-maar-het-blijft-pijn-doen` een eigen titel geven
- **Groepen:**
  - Gevoelens: Over jezelf · Met de ander · In je lijf en daarna
  - Begrippen: Wat de ander doet · Wat het met jou doet · Geld · Persoonlijkheid (als laatste)
  - Herstel: Erkennen en voelen · Grenzen en contact · Je leven opbouwen
  - Therapie: Praten · Trauma · Lijf en creatief
- **Tekst:**
  - Eén voorbehoud per pagina, in "Wanneer is het iets anders?". Nu staan er ±170 voorbehoudzinnen op de site.
  - De crisisalinea vervangen door het bestaande `HelpBlock`.
  - In "Wat kan dit verklaren?" linken naar het begrip in plaats van het opnieuw uit te leggen.
  - Vast format voor begrippen, maximaal ±600 woorden. Narcisme en sociopathie inkorten.
  - Mijn verhaal (±2.000 woorden) opdelen in hoofdstukken met ankernavigatie.

## Fase 4 — Visueel

- Typografie (Fraunces en Source Sans 3), één kaartcomponent (licht of salie) en geen nummering in eyebrows of kaarten.
- Lichte hero's in plaats van donkere. Eigen foto's.
- `global.css` (1.600 regels) opsplitsen in stijlen per component.

## Fase 5 — Livegang

- Begin met een kern van ±25 gereviewde pagina's. De rest blijft `draft`. Pas daarna `NO_INDEX=false`.
