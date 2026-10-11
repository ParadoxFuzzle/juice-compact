import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildDependentRequired(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XDependentRequired, value: string): string;
export declare function CheckDependentRequired(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XDependentRequired, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorDependentRequired(_stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XDependentRequired, value: Record<PropertyKey, unknown>): boolean;
