# 0002. Mode and output are two independent fork axes

- Status: accepted
- Date: 2026-07-08

## Context

The original grill-me/grilling design (confirmed by watching the skill author's own explainer video) already splits into a `grill-me` trigger and a `grilling` subskill — this plugin mirrors that, no change needed there. What's new here is two forks layered on top of that split, confirmed from the same video plus the user's own requirements:

1. **Mode** — coding vs non-technical. The author's own tweak for non-coding use: drop the "explore the codebase instead of asking" line, and say "every aspect of this" instead of "this plan." Same one-question-at-a-time, recommended-answer-per-question mechanic either way.
2. **Output** — where the session's record lands: a research-discuss doc, plain chat (summary only, written at the end), or a plan-mode plan (the plan file itself is the artifact).

These are independent: any mode can pair with any output.

## Decision

`grill-me` resolves both forks (infer from context, ask if ambiguous) before handing off to `grilling` with `mode` + `output` parameters. `grilling` branches its prompt text on `mode` and branches where/how it writes the session record on `output`. Mode also decides the end-of-session chaining: coding → suggest `/opsx:propose`; non-technical → note where findings were saved.

## Consequences

- Positive: one skill pair, four practical combinations, no duplicated logic.
- Positive: matches the source design's own precedent (author himself forks by editing two lines for non-technical use) rather than inventing a new split.
- Negative: `grilling`'s SKILL.md carries more conditional logic than a single fixed prompt — acceptable at this scale (well under skill-creator's 500-line guidance).

*Source: `tychay-ai-vault/myself/daily/grill-me.md`, and the grill-me skill author's explainer video (mux clip, watched 2026-07-08).*
