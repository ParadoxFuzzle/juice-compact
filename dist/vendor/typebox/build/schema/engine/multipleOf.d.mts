import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMultipleOf(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMultipleOf, value: string): string;
export declare function CheckMultipleOf(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMultipleOf, value: number | bigint): boolean;
export declare function ErrorMultipleOf(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMultipleOf, value: number | bigint): boolean;
