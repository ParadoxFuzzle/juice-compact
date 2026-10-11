import * as Schema from '../types/index.mjs';
import { type XStatic } from '../static/index.mjs';
export interface XIntern<Type extends unknown = unknown> {
    '~unsafe': Type;
    $ref: string;
    $defs: Record<string, Schema.XSchemaObject>;
}
/** (Experimental) This function restructures the schema such that each distinct sub-schema is stored exactly once in a $defs object and keyed by content hash. */
export declare function Intern<const Schema extends Schema.XSchema>(schema: Schema): XIntern<XStatic<Schema>>;
/** (Experimental) This function restructures the schema such that each distinct sub-schema is stored exactly once in a $defs object and keyed by content hash. */
export declare function Intern<const Schema extends Schema.XSchema>(context: Record<PropertyKey, Schema.XSchema>, schema: Schema): XIntern<XStatic<Schema>>;
