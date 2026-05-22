import { createLocalStorageSyncedState } from "./stateUtils.svelte.js";
import { geminiKey } from "./geminiKeyState.svelte.js";
import { openaiKey } from "./openaiKeyState.svelte.js";
import { generatePaletteWithGemini } from "./geminiState.svelte.js";
import { generatePaletteWithOpenai } from "./openaiState.svelte.js";
import type { State } from "src/lib/types.js";

export const AI_MODE_AUTO = "auto";
export const AI_MODE_OPENAI = "openai";
export const AI_MODE_GEMINI = "gemini";

export const aiMode = createLocalStorageSyncedState({
    key: "aiMode",
    defaultValue: AI_MODE_AUTO,
    validationFunc: (data: any) =>
        data === AI_MODE_AUTO
        || data === AI_MODE_OPENAI
        || data === AI_MODE_GEMINI,
}) as State<string>;

export const generatePaletteWithAi = async () => {
    const mode = aiMode.val;

    if (mode === AI_MODE_OPENAI && openaiKey.val) {
        return generatePaletteWithOpenai();
    }

    if (mode === AI_MODE_GEMINI && geminiKey.val) {
        return generatePaletteWithGemini();
    }

    if (openaiKey.val) {
        return generatePaletteWithOpenai();
    }

    if (geminiKey.val) {
        return generatePaletteWithGemini();
    }

    window.alert(
        "No AI API key configured. Go to Config to set up Gemini or OpenAI."
    );
};
