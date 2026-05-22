import { geminiKey } from "./geminiKeyState.svelte.js";
import { openaiKey } from "./openaiKeyState.svelte.js";
import { generatePaletteWithGemini } from "./geminiState.svelte.js";
import { generatePaletteWithOpenai } from "./openaiState.svelte.js";

export const generatePaletteWithAi = async () => {
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
