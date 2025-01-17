import { derived, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { ThemeMode, type RgbColour } from "./types.js";

import defaultColourGallery from "src/data/colours.json" with { type: "json"};
import defaultSizeOptions from "src/data/sizes.json" with { type: "json"};

import { convertHexToRgb, loadFromLocalStorage } from "./utils.js";
import { browser } from "$app/environment";

export const themeMode = writable(loadFromLocalStorage({
    key: "themeMode",
    defaultValue: ThemeMode.AUTO,
}));

export const colourGallery = writable(loadFromLocalStorage({
    key: "colourGallery",
    defaultValue: defaultColourGallery,
}));

// TODO: load from localStorage
export const sizeOptions = writable(loadFromLocalStorage({
    key: "sizeOptions",
    defaultValue: defaultSizeOptions,
}));

export const sizeOptionIndex = writable(0);
export const currSizeOption = derived(
    [sizeOptions, sizeOptionIndex],
    ([$sizeOptions, $sizeOptionIndex]) => $sizeOptions[$sizeOptionIndex]
)

const firstColour = defaultColourGallery[0];
const firstHexCode = firstColour.hexCode;
export const currHexCode = writable(loadFromLocalStorage({
    key: "currHexCode",
    defaultValue: firstHexCode,
}));
currHexCode.subscribe(value => {
    if (typeof window !== 'undefined') {
        if (!browser) {
            return;
        }

        localStorage.setItem("currHexCode", value);
    }
});

export const currRgbColour: Writable<RgbColour> = writable(
    convertHexToRgb(firstHexCode));
