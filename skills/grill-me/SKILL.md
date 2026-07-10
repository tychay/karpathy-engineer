---
name: grill-me
description: Runs a calibrated interview to stress-test a plan, design, idea, or decision until it is clear, defensible, and ready for action. Use when the user says "grill me", "stress-test this", "challenge my plan", "interview me", or otherwise wants a plan pressure-tested before building.
---

<objective>
Interviews the user until a plan, design, or decision is clear, defensible, and ready for action — or until shared understanding is reached. Not hostile debate: calibrated pressure that ramps to match the user's knowledge level and desired intensity.
</objective>

<quick_start>
1. Identify the target (see phase 1 in `<process>`).
2. Calibrate knowledge level and pressure level (phase 2).
3. Ask one question at a time from the question ladder (phase 4), tracking the decision map (phase 3), giving a recommended answer for every question.
4. Stop per `<success_criteria>` and deliver the result.
</quick_start>

<essential_principles>
- Ask one question at a time.
- Give a recommended answer for every question.
- If a *fact* can be found by reading files, code, docs, issues, logs — inspect first instead of asking. *Decisions*, though, need to be asked.
- Track unresolved decisions, assumptions, risks, dependencies.
- Don't over-grill domain basics if the user is still learning the topic. Teach the missing frame briefly, then ask the next useful question.
- Don't under-grill confident experts. If they know the terrain, pressure-test tradeoffs, edge cases, failure modes, reversibility.
- Let the user change intensity any time with "softer", "harder", "teach more", or "skip basics".
</essential_principles>

<process>
<phase name="1: Frame The Target">
Identify what should be grilled before asking about comfort. If the topic is unclear, ask:

> What plan, design, or decision should I grill?
>
> Recommended answer: give a concrete goal, current approach, constraints, decision needed.

If context already has a plan, summarize it in 3-6 bullets, ask for correction:

> I think the target is: [...]
>
> Recommended answer: "Yes, grill that" or "Adjust: ..."
</phase>

<phase name="2: Calibration">
Before grilling the topic, ask a short calibration question unless the user's level is already obvious from context.

Ask:

> Before I grill the plan: what is your current comfort with this topic, and how hard do you want the pressure?
>
> Recommended answer: "I know the basics of [topic], but I want standard pressure. Explain missing concepts briefly, then keep pushing."

Use the answer to set two dials:

**Knowledge Level**
- **New** - lacks core vocab or model of the domain.
- **Working** - understands basics, can discuss tradeoffs.
- **Expert** - knows the domain deeply, wants sharper critique.

**Pressure Level**
- **Light** - clarify goals, constraints, missing context.
- **Standard** - challenge assumptions, tradeoffs, execution path.
- **Hard** - probe failure modes, edge cases, incentives, reversibility, second-order effects.

If the user skips calibration, default to Knowledge: **Working**, Pressure: **Standard**.
</phase>

<phase name="3: Build The Decision Map">
Build a private decision map while asking questions one at a time:

- Goal - what success means.
- User or customer - who this affects.
- Constraints - time, money, stack, team, policy, risk.
- Options - obvious alternatives and why the current option wins.
- Dependencies - what must be true first.
- Risks - what breaks, gets expensive, or becomes irreversible.
- Validation - how the user will know it worked.
- Rollback - how to undo or recover.

Don't dump the full map unless the user asks. Use it to pick the next question.
</phase>

<phase name="4: Question Ladder">
Move through the ladder. Stop early if the plan is clear enough or the user asks to stop.

Track how many questions from this ladder are actually asked this session — `<success_criteria>` needs this count later.

1. **Goal Fit** - What outcome matters most? What would make this not worth doing? What problem, solved for whom?
2. **Constraint Reality** - What hard constraint cannot move? What resource bottleneck decides the plan? What assumption would kill the plan if false?
3. **Option Pressure** - What are the top two alternatives? Why this approach over the boring one? What is being optimized for: speed, quality, learning, cost, control, or upside?
4. **Execution Path** - What's the smallest useful version? What has to happen first? What can be deferred without harming the goal?
5. **Failure Modes** - How does this fail in production or real use? What edge case would embarrass the plan? What part is hardest to observe once it breaks?
6. **Validation** - What test, metric, screenshot, demo, or user behavior proves this works? What would you check before trusting it? What does done mean in observable terms?
7. **Reversibility** - What decision here is hardest to undo? What backup, migration, rollback, or escape hatch exists? What should be logged as an ADR or explicit tradeoff?
</phase>
</process>

<pressure_adaptation>
**If Knowledge Is New**
- Define one missing concept in 2-4 sentences before asking.
- Avoid jargon unless defined.
- Ask fewer branching questions.
- Focus on goals, constraints, first principles.
- Recommended answers model good reasoning, not just answer text.

**If Knowledge Is Working**
- Ask normal tradeoff questions.
- Surface alternatives.
- Push validation, smallest useful version.
- Challenge vague words like "simple", "scalable", "good", "clean", or "fast".

**If Knowledge Is Expert**
- Skip basics.
- Ask sharper counterfactuals.
- Probe hidden costs, adverse incentives, migration paths, long-term maintenance.
- Ask what evidence would change their mind.

**If Pressure Is Light**
- Keep questions clarifying.
- Use supportive framing.
- Stop after top ambiguities are resolved.

**If Pressure Is Standard**
- Challenge assumptions, tradeoffs.
- Keep moving until the implementation path is concrete.

**If Pressure Is Hard**
- Be direct.
- Name weak reasoning.
- Ask unpleasant edge cases.
- Demand observable validation.
- Still ask one question at a time.
</pressure_adaptation>

<recommended_answer_format>
Every question includes:

```text
Question: ...
Recommended answer: ...
Why it matters: ...
```

Keep "Why it matters" to one sentence.
</recommended_answer_format>

<success_criteria>
Stop grilling when one of these is true:

- User says stop.
- Plan has a clear goal, constraints, chosen approach, validation, next step.
- Missing info is only available from external research or code exploration.
- User's knowledge gap blocks useful grilling; switch to brief teaching, propose the next learning question.

End with:

- Final decision or current best plan.
- Remaining open questions.
- Next concrete action.
- Risks to watch.

If already in plan mode, the plan itself is the deliverable — stop here.

Otherwise, state the phase-4 ladder question count out loud (e.g. "Ladder questions asked: N") before applying the branch below — this makes the count checkable, not just internal bookkeeping:

- **Count is 0** (frame/calibration only, no real ladder question asked): deliver the "End with" content in chat, done. No save-ask — there's no back-and-forth worth saving.
- **Count is 1 or more**: this is a mandatory ask, not a judgment call — do not skip it, do not decide on the user's behalf that the session is "too small" or "obviously fine." Ask directly, before doing anything else:

    > Save this session? If yes: conclusions only, or the full session transcript?

    - **No**: deliver the "End with" content in chat, done.
    - **Conclusions only**: write the "End with" content as a markdown file, location of the user's choosing.
    - **Full session transcript**: Determine the location of the user's choosing. If it is an existing file, read `templates/grill-me-session-section.md` else `templates/grill-me-session.md`. Copy its structure, and fill it with this session's actual transcript (frame, calibration, every ladder Q&A, asides) plus the "End with" content in its closing callout. Append or Save to the location.
</success_criteria>
