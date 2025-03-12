// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
import { createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";
import { WallpaperStyle, type PalGenItem, type SizeItem, type State } from "src/lib/types.js";
import { getRandomHexCode, isHexCodeValid } from "src/lib/utils.js";
import { sizeGallery } from "./sizeGalleryState.svelte.js";

/**
 * Wallpaper Generator current colours
 */
const defaultWallGenColoursValue = [
    defaultColourGallery[0].hexCode,
    defaultColourGallery[1].hexCode,
    defaultColourGallery[2].hexCode,
    defaultColourGallery[3].hexCode,
    defaultColourGallery[4].hexCode,
];

const isWallGenColoursValid = (data: string[]) => {
    if (!data) return false;
    if (data.length !== 5) return false;

    try {
        for (const item of data) {
            if (!item) return false;
            if (!isHexCodeValid(item)) return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

export const wallGenColours = createLocalStorageSyncedState({
    key: "currColours",
    defaultValue: defaultWallGenColoursValue,
    validationFunc: isWallGenColoursValid,
}) as State<string[]>;

const isColourIndexValid = (index: number) => {
    return (0 <= index && index <= wallGenColours.val.length - 1);
};

export const getWallGenColoursAtIndex = (index: number) => {
    if (!isColourIndexValid(index)) {
        throw new Error("ERROR: attempt to retrieve colour with an invalid index");
        return;
    }

    return wallGenColours.val[index];
};

export const setWallGenColoursAtIndex = (index: number, newValue: string) => {
    if (!isColourIndexValid(index)) {
        throw new Error("ERROR: attempt to set colour with an invalid index");
        return;
    }

    if (!isHexCodeValid(newValue)) {
        throw new Error("ERROR: attempt to set colour with an invalid value");
        return;
    }

    const tempArr = [...wallGenColours.val];
    tempArr[index] = newValue;
    wallGenColours.set(tempArr);
};
/**
 * This pulls the colour at the target index, and adds another random colour to
 * the end, to maintain the amount of `wallGenColours`.
 * @param index The target index
 */
export const retractWallGenColoursAtIndex = (index: number) => {
    const befPortion = wallGenColours.val.slice(0, index);
    const aftPortion = wallGenColours.val.slice(index + 1);
    const newRandomisedColour = getRandomHexCode();
    wallGenColours.set([...befPortion, ...aftPortion, newRandomisedColour]);
};

export const passPalGenToWallpaperGenerator = (palette: PalGenItem[]) => {
    try {
        const newColours = palette.map(item => item.colour);
        const coloursToBeKept = wallGenColours.val.slice(newColours.length);

        wallGenColours.set([...newColours, ...coloursToBeKept]);
        setWallGenColourInUseCount(newColours.length);
        readjustWallGenColoursInUseCount();
    } catch(error) {
        throw new Error("Failed to pass palette to Wallpaper generator");
    }
};

export const getHexColourCodesInUse = () => {
    const hexCodeList = $derived(getColoursInUse().map(item => `#${item}`));
    return hexCodeList;
};

export const getColoursInUse = () => {
    const colourCount = getWallGenColourInUseCount();
    const colourList = $derived(wallGenColours.val.slice(0, colourCount));
    return colourList;
};

/**
 * Wallpaper mode data
 */
const isWallGenStyleValid = (data: any) => {
    for (const value in WallpaperStyle) {
        if (data === value) {
            return true;
        }
    }

    return false;
};

export const wallGenStyle = createLocalStorageSyncedState({
    key: "wallpaperStyle",
    defaultValue: WallpaperStyle.SOLID,
    validationFunc: isWallGenStyleValid,
}) as State<WallpaperStyle>;

export const isSolidStyle = () => { 
    const isSolid = $derived(wallGenStyle.val === WallpaperStyle.SOLID);
    return isSolid;
};

export const isGradientStyle = () => {
    const isGradient = $derived(wallGenStyle.val === WallpaperStyle.GRADIENT);
    return isGradient;
};

export const isPopArtSquareStyle = () => {
    const isPopArtSquareStyle = $derived(wallGenStyle.val === WallpaperStyle.POP_ART_SQUARE);
    return isPopArtSquareStyle;
};

export const isPaletteRowStyle = () => {
    const isPaletteRowStyle = $derived(wallGenStyle.val === WallpaperStyle.PALETTE_ROW);
    return isPaletteRowStyle;
};

/**
 * Colour-in-use count
 */
export const isWallGenColoursInUseCountValid = (data: any) => {
    if (data === null || data === undefined || !sizeGallery) {
        return false;
    }

    try {
        parseInt(data);

        if (data < 1 || data > 5) {
            return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

const wallGenColoursInUseCount = createLocalStorageSyncedState({
    key: "currColourInUseCount",
    defaultValue: 1,
    validationFunc: isWallGenColoursInUseCountValid
}) as State<number>;

export const getWallGenColourInUseCount = () => {
    const currCount = $derived(wallGenColoursInUseCount.val);
    return currCount;
};

export const setWallGenColourInUseCount = (newValue: number) => {
    if (!isWallGenColoursInUseCountValid(newValue)) {
        throw new Error("Invalid colour in use count");
    }

    wallGenColoursInUseCount.set(newValue);
};

export const increaseWallGenColourInUseCount = () => {
    if (wallGenColoursInUseCount.val === getMaxWallGenColoursInUseCount()) {
        throw new Error("Maximum colour in use count reached");
    }

    wallGenColoursInUseCount.set(wallGenColoursInUseCount.val + 1);
};

export const decreaseWallGenColourInUseCount = () => {
    if (wallGenColoursInUseCount.val === getMinWallGenColoursInUseCount()) {
        throw new Error("Maximum colour in use count reached");
    }

    wallGenColoursInUseCount.set(wallGenColoursInUseCount.val - 1);
};

export const readjustWallGenColoursInUseCount = () => {
    const currMinColourCount = getMinWallGenColoursInUseCount();
    if (getWallGenColourInUseCount() < currMinColourCount) {
        setWallGenColourInUseCount(currMinColourCount);
    }

    const currMaxColourCount = getMaxWallGenColoursInUseCount();
    if (getWallGenColourInUseCount() > currMaxColourCount) {
        setWallGenColourInUseCount(currMaxColourCount);
    }
};

export const getMinWallGenColoursInUseCount = () => {
    switch (wallGenStyle.val) {
    case WallpaperStyle.SOLID:
        return 1;
    case WallpaperStyle.POP_ART_SQUARE:
        return 4;
    case WallpaperStyle.PALETTE_ROW:
        return 2;
    case WallpaperStyle.GRADIENT:
    default:
        return 2;
    }
};

export const getMaxWallGenColoursInUseCount = () => {
    switch (wallGenStyle.val) {
    case WallpaperStyle.SOLID:
        return 1;
    case WallpaperStyle.POP_ART_SQUARE:
        return 4;
    case WallpaperStyle.PALETTE_ROW:
        return 5;
    case WallpaperStyle.GRADIENT:
    default:
        return 5;
    }
};

/**
 * Wallpaper Generator size option index
 */
const isCurrSizeOptionIndexValid = (data: any) => {
    if (data === null || data === undefined || !sizeGallery) {
        return false;
    }

    try {
        parseInt(data);

        if (data < 0 || data > sizeGallery.length - 1) {
            return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

export const wallGenSizeOptionIndex = createLocalStorageSyncedState({
    key: "sizeOptionsIndex",
    defaultValue: 0,
    validationFunc: isCurrSizeOptionIndexValid,
}) as State<number>;
 
export const getWallGenSizeOption = () => {
    const option = $derived<SizeItem>(sizeGallery[wallGenSizeOptionIndex.val]);
    return option;
};

/**
 * Sample text setting
 */
const isShouldShowSampleTextValid = (data: any) => {
    if ( data !== true
        && data !== false
    ) {
        return false
    }

    return true;
};

export const shouldShowSampleText = createLocalStorageSyncedState({
    key: "shouldShowSampleText",
    defaultValue: false,
    validationFunc: isShouldShowSampleTextValid,
}) as State<boolean>;
