import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildType(stack: Stack.XStack, context: BuildContext, schema: Schema.XType, value: string): string;
export declare function CheckType(stack: Stack.XStack, context: CheckContext, schema: Schema.XType, value: unknown): boolean;
export declare function ErrorType(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XType, value: unknown): boolean;
