---
description: Conduct a structured, one-question-at-a-time interview to resolve every open decision in a plan or task before implementation. Invoked by grill-me with mode (coding/non-technical) and output (research-discuss/chat/plan) parameters, but independently triggerable when asked to "interview me," "walk the decision tree," or "resolve open questions one by one."
---

# grilling

The actual interview mechanics. Runs with a `mode` and an `output`, both set by `grill-me` (default to `mode: non-technical`, `output: chat` if invoked directly without them).

## Core loop (both modes)

Interview relentlessly about every aspect of the thing at hand until reaching a shared understanding. Walk down each branch of the decision tree, resolving dependencies one-by-one.

- **Ask one question at a time.** Wait for the answer before asking the next. Batching questions is bewildering and produces worse answers.
- **For every question, provide a recommended answer.** The user can accept it or override it — but never ask a bare open question without your own read on it.
- **Facts vs decisions**: if something is a fact you can establish yourself (mode-dependent — see below), establish it rather than asking. Decisions belong to the user — put each one to them and wait.
- **Do not enact anything** until the user confirms shared understanding is reached. Grilling only produces understanding, never action.

## Mode branch

- **`mode: coding`** — if a question can be answered by exploring the codebase, explore it instead of asking. Refer to the subject as "this plan."
- **`mode: non-technical`** — no codebase to fall back on; every open question goes to the user. Refer to the subject as "every aspect of this."

## Output branch

Governs where the session record lands. Check `tychay-ai-vault/myself/grilling/INDEX.md` first — if an `in-progress` session already exists for this topic (by frontmatter `status`), resume it instead of starting fresh.

- **`output: research-discuss`** — use the `research-discuss` skill's doc format for the live back-and-forth. Still create a session file in `tychay-ai-vault/myself/grilling/` that points at the research-discuss doc, so it's discoverable from the index.
- **`output: chat`** — no live doc. The interview happens purely in conversation. At the end, write only the final resolved-decisions summary to a fresh session file.
- **`output: plan`** — if already in plan mode, the plan file itself is the artifact. Still append an index entry pointing at the plan file path; skip creating a separate session file.

## Session file mechanics (output: research-discuss and output: chat)

- **Location**: `tychay-ai-vault/myself/grilling/`.
- **Naming**: `YYYY-MM-DD-topic-slug.md` — date only, no time component. On a same-day/same-topic collision, append `-2`, `-3`, etc.
- **Never append to a prior session's file.** Every session is a fresh file, even on the same topic — resuming means reading the prior file for context, not writing into it.
- **Frontmatter**: `status: in-progress | resolved | superseded`, `mode: coding | non-technical`, `output: research-discuss | chat | plan`.
- **Content**: blockquoted per ADR-0013 (this is AI-synthesized content in `tychay-ai-vault/myself/`) — the user's own answers may stay unquoted if captured verbatim, but the synthesized Q&A summary itself must be blockquoted.
- **At session end**: set `status: resolved` in the file's frontmatter, and append one line to `tychay-ai-vault/myself/grilling/INDEX.md` (date, topic, link, status).

## Ending a session

Report back to `grill-me` (or the user, if invoked directly) that shared understanding was reached, along with the session file path (if one was written) so `grill-me` can close the loop per its own instructions.
