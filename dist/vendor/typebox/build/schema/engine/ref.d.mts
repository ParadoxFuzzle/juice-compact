import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildRef(stack: Stack.XStack, context: BuildContext, schema: Schema.XRef, value: string): string;
export declare function CheckRef(stack: Stack.XStack, context: CheckContext, schema: Schema.XRef, value: unknown): boolean;
export declare function ErrorRef(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XRef, value: unknown): boolean;
