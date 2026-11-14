# Contentmodel en clustering — aanvulling op de lopende goal

Opdracht van Raymond, 14 november 2026. Aanvulling op issue #44, geen vervanging
van de contentverdieping, broncontrole, veiligheid, toegankelijkheid of menselijke
review. Bestaande PR's #103–#108 blijven onderdeel van het werk. PR #107 herstelt
uitsluitend de lege veiligheidssectie en is al gemerged.

## Beslisregel

Minder dubbele artikelen, niet minder herkenning. Een gedachte, situatie of
zoekvraag krijgt geen eigen URL uitsluitend omdat die bij een andere pijler hoort.
Voor elke zelfstandige pagina moeten bezoekersvraag, eigen antwoord, overlap,
vervolgstap en toegang vanuit de pijlers expliciet zijn. Een inhoudelijke lacune
kan ook worden opgelost met een sectie in een bestaand artikel.

Drie niveaus:

1. **Categorie:** zelfstandige uitleg en herkenning, samenhang en een beperkt
   aantal betekenisvolle keuzes. Geen lege verzameling links.
2. **Kernartikel:** één zelfstandige bezoekersbehoefte, ook bruikbaar bij directe
   aankomst. Geen verplicht sjabloon, wel passende erkenning, voorbeelden,
   verklaring, ontwikkeling, inzicht achteraf en steun.
3. **Herkenningsingang:** gedachte, gevoel, gebeurtenis, uitspraak of lichamelijke
   reactie. Kan een kaart, fragment of sectie zijn zonder eigen route.

Voelen, Herkennen en Begrijpen zijn gelijkwaardige ingangen naar gedeelde inhoud.
Een zelfstandige gevoelspagina blijft bestaan wanneer zij een andere behoefte
beantwoordt dan de uitleg van het mechanisme. Geen automatische samenvoeging van
gevoel, gedrag en herstel.

## Matrix en bewijslast

De [contentmatrix](2026-11-14-contentmatrix-clustering.md) omvat de Nederlandse
contentbestanden op main en afzonderlijk de nieuwe ontwerpen en onderwerpen uit
de goal. Iedere rij krijgt een werkhypothese uit zes keuzes: Behouden, Verdiepen,
Samenvoegen, Herpositioneren, Nieuw ontwikkelen of Omzetten naar herkenningsingang.
De bewijsstatus staat apart: metadata-inventarisatie is geen volledige
artikelvergelijking. Open rijen worden eerst volledig gelezen en naast hun
overlappende pagina's gelegd voordat de keuze definitief wordt.

Vóór nieuwe grote artikelreeksen moet deze vergelijking voor alle rijen zijn
afgerond. Een route verwijderen of hernoemen vraagt daarnaast een gecontroleerde
inhoudsoverdracht, link- en ankermigratie, canonicals, sitemap en redirect. Een
voorstel in de matrix voert geen URL-wijziging uit.

## Eerste clusterkeuzes

- **Grenzen en schuld:** gevoelde verantwoordelijkheid, angst voor een nee,
  schuldverschuiving en veilig oefenen zijn verschillende vragen. Vergelijk eerst
  hun volledige tekst; 'ik gaf steeds vaker toe' is een herkenningsingang, geen
  automatisch nieuw artikel.
- **Isolatie:** één kernartikel over kleiner wordend contact. Verlies van netwerk
  en schaamte kunnen herkenningsingangen zijn. Triangulatie, beeldvorming en
  sociale druk alleen apart behouden wanneer het eigen mechanisme voldoende
  wordt uitgelegd; steun herstellen heeft een andere praktische vraag.
- **Twijfel:** de bestaande begrippenpagina zelftwijfel herhaalt voorbeelden,
  gevolgen en hulp van de gevoelspagina. Kandidaat voor samenvoegen, met behoud
  van een termingang in A–Z. Gaslighting en DARVO beschrijven verschillende
  mechanismen en worden niet op grond van hetzelfde gevolg samengevoegd.
- **Herkenning achteraf:** het concept in #103 wordt het enige centrale artikel
  voor waarom inzicht later komt. De bestaande pagina 'Waarom overkwam dit mij?'
  moet scherper over zelfverwijt, omstandigheden en hulp zoeken gaan. De twee
  teksten moeten vóór publicatie naast elkaar worden gelegd. 'Puzzelstukjes' en
  'waarom herkende ik het toen niet' worden geen extra routes.
- **Na de relatie:** contact, ouderschap en economische druk in #108 hebben
  verschillende praktische vragen. Cluster ze samen als ingangen; schrijf geen
  extra algemeen artikel dat deze drie volledig herhaalt. Een categorie kan het
  patroon over de onderwerpen heen uitleggen.
- **Emotioneel misbruik en conflict/controle:** de oude begrippenbestanden zijn
  al ongepubliceerd en verwijzen redactioneel naar de kernartikelen. Behandel ze
  als bronmateriaal, niet als twee ontbrekende publicaties.

## Doelarchitectuur als te toetsen hypothese

Behoud de bestaande URL's tijdens het onderzoek. Begin met thematische groepen
binnen de bestaande hubs; voeg geen verplicht extra categorieniveau toe.

| Ingang               | Groepen om te toetsen                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wat voel ik?         | Twijfel en verwarring; angst en spanning; eenzaamheid en verlies; uitputting en verantwoordelijkheid; verdriet, boosheid en schaamte                                          |
| Wat herken ik?       | Gesprekken; grenzen en controle; liefde en intimiteit; vrienden en familie; geld en afhankelijkheid; lichamelijke signalen; na de relatie                                     |
| Begrijp het          | Emotioneel misbruik; dwingende controle; financieel/economisch misbruik; seksualiteit en intimiteit; na de relatie; kinderen/gezin; intimidatie/gezondheid; ontstaan en groei |
| Herstel              | Eerste periode; jezelf terugvinden; lichaam en spanning; verbinding; ouderschap; professionele steun                                                                          |
| Hulp en hulpmiddelen | Hulp vinden; optionele kaarten; voor naasten; begrippen/naslag                                                                                                                |
| Over Ongehoord       | Waarom Ongehoord; Mijn verhaal; contact alleen wanneer een werkelijk kanaal beschikbaar is                                                                                    |

Deze labels zijn geen reeds goedgekeurde menuwijziging. 'Herstel' versus
'Herstellen', en samenvoeging van hulp/hulpmiddelen worden getoetst met concrete
zoektaken. Begrippen blijft rechtstreeks bereikbaar voor bezoekers die een term
kennen. Belangrijke inhoud moet binnen twee à drie betekenisvolle keuzes liggen.

## Consistente artikellay-out

De aanvullende opdracht vervangt het huidige ontwerp met een vaste zijrail:

- Geen concurrerend hoofdstukmenu naast de tekst en geen permanent zustermenu.
- Breadcrumbs blijven zichtbaar en behouden hun echte hiërarchie.
- Een compacte, standaard gesloten inhoudsopgave bovenaan lange artikelen werkt
  als native details ook zonder JavaScript.
- Een subtiele horizontale voortgangsbalk staat onder de vaste header, op desktop
  en mobiel. De berekening stopt bij het artikel; bronnen, vervolgkaarten en
  footer verlengen de voortgang niet. Het precieze einde inclusief inhoudelijke
  voorbeeldbanden wordt bij implementatie expliciet gecontroleerd.
- Geen verplichte animatie of screenreader-aankondiging tijdens scrollen. De
  inhoud blijft volledig bruikbaar wanneer de balk niet beschikbaar is.
- Contextlinks en één rustig blok 'Verder ontdekken' leveren passende vervolgkeuzes.

De huidige EntryLayout, PageRail en het bijbehorende script zijn geïnspecteerd.
De bestaande mobiele balk staat bovenaan het venster; desktop gebruikt een
verticale hoofdstuklijn. Beide moeten worden vervangen. Alleen CSS verbergen zou
onvoldoende zijn: ook de voortgangsberekening, semantiek en dubbele linklijsten
moeten worden aangepast.

## Open afrondingsvoorwaarden

Volledige tekstvergelijking van alle matrixrijen, definitieve clusterbesluiten,
inhoudsoverdracht waar nodig, implementatie van hubs en artikellay-out,
route/SEO-controle, browser- en accessibilityvalidatie en de bestaande menselijke
reviewpoorten. De matrix is niet voltooid doordat alle bestandsnamen erin staan.
