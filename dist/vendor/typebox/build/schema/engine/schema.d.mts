import * as Schema from '../types/index.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
import * as Stack from './_stack.mjs';
export declare function BuildSchemaPushStack(stack: Stack.XStack, context: BuildContext, schema: Schema.XSchema, value: string): string;
export declare function BuildSchema(stack: Stack.XStack, context: BuildContext, schema: Schema.XSchema, value: string): string;
export declare function CheckSchemaPushStack(stack: Stack.XStack, context: CheckContext, schema: Schema.XSchema, value: unknown): boolean;
export declare function CheckSchema(stack: Stack.XStack, context: CheckContext, schema: Schema.XSchema, value: unknown): boolean;
export declare function ErrorSchemaPushStack(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XSchema, value: unknown): boolean;
export declare function ErrorSchema(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XSchema, value: unknown): boolean;
