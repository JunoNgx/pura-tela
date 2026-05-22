import { geminiKey } from "./geminiKeyState.svelte.js";
import { buildPrompt } from "src/lib/aiPrompt.js";

export const generatePaletteWithGemini = async () => {
    if (!geminiKey.val) {
        window.alert("Gemini was not initialised");
        return;
    }

    const input = window.prompt(
        'Enter the theme of the colour as prompt (e.g. "autumn"):'
    );
    if (!input) {
        return;
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAi = new GoogleGenerativeAI(geminiKey.val);
    const model = genAi.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = buildPrompt(input);
    const result = await model.generateContent(prompt);

    return result?.response.text();
};
