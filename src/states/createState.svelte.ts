import type { State } from "src/lib/types.js";

export const createState = <T>(
    defaultValue: T
): State<T> => {
    let state = $state<T>(defaultValue);

    return {
        get val() { return state; },
        set(v: T) { state = v;}
    }
};
