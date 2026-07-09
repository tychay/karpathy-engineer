# Workflow: Agile Build

<required_reading>
None — this workflow depends on the `grill-me` and `karpathy-coder` skills, and optionally OpenSpec (`opsx:proposal`/`opsx:apply`), not on create-agent-skills reference files.
</required_reading>

<process>
## Step 1: Spec The Bucket

The bucket must be fully spec'd before executing. "Fully spec'd out" always includes:
- A **precise plan** for the bucket, that also
- defines a **verification lever** — feedback + loop while executing the plan to done
- ends in a **checkpoint** for review before moving on.

Use one or more `grill-me` sessions. Can run in a separate session to save context.

Example: technical + OpenSpec → plan enough to make an `opsx:proposal`.

## Step 2: Define The Verification Lever

Agree on:
- An outline of eval criteria for a high-quality final product. Be precise.
- Pull external signal where possible (e.g. a past example as the format to match).

## Step 3: Implement Loop

Implement the plan until the verification lever passes. This is currently a stub — one implied loop, expand later as needed (e.g. subagent fan-out strategies).

Core rule stands — a **decision** needed → pause the loop, verify with the user. If needed, run the `grill-me` process.

<!-- Not a decision but a complex build → run the final output by Codex, confirm both systems agree on verification. Deliberately commented out: uncommenting now would burn tokens searching for a Codex install that isn't wired up yet. Tracked as two backlog buckets in karpathy-engineer-project: (1) install Codex, (2) uncomment this line and make it operational. Do not uncomment until both are done. -->

Example: OpenSpec → `opsx:apply` → verify → modify proposal parts, repeat until the lever is okay. This is irrespective of "verification" tasks inside the plan, unless the lever is fully captured in those tasks. Even then — want tight loops — the `apply` step may break down to selected tasks, putting the verification task in the lever as early as possible.

## Step 4: Checkpoint

Offer to commit code before moving on. OpenSpec: archive + spec merge precede commit.
</process>

<success_criteria>
This workflow is complete when:
- [ ] The bucket was fully spec'd (plan + verification lever + checkpoint) before implementation started.
- [ ] The verification lever passed.
- [ ] A checkpoint was reached and code commit was offered.
- [ ] Control returns to `agile-loop.md` for review.
</success_criteria>
