import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildContains(stack: Stack.XStack, context: BuildContext, schema: Schema.XContains, value: string): string;
export declare function CheckContains(stack: Stack.XStack, context: CheckContext, schema: Schema.XContains, value: unknown[]): boolean;
export declare function ErrorContains(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XContains, value: unknown[]): boolean;
