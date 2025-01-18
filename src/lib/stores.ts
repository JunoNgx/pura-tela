import { derived, writable } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import type { SizeItem, RgbColour } from "./types.js";
import { ThemeMode } from "./types.js";

import defaultColourGallery from "src/data/colours.json" with { type: "json"};
import defaultSizeOptions from "src/data/sizes.json" with { type: "json"};

import { convertHexToRgb } from "./utils.js";
import { createLocalStorageSyncedStore } from "./dataProcess.js";

export const themeMode = createLocalStorageSyncedStore({
    key: "themeMode",
    defaultValue: ThemeMode.AUTO,
});

export const colourGallery = createLocalStorageSyncedStore({
    key: "colourGallery",
    defaultValue: defaultColourGallery,
});

type rawParseSizeOptionItem = {
    name: string,
    width: string,
    height: string
};
const generateSizeOptions = (rawOptions: rawParseSizeOptionItem[]) => {
    return rawOptions.map(sizeOption => ({
        name: sizeOption.name,
        width: parseInt(sizeOption.width),
        height: parseInt(sizeOption.height)
    }));
};
export const sizeOptions = writable(
    generateSizeOptions(defaultSizeOptions));

export const sizeOptionIndex = createLocalStorageSyncedStore({
    key: "sizeOptionsIndex",
    defaultValue: 0
});
export const currSizeOption: Readable<SizeItem> = derived(
    [sizeOptions, sizeOptionIndex],
    ([$sizeOptions, $sizeOptionIndex]) => $sizeOptions[$sizeOptionIndex]
)

const firstColour = defaultColourGallery[0];
const firstHexCode = firstColour.hexCode;
export const currHexCode = createLocalStorageSyncedStore({
    key: "currHexCode",
    defaultValue: firstHexCode,
});

export const currRgbColour: Writable<RgbColour> = writable(
    convertHexToRgb(firstHexCode));
