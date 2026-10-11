import * as Schema from '../types/index.mjs';
import * as Stack from '../engine/_stack.mjs';
export interface XRefResult {
    schema: Schema.XSchema | undefined;
    stack: Stack.XStack;
}
export declare function Ref(stack: Stack.XStack, ref: Schema.XRef): XRefResult;
export declare function RecursiveRef(stack: Stack.XStack, recursiveRef: Schema.XRecursiveRef): Schema.XSchema | undefined;
export declare function DynamicRef(stack: Stack.XStack, dynamicRef: Schema.XDynamicRef): Schema.XSchema | undefined;
