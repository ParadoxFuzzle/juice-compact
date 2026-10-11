import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildProperties(stack: Stack.XStack, context: BuildContext, schema: Schema.XProperties, value: string): string;
export declare function CheckProperties(stack: Stack.XStack, context: CheckContext, schema: Schema.XProperties, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorProperties(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XProperties, value: Record<PropertyKey, unknown>): boolean;
