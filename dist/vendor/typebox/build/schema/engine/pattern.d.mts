import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildPattern(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XPattern, value: string): string;
export declare function CheckPattern(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XPattern, value: string): boolean;
export declare function ErrorPattern(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XPattern, value: string): boolean;
