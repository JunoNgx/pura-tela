import type { SizeItem, RgbColour, ColourItem, State } from "./types.js";
import { ThemeMode, WallpaperMode } from "./types.js";

// Syntax somehow breaks SvelteKit in a `*.svelte.ts*` file
// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
// @ts-ignore
import defaultSizeOptions from "src/data/sizes.json";

import { convertHexToRgb, isHexCodeValid } from "./utils.js";
import { createLocalStorageSyncedState, createState, isColourGalleryValid, isCurrSizeOptionIndexValid, isHexCodeListValid, isShouldShowSampleTextValid, isSizeOptionsValid, isThemeModeValid, isWallpaperModeValid } from "./dataProcess.svelte.js";

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
 * Wallpaper mode data
 */
export const currWallpaperMode = createLocalStorageSyncedState({
    key: "wallpaperMode",
    defaultValue: WallpaperMode.SOLID,
    validationFunc: isWallpaperModeValid,
}) as State<WallpaperMode>;
export const isSolidMode = () => { 
    const isSolid = $derived(currWallpaperMode.val === WallpaperMode.SOLID);
    return isSolid;
};
export const isGradientMode = () => {
    const isGradient = $derived(currWallpaperMode.val === WallpaperMode.GRADIENT);
    return isGradient;
};

/**
 * Current colour data
 */
const defaultCurrColoursValue = [
    defaultColourGallery[0].hexCode,
    defaultColourGallery[1].hexCode
];
export const currColours = createLocalStorageSyncedState({
    key: "currColours",
    defaultValue: defaultCurrColoursValue,
    validationFunc: isHexCodeListValid,
}) as State<string[]>;
// Add the hashmark to correctly turn data into proper hex codes
export const convertCurrColoursToArrayOfHexStrings = () => {
    const hexCodeList = $derived(currColours.val.map(item => `#${item}`));
    return hexCodeList;
};

/**
 * Colour utils setters and getters
 */
const isColourIndexValid = (index: number) => {
    return (0 < index && index < currColours.val.length - 1);
};

export const getCurrColourAtIndex = (index: number) => {
    if (!isColourIndexValid(index)) {
        console.error("ERROR: attempt to retrieve colour with an invalid index");
        return;
    }

    return currColours.val[index];
};

export const setCurrColourAtIndex = (index: number, newValue: string) => {
    if (!isColourIndexValid(index)) {
        console.error("ERROR: attempt to set colour with an invalid index");
        return;
    }

    if (!isHexCodeValid(newValue)) {
        console.error("ERROR: attempt to set colour with an invalid value");
        return;
    }

    const tempArr = [...currColours.val];
    tempArr[index] = newValue;
    currColours.set(tempArr);
};

// TODO: comment out below
export const getSolidColour = () => {
    return getCurrColoursAtIndex(0);
};
export const setSolidColour = (newValue: string) => {
    return setCurrColoursAtIndex(0, newValue);
}
export const getCurrColoursAtIndex = (index: number) => {
    if (index < 0 || currColours.val.length < index)
        throw new Error("Invalid array index");

    return currColours.val[index];
};
export const setCurrColoursAtIndex = (index: number, newValue: string) => {
    if (index < 0 || currColours.val.length < index)
        return;

    const tempList = [...currColours.val];
    tempList[index] = newValue;

    currColours.set(tempList);
};

/**
 * The rgb version of the first colour
 *
 * Only relevant when one colour is in use
 */
export let currRgbColour = createState<RgbColour>(
    convertHexToRgb(currColours.val[0]));

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