import * as Schema from '../types/index.mjs';
export declare const DefaultUri = "urn:typebox:root";
export interface XStack {
    /** The schema context. */
    readonly context: Record<string, Schema.XSchema>;
    /** The entry schema. */
    readonly schema: Schema.XSchema;
    /** Visited $id schemas, kept only to detect resource re-entry (see resolve.ts FindResolvedResource). */
    readonly ids: Schema.XId[];
    /** Nearest enclosing $id schema, used as the root for local pointer resolution. */
    readonly lexicalSchema: Schema.XSchema;
    /** First $recursiveAnchor: true schema seen on the path. */
    readonly recursiveAnchor: Schema.XRecursiveAnchor | undefined;
    /** Dynamic anchors visible at this point in the traversal. */
    readonly dynamicAnchors: Schema.XDynamicAnchor[];
    /** Lexical base URL, used to resolve relative $id and $ref values within the current schema. */
    readonly lexicalBase: string;
    /** Base URL of the current resource, reset each time a new resource $id is entered. */
    readonly resourceBase: string;
    /** Base URL that $ref values resolve against. */
    readonly referenceBase: string;
    /** Resource entry point bookkeeping: schema -> the base/root to apply when that schema is next pushed. */
    readonly resourceEntries: Map<Schema.XSchemaObject, {
        base: string;
        root: Schema.XSchemaObject;
    }>;
    /** True while referenceBase should track resourceBase rather than lexicalBase. */
    readonly useResourceBaseForReference: boolean;
    /** True until the next $id schema is entered, marking it as a fresh resource root. */
    readonly pendingResource: boolean;
    /** True once traversal has entered a retrieved or legacy resource. */
    readonly enteredResource: boolean;
}
export declare function NextUri(ref: string, base: string): URL;
export declare function Stack(context: Record<string, Schema.XSchema>, schema: Schema.XSchema): XStack;
export declare function NextStack(stack: XStack, schema: Schema.XSchema): XStack;
