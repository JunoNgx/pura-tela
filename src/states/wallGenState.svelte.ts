// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
import { createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";
import { WallpaperStyle, type PalGenItem, type SizeItem, type State, type WallpaperStyleInfo } from "src/lib/types.js";
import { getRandomHexCode, isHexCodeValid } from "src/lib/utils.js";
import { sizeGallery } from "./sizeGalleryState.svelte.js";
import { MAX_COLOUR_COUNT, MAX_HEIGHT, MAX_WIDTH } from "src/lib/constants.js";

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
export const isWallGenStyleValid = (data: any) => {
    for (const key in WallpaperStyle) {
        const value = WallpaperStyle[key as keyof typeof WallpaperStyle];
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

export const getCurrWallStyleInfo = (): WallpaperStyleInfo => {
    switch (wallGenStyle.val) {
    case WallpaperStyle.SOLID:
        return {
            defaultColourCount: 1,
            minColourCount: 1,
            maxColourCount: 1,
        }

    case WallpaperStyle.GRADIENT:
        return {
            defaultColourCount: 2,
            minColourCount: 2,
            maxColourCount: MAX_COLOUR_COUNT,
        }

    case WallpaperStyle.POP_ART_SQUARE:
        return {
            defaultColourCount: 4,
            minColourCount: 4,
            maxColourCount: 4,
        }

    case WallpaperStyle.PALETTE_ROW:
        return {
            defaultColourCount: 2,
            minColourCount: 5,
            maxColourCount: MAX_COLOUR_COUNT,
        }

    default:
        throw new Error("Retrieving info; invalid wallpaper style not found")
    }
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
    if (wallGenColoursInUseCount.val === getCurrWallStyleInfo().maxColourCount) {
        throw new Error("Maximum colour in use count reached");
    }

    wallGenColoursInUseCount.set(wallGenColoursInUseCount.val + 1);
};

export const decreaseWallGenColourInUseCount = () => {
    if (wallGenColoursInUseCount.val === getCurrWallStyleInfo().minColourCount) {
        throw new Error("Minimum colour in use count reached");
    }

    wallGenColoursInUseCount.set(wallGenColoursInUseCount.val - 1);
};

export const readjustWallGenColoursInUseCount = () => {
    const currMinColourCount = getCurrWallStyleInfo().minColourCount;
    if (getWallGenColourInUseCount() < currMinColourCount) {
        setWallGenColourInUseCount(currMinColourCount);
    }

    const currMaxColourCount = getCurrWallStyleInfo().maxColourCount;
    if (getWallGenColourInUseCount() > currMaxColourCount) {
        setWallGenColourInUseCount(currMaxColourCount);
    }
};

/**
 * Wallpaper Genarator current size
 */
const isWallGenSizeValid = (data: any) => {
    if (data === null || data === undefined) {
        return false;
    }

    try {
        if (data.width <= 0 || data.width > MAX_WIDTH) {
            return false;
        }

        if (data.height <= 0 || data.height > MAX_HEIGHT) {
            return false;
        }

        return true;

    } catch (err) {
        return false;
    }
};

export const wallGenSize = createLocalStorageSyncedState({
    key: "size",
    defaultValue: { width: 1080, height: 1920 },
    validationFunc: isWallGenSizeValid,
});

export const setWallGenSize = (width: number, height: number) => {
    wallGenSize.set({ width, height });
};

export const setWallGenSizeFromSizeGalleryIndex = (index: number) => {
    const isSizeGalleryIndexValid = (index: number) => {
        return (0 <= index && index <= sizeGallery.length - 1);
    };

    if (!isSizeGalleryIndexValid(index)) {
        throw new Error("Invalid size gallery index")
    }

    const sizeGalleryItem = sizeGallery[index];
    wallGenSize.set({
        width: sizeGalleryItem.width,
        height: sizeGalleryItem.height,
    });
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
