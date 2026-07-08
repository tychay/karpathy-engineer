# 0001. Plugin lives in the marketplace, not project-local

- Status: accepted
- Date: 2026-07-08

## Context

The Karpathy Method (interview-driven spec, small agile buckets, explicit verification) is a personal workflow methodology, not something specific to `my-project`. It needs to be usable from any project — including non-code projects like the Android retro-handheld runbook.

## Decision

Ship it as a standalone plugin, `karpathy-engineer`, in `the-plugin-marketplace`, structured like the existing `ai-maturity-ladder` and `openspec-adr` plugins (own `.claude-plugin/plugin.json`, own `openspec/` + `adr/` for its own development).

## Consequences

- Positive: installable across any project via the marketplace, versioned independently.
- Positive: mirrors an already-proven pattern in this marketplace.
- Negative: any runtime state the skills produce (grilling sessions) cannot live inside the plugin itself — it must live somewhere else, since the plugin is the mechanism, not the data. See [[0003]].

*Source: `personal vault notes`.*
