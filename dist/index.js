import { Type } from "./typebox.js";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
import { textResult } from "openclaw/plugin-sdk/tool-results";
export default defineToolPlugin({
    id: "juice-compact",
    name: "Juice Compact",
    description: "Compacts noisy exec/bash tool output before it re-enters the session.",
    tools: (tool) => [
        tool({
            name: "exec-juice",
            description: "Run a shell command and return a compacted, structured summary of its output: stripped ANSI, head+tail truncation, deduplicated repeated lines, per-line classified (errors/warnings/hints), with the raw tail attached on failure. Exit code is always preserved exactly.",
            parameters: Type.Object({
                command: Type.String({ description: "The shell command to run." }),
                cwd: Type.Optional(Type.String({ description: "Working directory." })),
                max_result_chars: Type.Optional(Type.Number({ description: "Compacted result budget in chars (default 4000)." })),
            }),
            execute: async ({ command, cwd, max_result_chars }) => {
                return compactExec(command, cwd || undefined, max_result_chars ?? 4000);
            },
        }),
    ],
});
import { exec as childExec } from "node:child_process";
import { promisify } from "node:util";
const execAsync = promisify(childExec);
const ANSI_RE = new RegExp("\u001b\\[[0-9;]*[a-zA-Z]|\u001b\\][^\u0007]*\u0007", "g");
async function compactExec(command, cwd, budget) {
    const t0 = Date.now();
    try {
        const { stdout, stderr } = await execAsync(command, {
            cwd,
            timeout: 120000,
            maxBuffer: 1024 * 1024 * 8,
            shell: "/bin/bash",
        });
        const out = compactLines(stdout, stderr, budget, 0, Date.now() - t0);
        return textResult(out.text, out.stats);
    }
    catch (err) {
        const e = err;
        const code = typeof e.code === "number" ? e.code : 1;
        const out = compactLines(e.stdout || "", e.stderr || e.message || "", budget, code, Date.now() - t0);
        return textResult(out.text, out.stats);
    }
}
// Pure function, unit-testable
export function compactLines(stdout, stderr, budget, exitCode, ms) {
    const clean = (s) => s.replace(ANSI_RE, "");
    let all = (clean(stdout || "") + (clean(stderr || "") ? "\n[stderr]\n" + clean(stderr) : "")).trim();
    const rawLen = all.length;
    if (!all)
        all = "(no output)";
    const kept = [];
    const seenCounts = {};
    for (const line of all.split("\n").filter((l) => l.trim().length > 0)) {
        if (seenCounts[line] !== undefined) {
            seenCounts[line]++;
            continue;
        }
        seenCounts[line] = 1;
        kept.push(line);
    }
    const dedup = kept.length;
    const dupSaved = (all.split("\n").filter((l) => l.trim().length > 0).length) - dedup;
    // Classify each line
    const isErr = (l) => /^[a-z]+: (fatal|error|warning:|error:)/i.test(l) || /error:/i.test(l);
    const isWarn = (l) => /warn(?:ing)?:/i.test(l);
    const errs = kept.filter((l) => isErr(l));
    const warns = kept.filter((l) => isWarn(l));
    // Budget: head 2/3, tail 1/3
    const headBudget = Math.floor(budget * 2 / 3);
    const head = kept.join("\n").slice(0, headBudget);
    const tail = kept.join("\n").slice(-Math.floor(budget / 3));
    const middle = kept.length - head.split("\n").length - tail.split("\n").length;
    const summary = [
        `exit: ${exitCode}`,
        `duration: ${ms}ms`,
        `raw: ${rawLen} chars → compacted: ${Math.min(rawLen, budget)} chars`,
        `lines: ${kept.length} unique (+${dupSaved} duplicates trimmed)`,
        errs.length ? `errors: ${errs.length}` : "",
        warns.length ? `warnings: ${warns.length}` : "",
        errs.length >= 1 ? `\nkey errors:\n  ${errs.slice(0, 5).join("\n  ")}` : "",
        warns.length >= 1 ? `\nkey warnings:\n  ${warns.slice(0, 5).join("\n  ")}` : "",
        "",
    ].filter((s) => s !== "").join("\n");
    const text = middle > 0
        ? `${summary}--- head ---\n${head}\n[...${middle} middle lines trimmed...]\n--- tail ---\n${tail}`
        : `${summary}\n${head}${tail === head ? "" : "\n--- tail ---\n" + tail}`;
    return { text, stats: { exitCode, rawLen, compacted: text.length, dupSaved } };
}
