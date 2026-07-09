# 0004. karpathy-coder is vendored wholesale into this plugin

- Status: accepted
- Date: 2026-07-09

## Context

`karpathy-engineer`'s Core Rules require that technical work follow coding-discipline guidelines (assumption surfacing, complexity limits, surgical diffs, verifiable goals) as a complement to the interview/verification/environment loop. Rather than write that discipline layer from scratch, the user surveyed existing karpathy-inspired skills (via skillsmp.com's karpathy-tagged listings) and selected `karpathy-coder`: it had both the right rules content and matching enforcement mechanics (a review agent, a `/karpathy-check` command, and a pre-commit hook), consistent with the reinforcement pattern already used by `ai-maturity-ladder`.

Two integration paths existed: install `karpathy-coder` globally as an independent plugin, or vendor it into `karpathy-engineer` directly. Global install would keep it decoupled but leave `karpathy-engineer` dependent on an external plugin being present. Vendoring was chosen deliberately: it makes `karpathy-engineer` self-contained (its dependencies on `openspec` and `research-discuss` are already conditional, not hard), and keeps the door open to refactor or reuse `karpathy-coder`'s scripts/hooks directly as this plugin evolves, rather than treating it as an untouchable external dependency.

## Decision

Vendor `karpathy-coder` wholesale (skills, agent, command, hook — see commit `30775ef`) into `karpathy-engineer` rather than requiring it as a separate installed plugin.

## Consequences

- Positive: `karpathy-engineer` is self-contained; no cross-plugin install-order dependency.
- Positive: its scripts/hooks/agent are directly available to adapt in place as the plugin evolves.
- Negative: any upstream improvements to the original `karpathy-coder` skill won't be picked up automatically — this plugin now owns its own copy.

*Source: user decision during the doc/reality surgery grilling session, 2026-07-09.*
