import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildRefine(_stack: Stack.XStack, _context: BuildContext, schema: Schema.XRefine, value: string): string;
export declare function CheckRefine(_stack: Stack.XStack, _context: CheckContext, schema: Schema.XRefine, value: unknown): boolean;
export declare function ErrorRefine(_stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XRefine, value: unknown): boolean;
