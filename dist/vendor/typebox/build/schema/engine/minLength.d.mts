import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMinLength(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMinLength, value: string): string;
export declare function CheckMinLength(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMinLength, value: string): boolean;
export declare function ErrorMinLength(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMinLength, value: string): boolean;
