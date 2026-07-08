# 0004. One file per grilling session, not a single growing document

- Status: accepted
- Date: 2026-07-08

## Context

`research-discuss` (an existing skill in this ecosystem) uses a single doc per topic that grows across sessions — user and AI both write into it over time. The user flagged that this pattern gets unwieldy: those files get too long to be useful as a quick reference.

## Decision

Every grilling session starts a fresh file: `tychay-ai-vault/myself/grilling/YYYY-MM-DD-topic-slug.md` (date-only prefix, matching the convention already used in `tychay-ai-vault/mystuff/actionables/claude-code-plans/`; on same-day/same-topic collision, append `-2`, `-3`, ...). A separate `INDEX.md` in the same folder links every session for human browsing. Each session file's frontmatter carries `status: in-progress | resolved | superseded`, which is the source of truth for resume logic — `grilling` checks frontmatter status before starting fresh on a topic that already has an in-progress session.

This does not preclude using `research-discuss`'s own doc format as one of the three *output modes* (see [[0002]]) — when that mode is chosen, the growing doc is research-discuss's own artifact, and the grilling session file just records a pointer to it.

## Consequences

- Positive: any single file stays small and scannable.
- Positive: resuming a specific past session is a direct file open, not a scroll through a long doc.
- Negative: discovering related sessions on the same topic requires checking `INDEX.md` rather than finding everything in one place — acceptable trade, since `INDEX.md` is built for exactly that.

*Source: user decision during bucket-1 planning, 2026-07-08.*
