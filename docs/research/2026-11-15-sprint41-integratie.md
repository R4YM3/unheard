# Gezamenlijke controle van Sprint 4.1

Deze checkout combineert de afzonderlijke reviewbranches. Zij is een technische
integratieproef, geen inhoudelijke goedkeuring of publicatiebesluit. De kleine
PR’s blijven de plekken voor gerichte review.

## Opgenomen werk

| PR   | Onderdeel                                        | Opgenomen broncommit |
| ---- | ------------------------------------------------ | -------------------- |
| #103 | Herkenning achteraf, fragmenten, printkleuren    | a5e3334              |
| #104 | Ontdekkingsroutes en compacte overzichten        | 678b1c9              |
| #105 | Grenzen en concept seksuele druk/dwang           | 44b435b              |
| #106 | Rouw, erkenning en steun                         | a0d24b5              |
| #108 | Contact, ouderschap en druk na een breuk         | ec12901              |
| #109 | Contentmatrix en clustering                      | d2a8d7f              |
| #110 | Artikellayout, leesvoortgang, hulpblok bij print | 4a04a22              |
| #111 | Introducties Begrijp het/Herstel                 | af7170c              |
| #112 | Zelftwijfel                                      | e274ad1              |
| #113 | Aanhoudende alertheid                            | 05623ff              |
| #114 | Financiële uitleg/signalen                       | 3dc2c3a              |

Origin/main was 09590d8 bij aanvang. #107 is daarin al opgenomen. De originele
lokale werkbomen zijn ongemoeid gelaten; nieuwe checkout in /private/tmp.

## Opgeloste integratieconflicten

- Printaudit: behoud van alle hub-/artikelroutes, mobiele beelden en controle van
  zowel nieuwe alertheidstekst als het hulpblok. Geen dubbele route-entry.
- Vier detailtemplates: ArticleContents uit #110 blijft; ArticleBody uit #103
  verzorgt de fragmenten. Geen herintroductie van PageRail of zusternavigatie.
- Waarom overkwam dit mij: inhoudelijke herschrijving uit #103 behouden, zonder
  de vervangen oude alinea terug te zetten alleen vanwege een gewijzigde link.
- Steunnetwerk: herschreven passage uit #106 behouden met actuele financiële URL.
- Printregels: zwart-witte herkenningsfragmenten én bijeenhouden van hulpblok.

Automatisch samengevoegde contentrelaties en interne links moeten eveneens door
content- en buildaudit worden gecontroleerd. Alleen conflictvrij samenvoegen is
geen bewijs van juiste werking.

## Resterende grenzen

De nieuwe kernartikelen over herkenning achteraf en seksuele druk blijven
ongepubliceerd. De build test hun zichtbare artikeluitvoer daarom nog niet.
Bronchecks zijn geen klinische of juridische goedkeuring. Raymond bevestigt de
bestaande persoonlijke passages en wijst gekwalificeerde reviewers toe aan de
medische, juridische en veiligheidsvragen in de afzonderlijke PR’s.

Nieuwe gecombineerde browser-/printuitvoer, Safari, handmatige screenreader en
zoomcontrole blijven te beoordelen. De matrix bevat ook nog niet uitgewerkte
A–J-lacunes en redactionele vervolgwerkzaamheden. Deze integratie sluit #44 of de
brede goal niet af. Niet automatisch mergen of publiceren als CI groen wordt.
