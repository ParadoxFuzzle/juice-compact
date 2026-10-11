import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildAdditionalItems(stack: Stack.XStack, context: BuildContext, schema: Schema.XAdditionalItems, value: string): string;
export declare function CheckAdditionalItems(stack: Stack.XStack, context: CheckContext, schema: Schema.XAdditionalItems, value: unknown[]): boolean;
export declare function ErrorAdditionalItems(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XAdditionalItems, value: unknown[]): boolean;
