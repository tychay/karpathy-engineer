# 0002. grill-me is a single skill, not forked by mode or output

- Status: accepted
- Date: 2026-07-09

## Context

The original design this was modeled on (a third-party karpathy-inspired skill) splits into a rigid `grill-me` entry skill plus a `grill-with-docs` variant for coding tasks with upfront, documented domain-modeling. Investigating that source showed the split exists specifically to support `grill-with-docs`'s upfront-document requirement — which is a progressive-disclosure violation: it forces structure before the interview has earned it.

Karpathy's own framing (see `karpathy-interview-breakdown-video-notes.md`): "the best way to find a leak in a hose is to run water through it." Building a mode/output fork now, with no evidence it's needed, is over-engineering ahead of any observed leak.

## Decision

`grill-me` ships as one flat skill: no mode axis (coding vs non-technical), no output-mode fork baked into its own control flow. It asks questions, tracks the decision map, and offers a small set of delivery choices (chat only, markdown file, research-discuss) at the end — as options, not as a branching architecture.

This is deliberate, not a shortcut, and it is not necessarily final. Re-fork only when a concrete failure ("leak") surfaces during real use that a flat skill can't handle — not speculatively.

## Consequences

- Positive: single file to maintain, no conditional-logic bloat for a distinction that hasn't proven necessary.
- Positive: avoids reproducing the source design's progressive-disclosure violation.
- Negative: if a real need for mode-specific phrasing or behavior does emerge, it requires a new decision (and likely a new ADR) rather than being pre-solved.

*Source: user decision during the doc/reality surgery grilling session, 2026-07-09.*
