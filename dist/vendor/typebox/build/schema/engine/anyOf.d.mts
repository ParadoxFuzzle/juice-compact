import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildAnyOf(stack: Stack.XStack, context: BuildContext, schema: Schema.XAnyOf, value: string): string;
export declare function CheckAnyOf(stack: Stack.XStack, context: CheckContext, schema: Schema.XAnyOf, value: unknown): boolean;
export declare function ErrorAnyOf(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XAnyOf, value: unknown): boolean;
