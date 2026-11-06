export type JuiceConfig = {
    /** Master switch for shell execution. false = exec-juice always refuses. */
    allowExec?: boolean;
    /** If non-empty, the command must begin with one of these prefixes. */
    allowedCommands?: string[];
    /** Default true: refuse obviously destructive commands outright. */
    denyDestructive?: boolean;
};
export declare function checkCommand(command: string, cfg?: JuiceConfig | Record<string, unknown>): {
    allowed: boolean;
    reason?: string;
    rule?: string;
};
declare const _default: import("openclaw/plugin-sdk/tool-plugin").DefinedToolPluginEntry;
export default _default;
export declare function compactLines(stdout: string, stderr: string, budget: number, exitCode: number, ms: number, flags?: {
    timedOut?: boolean;
    overflow?: boolean;
}): {
    text: string;
    stats: {
        exitCode: number;
        rawLen: number;
        compacted: number;
        dupSaved: number;
    };
};
