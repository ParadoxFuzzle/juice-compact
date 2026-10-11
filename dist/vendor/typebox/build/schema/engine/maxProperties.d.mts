import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMaxProperties(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMaxProperties, value: string): string;
export declare function CheckMaxProperties(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMaxProperties, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorMaxProperties(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMaxProperties, value: Record<PropertyKey, unknown>): boolean;
