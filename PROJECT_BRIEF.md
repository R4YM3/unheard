# ONGEHOORD — product and design brief (handoff 2026-10-18)

## Mission
Dutch-first website offering words, recognition, understanding and practical recovery to people affected by emotional and financial abuse, **especially men** because of stigma. Women and other readers are welcome. Recognition without diagnosing a partner. Founder-driven personal initiative initially (use "ik" for personal copy; no invented editorial team or community).

Positioning: **Ongehoord** — “Voor alles wat je voelt, maar nog niet kunt verwoorden.”
Journey: **Herkennen → Begrijpen → Herstellen**, with safe support at every stage. Don't lead with clinical labels. No promising diagnoses or treatment.

## Launch pages and navigation
- `/nl/` — homepage: cinematic/quiet intro explicitly about emotional AND financial abuse, special focus on men, inclusive; emotional entry cards then knowledge/recovery/founder's story, supporting friends, help.
- `/nl/wat-voel-ik/` — feelings index.
- `/nl/wat-voel-ik/ik-twijfel-aan-mezelf/` — template: 3 clearly separate scenario buttons ABOVE two joined top-corner-only perspective tabs (“Wat er gezegd wordt”, “Wat ik vanbinnen voel”), then explanation, impact, recovery and useful links. Dark inner panel eyebrow must have legible light text (contrast fix in latest reference).
- Additional real emotion pages, prioritized: guilt, losing self, difficulty setting boundaries, "ik begrijp het maar het blijft pijn doen", concerns about money.
- `/nl/begrijp-het/` — topic index; link psychology/behavior pattern explanations to human impact.
- `/nl/begrippen/` — canonical glossary with individual terms: DARVO, gaslighting, triangulatie, framing, hoovering, schuldverschuiving, love bombing, isolatie, financiële controle, hyperwaakzaamheid, traumabinding etc. Also explain narcissism, covert/vulnerable narcissism, sociopathy as concepts distinct from formal diagnoses; avoid labeling real people.
- `/nl/begrippen/darvo/` — reference page in references/darvo.html; include emotion-to-support pathways but NO automatic treatment recommendation.
- `/nl/financieel-misbruik/` — distinct pillar, reference in references/financieel-misbruik.html.
- `/nl/herstel/` and `/nl/herstel/therapie/` — therapy reference in references/herstel-therapie.html, founder's actual experiences separated from general health info.
- `/nl/mijn-verhaal/` — founder's voice and progressive layered chronological timeline. Always visible key cards; expandable BETWEEN moments; deeper stories have 4 lenses: events, feelings, how self changed, insight today. Start with life before relationship; don't fabricate details or direct causation. Include fatherhood and a timeless loving letter to children with no identifying details, no burden of responsibility placed on them.
- `/nl/hulpmiddelen/` — printable self-reflection cards; optional partner conversation card ONLY with clear safety consideration; cards for therapy and friends/family.
- `/nl/hulp-vinden/` — help and safety: Veilig Thuis 0800-2000; for imminent danger 112; for suicidal thoughts 113 or free 0800-0113 + chat at 113.nl (verify country/localization). Privacy and safe device guidance.
- `/nl/ik-maak-me-zorgen-om-iemand/` — supporting a friend without pressure, diagnosing their partner, or escalating risk.
- Future source-backed `/nl/mannen-in-cijfers/` with dated verified methodology, no unsupported causal links between suicide and abuse or speculative group rankings.

## Experience components
- Emotion card; pattern/tension card; safe/recovery card; safety/alert card; personal/story card.
- Tension cards: VERY subtle approximately 6px terracotta jagged LEFT edge, integrated top-to-bottom, not a chunky serrated badge. No nature vector illustrations.
- Perspective switch: two tabs joined to content card, only OUTSIDE upper corners rounded, inner panel below has bottom corners; native buttons with correct tab semantics/keyboard focus. Three separate case-choice buttons above; maintain state and print BOTH views.
- Layered timeline: large milestones visible by default, smaller intervening event tiles expandable between milestone cards; four deeper narrative layers; entire story in semantic HTML and print; align circle marker geometrically with line, including mobile/RTL.
- Non-diagnostic reflection content, no persistence by default, optional copy/print.
- Use relevant real links to existing pages, never empty/dummy links. Do not promise that future content is live.

## Visual language
Deep Charcoal #242A29; Warm Paper #F1EEE7; Sage Grey #A6ADA0; Muted Terracotta #BB7965; Forest Ink #465A50; primary CTA high-contrast darker terracotta #9D5846. Modern strong sans-serif headlines and accessible sans body. Avoid old-fashioned full-page serif. Air, restraint, documentary/photographic feeling; colored gradient photo placeholders acceptable until licensed or original photos approved. NO fake stock / blank image references. Serif only perhaps restrained quotations. Motion subtle and reduced-motion accessible. Consistent mobile/desktop hierarchy and CTA language.

## Language & metadata
NL full launch source; EN and AR later with properly translated copy. Never show switch as functional until page has approved translation. Route locales e.g. `/nl/`, `/en/`, `/ar/`; translated slugs optional; hreflang only for actually published equivalents; lang and dir=rtl for Arabic. No flags.
SEO: fast SSG/SSR, useful answer-first content, canonical, internal contextual links, good page title/meta, sitemap.xml, robots.txt, breadcrumbs, schema.org WebSite/Organization/Article/DefinedTerm as appropriate, source date/byline, valid JSON-LD matching content. GEO: precise definitions, readable headings, citations/attribution, clear human review; never fabricate references or claim rankings.

## Printing
Dedicated `print.css`; A4, readable black on white, hide navigation/sticky UX/decorative photos, preserve titles, source attribution, URLs, author/review date, print all tab/accordion/timeline contents in logical order even when collapsed on screen. Optional printable therapy/question cards. Don't automatically print filled sensitive personal answers; offer informed deliberate action only. Test in mobile desktop and print preview.

## Safety and verification
Review external stats and assistance contact info against authorities before publish. Clinical material requires qualified review and no treatment prescriptions. Legal/privacy review personal allegations before publishing due to ongoing separation and children's privacy. No identifying minors or partners. Explicitly distinguish anecdote from evidence.

## Definition of done — first shipping milestone
Responsive integrated navigation, home, founder story with timeline, self-doubt, DARVO, financial abuse, recovery/therapy and help available as REAL routes; functioning cross-links; content separate from UI; semantically correct, accessible and printable; static generated SEO; NL works. EN/AR architecture prepared but hidden until translation review. Document unimplemented articles rather than pretending they exist.
