import * as Schema from '../types/index.mjs';
import * as Stack from './_stack.mjs';
import { BuildContext } from './_context.mjs';
export declare function ResetFunctions(): void;
export declare function GetFunctions(): string[];
export declare function CreateFunction(stack: Stack.XStack, context: BuildContext, schema: Schema.XSchema, value: string): string;
