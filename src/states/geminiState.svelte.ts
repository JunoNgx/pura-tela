import { GoogleGenerativeAI } from "@google/generative-ai";

export const initialiseGemini = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Gemini API key is not set up");
        return null;
    }

    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({
        model: "gemini-flash-latest",
    });

    return model;
};

export const gemini = $state(initialiseGemini());

export const buildPrompt = (theme: string) => {
    const prompt = `Generate a colour palette of 7 colours. Reply with only text, made up of hex colour codes, separated by comma. The theme is: ${theme}.`;

    return prompt;
};

export const generatePaletteWithGemini = async () => {
    if (!gemini) {
        window.alert("Gemini was not initialised");
        return;
    }

    const input = window.prompt(
        'Enter the theme of the colour as prompt (e.g. "autumn"):'
    );
    if (!input) {
        return;
    }

    const prompt = buildPrompt(input);
    const result = await gemini.generateContent(prompt);

    return result?.response.text();
};
