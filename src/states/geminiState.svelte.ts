import { geminiKey } from "./geminiKeyState.svelte.js";

export const buildPrompt = (theme: string) => {
    const prompt = `Generate a colour palette of 7 colours. Reply with only text, made up of hex colour codes, separated by comma. The theme is: ${theme}.`;

    return prompt;
};

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
