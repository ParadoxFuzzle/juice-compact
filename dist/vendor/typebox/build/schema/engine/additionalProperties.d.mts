import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function CanAdditionalPropertiesFast(_context: BuildContext, schema: Schema.XAdditionalProperties, _value: string): schema is Schema.XAdditionalProperties & Schema.XRequired;
export declare function BuildAdditionalPropertiesFast(_context: BuildContext, schema: Schema.XAdditionalProperties & Schema.XRequired, value: string): string;
export declare function BuildAdditionalPropertiesStandard(stack: Stack.XStack, context: BuildContext, schema: Schema.XAdditionalProperties, value: string): string;
export declare function BuildAdditionalProperties(stack: Stack.XStack, context: BuildContext, schema: Schema.XAdditionalProperties, value: string): string;
export declare function CheckAdditionalProperties(stack: Stack.XStack, context: CheckContext, schema: Schema.XAdditionalProperties, value: Record<PropertyKey, unknown>): boolean;
export declare function ErrorAdditionalProperties(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XAdditionalProperties, value: Record<PropertyKey, unknown>): boolean;
