# Workflow: Agile Loop

<required_reading>
None — this workflow depends on the `grill-me` skill and on `agile-build.md` (this skill's own workflow), not on create-agent-skills reference files.
</required_reading>

<process>
The outer repeat cycle: Tight Scope → run `agile-build` → Clear Checkpoint / Review the Output → Adjust → Repeat.

## Step 1: Tight Scope

Confirm the next bucket from `project-planning.md`'s breakdown — the first bucket if the project hasn't started.

## Step 2: Run Agile Build

Run the `agile-build.md` workflow for this bucket: spec it, define its verification lever, implement until the lever passes, reach its checkpoint.

## Step 3: Clear Checkpoint / Review The Output

`agile-build.md` ends at a checkpoint. Review the output here.

## Step 4: Adjust

If the plan needs adjustment, revisit `project-planning.md` — or `goal-setting.md` if the real goal itself was wrong — via a `grill-me` retrospective.

## Step 5: Repeat

Loop back to Step 1 for the next bucket, or stop if the project is done.
</process>

<success_criteria>
This workflow is complete when:
- [ ] Each bucket in `project-planning.md`'s list has been run through `agile-build.md`.
- [ ] Every checkpoint was reviewed before the next bucket started.
- [ ] Any needed plan adjustments were routed back through `project-planning.md`/`goal-setting.md`.
- [ ] The project is done, or the user has explicitly paused the loop.
</success_criteria>
