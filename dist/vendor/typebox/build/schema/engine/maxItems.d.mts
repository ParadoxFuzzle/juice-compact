import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMaxItems(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMaxItems, value: string): string;
export declare function CheckMaxItems(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMaxItems, value: unknown[]): boolean;
export declare function ErrorMaxItems(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMaxItems, value: unknown[]): boolean;
