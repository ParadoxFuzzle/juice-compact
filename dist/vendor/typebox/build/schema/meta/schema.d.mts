import type { XSchema } from '../types/schema.mjs';
/** Represents a JSON Schema meta-schema that infers as XSchema. */
export type XMetaSchemaObject = {
    $schema: string;
    ['~unsafe']: XSchema;
};
