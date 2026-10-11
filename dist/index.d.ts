declare const _default: import("openclaw/plugin-sdk/tool-plugin").DefinedToolPluginEntry;
export default _default;
export declare function compactLines(stdout: string, stderr: string, budget: number, exitCode: number, ms: number): {
    text: string;
    stats: {
        exitCode: number;
        rawLen: number;
        compacted: number;
        dupSaved: number;
    };
};
