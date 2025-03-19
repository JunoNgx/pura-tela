import type { State } from "src/lib/types.js";
import { createState } from "./createState.svelte.js";

/**
 * A dumb and simple id generator to keep track of instances of colour objects.
 * Intentionally starts at 101, to reserve the first 100 for default values.
 */
export const idGen = createState(101) as State<number>;
export const generateId = () => {
    const idToUse = idGen.val.toString();
    idGen.set(idGen.val + 1);

    return idToUse;
};
