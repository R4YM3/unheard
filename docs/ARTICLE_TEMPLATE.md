# Article content template

Copy this file into `src/content/articles/<section>/<slug>.md`, then replace every placeholder.
Do not set `published: true` until the content, sources, internal relations, and translation status
have been reviewed.

```md
---
title: 'A clear, reader-centred title'
description: 'A specific description of at least thirty characters for search and sharing metadata.'
locale: nl
translationKey: stable-translation-key
slug: section/route-slug
kind: emotion # emotion | concept | recovery | resource
published: false
author: Ongehoord
updatedAt: 2026-10-19
related: [another-published-translation-key]
sources:
  - label: 'Primary or trusted source'
    url: 'https://example.org/source'
hero:
  eyebrow: Section / topic
  paragraphs:
    - A first, calm paragraph that is meaningful without JavaScript.
    - A second paragraph that states limits and avoids diagnosing another person.
  actions:
    - href: '#what-this-means'
      label: What does this mean?
    - href: nl/hulp-vinden/
      label: Find support
      quiet: true
---

## What this means

Write the essential explanation in plain language. Do not make clinical, legal, or factual claims
without a specific source in the frontmatter.

## A safe next step

Offer options rather than instructions. Do not ask readers to submit sensitive information, and do
not add a form that stores responses.
```

## Before publishing

1. Add only approved facts and founder-approved first-person text.
2. Use a unique, lowercase route slug and a stable `translationKey`.
3. Add at least one specific HTTPS source for published articles.
4. Point `related` only at existing published articles in the same locale.
5. Run `npm run check` and `npm run build`.
6. Keep a translation unpublished until the entire equivalent page has native-language editorial review.
