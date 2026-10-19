# Editorial handoff

This document records the approvals needed before public discovery or a broader Dutch content release. It is an editorial checklist, not clinical or legal advice.

## Publication boundary

- Keep `NO_INDEX=true` until the founder, clinical reviewer, and legal reviewer have approved the release scope.
- The founder's anonymous first-person voice is intentional. Preserve it verbatim unless the founder requests an edit.
- Do not add names, dates, locations, children's details, allegations about identifiable people, diagnoses of another person, therapy outcomes, or causal claims that are not already approved.
- EN and AR are technical review stubs only. Publish a language switch and `hreflang` only when the equivalent translated page has been reviewed.

## Founder review

Confirm, page by page:

1. The personal story, timeline, therapy experiences, and letter to children still sound like the founder.
2. Each personal statement is safe to publish anonymously and contains no identifying detail about children, a former partner, family, treatment provider, workplace, or ongoing proceeding.
3. Any proposed detail in the currently reserved timeline sections is explicitly approved before it is added.
4. The purpose and copy on the published feeling pages about guilt, boundaries, loss of self, and persistent pain after insight are approved. The existing financial-abuse page remains the route for money concerns.

## Clinical review

Confirm that:

1. New glossary entries use non-diagnostic language and distinguish a concept from diagnosing a person.
2. General descriptions of therapy are accurate, qualified, and clearly separate from the founder's experience.
3. Safety and crisis routes remain correct for the Netherlands, including 112, Veilig Thuis, and 113.
4. Any statistics, prevalence claims, or treatment information has a dated primary or authoritative source and does not infer causation.

## Legal and privacy review

Confirm that:

1. Personal-story wording contains no identifiable allegation or detail that could create avoidable risk in an ongoing matter.
2. References to children state care and affection without assigning them responsibility for the founder's wellbeing.
3. Screenshots, photographs, documents, and linked resources have permission for public use.

## Content backlog

Do not create these as placeholder public pages. Add one only after the relevant review is complete.

- Glossary: gaslighting, triangulation, framing, hoovering, blame shifting, love bombing, isolation, financial control, hypervigilance, and trauma bonding.
- Evidence page: `mannen-in-cijfers` with a dated methodology and source review; do not use suicide statistics as evidence that abuse caused an outcome.
- Translations: complete EN and AR equivalents with native-language editorial review, then enable the language switch and `hreflang` for exact published pairs.

## Final release checks

1. Run `npm run check`, `NO_INDEX=true npm run build`, `NO_INDEX=true npm run audit:lighthouse`, and `npm run audit:print`.
2. Manually check keyboard navigation, 200% zoom, 320px and desktop widths, light/dark/system modes, and print previews in Chrome and Safari.
3. Verify the GitHub Pages custom-domain certificate before directing anyone to HTTPS.
4. Only after the approvals above, change the `NO_INDEX` Actions variable to `false` and verify robots, sitemap, canonicals, and the live HTTPS certificate.
