import { createLocalStorageSyncedState } from "./stateUtils.svelte.js";
import type { State } from "src/lib/types.js";

export const openaiKey = createLocalStorageSyncedState({
    key: "openaiApiKey",
    defaultValue: "",
    validationFunc: (data: any) => typeof data === "string",
}) as State<string>;
