import { Type } from "./typebox.js";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
import { textResult } from "openclaw/plugin-sdk/tool-results";
import { exec as childExec } from "node:child_process";
import { promisify } from "node:util";
import * as fs from "node:fs";
const execAsync = promisify(childExec);
const DEFAULT_BUDGET = 4000;
const MIN_BUDGET = 200;
const MAX_BUDGET = 20_000;
const TIMEOUT_MS = 120_000;
const MAX_BUFFER = 8 * 1024 * 1024;
// CSI + OSC + charset-select escapes. OSC is terminated by BEL or ST (ESC \).
const ANSI_RE = new RegExp("\\u001b\\[[0-9;?]*[a-zA-Z]|\\u001b\\][^\\u0007\\u001b]*(?:\\u0007|\\u001b\\\\)|\\u001b[()][A-Z0-9]", "g");
/** bash when present, the platform default shell otherwise (no hardcoded /bin/bash). */
function shellForPlatform() {
    if (process.platform === "win32")
        return process.env.ComSpec || undefined;
    return fs.existsSync("/bin/bash") ? "/bin/bash" : undefined;
}
function clampBudget(n) {
    const v = typeof n === "number" && Number.isFinite(n) ? n : DEFAULT_BUDGET;
    return Math.round(Math.max(MIN_BUDGET, Math.min(MAX_BUDGET, v)));
}
export default defineToolPlugin({
    id: "juice-compact",
    name: "Juice Compact",
    description: "Compacts noisy exec/bash tool output before it re-enters the session.",
    tools: (tool) => [
        tool({
            name: "exec-juice",
            description: "Run a shell command and return a compacted, structured summary of its output: stripped ANSI, head+tail truncation, deduplicated repeated lines, per-line classified (errors/warnings/hints), with the raw tail attached on failure. Exit code is always preserved exactly (124 on timeout).",
            parameters: Type.Object({
                command: Type.String({ description: "The shell command to run." }),
                cwd: Type.Optional(Type.String({ description: "Working directory." })),
                max_result_chars: Type.Optional(Type.Number({ description: "Compacted result budget in chars (200-20000, default 4000)." })),
            }),
            execute: async ({ command, cwd, max_result_chars }) => {
                return compactExec(command, cwd || undefined, clampBudget(max_result_chars));
            },
        }),
    ],
});
async function compactExec(command, cwd, budget) {
    const t0 = Date.now();
    const shell = shellForPlatform();
    const options = {
        cwd,
        timeout: TIMEOUT_MS,
        maxBuffer: MAX_BUFFER,
        ...(shell ? { shell } : {}),
    };
    try {
        const { stdout, stderr } = await execAsync(command, options);
        // Modern @types/node types exec output as string | Buffer unless an
        // encoding is pinned; normalise so the pure function always sees text.
        const asText = (v) => (typeof v === "string" ? v : Buffer.isBuffer(v) ? v.toString("utf8") : "");
        const out = compactLines(asText(stdout), asText(stderr), budget, 0, Date.now() - t0);
        return textResult(out.text, out.stats);
    }
    catch (err) {
        const e = err;
        // node's exec kills the child on timeout; report it as 124 (timeout)
        // instead of collapsing every failure to 1.
        const timedOut = e.killed === true || e.signal === "SIGTERM";
        const overflow = e.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER";
        const code = timedOut ? 124 : typeof e.code === "number" ? e.code : 1;
        const out = compactLines(e.stdout || "", e.stderr || e.message || "", budget, code, Date.now() - t0, {
            timedOut,
            overflow,
        });
        return textResult(out.text, out.stats);
    }
}
// Pure function, unit-testable
export function compactLines(stdout, stderr, budget, exitCode, ms, flags = {}) {
    const clean = (s) => (s || "").replace(ANSI_RE, "");
    const cleanedStderr = clean(stderr);
    const all = (clean(stdout) + (cleanedStderr ? "\n[stderr]\n" + cleanedStderr : "")).trim();
    const rawLen = all.length;
    const body = rawLen ? all : "(no output)";
    const lines = body.split("\n").filter((l) => l.trim().length > 0);
    const seen = new Set();
    const kept = [];
    for (const line of lines) {
        if (seen.has(line))
            continue;
        seen.add(line);
        kept.push(line);
    }
    const dupSaved = lines.length - kept.length;
    // Classify each line
    const isErr = (l) => /error:/i.test(l) || /^[a-z]+: (fatal|error)/i.test(l);
    const isWarn = (l) => /warn(?:ing)?:/i.test(l);
    const errs = kept.filter(isErr);
    const warns = kept.filter(isWarn);
    // Budget: head 2/3, tail 1/3
    const safeBudget = clampBudget(budget);
    const headBudget = Math.max(1, Math.floor((safeBudget * 2) / 3));
    const tailBudget = Math.max(1, Math.floor(safeBudget / 3));
    const joined = kept.join("\n");
    const head = joined.slice(0, headBudget);
    const tail = joined.slice(-tailBudget);
    // Count real lines on each side of the split (the old code derived this from
    // the character slices and could report a negative "middle lines" count).
    const headLines = head ? head.split("\n").length : 0;
    const tailLines = tail ? tail.split("\n").length : 0;
    const middle = Math.max(0, kept.length - headLines - tailLines);
    const notes = [];
    if (flags.timedOut)
        notes.push(`timed out after ${TIMEOUT_MS / 1000}s`);
    if (flags.overflow)
        notes.push(`output exceeded ${MAX_BUFFER / (1024 * 1024)} MiB buffer (truncated)`);
    const render = (compactedChars) => {
        const summary = [
            `exit: ${exitCode}`,
            `duration: ${ms}ms`,
            `raw: ${rawLen} chars → compacted: ${compactedChars} chars`,
            `lines: ${kept.length} unique (+${dupSaved} duplicates trimmed)`,
            errs.length ? `errors: ${errs.length}` : "",
            warns.length ? `warnings: ${warns.length}` : "",
            notes.length ? `notes: ${notes.join("; ")}` : "",
            errs.length ? `\nkey errors:\n  ${errs.slice(0, 5).join("\n  ")}` : "",
            warns.length ? `\nkey warnings:\n  ${warns.slice(0, 5).join("\n  ")}` : "",
        ].filter((s) => s !== "");
        const sections = middle > 0
            ? `--- head ---\n${head}\n[...${middle} middle lines trimmed...]\n--- tail ---\n${tail}`
            : joined.length > safeBudget
                // One giant line (e.g. a single 50 KB JSON blob): still truncate, or
                // the "budget" clamps nothing at all.
                ? `${head}\n[...truncated...]\n${tail}`
                : joined;
        return summary.join("\n") + "\n" + sections;
    };
    // Two passes so the reported size is the real final size.
    let text = render(0);
    text = render(text.length);
    return { text, stats: { exitCode, rawLen, compacted: text.length, dupSaved } };
}
