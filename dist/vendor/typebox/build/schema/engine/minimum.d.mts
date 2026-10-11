import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMinimum(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMinimum, value: string): string;
export declare function CheckMinimum(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMinimum, value: number | bigint): boolean;
export declare function ErrorMinimum(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMinimum, value: number | bigint): boolean;
