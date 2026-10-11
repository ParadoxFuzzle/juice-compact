import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildExclusiveMaximum(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XExclusiveMaximum, value: string): string;
export declare function CheckExclusiveMaximum(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XExclusiveMaximum, value: number | bigint): boolean;
export declare function ErrorExclusiveMaximum(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XExclusiveMaximum, value: number | bigint): boolean;
