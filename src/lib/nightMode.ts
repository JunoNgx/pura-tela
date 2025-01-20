import { browser } from "$app/environment";

import { themeMode } from "./states.svelte.js";
import { ThemeMode } from "./types.js";

export const setupAutoSettingsListener = () => {
    const preferDarkQueryList = window.matchMedia?.("(prefers-color-scheme: dark)")

    if (themeMode.val === ThemeMode.AUTO) {
        preferDarkQueryList.addEventListener("change", handlePreferDarkQueryChange);
        return;
    }
        
    preferDarkQueryList.removeEventListener("change", handlePreferDarkQueryChange);
};

export const computeThemeMode = (): ThemeMode.LIGHT | ThemeMode.DARK => {
    if (!browser) {
        return ThemeMode.LIGHT;
    }

    if (themeMode.val !== ThemeMode.AUTO) {
        return themeMode.val;
    }

    const preferDarkQueryList =
        window.matchMedia?.("(prefers-color-scheme: dark)");
    return preferDarkQueryList.matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;
}

const handlePreferDarkQueryChange = () => {
    if (!browser) {
        return;
    }

    writeDocumentAttribute();
};

const writeDocumentAttribute = () => {
    const computedThemeMode = computeThemeMode();
    document.documentElement.setAttribute(
        "data-theme-mode", computedThemeMode);
};

export const handleThemeModeChange = () => {
    if (!browser) {
        return;
    }

    setupAutoSettingsListener();
    writeDocumentAttribute();
};