import { themeMode } from "src/states/themeModeState.svelte.js";
import { ThemeMode } from "./types.js";

/**
 * Handle theme color meta tag
 */
let themeColourMeta = document.querySelector(
    "meta[name='theme-color']"
) as HTMLMetaElement;

if (!themeColourMeta) {
    themeColourMeta = document.createElement("meta");
    themeColourMeta.name = "theme-color";
    document.head.appendChild(themeColourMeta);
}

const updatethemeColourMeta = () => {
    const isLightMode = computeThemeMode() === ThemeMode.LIGHT;
    themeColourMeta.content = isLightMode ? "#E8E6E0" : "#323740";
};

export const setupAutoSettingsListener = () => {
    const preferDarkQueryList = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
    );

    if (themeMode.val === ThemeMode.AUTO) {
        preferDarkQueryList.addEventListener(
            "change",
            handlePreferDarkQueryChange
        );
        return;
    }

    preferDarkQueryList.removeEventListener(
        "change",
        handlePreferDarkQueryChange
    );
};

export const computeThemeMode = (): ThemeMode.LIGHT | ThemeMode.DARK => {
    if (themeMode.val !== ThemeMode.AUTO) {
        return themeMode.val;
    }

    const preferDarkQueryList = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
    );
    return preferDarkQueryList.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
};

const handlePreferDarkQueryChange = () => {
    writeDocumentAttribute();
};

const writeDocumentAttribute = () => {
    const computedThemeMode = computeThemeMode();
    document.documentElement.setAttribute("data-theme-mode", computedThemeMode);
};

export const handleThemeModeChange = () => {
    setupAutoSettingsListener();
    writeDocumentAttribute();
    updatethemeColourMeta();
};
