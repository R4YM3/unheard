# Concept comparison

Reviewed against the design discussion in the user-provided “Website over mannenmisbruik” chat on 2026-10-19. This is a build-direction review, not a replacement for the required founder, clinical, or legal review.

## Confirmed direction

- The Dutch brand is **Ongehoord** with the existing tagline.
- The visual language stays restrained, documentary, typographic, and adult. It deliberately avoids literal flat tree illustrations.
- Terracotta is reserved for calls to action and focused interaction, with a darker accessible action token.
- The site supports light, dark, and system appearance. The user-facing control is a single cycling icon button.
- The four intended semantic card meanings are safe/recovery, tension/pattern, alert/safety, and story/personal.
- The timeline is a semantic list with a vertical axis and milestone markers. Markers are anchored on the axis rather than offset beside it, including in RTL.

## Current implementation status

| Area                                     | Status         | Evidence / next move                                                                                                                                           |
| ---------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand, palette, typography, theme        | Implemented    | CSS tokens and the shared layout implement this baseline.                                                                                                      |
| Calm, non-illustrative direction         | Implemented    | No decorative tree/vector system was added.                                                                                                                    |
| Single three-state theme control         | Implemented    | One accessible button cycles light, dark, and system.                                                                                                          |
| Timeline axis and marker geometry        | Implemented    | The marker is centered on the axis with direction-aware transforms.                                                                                            |
| Safe and alert presentation              | Implemented    | Shared `Card` tones and help blocks provide semantic recovery, alert, tension, and story presentation.                                                         |
| Tension cards                            | Implemented    | Tension cards use a restrained terracotta, full-height jagged left edge rather than a separate decorative badge.                                               |
| Story cards                              | Implemented    | The founder timeline and child note use the shared warm story-card treatment.                                                                                  |
| High-fidelity homepage composition       | Partial        | The current homepage has the correct journey and CTA hierarchy but not the final editorial/photo-led composition. Use only licensed or owner-approved imagery. |
| Additional feelings and glossary content | Pending review | Do not invent personal accounts, clinical claims, or extra terminology pages. The source brief lists the intended subjects for reviewed publication.           |

## Safe next implementation order

1. Complete the homepage composition using approved imagery or a non-photographic treatment.
2. Add founder-approved Dutch articles for the remaining feeling and glossary topics.
3. Perform the specified mobile/desktop and print visual QA after the content set is stable.
