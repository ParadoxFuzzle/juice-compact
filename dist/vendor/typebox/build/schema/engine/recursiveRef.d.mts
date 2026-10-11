import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildRecursiveRef(stack: Stack.XStack, context: BuildContext, schema: Schema.XRecursiveRef, value: string): string;
export declare function CheckRecursiveRef(stack: Stack.XStack, context: CheckContext, schema: Schema.XRecursiveRef, value: unknown): boolean;
export declare function ErrorRecursiveRef(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XRecursiveRef, value: unknown): boolean;
