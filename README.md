# juice-compact

OpenClaw plugin that compacts noisy exec/bash tool output **before** it
re-enters the agent session. Inspired by `@openclaw/tokenjuice`, rebuilt
with sharper teeth.

## Install (done on this host)

```bash
openclaw plugins install /home/noodly/.openclaw/plugin-src/juice-compact --force
openclaw plugins enable juice-compact
openclaw plugins reload juice-compact
```

## What it does

Registers an `exec-juice` tool: it runs a shell command and returns a
**compacted, structured** tool result instead of raw scroll:

```
exit: 0
duration: 812ms
raw: 48210 chars → compacted: 3988 chars
lines: 214 unique (+96 duplicates trimmed)
warnings: 4

--- head ---
...first lines...
[...middle lines trimmed...]
--- tail ---
...last lines...
```

## Improvements over tokenjuice

| tokenjuice | juice-compact |
|---|---|
| Trims result | **Classifies** it (errors/warnings surfaced into a structured summary) |
| "Safe-inventory policy" decides when to compact | Compaction is always the tool's contract: the caller chooses raw exec when they need it; `exec-juice` is opt-in per call |
| No dedup | **Exact-duplicate line dedup** with savings count (main win for build logs) |
| No style pass | ANSI escape stripping (color codes otherwise burn tokens invisibly) |
| No error keys | **Key errors/warnings extracted into the summary** so the agent sees the important 5 lines without reading the tail |
| No stats | Stats block (raw→compacted chars, ms, dedup savings) lets the agent decide when to go raw |
| — | Exit code preserved exactly and printed in-band (`exit: N`) |
| — | Timeout (120s) + 8 MiB buffer guardrails |

## Design rules

- The command itself is never rewritten; `exec-juice` is an *additional*
  tool, exactly like tokenjuice's non-destructive stance.
- Original exit codes are never changed (printed as `exit: N`).
- Compaction is deterministic and unit-tested: ANSI strip → dedup →
  classify → head(2/3)/tail(1/3) within the char budget.
- On failure, stderr is inlined behind a `[stderr]` marker and key
  errors are hoisted to the summary.

## Tests

```bash
cd /home/noodly/.openclaw/plugin-src/juice-compact && npm test
```

9 tests cover: ANSI stripping, dedup savings, error/warning extraction,
head/tail split on over-budget output, empty output, stderr merging,
exit-code preservation, and the compaction stats delta.
