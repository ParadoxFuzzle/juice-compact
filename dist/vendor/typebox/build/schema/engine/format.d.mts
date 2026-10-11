import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildFormat(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XFormat, value: string): string;
export declare function CheckFormat(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XFormat, value: string): boolean;
export declare function ErrorFormat(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XFormat, value: string): boolean;
