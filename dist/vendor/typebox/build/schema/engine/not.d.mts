import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildNot(stack: Stack.XStack, context: BuildContext, schema: Schema.XNot, value: string): string;
export declare function CheckNot(stack: Stack.XStack, context: CheckContext, schema: Schema.XNot, value: unknown): boolean;
export declare function ErrorNot(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XNot, value: unknown): boolean;
