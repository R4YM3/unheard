# Review: begrippen (term articles)

Status on 2026-10-20 for branch `content/begrippen`. Every article is a draft for editorial,
founder and, where noted, clinical or legal review. Nothing here has been reviewed by a human
yet: `reviewedAt` is `null` everywhere, and the site stays `NO_INDEX`.

## How sources were checked

- Every source URL was requested with `curl` on 2026-10-20. 38 returned HTTP 200.
- The 9 DOI links return HTTP 302 at doi.org, and their titles match Crossref. The publishers
  return 403 to scripts.
- politie.nl (403 to curl) and pubmed (203) were fetched and read separately.
- Each claim was checked against the source text (web page, abstract or PDF text).
- `checkedAt: 2026-10-20` marks the date of that check.
- Juridisch Loket blocks scripts on some days. Its "hoe we werken" page was fetched successfully
  in the final check.

## Per article

The first column links to the page; the second gives the translation key (if different) and status.

| Article                                    | Key / status                                                             | Sources                                                                                   | Words |
| ------------------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ----- |
| `begrippen/gaslighting`                    | in_review                                                                | Sweet 2019, Veilig Thuis, Huiselijkgeweld.nl, Thuisarts                                   | ~890  |
| `begrippen/darvo`                          | in_review (body expanded, components unchanged)                          | Freyd, Harsey 2017, Harsey & Freyd 2020, Huntley 2019, Veilig Thuis                       | ~650  |
| `begrippen/schuldverschuiving`             | in_review                                                                | Veilig Thuis, Harsey 2017, Huiselijkgeweld.nl, Thuisarts                                  | ~710  |
| `begrippen/projectie`                      | in_review                                                                | APA Dictionary ×2, Huiselijkgeweld.nl                                                     | ~630  |
| `begrippen/triangulatie`                   | in_review                                                                | Bowen Center, factsheet intieme terreur, Augeo, Veilig Thuis                              | ~730  |
| `begrippen/framing-en-beeldvorming`        | `framing`, in_review                                                     | Harsey & Freyd 2020, Sweet 2019, factsheet intieme terreur, Huntley 2019, Juridisch Loket | ~760  |
| `begrippen/hoovering`                      | in_review                                                                | Veilig Thuis ZHZ, Dutton & Painter 1993, factsheet intieme terreur, Thuisarts             | ~710  |
| `begrippen/silent-treatment`               | in_review                                                                | Williams 2007, Schrodt e.a. 2014, Veilig Thuis, Augeo                                     | ~740  |
| `begrippen/love-bombing`                   | in_review                                                                | Strutzenberg e.a. 2017, Augeo ×2, factsheet intieme terreur                               | ~700  |
| `begrippen/dwingende-controle`             | in_review                                                                | Veilig Thuis, Stark & Hester 2019, factsheet, Augeo, Rijksoverheid 2026, Movisie          | ~880  |
| `begrippen/isolatie`                       | in_review                                                                | Veilig Thuis, Stark & Hester 2019, factsheet, Williams 2007                               | ~670  |
| `begrippen/sociale-druk`                   | in_review                                                                | Movisie, Huntley 2019, Harsey & Freyd 2020, Bowen Center                                  | ~770  |
| `begrippen/macht-en-afhankelijkheid`       | in_review                                                                | Movisie, Dutton & Painter 1993, Stark & Hester 2019                                       | ~670  |
| `begrippen/psychische-manipulatie`         | in_review                                                                | Veilig Thuis, LKAH, Sweet 2019, Freyd                                                     | ~650  |
| `begrippen/financieel-economisch-misbruik` | `economisch-misbruik`, in_review                                         | Handreiking financieel misbruik 2024, Postmus e.a. 2012, Movisie, LKAH, Geldfit           | ~870  |
| `begrippen/schulden-op-naam`               | in_review, **legal review**                                              | LKAH, Rijksoverheid ×2, BKR, RvIG/CMI, Movisie, Geldfit                                   | ~820  |
| `begrippen/controle-over-uitgaven`         | in_review                                                                | LKAH, Postmus e.a. 2012, handreiking 2024, Nibud 2019, Geldfit                            | ~660  |
| `begrippen/traumabinding`                  | in_review                                                                | Dutton & Painter 1993 (DOI and PubMed), Veilig Thuis ZHZ, Thuisarts                       | ~730  |
| `begrippen/fawn-respons`                   | in_review                                                                | Pete Walker (clinical opinion), LKAH                                                      | ~720  |
| `begrippen/hyperwaakzaamheid`              | in_review                                                                | APA Dictionary, Thuisarts PTSS, LKAH, 113                                                 | ~680  |
| `begrippen/zelftwijfel`                    | `begrip-zelftwijfel`, in_review                                          | Sweet 2019, Harsey 2017, LKAH                                                             | ~690  |
| `begrippen/emotionele-uitputting`          | in_review                                                                | Thuisarts ×2, LKAH, 113                                                                   | ~680  |
| `begrippen/narcisme`                       | in_review, **clinical review**                                           | StatPearls NPD, Pincus & Lukowitsky 2010, Bach e.a. 2022, Thuisarts, GGZ Standaarden      | ~940  |
| `begrippen/sociopathie-en-psychopathie`    | `antisociale-persoonlijkheidsstoornis`, in_review, **clinical review**   | StatPearls ASPD, Werner e.a. 2015, Bach e.a. 2022, Thuisarts                              | ~870  |
| `patterns/emotioneel-misbruik.md`          | draft, **not published** (merged into `begrijp-het/emotioneel-misbruik`) | politie.nl, LKAH, Veilig Thuis, Rijksoverheid 2026, Thuisarts                             | ~740  |
| `patterns/conflict-of-controle.md`         | draft, **not published** (merged into `begrijp-het/conflict-of-patroon`) | Rijksoverheid 2026, Augeo ×2, Stark & Hester 2019, Movisie, Schrodt e.a. 2014             | ~1010 |

Every article follows the same order:

1. wat is het;
2. hoe kan het eruitzien;
3. a fictional dialogue labelled "Illustratief voorbeeld — verzonnen";
4. wanneer is het niet zomaar af te leiden;
5. impact;
6. wat kan helpen.

Each page includes Veilig Thuis (0800-2000) as a help route. The impact articles also give 113,
and the debt, fraud and money articles give Geldfit, BKR and CMI.

## Claims left out or corrected

- **Gaslighting.** The origin of the term in the play and film _Gaslight_ was left out. Sweet's
  article was not checked for it, and I added no separate source.
- **Juridisch Loket.** The first draft said it "geeft gratis eerste advies". Corrected: the
  information on the website is free for everyone; free personal advice is for people below an
  income and savings limit.
- **Huntley 2019.** The paraphrase "de verwachting niet serieus genomen te worden" was replaced
  by the themes the review itself names: fear of not being believed, fear of being seen as the
  perpetrator, challenge to masculinity, shame.
- **Financieel versus economisch misbruik.** The first draft got the handreiking's distinction
  wrong. Corrected after reading the PDF: economic abuse is control over means to create
  dependency; financial abuse "draait niet per definitie om controle of dwang".
- **Dwingende controle.** An unsourced claim that the period around leaving is especially risky
  was removed. The text now only says Veilig Thuis can help plan a safe way out.
- **Augeo 1sociaaldomein Q&A.** This practitioner forum was dropped as a source for the risk of
  joint conversations. It was replaced by Augeo's own learning module, which quotes an expert.
- **"Sociopaat".** The historical psychiatric use of the word was left out because it was not
  verified. The article only says it is not a diagnosis in DSM-5 or ICD-11.
- **StatPearls author names** were left out of the labels, because the pages could not be loaded
  for verification (reCAPTCHA). The URLs do work in a browser.
- **The 2026 bill.** It is described as a proposal in consultation, never as law. It needs
  updating when the legislative status changes.
- **Statistics.** No prevalence figures are used anywhere. Where a source gives figures, such as
  Movisie or Werner e.a., the article only uses the qualitative finding.

## Claims that need extra attention

- **Fawn-respons.** It rests on one clinician's website (Pete Walker), not peer-reviewed. The
  article says so explicitly. Is that enough, or should the page wait for a better source?
- **Traumabinding.** Dutton & Painter studied 75 women, mostly after physical violence. The
  article spells out that this may not transfer directly to men or to non-physical abuse.
- **Love bombing.** One student sample from 2017 (n=484, US, self-report); the limits are named
  in the text.
- **Hoovering.** Not a scientific concept; the article says so and only describes the experience.
- **Narcisme and sociopathie/psychopathie.**
  - Check the DSM-5 wording.
  - Check the ICD-11 claim that the specific types disappear in favour of severity plus trait
    domains, as described by Bach e.a. 2022.
  - Check how Pincus & Lukowitsky's position against "covert" as a separate type is presented.
- **Schulden op naam.**
  - Check the statement on liability under gemeenschap van goederen before and after
    1 January 2018.
  - Check the identity-fraud steps (bank, evidence, police report, CMI, don't pay unjustified
    debt collectors).
- **Demand/withdraw.** The meta-analysis (Schrodt e.a. 2014) links the pattern to lower
  satisfaction for both genders in both roles. Check that this summary is correct.

## Questions for the founder

1. **Voice and perspective.** All term articles are written as neutral, editorial knowledge text
   (`author: editorial`), addressing the reader as "je", with no first person and no "wij". Do you
   want a short personal note on some pages, such as DARVO or gaslighting? I invented nothing
   personal.
2. **Men as the focus.** Most dialogues have a male "jij", and the gender of "de ander" varies
   (often unspecified, sometimes "zij"). Some passages explicitly address men, using Movisie and
   Huntley. Does that balance feel right to you?
3. **Clinical pages.** May `narcisme` and `sociopathie-en-psychopathie` go live at launch, or
   should they stay unpublished until a psychiatrist or clinical psychologist has read them?
4. **Two merges with the other branch.** My versions of _emotioneel misbruik_ and _conflict of
   controle_ are not published, because `begrijp-het/…` already covers both. Do you agree, or do
   you want a separate glossary page for either one?
5. **Psychopathie as a separate page.** The other branch planned the key `psychopathie`. I merged
   it with the antisocial personality disorder because the two are often confused. Is one page
   OK?
6. **Words like "narcist" in the glossary.** The alias lists include popular search terms
   (narcist, sociopaat, flying monkeys) so people can find the page. Do you want those terms in
   the index, or only in the text?
7. **Missing terms.** `conflictvermijding`, `verlies-van-identiteit` and `schaamte` are planned
   keys but were not in my brief. Who writes them?

## Links to planned or other-branch routes

Links pointing to pages owned by `feat/handoff-gap-implementation`:

- `nl/begrijp-het/emotioneel-misbruik/`
- `nl/begrijp-het/conflict-of-patroon/`
- `nl/begrijp-het/financieel-misbruik/`
- `nl/herstel/therapievormen/`

They exist in that branch's working tree but not yet in its committed history.

I did not link these planned handoff routes, because they did not exist when I wrote the
articles:

- `nl/veilig-gebruik/`
- the hulpmiddelen checklists
- `wat-voel-ik/ik-mis-iemand…`
- `ik-zoek-steeds-bevestiging`
- `ik-sta-voortdurend-aan`
- `ik-ben-bang-om-over-geld-te-praten`

Once those are published, these links would fit well:

| Planned route                        | Articles that should link to it              |
| ------------------------------------ | -------------------------------------------- |
| `ik-sta-voortdurend-aan`             | `hyperwaakzaamheid`, `fawn-respons`          |
| `ik-ben-bang-om-over-geld-te-praten` | `controle-over-uitgaven`, `schulden-op-naam` |
| `ik-mis-iemand…`                     | `traumabinding`, `hoovering`                 |

## QA results

On the old `main` base (branch `backup/begrippen-main-base`):

- `npm run check` passed: astro check, eslint, prettier, validate-content and the tests.
- `npm run build` passed: 46 pages, and the dist audit (links, H1, JSON-LD, sources) was clean.

On the rebased base (`578fe69`), this branch does not build yet. The cause is in the parallel
branch: its emotion and hub files don't match its new schema yet. My patterns pass
`validate-content.mjs` with no errors of their own.

As a stand-in, I built a throwaway copy: the parallel branch's working tree as of
2026-10-20 09:31, plus my patterns. Three local patches were needed in that copy, all to files
owned by the parallel branch:

- a scenario string padded to 10 characters;
- frontmatter fields added to `voor-naasten`;
- missing `kaart-*` keys added to `plannedKeys`.

Results in that copy:

- `validate-content`: 85 files, no errors.
- `astro check`: 1 error, in `PerspectiveSwitch.astro` (theirs).
- `astro build`: complete.
- `audit-dist`: all 24 `/nl/begrippen/…` pages clean. The remaining audit errors are in their
  files: a missing tool link, and robots.txt review blocks.
- The rendered pages show the status badge, the "nog niet inhoudelijk gecontroleerd" notice,
  DefinedTerm JSON-LD, sources with check dates, related cards, and all 24 terms on the
  `/nl/begrippen/` index.

Not done for this content batch, and still needed before release:

- axe audit, print-to-PDF check and screen-reader smoke test on the final templates;
- styling of blockquotes and tables in print.
