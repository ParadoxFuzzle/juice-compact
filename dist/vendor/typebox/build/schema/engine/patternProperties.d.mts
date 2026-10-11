import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildPatternProperties(stack: Stack.XStack, context: BuildContext, schema: Schema.XPatternProperties, value: string): string;
export declare function CheckPatternProperties(stack: Stack.XStack, context: CheckContext, schema: Schema.XPatternProperties, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorPatternProperties(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XPatternProperties, value: Record<PropertyKey, unknown>): boolean;
