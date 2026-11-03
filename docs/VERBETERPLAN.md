# Verbeterplan Ongehoord (unheard.support)

Review van 3 november 2026. Canvas met de ontwerpen: https://claude.ai/artifact/AtadU1WZPw4zwvPFp53nZX

## Besluiten

- **Kleur:** lichte modus = A "licht en zacht" (papier, salie, terracotta). Donkere modus = B "bosgroen" (bosgroen, crème, oker). Geen bijna-zwarte vlakken meer.
- **Typografie:** Fraunces 600 voor koppen, Source Sans 3 voor tekst, lokaal gehost via `@fontsource` (geen externe verzoeken).
- **Subnavigatie:** variant A, de stille zijbalk (alleen de hoofdstukken van de pagina, daaronder de groep). Zie bord 8.
- **Wat je hoort. Wat je voelt.:** variant B op de homepage, met zin en gedachte tegelijk in beeld en zonder tabs. Zie bord 8.
- **Foto's:** vijf AI-gegenereerde beelden in één stijl (prompts op bord 7), met een vermelding dat ze met AI gemaakt zijn. Geen gegenereerd portret van de oprichter.

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

## Fase 2 — Subnavigatie (klaar)

- Navigatie staat als data in `src/lib/navigation.ts`: hoofdmenu, sectiebalk (maximaal 4 tabs per sectie) en de groepen voor gevoelens. Getest in `test/navigation.test.mjs`.
- De groepen staan in `navigation.ts` in plaats van in een frontmatter-veld, zodat er één bron is en geen 88 bestanden aangepast hoeven te worden.
- Geen aparte sectiebalk: het hoofdmenu zegt in welke sectie je bent. De onderdelen per sectie staan in het mobiele menu. Hulpmiddelen-pagina's lichten niet meer op onder Herstel.
- Gevoelspagina's hebben de stille zijbalk (variant A): alleen de hoofdstukken van de tekst, daaronder de eigen groep. Onderaan staan vorige/volgende-links binnen de groep. Op mobiel blijven alleen de hoofdstukken over, in twee kolommen.
- Help me woorden vinden valt onder Wat voel ik?. Over Ongehoord en Werkwijze vallen onder Mijn verhaal. Voor naasten en Veilig gebruik vallen onder Hulpmiddelen.
- De toegankelijkheidsaudit controleert 6 pagina's tegelijk (±25 s in plaats van ±4 min). De CI bouwt niet meer drie keer.
- Eén pad-regel boven de titel vervangt kruimelpad én eyebrow. Die regel toont alleen de pagina's tussen de sectie en de titel (Home is het logo, de pagina zelf is de titel). Het volledige pad blijft voor schermlezers en in de BreadcrumbList-data. Regel en test: `src/lib/trail.ts`.
- Meertalig: navigatie per taal in `navigationFor(locale)` en UI-teksten in `src/i18n/ui.ts`. EN en AR tonen alleen Home tot hun vertaling is goedgekeurd.

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
