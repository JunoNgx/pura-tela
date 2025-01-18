import { browser } from "$app/environment";

import { themeMode } from "./states.svelte.js";
import { ThemeMode } from "./types.js";

export const setupAutoSettingsListener = () => {
    const preferDarkQueryList = window.matchMedia?.("(prefers-color-scheme: dark)")

    if (themeMode.val === ThemeMode.AUTO) {
        preferDarkQueryList.addEventListener("change", handleThemeModeChange);
        return;
    }
        
    preferDarkQueryList.removeEventListener("change", handleThemeModeChange);
};

export const computeThemeMode = (): ThemeMode.LIGHT | ThemeMode.DARK => {
    if (themeMode.val !== ThemeMode.AUTO) {
        return themeMode.val;
    }

    const preferDarkQueryList =
        window.matchMedia?.("(prefers-color-scheme: dark)");
    return preferDarkQueryList.matches
        ? ThemeMode.DARK
        : ThemeMode.LIGHT;
}

export const handleThemeModeChange = () => {
    if (!browser) {
        return;
    }

    setupAutoSettingsListener();

    const computedThemeMode = computeThemeMode();
    document.documentElement.setAttribute(
        "data-theme-mode", computedThemeMode);
};