# Information Architecture v1.0

**Project:** Voor alles wat je voelt, maar nog niet kunt verwoorden  
**Status:** Design- en engineeringhandoff, concept  
**Taal:** Nederlands (nl-NL)  
**Doel:** Herkenning, begrip, herstel en het verminderen van stigma voor mannen die emotionele en/of financiële mishandeling ervaren of hebben ervaren.

## Productprincipes

1. De bezoeker is de hoofdpersoon; de oprichter is de ervaringsdeskundige verteller, niet de diagnostische autoriteit.
2. Begin bij de gevoelde ervaring, niet bij klinische terminologie.
3. Bevestig dat gevoelens onderzocht mogen worden, maar diagnosticeer geen mishandeling of motieven van een partner.
4. Maak de veilige vervolgstap bereikbaar op iedere pagina.
5. Toon onderscheid tussen persoonlijke ervaring, algemene informatie en professioneel getoetste informatie.
6. Iedere informatiepagina moet zonder JavaScript leesbaar, doorzoekbaar, semantisch en printbaar zijn.
7. Veiligheid/privacy gaan boven engagement en conversie.

## Primaire navigatie

- Wat voel ik? — `/wat-voel-ik/`
- Begrijp het — `/begrijp-het/`
- Herstel — `/herstel/`
- Mijn verhaal — `/mijn-verhaal/`
- Hulpmiddelen — `/hulpmiddelen/`
- Hulp vinden — `/hulp-vinden/` (vaste, duidelijk zichtbare ondersteunende actie)

### Footer / utility

- Over dit platform — `/over/`
- Redactionele uitgangspunten en bronnen — `/werkwijze/`
- Privacy en veilig gebruik — `/privacy-en-veiligheid/`
- Toegankelijkheid — `/toegankelijkheid/`
- Contact — `/contact/`
- Sitemap — `/sitemap/`

## Sitemap — doelstructuur

- `/` Home
- `/wat-voel-ik/` gevoelensindex
  - `/wat-voel-ik/ik-twijfel-aan-mezelf/`
  - `/wat-voel-ik/ik-voel-me-schuldig/`
  - `/wat-voel-ik/ik-ben-mezelf-kwijt/`
  - `/wat-voel-ik/ik-durf-geen-grenzen-te-stellen/`
  - `/wat-voel-ik/ik-mis-iemand-die-me-pijn-deed/`
  - `/wat-voel-ik/het-blijft-pijn-doen/`
  - `/wat-voel-ik/ik-zoek-steeds-bevestiging/`
  - `/wat-voel-ik/ik-voel-me-voortdurend-gespannen/`
- `/begrijp-het/` kennishub
  - `/begrijp-het/emotioneel-misbruik/`
  - `/begrijp-het/financieel-misbruik/`
  - `/begrijp-het/gaslighting-en-zelftwijfel/`
  - `/begrijp-het/controle-en-afhankelijkheid/`
  - `/begrijp-het/de-impact/`
- `/herstel/` herstelhub
  - `/herstel/therapie-en-begeleiding/`
  - `/herstel/grenzen-leren-stellen/`
  - `/herstel/omgaan-met-triggers/`
  - `/herstel/jezelf-weer-vertrouwen/`
  - `/herstel/herstel-en-vaderschap/`
- `/mijn-verhaal/` introductie auteur
  - `/mijn-verhaal/tijdlijn/`
  - `/mijn-verhaal/vaderschap/`
  - `/mijn-verhaal/wat-therapie-me-leerde/`
  - `/mijn-verhaal/waar-ik-nog-mee-worstel/`
- `/hulpmiddelen/` instrumentenhub
  - `/hulpmiddelen/herkenningscheck/`
  - `/hulpmiddelen/vragenkaart-voor-jezelf/`
  - `/hulpmiddelen/gesprekskaart-partner/`
  - `/hulpmiddelen/gesprekskaart-therapie/`
  - `/hulpmiddelen/oefeningen/`
- `/hulp-vinden/` veilig en praktisch hulp vinden
  - `/hulp-vinden/professionele-hulp/`
  - `/hulp-vinden/veiligheid-en-privacy/`
  - `/hulp-vinden/veelgestelde-vragen/`

**Routing:** unieke stabiele slugs, canonical naar publieke hoofd-URL, natuurlijke taal in titels; geen kunstmatig gegenereerde tientallen near-duplicate SEO-pagina's. Introduceer nieuwe URLs alleen als inhoud substantieel verschilt.

## Pagina-templates

### T1 Home
- Semantisch: `<main>` met één `<h1>`, herkenningsingangen als echte links, `<nav aria-label="...">` voor subnavigatie.
- Content: hero met herkenbare vraag, gevoelenskaartjes, compacte uitleg, één echte persoonlijke passage, waar kun je beginnen, herstel en hulp.
- Visueel: grote filmische fotografie; donkere introductie met warme, lichte vervolgdelen.
- SEO: heldere positionering, geen overclaims.

### T2 Gevoel-detail
- Één H1 in natuurlijke spreektaal.
- Vijf perspectieven: Hoe voelt het? / Wat gebeurt er? / Waarom kan dit gebeuren? / Welke impact? / Wat helpt?
- Interactieve tweezijdige buitenkant/binnenkant, maar volledige informatie blijft toegankelijk zonder JS.
- Herkenningsvragen, optioneel; geen beoordeling of diagnose.
- Persoonlijke passage met duidelijk label, ondersteunende links, professionele hulp, printactie.
- Canoniek voorbeeld: `/wat-voel-ik/het-blijft-pijn-doen/`.

### T3 Kennispagina
- Heldere, voorzichtige definitie, context, gedragspatronen, nuance/alternatieve verklaringen, impact, wat te doen, bronlijst en datum van controle.
- Geen speculatie over motieven/diagnoses van derden.
- Deels FAQ alleen waar betekenisvol; structured data niet inzetten in de verwachting van rich results.

### T4 Herstelartikel
- Menselijke herkenning; wat helpt mogelijk, wanneer professionele hulp wenselijk is, kleine vrijwillige oefeningen, gerelateerde gevoelens en verhaalfragmenten.
- Onderscheid maken tussen praktische suggesties en behandelingsadvies.

### T5 Mijn verhaal / tijdlijn
- Auteurspagina met motivatie en context, optionele foto.
- Tijdlijn van de relatie en het herstel; geen ongeverifieerde exacte periodes.
- Ieder tijdlijn-item bevat vier lagen: `gebeurtenis`, `gevoel_toen`, `verandering_van_zelfbeeld`, `inzicht_nu`.
- Optioneel: foto, locatie in brede termen, gerelateerde gevoelspagina, privacy-review-status.
- Kinderen en derden mogen niet herkenbaar of identificeerbaar in kwetsbare verhalen terechtkomen.

### T6 Hulpmiddel / printkaart
- Uitleg voor wie geschikt, wanneer liever niet gebruiken, vragen/oefening, privacywaarschuwing, print- en schermvariant.
- Kaart voor jezelf is standaard; kaart voor partner uitsluitend waar veilig en gelijkwaardig gesprek mogelijk is; nooit confronteren aanmoedigen in risicovolle situaties.
- Antwoorden van bezoekers lokaal in huidig scherm en standaard niet bewaren; geen analytics op keuzes.
- Reflectievragen mogen niet als klinisch meetinstrument worden gepresenteerd.

### T7 Hulp vinden
- Primair informerend; direct helder: bij acuut gevaar 112, voor advies en zorgen Veilig Thuis 0800-2000 (Nederland), huisarts en andere geverifieerde hulpkanalen.
- Mobiele weergave overzichtelijk; informatie over gecontroleerde apparaten, privé browsen en veilige wijze van contact opnemen.
- Hulpgegevens periodiek verifiëren.

## Contentmodel (CMS-/MDX-onafhankelijk)

### Common fields: ContentBase
- `id` (immutable), `type`, `slug`, `locale`, `title`, `shortTitle`, `summary`, `intro`, `status` (draft/review/published), `publishedAt`, `updatedAt`, `reviewedAt`, `authorId`, `reviewerId` (optional), `heroImageId`, `seoTitle`, `seoDescription`, `canonicalUrl`, `noindex` (optional), `topicIds`, `relatedContentIds`, `sourceIds`, `safetyNote`, `readingTime` (computed), `printVariant`.
- Headline and body are author-maintained editorial data; metadata must accurately represent content.

### EmotionPage extends ContentBase
- `feelingLabels[]`, `recognitionOpening`, `perspectives` keyed as `feel`, `pattern`, `why`, `impact`, `protect` (each includes heading, short answer, body, related links, cited sources as appropriate)
- `outerInnerScenario` `{context, outer, inner, disclaimer}`
- `reflectionPrompts[]`, `storyExcerptIds[]`, `supportLinks[]`, `printAllPerspectives: true`.

### PatternPage extends ContentBase
- `plainLanguageDefinition`, `observableExamples[]`, `possibleExplanations[]`, `redFlags[]`, `notNecessarilyAbuse[]`, `impact`, `support`, `sources[]`.

### RecoveryPage extends ContentBase
- `whatItFeelsLike`, `explanations[]`, `exercises[]` (safety qualifier, opt-out), `personalExperienceIds[]`, `whenToSeekHelp`.

### TimelineEntry
- `id`, `sortOrder`, `periodLabel` (can be fuzzy), `event`, `feelingThen`, `selfChange`, `understandingNow`, `imageId?`, `relatedEmotionIds[]`, `relatedHelpIds[]`, `privacyReviewed`.

### PrintableResource
- `id`, `slug`, `title`, `purpose`, `audience`, `safetyBeforeUse`, `questions[]`, `reflectionSpace`, `privateByDefault`, `printMode` (`article`/`card`/`worksheet`), `includeUserAnswersDefault:false`, `sourceIds[]`, `version`, `reviewedAt`.

### StoryExcerpt
- `id`, `speakerType` (`founder`/`guest`), `body`, `consentStatus`, `privacyReview`, `linkedTimelineEntryId?`, `linkedEmotionIds[]`, `pseudonymized`.

### Source
- `id`, `name`, `publisher`, `url`, `publishedAt?`, `accessedAt`, `whatItSupports`, `sourceType`.

### ImageAsset
- `id`, `src`, `alt`, `decorative`, `caption`, `credit`, `license`, `focalPoint`, `variants`, `privacyReviewed`.

## Relaties tussen content

- EmotionPage many-to-many PatternPage, RecoveryPage, StoryExcerpt, PrintableResource.
- TimelineEntry many-to-many EmotionPage and RecoveryPage.
- Every content page may link to relevant support page(s).
- Topic pages assemble items through stable typed relations, not uncontrolled tag soup.
- Build context-specific related items rather than generic popular-content recommendation feeds.

## UX flows

1. **Ik twijfel nog:** Zoekopdracht / home → gevoel → buitenkant/binnenkant → mogelijke patronen → privé reflectie → veilig advies.
2. **Ik zit in de relatie:** gevoel / patronen → eigen grenzen en observaties → privé kaart → optioneel veilige hulp → uitsluitend indien veilig een partnergesprekskaart.
3. **Ik ben eruit, maar voel pijn:** SEO-entry op blijvende pijn → herkenning → psychologische uitleg (zonder diagnose) → impact → kleine oefening → herstel / persoonlijke tijdlijn.
4. **Ik wil iets meenemen:** artikel → printweergave / gesprekskaart → bronnencolofon → hulpinformatie. Bij delen/printen gevoelige risico's expliciteren.

## Componentinventaris

- `SiteHeader`, `PrimaryNav`, `HelpLink`, `SafeExit` (met uitleg beperkingen), `Breadcrumbs`, `EditorialHero`, `EmotionIndex`, `FeelingCard`, `PerspectiveSwitcher`, `OuterInnerView`, `RecognizeChecklist`, `ReflectionPrompt`, `ExpandableExplanation`, `ImpactGrid`, `PersonalStoryExcerpt`, `Timeline`, `TimelineEntryDetail`, `ResourceCard`, `PrintControls`, `PrintColophon`, `RelatedContent`, `Sources`, `SupportFooter`.
- Elke interactieve module met toegankelijke labels, focusindicatoren, en afhandeling bij reduced motion; geen carousel als enige toegang tot inhoud.

## Semantische HTML & toegankelijkheid

- Eén hoofd-`<main>` en één duidelijke H1 per pagina, logisch aflopende kopniveaus.
- `article` voor zelfstandig publiceerbare hoofdinhoud; `section` met passende kop; `aside` alleen voor aanvullend materiaal; `figure` + `figcaption` voor functionele beelden; `blockquote` voor echte citaten met attributie.
- Navigatie is `<nav>`, link is `<a>`; acties zijn `<button>`; inputs via `<fieldset>`/`<legend>` en `<label>`.
- Gebruik `<details>`/`<summary>` indien dat de beste robuuste uitwerking is; tabs met correct WAI-ARIA patroon, keyboard navigation en alle inhoud SSR in DOM; print toont elk paneel.
- WCAG 2.2 AA als minimaal ontwerp-/testdoel; tekstcontrast, non-color signaling, reduced motion, responsive zoom tot 400%, leesbare lijnen, geen onnodige beweging.
- Bescherm gevoelige gegevens; geen session replay/heatmaps op reflectiemodules.

## SEO & GEO

- SSR/SSG voor alle contentpagina's; volledige inhoud zonder client-side fetch zichtbaar; crawlbare links.
- Goede page title, description, canonical, indexeerbare URL, XML sitemap, robots-regels, OpenGraph en language tags.
- Heldere eerste alinea die kernvraag rechtstreeks beantwoordt; natuurlijke termen/veelgestelde vragen; definities, voorbeelden en uitzonderingen.
- Content-authorship, methode, onderscheid ervaringsverhaal vs gesourcete uitleg, bronverwijzingen en herzieningsdatum.
- JSON-LD waar passend: `Article`/`BlogPosting`, `BreadcrumbList`, `Person`/`Organization`, `WebSite`. Geen misleidende claims of verwachting van gegarandeerde AI-citaties/rich results.
- Interne links via onderwerp-, symptoom-, herstel- en toolrelaties. Geen zoekmachine-gedreven duplicatie.

## Print & printable resources

- Dedicated `print.css`, `@media print`, `@page { size: A4; margin: ... }` met goede printtypografie.
- Toon alle essentiële content van tabs/accordions/interactive views ongeacht UI state; optionele JS enhancement kan aparte gesprekskaart samenstellen, maar basisdocument moet zonder JS printbaar zijn.
- Verberg navigatie, scroll cues, animatiecontainers, versieringen, onnodige hero's, buttons, consent overlays en formuliercontrols die zonder context geen betekenis hebben.
- Zwarte tekst op wit, bronnen, paginatitel, herkomst-URL, reviewdatum, subtiele footer, paginabreuken rond titels en kaarten voorkomen.
- Standaard geen persoonlijke antwoorden printen; expliciete consentactie vereist voor printen van ingevulde reflectie.
- Printerprivacy waarschuwing vóór persoonlijke printactie (gedeelde printer en achterblijvend papier).
- Render/snapshot test met Chromium print CSS en (waar relevant) PDF-output op A4, mobiel/desktop.

## Visuele richting

- Editorial magazine + filmische documentairefotografie; geen stereotypen van mannelijke stoerheid, geen sensationalistische huiselijk-geweldbeelden.
- Portretten van echte mannen, symbolische landschappen, dagelijkse momenten. Echte oprichtersfoto selectief in de tijdlijn; geen identificerende beelden van ex of kinderen.
- Palette: charcoal `#242A29`, paper `#F1EEE7`, sage `#A6ADA0`, muted terracotta `#BB7965`, forest `#465A50`.
- Lettertypesuggestie: Newsreader of Fraunces voor headlines, Inter voor body/UI (licenties/hosting checken).
- Donkere introspectieve introducties met oplopende lichte ruimte bij uitleg/herstel, zonder herstel als verplicht happy ending.
- Filmgrain, natuurlijke huidtonen, zacht contrast, weinig animatie; rust en leesbaarheid prioriteit.

## Privacy & redactie / safeguards

- Geen diagnostische uitkomsten, partnerlabels of persoonlijke motiefclaims.
- Partnergesprekskaart uitsluitend indien dit veilig is; privékaart/vertrouwenspersoon als default bij onzekerheid of dreiging.
- Menselijke redactie en waar nuttig inhoudelijke controle door relevante deskundige.
- Juridische review van persoonlijke passages die indirect identificeerbare derden kunnen belasten; bescherm kinderen, ex en lopende kwesties.
- Geen gebruikeraccounts vereist voor MVP; reflecties niet opslaan of tracken, analytics alleen geaggregeerd en privacyvriendelijk.
- Feedback mechanismen mogen niet onbedoeld gevoelige ervaringen verzamelen zonder beleid/consent.

## MVP-scope

**Must-have:** Home, Wat voel ik hub, 6–8 kwalitatieve gevoelspagina's waaronder 'Het blijft pijn doen', Begrijp het hub met initiële kennispagina's, Mijn verhaal met tijdlijn, Herstel hub met enkele artikelen, Hulpmiddelen hub met privévragenkaart en therapiespreekkaart, hulp-/privacy-pagina's, print CSS, semantische templates, SEO metadata, bronnenbeleid.

**Candidate after MVP:** Partnergesprekskaart na veiligheidsreview, meer patronen en financieel misbruik-dossiers, meer uitgebreide herkenningscheck, veilig gemodereerde gastverhalen, begeleidingssamenwerking met gekwalificeerde professionals, persoonlijke printkaarten (zonder serveropslag).

## Acceptatiecriteria v1

- Een bezoeker kan vanaf de homepage in maximaal twee interacties bij een relevante gevoelspagina komen.
- Gevoelspagina bevat herkenning, vijf perspectieven, veiligheid en vervolghulp.
- Alle inhoud is volledig leesbaar zonder JavaScript, met correcte semantiek.
- Alle essentiële inhoud verschijnt in printweergave, ongeacht geopende tabs of accordions.
- Printbare A4 kaart heeft leesbare marges, beknopte bron/URL en geen persoonlijke antwoorden tenzij expliciet gekozen.
- Gevoelige reflectieantwoorden zijn niet aanwezig in URL, serverlogs of analytics.
- Een bezoeker kan snel hulp vinden vanaf elke pagina.
- Elke kennispagina onderscheidt persoonlijke ervaring, algemene uitleg en betrouwbare broninformatie.
- Elke foto heeft geschikte alt-tekst of is decoratief gemarkeerd en bevat licentie-/privacyinformatie.

## Open ontwerpbeslissingen

- Definitieve platformnaam/domein.
- Publicatie van persoonlijke tijdlijn: welke momenten, beelden en tijdvakken zijn geschikt en juridisch/privacyveilig.
- Tekst en beeld van echte auteur: authentieke passages na eigen goedkeuring.
- CMS/SSG-keuze (bijv. Astro of Next.js) na prototype/hostingkeuze; geen vooraf opgelegd framework.
- Exacte redactionele reviewworkflow, verantwoordelijke voor periodieke bron-/hulpverificatie.
- Partnergesprekskaart: veiligheidsreview voordat deze als publieke tool gelanceerd wordt.

## Volgende deliverable

User journeys v1 + low-fidelity wireframes voor Home, Emotion Detail, Timeline en Printable Question Card, op desktop en mobiel. Ontwerp op echte voorbeeldinhoud; test ook print- en no-JS-uitvoer.
