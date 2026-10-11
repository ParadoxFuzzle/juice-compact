import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildDependentSchemas(stack: Stack.XStack, context: BuildContext, schema: Schema.XDependentSchemas, value: string): string;
export declare function CheckDependentSchemas(stack: Stack.XStack, context: CheckContext, schema: Schema.XDependentSchemas, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorDependentSchemas(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XDependentSchemas, value: Record<PropertyKey, unknown>): boolean;
