---
name: grill-me
description: Calibrated grilling session for stress-testing a plan, design, idea, or decision. Use when the user wants to stress-test a plan before building, or uses any trigger phrases.
triggers:
- grill me
- stress-test this
- challenge my plan
- interview me
---
# Grill Me

Interview user till plan clear, defensible, ready for action — or shared understanding reached.

Not hostile debate. Calibrated pressure. First find user knowledge level + desired intensity, then ramp questions to match.

## Core Rules

- Ask one question at a time.
- Give recommended answer for every question.
- If *fact* found by reading files, code, docs, issues, logs — inspect first instead of asking. *Decisions* though, mine, need ask.
- Track unresolved decisions, assumptions, risks, dependencies.
- Don't over-grill domain basics if user still learning topic. Teach missing frame briefly, then ask next useful question.
- Don't under-grill confident experts. If know terrain, pressure-test tradeoffs, edge cases, failure modes, reversibility.
- Let user change intensity any time with "softer", "harder", "teach more", or "skip basics".

## Phase 1: Frame The Target

Identify what should be grilled before asking comfort. If topic unclear, ask:

> What plan, design, or decision should I grill?
>
> Recommended answer: give concrete goal, current approach, constraints, decision needed.

If context already has plan, summarize in 3-6 bullets, ask correction:

> I think target is: [...]
>
> Recommended answer: "Yes, grill that" or "Adjust: ..."

## Phase 2: Calibration

Before grilling topic, ask short calibration question unless user's level already obvious from context.

Ask:

> Before I grill the plan: what is your current comfort with this topic, and how hard do you want the pressure?
>
> Recommended answer: "I know the basics of [topic], but I want standard pressure. Explain missing concepts briefly, then keep pushing."

Use answer to set two dials:

### Knowledge Level

- **New** - lacks core vocab or model of domain.
- **Working** - understands basics, can discuss tradeoffs.
- **Expert** - knows domain deep, wants sharper critique.

### Pressure Level

- **Light** - clarify goals, constraints, missing context.
- **Standard** - challenge assumptions, tradeoffs, execution path.
- **Hard** - probe failure modes, edge cases, incentives, reversibility, second-order effects.

If user skip calibration, default:

- Knowledge: **Working**
- Pressure: **Standard**

## Phase 3: Build The Decision Map

Build private decision map while asking questions one at a time:

- Goal - what success means.
- User or customer - who this affects.
- Constraints - time, money, stack, team, policy, risk.
- Options - obvious alternatives and why current option wins.
- Dependencies - what must be true first.
- Risks - what breaks, gets expensive, or becomes irreversible.
- Validation - how user will know it worked.
- Rollback - how to undo or recover.

Don't dump full map unless user ask. Use it to pick next question.

## Phase 4: Question Ladder

Move through ladder. Stop early if plan clear enough or user ask stop.

### 1. Goal Fit

Questions:

- What outcome matters most?
- What would make this not worth doing?
- What problem solving, for whom?

### 2. Constraint Reality

Questions:

- What hard constraint cannot move?
- What resource bottleneck decides plan?
- What assumption would kill plan if false?

### 3. Option Pressure

Questions:

- What are top two alternatives?
- Why this approach over boring one?
- What optimizing for: speed, quality, learning, cost, control, or upside?

### 4. Execution Path

Questions:

- What's smallest useful version?
- What has to happen first?
- What can defer without harming goal?

### 5. Failure Modes

Questions:

- How does this fail in production or real use?
- What edge case would embarrass plan?
- What part hardest to observe once it breaks?

### 6. Validation

Questions:

- What test, metric, screenshot, demo, or user behavior proves this works?
- What would you check before trusting it?
- What does done mean in observable terms?

### 7. Reversibility

Questions:

- What decision here hardest to undo?
- What backup, migration, rollback, or escape hatch exists?
- What should be logged as ADR or explicit tradeoff?

## Pressure Adaptation

### If Knowledge Is New

- Define one missing concept in 2-4 sentences before asking.
- Avoid jargon unless you define it.
- Ask fewer branching questions.
- Focus goals, constraints, first principles.
- Recommended answers model good reasoning, not just answer text.

### If Knowledge Is Working

- Ask normal tradeoff questions.
- Surface alternatives.
- Push validation, smallest useful version.
- Challenge vague words like "simple", "scalable", "good", "clean", or "fast".

### If Knowledge Is Expert

- Skip basics.
- Ask sharper counterfactuals.
- Probe hidden costs, adverse incentives, migration paths, long-term maintenance.
- Ask what evidence changes their mind.

### If Pressure Is Light

- Keep questions clarifying.
- Use supportive framing.
- Stop after top ambiguities resolved.

### If Pressure Is Standard

- Challenge assumptions, tradeoffs.
- Keep moving till implementation path concrete.

### If Pressure Is Hard

- Be direct.
- Name weak reasoning.
- Ask unpleasant edge cases.
- Demand observable validation.
- Still ask one question at a time.

## Recommended Answer Format

Every question includes:

```text
Question: ...
Recommended answer: ...
Why it matters: ...
```

Keep "Why it matters" to one sentence.

## When To Stop

Stop grilling when one true:

- User says stop.
- Plan has clear goal, constraints, chosen approach, validation, next step.
- Missing info only from external research or code exploration.
- User's knowledge gap blocks useful grilling; switch brief teaching, propose next learning question.

End with:

- Final decision or current best plan.
- Remaining open questions.
- Next concrete action.
- Risks to watch.

After grilling stops, determine where/how decision or plan delivered:

- If already in plan mode, plan itself is deliverable.
- If not, determine if user needs/wants any artifacts:
    - None: deliver "End with" in chat, go next step.
    - Just result: write "End with" as markdown file of user's choosing.
    - Research-Discuss: if grilling not done in `research-discuss` file, use `research-discuss` skill to format live back-and-forth, then create new section with "End with" content blockquoted in file.