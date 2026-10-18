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

## Referenties

Files:
- `AGENTS.md`: persistent constraints for coding agent
- `CODEX_GOAL.md`: initial Codex task
- `PROJECT_BRIEF.md`: approved product, design and UX rules
- `ROADMAP.md`: phased delivery and acceptance
- `EDITORIAL_POLICY.md`: accuracy/privacy/health safeguards
- `references/`: actual HTML/MD prototypes as source material

Several references are single-file mobile friendly HTML, not connected application routes. No production translation or real photography is included. Domain registration remains unverified and out of scope.
