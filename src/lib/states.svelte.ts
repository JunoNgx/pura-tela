import type { SizeItem, RgbColour, ColourItem, State } from "./types.js";
import { ThemeMode } from "./types.js";

// Syntax somehow breaks SvelteKit in a `*.svelte.ts*` file
// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
// @ts-ignore
import defaultSizeOptions from "src/data/sizes.json";

import { convertHexToRgb, isHexCodeValid } from "./utils.js";
import { createLocalStorageSyncedState, createState, isColourGalleryValid, isCurrSizeOptionIndexValid, isShouldShowSampleTextValid, isSizeOptionsValid, isThemeModeValid } from "./dataProcess.svelte.js";

/**
 * Theme Mode
 */
export const themeMode = createLocalStorageSyncedState({
    key: "themeMode",
    defaultValue: ThemeMode.AUTO,
    validationFunc: isThemeModeValid,
}) as State<ThemeMode>;

/**
 * Colour gallery list
 */
export const colourGallery = createLocalStorageSyncedState({
    key: "colourGallery",
    defaultValue: defaultColourGallery,
    validationFunc: isColourGalleryValid,
}) as State<ColourItem[]>;

/**
 * Size gallery list
 */
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
export const sizeOptions = generateSizeOptions(defaultSizeOptions);
export const currSizeOptionIndex = createLocalStorageSyncedState({
    key: "sizeOptionsIndex",
    defaultValue: 0,
    validationFunc: isCurrSizeOptionIndexValid,
}) as State<number>;
 
export const getCurrSizeOption = () => {
    const option = $derived<SizeItem>(sizeOptions[currSizeOptionIndex.val]);
    return option;
};
export const resetGallery = () => {
    colourGallery.set(defaultColourGallery);
};

/**
 * Current colour data
 */
const firstColour = defaultColourGallery[0];
const firstHexCode = firstColour.hexCode;
export const currHexCode = createLocalStorageSyncedState({
    key: "currHexCode",
    defaultValue: firstHexCode,
    validationFunc: isHexCodeValid,
}) as State<string>;

export let currRgbColour = createState<RgbColour>(
    convertHexToRgb(currHexCode.val));

/**
 * Sample text setting
 */
export const shouldShowSampleText = createLocalStorageSyncedState({
    key: "shouldShowSampleText",
    defaultValue: false,
    validationFunc: isShouldShowSampleTextValid,
}) as State<boolean>;

/**
 * Gallery scrolling position
 */
const createGalleryScrollPositionState = () => {
    let scrollingPosition = $state(0);

    return {
        get val() { return scrollingPosition },
        set: (newVal: number) => { scrollingPosition = newVal }
    };
};
export const galleryScrollPos = createGalleryScrollPositionState();