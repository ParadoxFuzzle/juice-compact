import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildUnevaluatedItems(stack: Stack.XStack, context: BuildContext, schema: Schema.XUnevaluatedItems, value: string): string;
export declare function CheckUnevaluatedItems(stack: Stack.XStack, context: CheckContext, schema: Schema.XUnevaluatedItems, value: unknown[]): boolean;
export declare function ErrorUnevaluatedItems(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XUnevaluatedItems, value: unknown[]): boolean;
