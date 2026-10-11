import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMinContains(stack: Stack.XStack, context: BuildContext, schema: Schema.XMinContains, value: string): string;
export declare function CheckMinContains(stack: Stack.XStack, context: CheckContext, schema: Schema.XMinContains, value: unknown[]): boolean;
export declare function ErrorMinContains(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMinContains, value: unknown[]): boolean;
