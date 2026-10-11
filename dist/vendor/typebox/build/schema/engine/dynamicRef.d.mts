import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildDynamicRef(stack: Stack.XStack, context: BuildContext, schema: Schema.XDynamicRef, value: string): string;
export declare function CheckDynamicRef(stack: Stack.XStack, context: CheckContext, schema: Schema.XDynamicRef, value: unknown): boolean;
export declare function ErrorDynamicRef(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XDynamicRef, value: unknown): boolean;
