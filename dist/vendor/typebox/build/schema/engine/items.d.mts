import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildItems(stack: Stack.XStack, context: BuildContext, schema: Schema.XItems, value: string): string;
export declare function CheckItems(stack: Stack.XStack, context: CheckContext, schema: Schema.XItems, value: unknown[]): boolean;
export declare function ErrorItems(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XItems, value: unknown[]): boolean;
