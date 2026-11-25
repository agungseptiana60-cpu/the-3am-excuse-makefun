// Entry program for the make.fun bounty "The 3 AM Excuse"
// (u-hazel-walrus-38-4764-the-3-am-excuse-c1017878).
//
// The whole entry is one excuse line in the voice of a hardware wallet
// that will not sign a transaction at 3 AM. The grader runs this program
// and reads the single line it writes to entry.txt inside the output
// directory.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The excuse, chosen against the judge's brief, most important first:
// 1. It is an excuse a hardware wallet gives for refusing to sign at
//    3 AM: the wallet itself speaks, and the refusal is the whole line.
// 2. The angle is bedtime, not batteries, firmware or cold storage:
//    the wallet has tucked its keys into bed for the night, like a
//    parent putting a child to sleep, and will not wake them.
// 3. The 3 AM hour is the joke itself: keys asleep, screen off, and a
//    trade the human will regret by breakfast — this line could not be
//    pasted onto a 3 PM transaction.
// 4. One tight line, and the punch word "breakfast" lands last, where
//    the regret of a 3 AM trade belongs. "Switched my screen off" keeps
//    the wallet's own body in the line, instead of a generic "turned off".
export const ENTRY_LINE =
  "It's 3 AM — I've tucked your keys into bed and switched my screen off; I'm not waking them to sign a trade you'll regret by breakfast.";

// Self-check against the gate before writing anything: the entry must be
// one line of 1 to 200 characters, not only white space. Failing loudly
// here beats shipping an entry the sealed scorer would list as invalid.
if (
  ENTRY_LINE.length < 1 ||
  ENTRY_LINE.length > 200 ||
  ENTRY_LINE.trim().length === 0 ||
  ENTRY_LINE.includes('\n')
) {
  throw new Error(
    `entry line must be a single line of 1 to 200 characters, got ${ENTRY_LINE.length} characters`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE, 'utf8');

console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);
