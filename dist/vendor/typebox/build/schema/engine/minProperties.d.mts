import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMinProperties(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMinProperties, value: string): string;
export declare function CheckMinProperties(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMinProperties, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorMinProperties(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMinProperties, value: Record<PropertyKey, unknown>): boolean;
