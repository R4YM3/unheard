# Ongehoord / Unheard

Een publieke, statisch gegenereerde Astro-website. De Nederlandse merknaam blijft **Ongehoord**; de technische repository en toekomstige domeinnaam gebruiken **unheard**.

## Lokaal ontwikkelen

```sh
npm install
npm run dev
npm run check
npm run build
```

`check` voert typecontrole, contentvalidatie en taalrouteringstests uit. `build` controleert daarnaast de statische HTML, metadata, JSON-LD, taal-attributen en GitHub-Pages-veilige links.

## Content toevoegen

Plaats een Markdown-bestand in `src/content/articles/` met gevalideerde frontmatter. Vul `locale`, een stabiele `translationKey`, route-`slug`, `published`, auteur, datum en bronnen in. Een nieuwe pagina verschijnt bij de build alleen wanneer `published: true` is. Onbeoordeelde vertalingen worden niet als volledig artikel gepubliceerd.

## Publicatie

GitHub Actions controleert elke pull request en bouwt/publiceert bij elke push naar `main` naar GitHub Pages. De pagina-instellingen gebruiken de Actions-workflow als publicatiebron. Configureer `SITE_URL` pas op `https://unheard.support` zodra het domein actief is.

De statische Pages-host kan geen `Accept-Language`-header op de server lezen. Daarom kiest alleen de rootpagina in de browser een taal op basis van: expliciete URL, opgeslagen keuze, browservoorkeuren en ten slotte Engels. Een expliciete locale-URL wordt nooit automatisch overschreven. De volledige, redactioneel beoordeelde inhoud is momenteel Nederlands; EN en AR zijn heldere startpagina's met een beperking, geen ongecontroleerde vertalingen.

## Projectafspraken

`PROJECT_BRIEF.md`, `EDITORIAL_POLICY.md` en `QUALITY_GATE.md` bevatten de inhoudelijke en veiligheidsgrenzen. Er worden geen onbevestigde feiten, persoonlijke details of medische/juridische conclusies gepubliceerd. Domeinregistratie en DNS zijn nog niet geverifieerd.
