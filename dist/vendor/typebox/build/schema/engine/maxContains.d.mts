import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildMaxContains(stack: Stack.XStack, context: BuildContext, schema: Schema.XMaxContains, value: string): string;
export declare function CheckMaxContains(stack: Stack.XStack, context: CheckContext, schema: Schema.XMaxContains, value: unknown[]): boolean;
export declare function ErrorMaxContains(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XMaxContains, value: unknown[]): boolean;
