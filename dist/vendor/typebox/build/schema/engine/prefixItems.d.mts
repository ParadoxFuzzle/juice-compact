import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildPrefixItems(stack: Stack.XStack, context: BuildContext, schema: Schema.XPrefixItems, value: string): string;
export declare function CheckPrefixItems(stack: Stack.XStack, context: CheckContext, schema: Schema.XPrefixItems, value: unknown[]): boolean;
export declare function ErrorPrefixItems(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XPrefixItems, value: unknown[]): boolean;
