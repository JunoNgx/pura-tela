// @ts-ignore
import { createColState, createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";
import { WallpaperStyle, type ColObj, type State, type WallpaperStyleInfo } from "src/lib/types.js";
import { getRandomHexCode, isHexCodeValid } from "src/lib/utils.js";
import { sizeGallery } from "./sizeGalleryState.svelte.js";
import { MAX_COLOUR_COUNT, MAX_HEIGHT, MAX_WIDTH } from "src/lib/constants.js";
import { generateId } from "./idGenState.svelte.js";
import { tryParseColours } from "src/lib/parseFuncs.js";
import { colourSwatchStyleConfig } from "./wallGenStyleConfigColourSwatchState.svelte.js";
import { gradientStyleConfig } from "./wallGenStyleConfigGradientState.svelte.js";
import { paletteStyleConfig } from "./wallGenStyleConfigPaletteState.svelte.js";
import { horizonStyleConfig } from "./wallGenStyleConfigHorizonState.svelte.js";

/**
 * Wallpaper Generator current colours
 */
const defaultWallGenColoursValue = [
    // No idea, to emulate the data that would have been stored in LocalStorage
    { colour: "04AE9C" },
    { colour: "CCA5C6" },
    { colour: "CD4173" },
    { colour: "7BFFB0" },
    { colour: "99E343" },
    { colour: "235646" },
    { colour: "F43606" }
];
const isWallGenColoursValid = (data: ColObj[]) => {
    if (!data) return false;
    if (data.length !== MAX_COLOUR_COUNT) return false;

    try {
        for (const item of data) {
            if (!item) return false;
            if (!isHexCodeValid(item.colour)) return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

export const wallGenColours = <State<ColObj[]>>createColState({
    key: "wallGenColours",
    defaultValue: defaultWallGenColoursValue,
    validationFunc: isWallGenColoursValid,
});

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
    }

    if (!isHexCodeValid(newValue)) {
        throw new Error("ERROR: attempt to set colour with an invalid value");
    }

    const tempArr = [...wallGenColours.val];
    tempArr[index].colour = newValue;
    wallGenColours.set(tempArr);
};
/**
 * This pulls the colour at the target index, and adds another random colour to
 * the end, to maintain the amount of `wallGenColours`.
 * 
 * Also unused.
 * @param index The target index
 */
export const retractWallGenColoursAtIndex = (index: number) => {
    const befPortion = wallGenColours.val.slice(0, index);
    const aftPortion = wallGenColours.val.slice(index + 1);
    const newRandomisedColour = {
        id: generateId(),
        colour: getRandomHexCode(),
    };
    wallGenColours.set([...befPortion, ...aftPortion, newRandomisedColour]);
};

// export const retractWallGenColoursById = (id: number) => {
//     const targetIndex = wallGenColours.val.findIndex(colourObj => colourObj.id === id);
//     if (targetIndex === -1) {
//         throw new Error("Cannot find target colour for retracting in Wallpaper Generator");
//     }

//     const befPortion = wallGenColours.val.slice(0, targetIndex);
//     const aftPortion = wallGenColours.val.slice(targetIndex + 1);
//     const newRandomisedColour = {
//         id: generateId(),
//         colour: getRandomHexCode(),
//     };
//     wallGenColours.set([...befPortion, ...aftPortion, newRandomisedColour]);
// };

/**
 * Move the new colours onto WallGen, which might not completely fill up all colours
 */
export const passSomeColourStringsToWallpaperGenerator = (newColours: string[]) => {
    // Data is internal, so this is assumed to have been validated
    const coloursToBeKept = wallGenColours.val.slice(newColours.length);
    const newColourObjList = newColours.map(colour => ({
        id: generateId(),
        colour,
    }));

    wallGenColours.set([...newColourObjList, ...coloursToBeKept]);
};

export const passSomeColourObjectsToWallpaperGenerator = (newColours: ColObj[]) => {
    const coloursToBeKept = wallGenColours.val.slice(newColours.length);
    wallGenColours.set([...newColours, ...coloursToBeKept]);
};

export const tryParseFromStringToWallGen = (inputStr: string) => {
    const newVal = tryParseColours(inputStr);

    if (!newVal) {
        window.alert("Data is invalid")
        return;
    }

    const newValue = newVal.map(colour => ({
        id: generateId(),
        colour,
    }));
    wallGenColours.set([...newValue]);
};

// export const moveWallGenColourItemUpAtIndex = (index: number) => {
//     if (index <= 0) {
//         throw new Error("Already at the first position");
//     }

//     const newValue = moveItemWithinArray(derivedColourObjectsInUse, index, index - 1);
//     passSomeColourObjectsToWallpaperGenerator(newValue);
// };

// export const moveWallGenColourItemDownAtIndex = (index: number) => {
//     if (index >= getWallGenColourInUseCount() - 1) {
//         throw new Error("Already at the last position");
//     }

//     const newValue = moveItemWithinArray(derivedColourObjectsInUse, index, index + 1);
//     passSomeColourObjectsToWallpaperGenerator(newValue);
// };

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
    defaultValue: WallpaperStyle.POP_ART_SQUARE,
    validationFunc: isWallGenStyleValid,
}) as State<WallpaperStyle>;

export const isSolidStyle = () => { 
    return wallGenStyle.val === WallpaperStyle.SOLID;
};

export const isGradientStyle = () => {
    return wallGenStyle.val === WallpaperStyle.GRADIENT;
};

export const isPopArtSquareStyle = () => {
    return wallGenStyle.val === WallpaperStyle.POP_ART_SQUARE;
};

export const isColourSwatchStyle = () => {
    return wallGenStyle.val === WallpaperStyle.COLOUR_SWATCH;
};

export const isPaletteStyle = () => {
    return wallGenStyle.val === WallpaperStyle.PALETTE;
};

export const isHorizonStyle = () => {
    return wallGenStyle.val === WallpaperStyle.HORIZON;
};

const currStyleInfo = $derived.by(() => {
    switch (wallGenStyle.val) {
    case WallpaperStyle.SOLID:
        return {
            defaultColourCount: 1,
            minColourCount: 1,
            maxColourCount: 1,
        };

    case WallpaperStyle.GRADIENT:
        return {
            defaultColourCount: 2,
            minColourCount: 2,
            maxColourCount: MAX_COLOUR_COUNT,
        };

    case WallpaperStyle.POP_ART_SQUARE:
        return {
            defaultColourCount: 4,
            minColourCount: 4,
            maxColourCount: 4,
        };

    case WallpaperStyle.COLOUR_SWATCH:
    case WallpaperStyle.PALETTE:
        return {
            defaultColourCount: 5,
            minColourCount: 2,
            maxColourCount: MAX_COLOUR_COUNT,
        };

    case WallpaperStyle.HORIZON:
        return {
            defaultColourCount: 6,
            minColourCount: 6,
            maxColourCount: 6,
        };

    default:
        throw new Error("Retrieving info; invalid wallpaper style not found")
    }
});
export const getCurrWallStyleInfo = (): WallpaperStyleInfo => {
    return currStyleInfo;
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

        if (data < 1 || data > MAX_COLOUR_COUNT) {
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
    return wallGenColoursInUseCount.val;
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

export const defaultWallGenSizeValue = {
    width: 1080,
    height: 1920,
};

export const wallGenSize = createLocalStorageSyncedState({
    key: "size",
    defaultValue: defaultWallGenSizeValue,
    validationFunc: isWallGenSizeValid,
});

export const setWallGenSizeFull = (width: number, height: number) => {
    wallGenSize.set({ width, height });
};

export const setWallGenSizeWidth = (newWidth: number) => {
    wallGenSize.set({
        width: newWidth,
        height: wallGenSize.val.height,
    });
};

export const setWallGenSizeHeight = (newHeight: number) => {
    wallGenSize.set({
        width: wallGenSize.val.width,
        height: newHeight,
    });
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

export const isPortraitScreen = () => {
    return wallGenSize.val.height > wallGenSize.val.width;
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

/**
 * Derived values 
 */
const derivedColourObjectsInUse = $derived(wallGenColours.val.slice(0, getWallGenColourInUseCount()));
export const getColourObjectsInUse = () => {
    return derivedColourObjectsInUse;
};

const derivedColourStringsInUse = $derived(derivedColourObjectsInUse.map(colObj => colObj.colour));
export const getColourStringsInUse = () => {
    return derivedColourStringsInUse;
};

const derivedHexColourCodesInUse = $derived(derivedColourStringsInUse.map(colour => `#${colour}`));
export const getHexColourCodesInUse = () => {
    return derivedHexColourCodesInUse;
};

const derivedColourSwatchStyleConfig = $derived(colourSwatchStyleConfig.val);
const derivedGradientStyleConfig = $derived(gradientStyleConfig.val);
const derivedPaletteConfig = $derived(paletteStyleConfig.val);
const derivedHorizonConfig = $derived(horizonStyleConfig.val);
const derivedStyleConfig = $derived({
    colourSwatch: derivedColourSwatchStyleConfig,
    gradient: derivedGradientStyleConfig,
    palette: derivedPaletteConfig,
    horizon: derivedHorizonConfig,
});
export const getStyleConfig = () => {
    return derivedStyleConfig;
}
