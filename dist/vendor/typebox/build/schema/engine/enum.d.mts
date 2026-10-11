import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildEnum(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XEnum, value: string): string;
export declare function CheckEnum(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XEnum, value: unknown): boolean;
export declare function ErrorEnum(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XEnum, value: unknown): boolean;
