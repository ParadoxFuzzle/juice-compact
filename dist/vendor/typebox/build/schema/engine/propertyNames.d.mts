import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildPropertyNames(stack: Stack.XStack, context: BuildContext, schema: Schema.XPropertyNames, value: string): string;
export declare function CheckPropertyNames(stack: Stack.XStack, context: CheckContext, schema: Schema.XPropertyNames, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorPropertyNames(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XPropertyNames, value: Record<PropertyKey, unknown>): boolean;
