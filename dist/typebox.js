// Vendored copy of typebox (MIT) bundled into the artifact so the compiled
// entry has no runtime dependency outside the plugin package itself.
//
// `require()` THROWS on a missing module — it does not return null — so the
// previous `?? require("typebox")` fallback was unreachable and unit tests
// (which run from src/, where dist/vendor does not exist) could not load.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let typebox;
try {
    // dist/typebox.js -> dist/vendor/typebox/build/index.mjs (published artifact)
    typebox = require("./vendor/typebox/build/index.mjs");
}
catch {
    // src/ (tests) or an install that hoists the real package
    typebox = require("typebox");
}
export const Type = typebox.Type;
