import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildConst(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XConst, value: string): string;
export declare function CheckConst(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XConst, value: unknown): boolean;
export declare function ErrorConst(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XConst, value: unknown): boolean;
