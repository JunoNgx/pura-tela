import { openaiKey } from "./openaiKeyState.svelte.js";
import { buildPrompt } from "src/lib/aiPrompt.js";

export const generatePaletteWithOpenai = async () => {
    if (!openaiKey.val) {
        window.alert("OpenAI was not initialised");
        return;
    }

    const input = window.prompt(
        'Enter the theme of the colour as prompt (e.g. "autumn"):'
    );
    if (!input) {
        return;
    }

    const OpenAI = await import("openai");
    const client = new OpenAI.default({
        apiKey: openaiKey.val,
        dangerouslyAllowBrowser: true,
    });

    const prompt = buildPrompt(input);
    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0]?.message?.content;
};
