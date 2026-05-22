import { createLocalStorageSyncedState } from "./stateUtils.svelte.js";
import { geminiKey } from "./geminiKeyState.svelte.js";
import { openaiKey } from "./openaiKeyState.svelte.js";
import { generatePaletteWithGemini } from "./geminiState.svelte.js";
import { generatePaletteWithOpenai } from "./openaiState.svelte.js";
import type { State } from "src/lib/types.js";

export const AI_MODE_OPENAI = "openai";
export const AI_MODE_GEMINI = "gemini";

export const aiMode = createLocalStorageSyncedState({
    key: "aiMode",
    defaultValue: "",
    validationFunc: (data: any) =>
        data === AI_MODE_OPENAI || data === AI_MODE_GEMINI || data === "",
}) as State<string>;

let _isGenerating = $state(false);
let _lastError = $state<string | null>(null);

export const isAiGenerating = {
    get val() {
        return _isGenerating;
    },
};

export const lastAiError = {
    get val() {
        return _lastError;
    },
};

export const generatePaletteWithAi = async () => {
    _isGenerating = true;
    _lastError = null;

    try {
        const mode = aiMode.val;

        if (mode === AI_MODE_OPENAI && openaiKey.val) {
            return await generatePaletteWithOpenai();
        }

        if (mode === AI_MODE_GEMINI && geminiKey.val) {
            return await generatePaletteWithGemini();
        }

        if (openaiKey.val) {
            return await generatePaletteWithOpenai();
        }

        if (geminiKey.val) {
            return await generatePaletteWithGemini();
        }

        _lastError = "No AI API key configured.";
    } catch (err) {
        _lastError = err instanceof Error ? err.message : "AI request failed";
    } finally {
        _isGenerating = false;
    }
};
