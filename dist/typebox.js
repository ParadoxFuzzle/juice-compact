// Vendored copy of typebox (MIT) bundled into the artifact so the compiled
// entry has no runtime dependency outside the plugin package itself.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const typebox = require("./vendor/typebox/build/index.mjs") ??
    require("typebox");
export const Type = typebox.Type;
