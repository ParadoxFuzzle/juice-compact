import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext, CheckContext, ErrorContext } from './_context.mjs';
export declare function BuildIf(stack: Stack.XStack, context: BuildContext, schema: Schema.XIf, value: string): string;
export declare function CheckIf(stack: Stack.XStack, context: CheckContext, schema: Schema.XIf, value: unknown): boolean;
export declare function ErrorIf(stack: Stack.XStack, context: ErrorContext, schemaPath: string, instancePath: string, schema: Schema.XIf, value: unknown): boolean;
