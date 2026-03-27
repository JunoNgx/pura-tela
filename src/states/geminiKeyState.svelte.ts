import { createLocalStorageSyncedState } from "./stateUtils.svelte.js";
import type { State } from "src/lib/types.js";

const isGeminiKeyValid = (data: any) => {
    return typeof data === "string";
};

export const geminiKey = createLocalStorageSyncedState({
    key: "geminiApiKey",
    defaultValue: "",
    validationFunc: isGeminiKeyValid,
}) as State<string>;
