#!/usr/bin/env node
// karpathy-engineer — UserPromptSubmit hook: deterministic skill trigger match
// Reads the static triggers.json (built by build-triggers.js) and substring-
// matches the incoming prompt against declared trigger phrases. On match,
// emits a hard-directive additionalContext naming the skill that MUST be
// invoked. Never scans SKILL.md files at prompt time.

const fs = require('fs');
const path = require('path');

const TRIGGERS_PATH = path.join(__dirname, '..', '..', 'triggers.json');

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').toLowerCase();

    const triggers = JSON.parse(fs.readFileSync(TRIGGERS_PATH, 'utf8'));

    const matchedSkill = Object.keys(triggers)
      .find(phrase => prompt.includes(phrase));

    if (matchedSkill) {
      const skillId = triggers[matchedSkill];
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "UserPromptSubmit",
          additionalContext: `SKILL TRIGGER MATCHED: "${matchedSkill}" -> ${skillId}. ` +
            `This is a blocking requirement: you MUST invoke the ${skillId} skill via the Skill tool ` +
            `before doing any other research, response, or tool use.`
        }
      }));
    }
  } catch (e) {
    // Silent fail — a missing/malformed triggers.json must never block prompt submission.
  }
});
