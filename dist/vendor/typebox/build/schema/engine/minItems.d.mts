import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMinItems(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XMinItems, value: string): string;
export declare function CheckMinItems(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XMinItems, value: unknown[]): boolean;
export declare function ErrorMinItems(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMinItems, value: unknown[]): boolean;
