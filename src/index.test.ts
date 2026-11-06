import { describe, expect, it } from "vitest";
import { compactLines } from "./index.js";

describe("compactLines", () => {
  it("strips ANSI escape codes", () => {
    const out = compactLines("\u001b[31mERROR: boom\u001b[0m", "", 4000, 0, 10);
    expect(out.text).toContain("ERROR: boom");
    expect(out.text).not.toContain("\u001b[31m");
  });

  it("deduplicates repeated lines and reports savings", () => {
    const raw = Array.from({ length: 50 }, () => "cache miss on disk 3").join("\n");
    const out = compactLines(raw, "", 4000, 0, 5);
    expect(out.stats.dupSaved).toBe(49);
    // The body keeps exactly one instance (the summary may also mention the count, not the text)
    const body = out.text.split("--- head ---").pop() || "";
    const occurrences = body.split("cache miss on disk 3").length - 1;
    expect(occurrences).toBe(1);
  });

  it("extracts key errors into the summary", () => {
    const raw = "line1\nerror: cannot find module foo\nline3\nfatal: another\n";
    const out = compactLines(raw, "", 4000, 1, 20);
    expect(out.text).toContain("key errors:");
    expect(out.text).toContain("error: cannot find module foo");
    expect(out.text).toContain("fatal: another");
    expect(out.stats.exitCode).toBe(1);
  });

  it("extracts warnings", () => {
    const raw = "warn: giant input\nok";
    const out = compactLines(raw, "", 4000, 0, 3);
    expect(out.text).toContain("key warnings:");
    expect(out.text).toContain("warn: giant input");
  });

  it("respects head/tail split on over-budget output", () => {
    const long = Array.from({ length: 200 }, (_, i) => `line-${String(i).padStart(3, "0")}`).join("\n");
    const out = compactLines(long, "", 200, 0, 10);
    expect(out.text.length).toBeLessThan(500);
    expect(out.text).toContain("[...");
    expect(out.text).toContain("middle lines trimmed");
    // Head keeps the first line
    expect(out.text).toContain("line-000");
    // Tail keeps the last line
    expect(out.text).toContain("line-199");
  });

  it("handles empty output", () => {
    const out = compactLines("", "", 4000, 0, 2);
    expect(out.text).toContain("(no output)");
  });

  it("merges stderr behind a marker", () => {
    const out = compactLines("stdout line", "stderr line", 4000, 0, 5);
    expect(out.text).toContain("[stderr]");
    expect(out.text).toContain("stderr line");
  });

  it("preserves the exact exit code in output", () => {
    expect(compactLines("x", "", 100, 127, 5).text).toContain("exit: 127");
    expect(compactLines("x", "", 100, 0, 5).text).toContain("exit: 0");
  });

  it("stats report the compaction delta", () => {
    const raw = Array.from({ length: 100 }, () => "samsam").join("\n");
    const out = compactLines(raw, "", 4000, 0, 10);
    expect(out.stats.rawLen).toBe(raw.length);
    expect(out.stats.compacted).toBeLessThan(out.stats.rawLen);
    expect(out.stats.dupSaved).toBe(99);
  });
});

describe("compactLines hardening", () => {
  it("clamps out-of-range budgets", () => {
    const out = compactLines("x".repeat(5000), "", 5, 0, 1);
    expect(out.text.length).toBeLessThan(1200);
  });

  it("strips OSC title sequences too", () => {
    const out = compactLines("a\u001b]0;window title\u0007b", "", 4000, 0, 1);
    expect(out.text).not.toContain("\u001b]");
    expect(out.text).toContain("ab");
  });

  it("surfaces timeout and buffer-overflow notes", () => {
    const t = compactLines("x", "", 4000, 124, 120000, { timedOut: true });
    expect(t.text).toContain("timed out");
    expect(t.text).toContain("exit: 124");
    const o = compactLines("x", "", 4000, 1, 5, { overflow: true });
    expect(o.text).toContain("8 MiB buffer");
  });

  it("never reports a negative middle-line count", () => {
    const out = compactLines("only line", "", 4000, 0, 1);
    expect(out.text).not.toContain("middle lines trimmed");
  });
});
