export const buildPrompt = (theme: string) => {
    const prompt = `Generate a colour palette of 7 colours. Reply with only text, made up of hex colour codes, separated by comma. The theme is: ${theme}.`;

    return prompt;
};
