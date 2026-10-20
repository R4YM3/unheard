# Content review

Status of every Dutch route on branch `feat/handoff-gap-implementation`, generated from the frontmatter on 20 October 2026. The frontmatter `reviewNotes` and the inline `[OPRICHTER REVIEW NODIG]` markers are the source of truth; update them there, not here.

Nothing is approved yet. `draft` means founder text is still missing; `in_review` means the draft is complete and waiting for review. No page has `reviewedAt` set, so every page shows the "nog niet gecontroleerd" notice.

## Totals

- Routes: 62. The individual term articles (gaslighting, hoovering and so on) come from branch `content/begrippen` and are not listed here.
- Review notes in frontmatter: 182, of which 36 are addressed to the founder.
- Inline `[OPRICHTER REVIEW NODIG]` markers: 34.
- **Founder review questions: 70** (founder notes plus inline markers).

## Reviewer key

- **Oprichter**: the founder confirms or writes personal text. No personal experience has been invented.
- **Redactie**: editorial check of wording, safety and tone.
- **Clinicus**: a clinician checks therapy and health passages.
- **Jurist / financieel**: a legal or debt professional checks the money and legal pages.

Crisis numbers (112, 113, 0800-0113, Veilig Thuis 0800-2000) were checked on the official sites on 20 October 2026; URLs and quotes are in `docs/SOURCES_VERIFIED.md`. Check them again just before publication.

## Routes

### `/nl/`: Ongehoord: woorden voor emotioneel en financieel misbruik

- Status: `in_review`. Author: founder. File: `src/content/hubs/home.md`.
- Sources: 1 (CBS en WODC).
- Review questions:
  - Bevestig de introductietekst in ik-vorm en de zin “Ik ben één persoon, geen hulporganisatie”.
  - Bevestig of het CBS-cijfer op de homepage mag staan (handoff: maximaal één rustig feit, nooit in de hero).

### `/nl/begrijp-het/`: Begrijp het: patronen en begrippen rond emotioneel misbruik

- Status: `in_review`. Author: editorial. File: `src/content/hubs/begrijp-het.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - Redactie: klopt de volgorde van de artikellisting (emotioneel misbruik, conflict of patroon, wat het met je kan doen)? Zo niet, voeg order-waarden toe aan de artikelen.

### `/nl/begrijp-het/conflict-of-patroon/`: Ongezond conflict of een patroon van controle?

- Status: `in_review`. Author: editorial. File: `src/content/articles/begrijp-het/conflict-of-patroon.md`.
- Sources: 2 (Rijksoverheid, Thuisarts).
- Review questions:
  - Clinicus: zijn de zes aandachtspunten (hoe vaak, machtsverschil, angst, vrijheid om nee te zeggen, herstel na conflict, wie zich aanpast) een verantwoorde, niet-diagnostische samenvatting? Er is in SOURCES_VERIFIED.md geen specifieke bron voor dit onderscheid; graag een vakbron toevoegen of de tekst als algemene uitleg laten staan.
  - Redactie: de drie scenario’s gebruiken bewust dezelfde zin. Werkt dat in de perspectiefwisselaar, of is het verwarrend?

### `/nl/begrijp-het/emotioneel-misbruik/`: Wat is emotioneel misbruik?

- Status: `in_review`. Author: editorial. File: `src/content/articles/begrijp-het/emotioneel-misbruik.md`.
- Sources: 3 (CBS, Rijksoverheid, Thuisarts).
- Review questions:
  - Clinicus/redactie: klopt de parafrase van de CBS-definitie (structurele verbale agressie, minstens maandelijks, plus vormen van dwingende controle met dreiging en intimidatie, door iemand uit de huiselijke kring)? Graag de exacte formulering in hoofdstuk 2 naast de tekst leggen.
  - Redactie: welke personen telt het CBS precies tot de huiselijke kring? De tekst zegt nu alleen "breder dan partners" om geen onbevestigde opsomming te geven.
  - Clinicus: is de lijst met mogelijke gevolgen (onder "Wat het met je kan doen") voorzichtig genoeg geformuleerd, zonder medische claims?

### `/nl/begrijp-het/financieel-misbruik/`: Financieel misbruik herkennen en begrijpen

- Status: `in_review`. Author: editorial. File: `src/content/hubs/financieel-misbruik.md`.
- Sources: 4 (Movisie, Rijksoverheid, Schouders Eronder / Huiselijkgeweld.nl, Veilig Thuis).
- Missing founder text (1 marker):
  - (marker without question text)
- Review questions:
  - Juridische/inhoudelijke review: klopt de afbakening “dwang, misleiding, bedreiging of structurele controle” met de definities in de Schouders Eronder-handreiking, inclusief hun onderscheid tussen economisch en financieel misbruik?
  - Oprichter: het prototype had een sectie “Mijn ervaringen met financiële druk”. Wil je hier later een eigen passage (founderNote) over financiële druk en zelfstandigheid terugvinden? Zo ja: welke emoties en lessen wil je delen, zonder bedragen, namen of procesdetails? [OPRICHTER REVIEW NODIG]
  - Controleer vóór publicatie of het hulpmiddel nl/hulpmiddelen/financieel-overzicht-en-veiligheid/ live staat en dat de reflectievragen werkelijk niet worden opgeslagen.
  - Controleer de zin dat er weinig Nederlandse cijfers zijn over financieel misbruik in relaties tegen de actuele handreiking; geen cijfers toevoegen zonder bron op /nl/mannen-in-cijfers/.

### `/nl/begrijp-het/financieel-misbruik/afhankelijkheid/`: Financiële afhankelijkheid en schaamte

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/afhankelijkheid.md`.
- Sources: 3 (Movisie, Schouders Eronder / Huiselijkgeweld.nl, Veilig Thuis).
- Review questions:
  - Inhoudelijke review: geven de passages over mannen en de kostwinnersrol de stigma-ervaring goed weer zonder vrouwen of non-binaire lezers uit te sluiten?
  - Controleer of de Movisie-pagina het saboteren van werk of studie en afhankelijkheid als drempel om te vertrekken nog zo beschrijft.

### `/nl/begrijp-het/financieel-misbruik/druk-na-scheiding/`: Economische druk na een scheiding

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/druk-na-scheiding.md`.
- Sources: 3 (Het Juridisch Loket, Rijksoverheid, Schouders Eronder / Huiselijkgeweld.nl).
- Missing founder text (1 marker):
  - (marker without question text)
- Review questions:
  - Juridische review (familierecht): bevat dit artikel geen uitspraken die als individueel juridisch advies kunnen worden gelezen? Is de waarschuwing om niet eenzijdig te stoppen met betalen of afspraken te wijzigen zonder advies correct en voldoende algemeen?
  - Juridische review: klopt de algemene omschrijving van de rol van advocaat en mediator? Geen kosten, toevoegingen of procedures noemen zonder bron.
  - Oprichter: dit onderwerp raakt mogelijk aan je eigen ervaring. Er staat bewust geen persoonlijke passage in. Wil je hier later iets toevoegen? [OPRICHTER REVIEW NODIG]

### `/nl/begrijp-het/financieel-misbruik/geldruzie-of-controle/`: Geldruzie of controle? Het verschil begrijpen

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/geldruzie-of-controle.md`.
- Sources: 2 (Rijksoverheid, Schouders Eronder / Huiselijkgeweld.nl).
- Review questions:
  - Inhoudelijke review: is het onderscheid tussen conflict en patroon voldoende genuanceerd, en sluit het aan bij het algemene artikel nl/begrijp-het/conflict-of-patroon/ zonder het te herhalen?

### `/nl/begrijp-het/financieel-misbruik/juridisch-en-financieel-advies/`: Wanneer juridisch of financieel advies kan helpen

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/juridisch-en-financieel-advies.md`.
- Sources: 3 (Geldfit, Het Juridisch Loket, Rijksoverheid).
- Review questions:
  - Juridische review: kloppen de algemene rolbeschrijvingen van Het Juridisch Loket, advocaat en mediator? Geen uitspraken over kosten of gesubsidieerde rechtsbijstand toevoegen zonder geverifieerde bron.
  - Controleer vóór publicatie de openingstijden van Het Juridisch Loket (ma–vr 9.00–17.00) en de nummers 0800-8020, 0800-8115 en 0800-2000 op de officiële sites.

### `/nl/begrijp-het/financieel-misbruik/overzicht-inkomsten-en-schulden/`: Een overzicht maken van inkomsten, kosten en schulden

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/overzicht-inkomsten-en-schulden.md`.
- Sources: 3 (Geldfit, Nibud, Rijksoverheid).
- Review questions:
  - Financiële review (bijv. schuldhulpverlener): is de indeling van het overzicht bruikbaar en volledig genoeg zonder te overweldigen?
  - Controleer dat de checklist op nl/hulpmiddelen/financieel-overzicht-en-veiligheid/ werkelijk geen antwoorden opslaat, zoals hier wordt gesteld.

### `/nl/begrijp-het/financieel-misbruik/signalen/`: Signalen van financieel misbruik

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/signalen.md`.
- Sources: 3 (Movisie, Schouders Eronder / Huiselijkgeweld.nl, Veilig Thuis).
- Review questions:
  - Inhoudelijke review: sluiten de genoemde signalen aan bij de signalen in de Schouders Eronder-handreiking? Ontbreken er belangrijke signalen of staat er iets te stellig?

### `/nl/begrijp-het/financieel-misbruik/toegang-tot-documenten/`: Toegang tot je eigen documenten

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/toegang-tot-documenten.md`.
- Sources: 3 (Het Juridisch Loket, Schouders Eronder / Huiselijkgeweld.nl, Veilig Thuis).
- Review questions:
  - Juridische review: is de algemene formulering over het opnieuw aanvragen van documenten en het afschermen van post/accounts correct en niet te stellig? Geen procedures noemen zonder bron.
  - Veiligheidsreview (bijv. Veilig Thuis-expertise): zijn de waarschuwingen over meekijken via apparaten, bankapps en post voldoende en niet angstaanjagend?

### `/nl/begrijp-het/financieel-misbruik/veilig-financieel-herstel/`: Veilig financieel herstel: weer vertrouwen krijgen in geld

- Status: `in_review`. Author: editorial. File: `src/content/articles/financieel/veilig-financieel-herstel.md`.
- Sources: 3 (Nibud, Rijksoverheid, Thuisarts).
- Missing founder text (1 marker):
  - (marker without question text)
- Review questions:
  - Financiële review (schuldhulp): zijn de kleine stappen realistisch en niet in strijd met wat schuldhulpverleners adviseren?
  - Oprichter: herstel van zelfstandigheid rond geld kan aansluiten bij je eigen verhaal. Er staat bewust geen persoonlijke passage in. Wil je hier later iets toevoegen? [OPRICHTER REVIEW NODIG]

### `/nl/begrijp-het/wat-het-met-je-kan-doen/`: Wat emotioneel misbruik met je kan doen

- Status: `in_review`. Author: editorial. File: `src/content/articles/begrijp-het/wat-het-met-je-kan-doen.md`.
- Sources: 3 (Thuisarts).
- Review questions:
  - Clinicus: zijn de beschreven mogelijke gevolgen voorzichtig genoeg geformuleerd, zonder dat ze als symptomenlijst of diagnose lezen?
  - Clinicus: klopt de korte typering van traumabinding en fawn-respons als niet-klinische, populaire begrippen? De uitgebreide uitleg staat op de begrippagina’s.
  - Redactie: de kaarten naar nl/wat-voel-ik/ik-sta-voortdurend-aan/ en nl/wat-voel-ik/ik-zoek-steeds-bevestiging/ werken pas als die gevoelspagina’s gepubliceerd zijn.
  - Redactie: hoofdstuk 2 van de CBS-prevalentiemonitor (§2.3) beschrijft gevolgen. Bewust geen cijfers of CBS-bron op deze pagina; cijfers staan alleen op Mannen in cijfers.

### `/nl/begrippen/`: Begrippen en patronen van A tot Z

- Status: `in_review`. Author: editorial. File: `src/content/hubs/begrippen.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - De afzonderlijke begrip-artikelen worden geschreven op de branch content/begrippen. Deze index vult zich automatisch zodra die artikelen gepubliceerd zijn.

### `/nl/begrippen/darvo/`: Waarom moet ik mezelf ineens verdedigen?

- Status: `draft`. Author: editorial. File: `src/content/patterns/darvo.md`.
- Sources: 2 (Jennifer J. Freyd, Journal of Aggression, Maltreatment & Trauma).
- Review questions:
  - Term-artikel valt onder de branch content/begrippen; inhoud is ongewijzigd overgenomen uit de vorige versie.

### `/nl/herstel/`: Herstel na emotioneel of financieel misbruik

- Status: `in_review`. Author: editorial. File: `src/content/hubs/herstel.md`.
- Sources: 2 (Thuisarts).
- Review questions:
  - Clinicus: klopt de beschrijving van wanneer je naar de huisarts of POH-GGZ gaat, zonder dat het als medisch advies leest?
  - Oprichter: past de neutrale verwijzing naar je eigen therapie-ervaringen bij hoe je die wilt delen?
  - Redactie: heading wijkt bewust af van "Herstellen is meer dan begrijpen." op de therapiepagina; graag bevestigen.

### `/nl/herstel/contact-na-een-breuk/`: Contact houden na een breuk, als het niet anders kan

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/contact-na-een-breuk.md`.
- Sources: 3 (Het Juridisch Loket, Thuisarts, Veilig Thuis).
- Review questions:
  - Jurist: de pagina geeft bewust geen juridisch advies over omgangsregelingen of ouderschapsplannen. Is de verwijzing naar Het Juridisch Loket en een eigen advocaat of mediator neutraal en correct?
  - Veiligheid: is het advies over schriftelijk contact en vaste afspraken veilig voor situaties met dreiging? Moet er explicieter staan dat Veilig Thuis eerst kan meedenken?
  - Redactie: het voorbeeldbericht is fictief; past de toon?

### `/nl/herstel/erkenning/`: Erkenning vinden, ook als de ander die niet geeft

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/erkenning.md`.
- Sources: 1 (Thuisarts).
- Review questions:
  - Clinicus: is de tekst over erkenning van jezelf voldoende voorzichtig, zonder te suggereren dat dit therapie vervangt?
  - Redactie: is de zin over erkenning bij melding of aangifte neutraal genoeg, zonder juridische verwachtingen te wekken?

### `/nl/herstel/grenzen-leren-stellen/`: Grenzen leren stellen, eerst waar het veilig is

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/grenzen-leren-stellen.md`.
- Sources: 1 (Veilig Thuis).
- Review questions:
  - Clinicus: zijn de voorbeeldzinnen voor grenzen passend en niet te sturend?
  - Veiligheid: is de waarschuwing om geen grenzen te oefenen bij iemand die onveilig is duidelijk genoeg, zonder angst aan te jagen?

### `/nl/herstel/herstel-als-ouder/`: Herstellen terwijl je er voor je kinderen bent

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/herstel-als-ouder.md`.
- Sources: 2 (Thuisarts, Veilig Thuis).
- Missing founder text (2 markers):
  - .
  - De oprichter van Ongehoord is zelf vader en bouwt zijn leven opnieuw op. Wat hij daarover wil delen, staat in [Mijn verhaal](nl/mijn-verhaal/).
- Review questions:
  - Oprichter: wil je hier een korte persoonlijke passage over vaderschap tijdens je herstel? Zo ja: wat wil je delen, zonder namen, leeftijden of andere herkenbare details over je kinderen? Tot die tijd staat er alleen [OPRICHTER REVIEW NODIG].
  - Clinicus/pedagoog: zijn de uitspraken over wat kinderen wel en niet hoeven te dragen voorzichtig genoeg geformuleerd, zonder onderbouwing die er niet is?
  - Jurist: de pagina vermijdt bewust adviezen over omgang of gezag; graag bevestigen dat niets als juridisch advies leest.

### `/nl/herstel/leren-voelen/`: Van begrijpen naar voelen

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/leren-voelen.md`.
- Sources: 2 (Thuisarts, Vaktherapie Nederland).
- Review questions:
  - Clinicus: zijn de oefeningen (lichaam scannen, gevoelswoorden) veilig voor iemand die snel overspoeld raakt? Moet er een expliciete stopregel bij?
  - Redactie: de zin over psychomotorische therapie claimt alleen dat lichaamsbeleving daar centraal staat (bron: Vaktherapie Nederland); graag controleren.

### `/nl/herstel/rouw/`: Rouwen om wat er was, en om wat er niet kwam

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/rouw.md`.
- Sources: 1 (Thuisarts).
- Review questions:
  - Clinicus: is de beschrijving van rouw na een relatie (zonder overlijden) passend, en klopt de verwijzing naar Thuisarts Rouw voor deze situatie?
  - Redactie: is "ambivalentie" voldoende uitgelegd in gewone taal?

### `/nl/herstel/steunnetwerk/`: Een steunnetwerk opbouwen, ook als vragen moeilijk is

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/steunnetwerk.md`.
- Sources: 3 (113 Zelfmoordpreventie, Thuisarts).
- Review questions:
  - Redactie: is de verwijzing naar de vragenkaart voor naasten (kaart-naaste) en de pagina voor naasten de juiste combinatie?
  - Clinicus: klopt de korte omschrijving van de praktijkondersteuner (POH-GGZ) met de Thuisarts-pagina?
  - Redactie: een opmerking over lotgenotengroepen is bewust weggelaten omdat er geen geverifieerde bron is. Wil je die toevoegen?

### `/nl/herstel/therapievormen/`: Therapie en begeleiding: verschillende wegen naar herstel

- Status: `draft`. Author: founder. File: `src/content/hubs/therapievormen.md`.
- Sources: 5 (GGZ Standaarden, Thuisarts, VGCt, Vaktherapie Nederland).
- Review questions:
  - Klinische review: is de oriëntatie (huisarts en POH-GGZ als startpunt, keuze afhankelijk van klachten en situatie) correct en voldoende neutraal?
  - Oprichter: de goedgekeurde zin "Voor betrouwbare algemene informatie over traumagerichte zorg verwijzen we naar Thuisarts" is aangepast naar "vind je bij Thuisarts", omdat de site geen wij-vorm gebruikt. Akkoord?
  - Oprichter: de quote "Ik wilde niet alleen begrijpen wat ik voelde..." staat nu als laatste alinea van de oprichtersnotitie, omdat het hub-schema geen apart quoteveld heeft. Akkoord?
  - Oprichter: de vier vragenkaarten verwijzen nu naar Ik herken mezelf niet meer, cognitieve (gedrags)therapie, beeldende therapie en EMDR. Dit is een leesroute, geen behandelkeuze. Kloppen deze bestemmingen?
  - Oprichter: de goedgekeurde sectiekop "Je hoeft de naam van een therapie niet te kennen." en de bijbehorende lead staan in de body, omdat het hub-schema geen kop voor de kaarten heeft. Controleer of de template ze naast elkaar toont.
  - Techniek: bevestig dat de schrijfbare reflectie werkelijk niets verzendt of opslaat, zodat de notitie "worden niet verzonden of opgeslagen" klopt.
  - Oprichter: de oude velden kind, therapy.experiences en therapy.closing zijn omgezet naar listings, de body en de aparte therapiepagina's. De persoonlijke zinnen per vorm staan nu in het founder-veld van elke therapiepagina.

### `/nl/herstel/therapievormen/beeldende-therapie/`: Beeldende therapie: werken met materiaal in plaats van alleen woorden

- Status: `draft`. Author: editorial. File: `src/content/therapies/beeldende-therapie.md`.
- Sources: 2 (Vaktherapie Nederland).
- Missing founder text (1 marker):
  - Wat ik daarin ontdekte, beschrijf ik later in eigen woorden.
- Review questions:
  - Klinische review: klopt de algemene beschrijving van beeldende therapie (materialen, concreet werkstuk, nabespreken) en is de passage over onderbouwing voldoende voorzichtig?
  - Klinische review: de zin dat je niet goed hoeft te kunnen tekenen staat niet letterlijk in de geverifieerde bron. Bevestigen of schrappen.
  - Redactie: controleer welke registers of beroepsverenigingen voor beeldend therapeuten bestaan, zodat de professionele vraag concreter kan.
  - Oprichter: wil je beschrijven wat je via beeldende therapie over je eigen verlangens ontdekte, zonder specifieke werkstukken, data of uitkomsten?

### `/nl/herstel/therapievormen/boksen-met-emoties/`: Boksen met emoties: beweging en gevoel onderzoeken

- Status: `draft`. Author: editorial. File: `src/content/therapies/boksen-met-emoties.md`.
- Sources: 2 (Vaktherapie Nederland).
- Missing founder text (1 marker):
  - In welke vorm ik dit deed en wat het mij liet merken, beschrijf ik later zelf.
- Review questions:
  - Klinische review: is de beschrijving voldoende voorzichtig, en is het verband met psychomotorische therapie alleen als context gelegd (niet als claim dat boksen PMT of bewezen is)?
  - Klinische review: zijn er veiligheidsaspecten (lichamelijk, emotioneel) die op deze pagina expliciet benoemd moeten worden?
  - Oprichter: deed je boksen met emoties bij een therapeut, binnen een instelling of bij een trainer? Dit bepaalt of en hoe de pagina het verband met vaktherapie mag leggen. Noem geen namen.
  - Oprichter: wil je in eigen woorden beschrijven wat je merkte over de energie die emoties kosten, zonder specifieke oefeningen of uitkomsten?

### `/nl/herstel/therapievormen/cognitieve-gedragstherapie/`: Cognitieve gedragstherapie: werken met gedachten en gedrag

- Status: `draft`. Author: editorial. File: `src/content/therapies/cognitieve-gedragstherapie.md`.
- Sources: 2 (Thuisarts, Vereniging voor Gedragstherapie en Cognitieve Therapie (VGCt)).
- Missing founder text (1 marker):
  - Wat dit mij persoonlijk heeft gebracht, vul ik later zelf aan.
- Review questions:
  - Klinische review: klopt de uitleg van het verschil tussen cognitieve therapie, gedragstherapie en CGT als overkoepelende term, en is de passage over onderbouwing voldoende voorzichtig?
  - Klinische review: kan een bronvermelde zin worden toegevoegd over bij welke klachten CGT in Nederlandse richtlijnen wordt aanbevolen? Nu bewust weggelaten omdat de geverifieerde VGCt-bron alleen de methode beschrijft.
  - Redactie: controleer de volledige verenigingsnaam van de VGCt.
  - Oprichter: was het cognitieve therapie of cognitieve gedragstherapie? En wil je één zin toevoegen over wat het je bracht, zonder diagnose of uitkomst?

### `/nl/herstel/therapievormen/emdr/`: EMDR: een traumagerichte behandeling uitgelegd

- Status: `draft`. Author: editorial. File: `src/content/therapies/emdr.md`.
- Sources: 3 (GGZ Standaarden, Thuisarts, Vereniging EMDR Nederland).
- Missing founder text (1 marker):
  - Wat niet voldoende voor mij betekende, beschrijf ik later zelf.
- Review questions:
  - Klinische review: klopt de beschrijving van een EMDR-sessie (herinnering voor je halen, aandacht afleiden met oogbewegingen of geluiden, korte rondes) op patiëntniveau, en is de formulering over PTSS zorgvuldig genoeg?
  - Klinische review: is de zin over de zorgstandaard voldoende algemeen, of moet die worden aangescherpt of weggelaten?
  - Oprichter: wil je in eigen woorden zeggen wat niet voldoende voor jou betekende, zonder diagnose, data of uitkomsten? Bijvoorbeeld wat je miste.

### `/nl/herstel/therapievormen/exposuretherapie/`: Exposuretherapie: onder begeleiding werken met wat spanning oproept

- Status: `draft`. Author: editorial. File: `src/content/therapies/exposuretherapie.md`.
- Sources: 2 (GGZ Standaarden, Thuisarts).
- Missing founder text (1 marker):
  - Hier kan ik later in eigen woorden vertellen hoe exposure voor mij was.
- Review questions:
  - Klinische review: klopt de patiëntbeschrijving van imaginaire exposure (herinnering onder begeleiding herhaaldelijk en in detail vertellen) en is de formulering over PTSS zorgvuldig genoeg?
  - Klinische review: de zin dat exposure ook buiten traumabehandeling wordt gebruikt bij situaties die iemand vermijdt, staat niet letterlijk in de geverifieerde bronnen. Bevestigen met bron of schrappen.
  - Oprichter: wil je beschrijven hoe exposure voor jou was, zonder specifieke herinneringen, oefeningen, data of uitkomsten?

### `/nl/herstel/therapievormen/gesprekken-met-een-psycholoog/`: Gesprekken met een psycholoog: wat kun je verwachten?

- Status: `draft`. Author: editorial. File: `src/content/therapies/gesprekken-met-een-psycholoog.md`.
- Sources: 3 (BIG-register, Nederlands Instituut van Psychologen, Thuisarts).
- Missing founder text (1 marker):
  - Hier kan ik later beschrijven wat het voor mij betekende om met een psycholoog te praten.
- Review questions:
  - Klinische review: klopt de beschrijving van de route via huisarts en POH-GGZ en van een eerste gesprek (intake, hulpvraag, plan), en is de passage over onderbouwing voldoende voorzichtig?
  - Klinische/juridische review: moet het verschil tussen psycholoog, gz-psycholoog en klinisch psycholoog (titelbescherming en BIG-registratie) worden uitgelegd? Nu bewust niet uitgewerkt omdat daarvoor nog geen geverifieerde bron in SOURCES_VERIFIED.md staat.
  - Redactie: de professionele vraag over zwijgplicht is een vraag, geen claim. Controleer of die passend en niet afschrikwekkend is.
  - Oprichter: wil je één of twee zinnen toevoegen over wat de gesprekken met een psycholoog voor je betekenden, zonder diagnose, data of uitkomst?

### `/nl/herstel/therapievormen/groepsschematherapie/`: Groepsschematherapie: patronen onderzoeken samen met anderen

- Status: `draft`. Author: editorial. File: `src/content/therapies/groepsschematherapie.md`.
- Sources: 2 (Thuisarts, Vereniging voor Schematherapie).
- Missing founder text (1 marker):
  - Hier kan ik later beschrijven hoe het voor mij was om in een groep aan mijn patronen te werken.
- Review questions:
  - Klinische review: klopt de beschrijving van groepsschematherapie (begeleiding, groepsdynamiek, vertrouwelijkheid) en is de passage over onderbouwing voldoende voorzichtig?
  - Klinische review: is er een bronvermelde, voorzichtige zin mogelijk over waarvoor groepsschematherapie in Nederland wordt ingezet? De geverifieerde bron bevestigt alleen dat schematherapie individueel, in een groep of gecombineerd kan worden gegeven.
  - Oprichter: wil je beschrijven hoe de groep voor jou was (bijvoorbeeld de drempel om te delen), zonder data, namen van deelnemers of uitkomsten?

### `/nl/herstel/therapievormen/meditatie/`: Meditatie: aandacht voor wat je ervaart

- Status: `draft`. Author: editorial. File: `src/content/therapies/meditatie.md`.
- Sources: 3 (Richtlijnendatabase, Thuisarts, Trimbos-instituut).
- Missing founder text (1 marker):
  - Hier kan ik later beschrijven welke rol meditatie in mijn zoektocht had.
- Review questions:
  - Klinische review: is de beschrijving van MBCT (groepstraining van acht weken, erkend bij terugkerende depressie, aanbevolen na herstel ter preventie van terugval) correct en voldoende afgebakend?
  - Klinische review: moet de waarschuwing dat stilzitten met gedachten onrust of nare herinneringen kan oproepen sterker of met een bron worden onderbouwd? Nu geformuleerd als mogelijkheid en als vraag aan een professional.
  - Oprichter: wil je beschrijven welke rol meditatie voor jou had (bijvoorbeeld naast andere therapie), zonder specifieke oefeningen, data of uitkomsten?

### `/nl/herstel/therapievormen/schematherapie/`: Schematherapie: patronen en behoeften onderzoeken

- Status: `draft`. Author: editorial. File: `src/content/therapies/schematherapie.md`.
- Sources: 2 (Thuisarts, Vereniging voor Schematherapie).
- Missing founder text (1 marker):
  - Wat schematherapie mij persoonlijk heeft gebracht, vul ik later zelf aan.
- Review questions:
  - Klinische review: klopt de algemene beschrijving van schematherapie (patronen, emotionele behoeften, verloop van een traject) en is de passage over onderbouwing voldoende voorzichtig?
  - Klinische review: kan een korte, bronvermelde zin worden toegevoegd over bij welke klachten schematherapie in Nederlandse richtlijnen of zorgstandaarden wordt genoemd? Nu bewust weggelaten omdat de geverifieerde bron alleen de methode beschrijft.
  - Redactie: controleer of de registratievraag (BIG-register of beroepsvereniging) juist en volledig is voor schematherapeuten.
  - Oprichter: wil je in één of twee zinnen beschrijven wat schematherapie je persoonlijk bracht, zonder data, diagnoses of uitkomsten die je niet wilt delen?

### `/nl/herstel/triggers-en-moeilijke-berichten/`: Als een bericht je uit balans brengt

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/triggers-en-moeilijke-berichten.md`.
- Sources: 3 (Thuisarts, Veilig Thuis).
- Review questions:
  - Clinicus: is het woord "trigger" hier voldoende alledaags gebruikt, zonder te suggereren dat er sprake is van PTSS?
  - Veiligheid: de pagina zegt bewust niets over berichten bewaren of verwijderen (geen bewijsverzameling). Is een verwijzing naar Veilig Thuis voor die vraag voldoende?
  - Redactie: het voorbeeldantwoord is fictief; past de toon (kort, zakelijk) zonder dat het als juridisch advies leest?
  - Redactie: vermeld Thuisarts-advies (structuur, bewegen, piekermomenten) klopt met de bronpagina op het moment van publicatie?

### `/nl/herstel/zelfvertrouwen/`: Weer vertrouwen op wat je zelf ziet en voelt

- Status: `in_review`. Author: editorial. File: `src/content/articles/herstel/zelfvertrouwen.md`.
- Sources: 1 (Thuisarts).
- Review questions:
  - Clinicus: zijn de oefeningen (notities maken, kleine beslissingen) veilig en niet te sturend voor iemand met veel zelftwijfel?
  - Redactie: het advies om notities voor jezelf te maken is expliciet niet bedoeld als bewijs verzamelen; graag controleren of dat duidelijk genoeg is.

### `/nl/hulp-vinden/`: Hulp vinden en veilig advies vragen

- Status: `in_review`. Author: editorial. File: `src/content/articles/hulp-vinden.md`.
- Sources: 12 (113 Zelfmoordpreventie, Geldfit, Het Juridisch Loket, Rijksoverheid, Slachtofferhulp Nederland, Thuisarts, Veilig Thuis).
- Review questions:
  - Controleer vóór publicatie alle nummers opnieuw op de officiële websites.
  - Veilig Thuis: de bron noemt de telefoon dag en nacht, gratis en anoniem, en noemt ook een chat. Chat-tijden staan niet in de geverifieerde notitie. Niet als 24 uur gepresenteerd.
  - “Ook voor mannen” is een lezing van “voor iedereen” op de contactpagina. Controleer of Veilig Thuis mannen ergens expliciet noemt.
  - “Ook bij twijfel” sluit aan op de Rijksoverheid-pagina over wat je doet als je huiselijk geweld vermoedt. De letterlijke zin “bel ook bij twijfel” is niet geciteerd uit die pagina.
  - Geldfit is niet als gratis beschreven. De bron zegt alleen: bel 0800-8115 bij vragen en zorgen over geld. Openingstijden staan er niet.
  - Juridisch Loket: “weinig spaargeld” volgt de geverifieerde notitie “little savings”. Controleer of de site “weinig vermogen” zegt.
  - Slachtofferhulp: alleen het nummer en dat 0900-0101 niet gratis is. Wat de organisatie inhoudelijk doet, staat niet in de geverifieerde notities en is daarom niet uitgewerkt.
  - Niet beweren dat een melding bij Veilig Thuis onzichtbaar blijft voor de mensen om wie het gaat.

### `/nl/hulpmiddelen/`: Hulpmiddelen om woorden te vinden

- Status: `in_review`. Author: editorial. File: `src/content/hubs/hulpmiddelen.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - Redactie: is de zin over browsers die tekst terugzetten nauwkeurig genoeg, of moet die alleen op veilig-gebruik staan?

### `/nl/hulpmiddelen/financieel-overzicht-en-veiligheid/`: Financieel overzicht en veiligheid

- Status: `in_review`. Author: editorial. File: `src/content/tools/kaart-financieel.md`.
- Sources: 3 (Movisie, Rijksoverheid, Schouders Eronder / Huiselijkgeweld.nl).
- Review questions:
  - Juridisch: de checklist mag niet gelezen worden als advies om documenten te kopiëren of accounts te wijzigen. Controleer of die grens scherp genoeg is.
  - De zinnen over afhankelijkheid (Movisie) en controle die op zorg kan lijken (Schouders Eronder) moeten binnen de bron blijven. Geen cijfers toegevoegd.
  - Het fictieve voorbeeld is verzonnen en noemt geen bedragen.

### `/nl/hulpmiddelen/iemand-steunen/`: Iemand steunen zonder over te nemen

- Status: `in_review`. Author: editorial. File: `src/content/tools/kaart-naaste.md`.
- Sources: 3 (Rijksoverheid, Veilig Thuis).
- Review questions:
  - Bevestig op de contactpagina van Veilig Thuis en op de Rijksoverheid-pagina dat bezorgde naasten expliciet om advies mogen bellen. De tekst leunt nu op “voor iedereen” en op de pagina over vermoedens van huiselijk geweld.
  - Niet beweren dat een gesprek met Veilig Thuis onzichtbaar blijft voor de persoon om wie het gaat. Dat protocol staat niet in de bronnen.
  - Het fictieve voorbeeld is verzonnen.

### `/nl/hulpmiddelen/ik-begrijp-het-maar-het-blijft-pijn-doen/`: Ik begrijp het, maar het blijft pijn doen

- Status: `in_review`. Author: editorial. File: `src/content/tools/kaart-pijn-na-inzicht.md`.
- Sources: 2 (113 Zelfmoordpreventie, Rijksoverheid).
- Review questions:
  - Geen oorzakelijk verband gelegd tussen misbruik en zelfdoding. 113 staat er omdat de kaart over aanhoudende pijn gaat, niet als verklaring.
  - Geen Thuisarts-rouwclaim opgenomen, omdat de kaart geen medische uitspraak over rouw doet.
  - Het fictieve voorbeeld is verzonnen en noemt geen naam.

### `/nl/hulpmiddelen/voorbereiding-gesprek-huisarts-of-therapeut/`: Voorbereiding voor huisarts of therapeut

- Status: `in_review`. Author: editorial. File: `src/content/tools/kaart-hulpverlener.md`.
- Sources: 4 (Rijksoverheid, Thuisarts).
- Review questions:
  - Clinicus: klopt de beperkte rol van de POH-GGZ (somberheid) en van de huisarts (ingang bij psychische klachten, ook als een partner of ex mishandelt) met de geciteerde Thuisarts-pagina’s?
  - Niet beweren dat een huisartsgesprek altijd vertrouwelijk blijft tegenover een partner. Dat staat niet in de geverifieerde bronnen.
  - Het fictieve voorbeeld is verzonnen, geen oprichtersbiografie.

### `/nl/hulpmiddelen/vragen-voor-een-gesprek-met-je-partner/`: Vragen voor een gesprek met je partner

- Status: `in_review`. Author: editorial. File: `src/content/tools/kaart-partnergesprek.md`.
- Sources: 1 (Rijksoverheid).
- Review questions:
  - Veiligheidsreview: staat op genoeg plekken dat je het gesprek mag overslaan en de kaart nooit gebruikt bij iemand voor wie je bang bent?
  - Redactie: het fictieve voorbeeld eindigt bewust zonder gesprek. Geen oprichtersherinnering.

### `/nl/hulpmiddelen/wat-voel-ik-en-wat-heb-ik-nodig/`: Wat voel ik en wat heb ik nodig?

- Status: `in_review`. Author: editorial. File: `src/content/tools/kaart-zelfreflectie.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - Redactie: het fictieve voorbeeld noemt geen namen of plaatsen. Oprichter hoeft het niet als eigen herinnering te herkennen.
  - Techniek: bevestig dat getypte antwoorden niet worden opgeslagen, verstuurd of standaard geprint.

### `/nl/ik-maak-me-zorgen-om-iemand/`: Ik maak me zorgen om iemand

- Status: `in_review`. Author: editorial. File: `src/content/articles/voor-naasten.md`.
- Sources: 3 (Rijksoverheid, Veilig Thuis).
- Review questions:
  - Bevestig op Veilig Thuis en op de Rijksoverheid-pagina dat bezorgde naasten expliciet om advies mogen bellen. De tekst leunt op “voor iedereen” en op de pagina over vermoedens van huiselijk geweld.
  - Niet beweren dat een gesprek of melding onzichtbaar blijft voor de persoon om wie het gaat. De lezer wordt gevraagd dat zelf te checken in het gesprek.
  - De drie scenario’s zijn fictief. De oprichter hoeft ze niet als eigen herinnering te herkennen. Geen namen, plaatsen of leeftijden.
  - Clinicus: lees mee of de grens tussen meeleven en overnemen scherp genoeg is, vooral bij “niet duwen naar een breuk”.
  - 112 is toegevoegd omdat de pagina zegt wanneer je belt. Controleer het nummer vóór publicatie opnieuw op rijksoverheid.nl.

### `/nl/mannen-in-cijfers/`: Mannen in cijfers: psychisch geweld, praten en hulp

- Status: `in_review`. Author: editorial. File: `src/content/hubs/mannen-in-cijfers.md`.
- Sources: 3 (CBS).
- Review questions:
  - Statistische review: controleer elk cijfer, elke definitie en elke populatie opnieuw rechtstreeks in de CBS-publicaties vlak voor publicatie. Bronnen zijn gecontroleerd op 2026-10-20.
  - Statistische review: het zelfdodingscijfer over 2025 is voorlopig. Controleer of het CBS inmiddels definitieve cijfers heeft gepubliceerd en pas het stats-bestand dan aan.
  - Clinicus/113: is de toon rond zelfdoding zorgvuldig genoeg, en staat de hulpverwijzing op de juiste plek?
  - Redactie: geen cijfers over financiële afhankelijkheid of eenzaamheid van mannen opgenomen; daarvoor is nog geen geverifieerde bron in SOURCES_VERIFIED.md.

### `/nl/mijn-verhaal/`: Mijn verhaal: woorden zoeken voor wat ik voelde

- Status: `draft`. Author: founder. File: `src/content/story/mijn-verhaal.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Missing founder text (17 markers):
  - Welke ervaringen uit je jeugd wil je in algemene woorden noemen?
  - Welke gevoelens uit die tijd herken je achteraf?
  - Wat nam je mee in hoe je naar jezelf en naar anderen keek?
  - Wat zie je nu anders over deze periode?
  - (marker without question text)
  - Concrete details volgen alleen als ik die verantwoord wil delen, zonder herkenbare informatie over anderen.
  - Welke verwachtingen en gevoelens had je aan het begin?
  - Hoe keek je toen naar jezelf?
  - Wat zie je nu terug van deze periode?
  - (marker without question text)
  - (marker without question text)
  - Welke situaties wil je in algemene woorden beschrijven, zonder iemand te beschuldigen of herkenbaar te maken?
  - (marker without question text)
  - (marker without question text)
  - Hoe voelde het om hulp te zoeken, als man en als vader?
  - wachten op mijn eigen woorden. Concrete gebeurtenissen en data worden pas toegevoegd nadat ik die zelf heb gecontroleerd.
  - in, of laat ze weg. Er is niets verzonnen; alleen bestaande, eerder goedgekeurde zinnen zijn gebruikt.
- Review questions:
  - Mag de zin “Ik heb als kind misbruik meegemaakt” publiek blijven staan? Zo ja, in deze bewoording?
  - Vul de lagen met [OPRICHTER REVIEW NODIG] in, of laat ze weg. Er is niets verzonnen; alleen bestaande, eerder goedgekeurde zinnen zijn gebruikt.
  - Mag de brief aan de kinderen publiek, of eerst apart beoordelen (handoff 5.6)? Bevat hij niets herkenbaars?
  - Klopt de volgorde van de hoofdstukken (jeugd, begin relatie, verschuiving, keerpunt, vandaag)?
  - Wil je in de laag “Wat voelde ik?” bij het keerpunt iets zeggen over hulp zoeken als man?
  - Bevestig de nieuwe introductiezin “Mijn verhaal begon niet bij een relatie.” (handoff 5.6).

### `/nl/over/`: Over Ongehoord: waarom deze plek er is

- Status: `draft`. Author: founder. File: `src/content/articles/over.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Missing founder text (3 markers):
  - Hier komt in mijn eigen woorden waarom ik deze plek wilde maken: wat ik zelf miste toen ik zocht, en wat ik had willen lezen. Zonder namen, data of details over anderen.
  - Klopt dit met wat de naam voor mij betekent, of wil ik het anders zeggen?
  - Wil ik hier iets zeggen over hoe dat zwijgen voor mij was?
- Review questions:
  - Oprichter: de alinea onder "Waarom ik hiermee begon" is een veilige algemene versie. Wil je in je eigen woorden beschrijven waarom je begon, zonder namen, data of details over betrokkenen?
  - Oprichter: wil je onder "Voor wie het is" iets zeggen over hoe het zwijgen voor jou was? Zo niet, haal die placeholder weg.
  - Oprichter: klopt de uitleg van de naam Ongehoord, of had je een andere betekenis in gedachten?
  - Oprichter: wil je iets zeggen over je vaderschap op deze pagina, of laat je dat alleen in Mijn verhaal?
  - Oprichter: er is nog geen werkend contactkanaal. Welk kanaal komt er, en wanneer? Tot die tijd belooft de tekst niets.

### `/nl/toegankelijkheid/`: Toegankelijkheid van Ongehoord

- Status: `in_review`. Author: editorial. File: `src/content/articles/toegankelijkheid.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - Techniek: controleer vóór publicatie of de bekende beperkingen hieronder nog kloppen, en vul aan met uitkomsten van de laatste axe-, toetsenbord-, zoom- en schermlezertests.
  - Oprichter: er is nog geen werkend kanaal voor feedback over toegankelijkheid. Welk kanaal komt er? Pas de laatste paragraaf aan zodra het werkt.
  - Redactie: is een formele toegankelijkheidsverklaring (volgens het model van digitoegankelijk.nl) gewenst, of volstaat deze pagina voor een persoonlijk initiatief?

### `/nl/veilig-gebruik/`: Privacy en veilig gebruik van deze site

- Status: `in_review`. Author: editorial. File: `src/content/articles/veilig-gebruik.md`.
- Sources: 1 (GitHub).
- Review questions:
  - Jurist/privacy: is deze tekst voldoende als privacyverklaring, of is er een aparte, formele verklaring nodig (bijvoorbeeld over de rol van GitHub en de verwerkingsgrondslag)?
  - Techniek: in de code zit een optionele Cloudflare Web Analytics-beacon (PUBLIC_CLOUDFLARE_BEACON_TOKEN). Die staat nu niet aan. Wordt die ooit aangezet, dan moet deze pagina vóór die tijd worden aangepast.
  - Techniek: controleer bij elke wijziging aan reflectievelden, kopieerknoppen of zoekfunctie of de beschrijving hier nog klopt.
  - Redactie: hoe lang GitHub IP-adressen bewaart, staat niet in de geverifieerde bron. Daarom noemt de tekst geen bewaartermijn.

### `/nl/wat-voel-ik/`: Wat voel ik? Begin bij herkenning

- Status: `in_review`. Author: editorial. File: `src/content/hubs/wat-voel-ik.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - Controleer of de volgorde van de negen gevoelens klopt met de prioriteit die de oprichter wil geven.

### `/nl/wat-voel-ik/ik-begrijp-het-maar-het-blijft-pijn-doen/`: Ik begrijp het, maar het blijft pijn doen

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-begrijp-het-maar-het-blijft-pijn-doen.md`.
- Sources: 3 (Thuisarts).
- Review questions:
  - Oprichter: dit is volgens de handoff de centrale zin van de site. Wil je hier een korte, gelabelde ik-passage over je eigen ervaring dat inzicht en voelen niet gelijk opliepen? Zo ja: welke formulering wil je, zonder specifieke oefeningen of uitkomsten?
  - Clinicus: controleer de zinnen over het lichaam dat “reageert alsof het weer toen is” en over therapievormen die zich op ervaren richten. Ze zijn bewust algemeen gehouden zonder diagnose of effectclaim.
  - Redactie: summary-zin “Inzicht verandert wat je weet; herstel verandert, vaak langzamer, hoe het voelt” als mogelijke vaste kernzin voor home en kaart afstemmen.

### `/nl/wat-voel-ik/ik-durf-geen-nee-te-zeggen/`: Waarom durf ik geen nee te zeggen?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-durf-geen-nee-te-zeggen.md`.
- Sources: 3 (Rijksoverheid, Thuisarts, Veilig Thuis).
- Review questions:
  - Redactie/veiligheid: de partner-vragenkaart staat in related. Controleer dat de tekst nergens aanmoedigt tot een gesprek bij onveiligheid; de pagina zegt expliciet dat je niet hoeft te oefenen bij iemand bij wie het onveilig voelt.
  - Clinicus: de term “fawn-respons” wordt alleen genoemd met beperking. Is die nuance voldoende, of liever helemaal weglaten?
  - Redactie: dwingende controle wordt alleen in algemene termen beschreven omdat de begrippenpagina nog in de parallelle branch zit; geen inline link gezet.

### `/nl/wat-voel-ik/ik-durf-niet-over-geld-te-praten/`: Waarom durf ik niet over geld te praten?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-durf-niet-over-geld-te-praten.md`.
- Sources: 3 (Geldfit, Movisie, Schouders Eronder / Huiselijkgeweld.nl).
- Review questions:
  - Jurist/financieel adviseur: controleer de veiligheidsformuleringen (niets in je eentje aanpassen aan gedeelde rekeningen, eerst vertrouwelijk advies) en of de verwijzing naar het Juridisch Loket (0800-8020, gratis advies voor mensen met een laag inkomen en weinig spaargeld) juist is weergegeven.
  - Redactie: de bewering dat controle geleidelijk kan ontstaan en eruit kan zien als zorg (bijvoorbeeld aanbieden de financiën te regelen) en dat economische afhankelijkheid weggaan moeilijk kan maken, steunt op de handreiking van Schouders Eronder en Movisie. Graag nalezen tegen de bron.
  - Oprichter: deze pagina bevat bewust geen eigen financiële ervaring. Wil je hier iets aan toevoegen, en zo ja: op welk abstractieniveau, zonder bedragen of details over anderen?

### `/nl/wat-voel-ik/ik-herken-mezelf-niet-meer/`: Waarom herken ik mezelf niet meer?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-herken-mezelf-niet-meer.md`.
- Sources: 3 (Thuisarts, Vaktherapie Nederland, Vereniging voor Schematherapie).
- Review questions:
  - Oprichter: de pagina noemt in algemene zin dat beeldende therapie en schematherapie kunnen helpen bij het verkennen van eigen wensen en patronen, en linkt naar Mijn verhaal. Wil je hier een korte ik-passage over beeldende therapie, en zo ja: wat wil je delen over hoe je je eigen verlangens weer leerde ontdekken (zonder oefeningen of uitkomsten te noemen die je niet wilt publiceren)?
  - Clinicus: controleer de nuance over somberheid en vlakheid onder “Wanneer is het iets anders?” en of de verwijzing naar de huisarts voldoende is.
  - Redactie: glossary-term “Identiteitsverlies” kan overlappen met het begrip verlies-van-identiteit van de begrippenbranch. Afstemmen welke pagina de definitie in de index draagt.

### `/nl/wat-voel-ik/ik-mis-iemand-die-mij-pijn-heeft-gedaan/`: Waarom mis ik iemand die mij pijn heeft gedaan?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-mis-iemand-die-mij-pijn-heeft-gedaan.md`.
- Sources: 2 (Thuisarts).
- Review questions:
  - Clinicus: “traumabinding” wordt genoemd als populaire, niet-klinische term met beperkingen. Controleer of de uitleg (afwisseling van spanning en warmte kan een band versterken) voldoende voorzichtig is; er staat geen bron in SOURCES_VERIFIED voor dit mechanisme.
  - Clinicus: de Thuisarts-rouwpagina gaat primair over overlijden. Is het verantwoord om die als bron te gebruiken voor rouw na een relatie, of liever alleen als algemene achtergrond?
  - Redactie/veiligheid: de pagina adviseert niet om contact te zoeken of te verbreken. Bevestig dat dat de gewenste neutraliteit is, vooral voor ouders die contact moeten houden.

### `/nl/wat-voel-ik/ik-sta-voortdurend-aan/`: Waarom sta ik voortdurend aan?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-sta-voortdurend-aan.md`.
- Sources: 3 (Thuisarts).
- Review questions:
  - Clinicus: de lichamelijke beschrijvingen (snelle hartslag, gespannen schouders, schrikken) zijn als herkenning bedoeld, niet als symptoomlijst. De stressklachten en adviezen zijn gebaseerd op Thuisarts (moe, slecht slapen, piekeren, prikkelbaar; bewegen, structuur, contact, piekertijd). Graag controleren of dit niet als diagnose of PTSS-signalering leest.
  - Clinicus: “hyperwaakzaamheid” staat als related key; de pagina gebruikt zelf de neutralere term waakzaamheid. Akkoord?
  - Oprichter: meditatie staat in related omdat het deel uitmaakte van je traject. Wil je hier een korte, gelabelde ik-passage over meditatie of over boksen met emoties en energie? Zo ja: welke formulering, zonder specifieke oefeningen of uitkomsten?

### `/nl/wat-voel-ik/ik-twijfel-aan-mezelf/`: Waarom twijfel ik steeds aan mezelf?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-twijfel-aan-mezelf.md`.
- Sources: 2 (Thuisarts).
- Review questions:
  - Oprichter: de founderNote is de goedgekeurde prototypetekst. Klopt die nog zo, of wil je de tweede alinea aanvullen?
  - Redactie: de drie voorbeeldsituaties komen uit het goedgekeurde prototype. Bevestig dat ze fictief zijn en niet herleidbaar tot echte gesprekken.
  - Clinicus: controleer of de alinea over slaap, somberheid en angst onder “Wanneer is het iets anders?” voldoende voorzichtig is en niet als diagnose leest.

### `/nl/wat-voel-ik/ik-voel-me-schuldig/`: Waarom voel ik me zo schuldig?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-voel-me-schuldig.md`.
- Sources: 3 (Jennifer J. Freyd, Journal of Aggression, Maltreatment & Trauma, Thuisarts).
- Review questions:
  - Redactie/clinicus: de alinea over onderzoek naar DARVO en zelfverwijt verwijst naar Harsey e.a. (2017). Controleer of de formulering de studie niet overdrijft (het gaat om samenhang, geen bewezen oorzaak).
  - Redactie: het onderscheid schuld/schaamte is algemeen taalgebruik zonder bron. Akkoord, of liever schrappen?
  - Oprichter: wil je op deze pagina een korte, gelabelde ik-passage over schuldgevoel? Zo ja: welke ervaring wil je delen, zonder details over anderen?

### `/nl/wat-voel-ik/ik-zoek-steeds-bevestiging/`: Waarom zoek ik steeds bevestiging?

- Status: `in_review`. Author: editorial. File: `src/content/emotions/ik-zoek-steeds-bevestiging.md`.
- Sources: 2 (Thuisarts).
- Review questions:
  - Oprichter: de founderNote op Zelftwijfel heet “Ook ik bleef bevestiging zoeken.” Wil je op deze pagina een korte, gelabelde ik-passage over hoe dat voor jou was? Zo ja: wat wil je delen, zonder details over anderen?
  - Clinicus: de alinea over steeds geruststelling vragen bij aanhoudende angst of dwanggedachten verwijst naar de huisarts zonder diagnose. Is die nuance juist en voldoende?
  - Redactie: afbakening met Zelftwijfel bewaken; deze pagina gaat over het gedrag van zoeken (de lus), Zelftwijfel over het verlies van vertrouwen in je waarneming.

### `/nl/werkwijze/`: Werkwijze: hoe de inhoud van Ongehoord tot stand komt

- Status: `in_review`. Author: editorial. File: `src/content/articles/werkwijze.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
- Review questions:
  - Oprichter: klopt de beschrijving van het reviewproces? Wie doet de inhoudelijke controle (clinicus, jurist) voordat een pagina op "Gecontroleerd" komt, en kan dat genoemd worden zonder namen?
  - Oprichter: er is nog geen werkend contactkanaal voor correcties. Welk kanaal komt er? Pas de alinea onder "Fouten en correcties" aan zodra het werkt.
  - Oprichter: de belofte over correcties is afgezwakt tot alleen een nieuwe datum bijgewerkt. Wil je correcties zichtbaar op de pagina vermelden? Dan is een schemaveld voor een correctienotitie nodig.
  - Redactie: de site staat nu op noindex. Moet dat hier genoemd worden, of hoort dat alleen in technische documentatie?

### `/nl/zoeken/`: Zoeken op Ongehoord

- Status: `in_review`. Author: editorial. File: `src/content/hubs/zoeken.md`.
- Sources: none. The page makes no factual claims that need one; recheck after editing.
