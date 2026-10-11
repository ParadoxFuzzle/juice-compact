import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildOneOf(stack: Stack.XStack, context: BuildContext, schema: Schema.XOneOf, value: string): string;
export declare function CheckOneOf(stack: Stack.XStack, context: CheckContext, schema: Schema.XOneOf, value: unknown): boolean;
export declare function ErrorOneOf(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XOneOf, value: unknown): boolean;
