# Lancering: van conceptsite naar vindbare site

Stand op 4 november 2026. Technisch is de site klaar: een proefbuild als vindbare site
(`NO_INDEX=false`) haalt in Lighthouse 100 voor prestaties, toegankelijkheid en SEO op alle
gemeten routes. robots.txt en de sitemap (90 pagina's) kloppen. Wat de livegang nu tegenhoudt,
is alleen inhoud.

Bekijk op elk moment wat nog tegenhoudt:

```sh
npm run audit:launch
```

## 1. Inhoud afronden (jij)

- [ ] De ik-passages schrijven of weghalen. Er staan nu `[OPRICHTER REVIEW NODIG]`-markeringen
      in 15 bestanden. Bezoekers zien ze niet, maar de build weigert ze zodra de site vindbaar
      wordt. Bekijk ze met `?review` achter een URL.
- [ ] Per pagina een inhoudelijke review, bij voorkeur met iemand uit de hulpverlening, en voor
      de ouderschaps- en praktische pagina's met iemand met kennis van familierecht.
- [ ] Na de review per pagina in de frontmatter: `status: approved` en
      `reviewedAt: <datum>`. Nu staan alle 90 gepubliceerde pagina's nog op concept of in review.
- [ ] Pagina's die je nog niet wilt laten zien: `published: false`. Je hoeft niet alles tegelijk
      te lanceren; een kern van ±25 pagina's is een goed begin (zie `docs/VERBETERPLAN.md`).

## 2. Keuzes (jij)

- [ ] Hoe je in beeld komt: "de oprichter van Ongehoord", een voornaam of je naam. Laat dit liefst
      eerst toetsen door een advocaat of het Juridisch Loket. Een naam zet je in
      `src/lib/site.ts` (`founderName`).
- [ ] De melding bovenaan aanpassen van "conceptversie" naar een melding dat de site vanuit eigen
      ervaring is geschreven (`site-notice` in `src/layouts/BaseLayout.astro`).
- [ ] Foto's toevoegen in `src/assets/photos/` (zie de README daar), of de illustraties houden.

## 3. Livegang (technisch, kan Claude doen)

- [ ] `npm run audit:launch` geeft geen fouten meer.
- [ ] In GitHub: Settings → Secrets and variables → Actions → variabele `NO_INDEX` op `false`.
- [ ] Na de deploy controleren: `https://unheard.support/robots.txt` noemt de sitemap, pagina's
      hebben geen `noindex` meer, en Lighthouse SEO is 100.
- [ ] De sitemap (`https://unheard.support/sitemap-index.xml`) aanmelden bij Google Search Console
      en Bing Webmaster Tools.
- [ ] `npm run audit:sources` draaien en kapotte bronnen vervangen.

## 4. Na de livegang

- [ ] Een korte test met een schermlezer (VoiceOver op iPhone) en alleen het toetsenbord.
- [ ] Eén of twee mensen uit de doelgroep laten rondkijken terwijl je meekijkt.
- [ ] Elk kwartaal `npm run audit:sources` en de hulpnummers in `docs/SOURCES_VERIFIED.md`
      opnieuw controleren.
