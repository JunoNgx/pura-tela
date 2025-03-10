import type { SizeItem, RgbColour, ColourItem, State } from "./types.js";
import { ThemeMode, WallpaperMode } from "./types.js";

// Syntax somehow breaks SvelteKit in a `*.svelte.ts*` file
// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
// @ts-ignore
import defaultPaletteGallery from "src/data/palettes.json";
// @ts-ignore
import defaultSizeOptions from "src/data/sizes.json";

import { getRandomHexCode, isHexCodeValid } from "./utils.js";
import { createLocalStorageSyncedState, isColourCountValid, isColourGalleryValid, isCurrSizeOptionIndexValid, isCurrColoursValid, isShouldShowSampleTextValid, isSizeOptionsValid, isThemeModeValid, isWallpaperModeValid, isPaletteGalleryValid, isPalGenColoursValid } from "./dataProcess.svelte.js";

/**
 * Theme Mode
 */
// export const themeMode = createLocalStorageSyncedState({
//     key: "themeMode",
//     defaultValue: ThemeMode.AUTO,
//     validationFunc: isThemeModeValid,
// }) as State<ThemeMode>;

/**
 * Colour gallery list
 */
export const colourGallery = createLocalStorageSyncedState({
    key: "colourGallery",
    defaultValue: defaultColourGallery,
    validationFunc: isColourGalleryValid,
}) as State<ColourItem[]>;

export const addToColourGallery = (colourCode: string) => {
    const colourName = window.prompt("Enter name for new colour", `#${colourCode}`)
    if (!colourName) return;

    try {
        const newColour = {
            name: colourName,
            hexCode: colourCode,
        };

        colourGallery.set([...colourGallery.val, newColour]);
    } catch(error) {
        console.error(error);
        window.alert("Error adding new colour to gallery. Please see the console for more info.")
    }
};

export const deleteColourAtIndex = (index: number) => {
    const befPortion = colourGallery.val.slice(0, index);
    const aftPortion = colourGallery.val.slice(index + 1);
    colourGallery.set([...befPortion, ...aftPortion]);
};

export const resetColourGallery = () => {
    colourGallery.set(defaultColourGallery);
};

/**
 * Palette gallery list
 */
export const paletteGallery = createLocalStorageSyncedState({
    key: "paletteGallery",
    defaultValue: defaultPaletteGallery,
    validationFunc: isPaletteGalleryValid,
});

export const addToPaletteGalleryFromWallpaperGenerator = () => {
    const name = window.prompt("Enter name for new palette");
    if (!name) return;

    try {
        const colours = getColoursInUse();
        const newPalette = {
            name,
            colours,
        };

        paletteGallery.set([...paletteGallery.val, newPalette]);
    } catch(error) {
        console.error(error);
        window.alert("Error adding new palette to gallery. Please see the console for more info.")
    }
};

export const addToPaletteGalleryFromPaletteGenerator = () => {
    const name = window.prompt("Enter name for new palette");
    if (!name) return;

    try {
        const colours = palGenColours.val.map(palGenItem => palGenItem.colour);
        const newPalette = {
            name,
            colours,
        };

        paletteGallery.set([...paletteGallery.val, newPalette]);
    } catch(error) {
        console.error(error);
        window.alert("Error adding new palette to gallery. Please see the console for more info.")
    }
};

export const deletePaletteAtIndex = (index: number) => {
    const isConfirmed = window.confirm("Delete this palette from the gallery?");
    if (!isConfirmed) return;

    const befPortion = paletteGallery.val.slice(0, index);
    const aftPortion = paletteGallery.val.slice(index + 1);
    paletteGallery.set([...befPortion, ...aftPortion]);
};

export const resetPaletteGallery = () => {
    paletteGallery.set(defaultPaletteGallery);
};

export const passPaletteToWallpaperGenerator = (paletteIndex: number) => {
    try {
        const palette = paletteGallery.val[paletteIndex];
        const newColours = palette.colours;
        const coloursToBeKept = currColours.val.slice(newColours.length);

        currColours.set([...newColours, ...coloursToBeKept]);
        setCurrColourInUseCount(newColours.length);
        readjustCurrColourInUseCount();
    } catch(error) {
        throw new Error("Failed to pass palette to Wallpaper generator");
    }
}

export const passPaletteToPaletteGenerator = (paletteIndex: number) => {
    try {
        const palette = paletteGallery.val[paletteIndex];
        const newVal = palette.colours.map(colour => ({
            colour,
            isLocked: false,
        }));

        palGenColours.set([...newVal]);
    } catch(error) {
        throw new Error("Failed to pass palette to Palette Generator");
    }
}

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
export const isPopArtSquareMode = () => {
    const isPopArtSquareMode = $derived(currWallpaperMode.val === WallpaperMode.POP_ART_SQUARE);
    return isPopArtSquareMode;
};
export const isPaletteRowMode = () => {
    const isPaletteRowMode = $derived(currWallpaperMode.val === WallpaperMode.PALETTE_ROW);
    return isPaletteRowMode;
};

/**
 * Colour-in-use count
 */
const currColourInUseCount = createLocalStorageSyncedState({
    key: "currColourInUseCount",
    defaultValue: 1,
    validationFunc: isColourCountValid
}) as State<number>;
export const getCurrColourInUseCount = () => {
    const currCount = $derived(currColourInUseCount.val);
    return currCount;
}
export const setCurrColourInUseCount = (newValue: number) => {
    if (!isColourCountValid(newValue)) {
        throw new Error("Invalid colour in use count");
    }

    currColourInUseCount.set(newValue);
}
export const increaseCurrColourInUseCount = () => {
    if (currColourInUseCount.val === getMaxColourInUseCount()) {
        throw new Error("Maximum colour in use count reached");
    }

    currColourInUseCount.set(currColourInUseCount.val + 1);
}
export const decreaseCurrColourInUseCount = () => {
    if (currColourInUseCount.val === getMinColourInUseCount()) {
        throw new Error("Maximum colour in use count reached");
    }

    currColourInUseCount.set(currColourInUseCount.val - 1);
}
export const readjustCurrColourInUseCount = () => {
    const currMinColourCount = getMinColourInUseCount();
    if (getCurrColourInUseCount() < currMinColourCount) {
        setCurrColourInUseCount(currMinColourCount);
    }

    const currMaxColourCount = getMaxColourInUseCount();
    if (getCurrColourInUseCount() > currMaxColourCount) {
        setCurrColourInUseCount(currMaxColourCount);
    }
};
export const getMinColourInUseCount = () => {
    switch (currWallpaperMode.val) {
    case WallpaperMode.SOLID:
        return 1;
    case WallpaperMode.POP_ART_SQUARE:
        return 4;
    case WallpaperMode.POP_ART_SQUARE:
        return 2;
    case WallpaperMode.GRADIENT:
    default:
        return 2;
    }
};
export const getMaxColourInUseCount = () => {
    switch (currWallpaperMode.val) {
    case WallpaperMode.SOLID:
        return 1;
    case WallpaperMode.POP_ART_SQUARE:
        return 4;
    case WallpaperMode.POP_ART_SQUARE:
        return 5;
    case WallpaperMode.GRADIENT:
    default:
        return 5;
    }
};

/**
 * Current colour data
 */
const defaultCurrColoursValue = [
    defaultColourGallery[0].hexCode,
    defaultColourGallery[1].hexCode,
    defaultColourGallery[2].hexCode,
    defaultColourGallery[3].hexCode,
    defaultColourGallery[4].hexCode,
];
export const currColours = createLocalStorageSyncedState({
    key: "currColours",
    defaultValue: defaultCurrColoursValue,
    validationFunc: isCurrColoursValid,
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
    return (0 <= index && index <= currColours.val.length - 1);
};
export const getCurrColourAtIndex = (index: number) => {
    if (!isColourIndexValid(index)) {
        throw new Error("ERROR: attempt to retrieve colour with an invalid index");
        return;
    }

    return currColours.val[index];
};
export const setCurrColourAtIndex = (index: number, newValue: string) => {
    if (!isColourIndexValid(index)) {
        throw new Error("ERROR: attempt to set colour with an invalid index");
        return;
    }

    if (!isHexCodeValid(newValue)) {
        throw new Error("ERROR: attempt to set colour with an invalid value");
        return;
    }

    const tempArr = [...currColours.val];
    tempArr[index] = newValue;
    currColours.set(tempArr);
};
/**
 * This pulls the colour at the target index, and adds another random colour to
 * the end, to maintain the amount of `currColours`.
 * @param index The target index
 */
export const retractCurrColourAtIndex = (index: number) => {
    const befPortion = currColours.val.slice(0, index);
    const aftPortion = currColours.val.slice(index + 1);
    const newRandomisedColour = getRandomHexCode();
    currColours.set([...befPortion, ...aftPortion, newRandomisedColour]);
};
export const getColoursInUse = () => {
    const colourCount = getCurrColourInUseCount();
    const colourList = $derived(currColours.val.slice(0, colourCount));
    return colourList;
};

/**
 * Palette generator's colours
 */
const generateDefaultPalGenColours = () => {
    return defaultPaletteGallery[0].colours
        .map(colour => ({
            colour,
            isLocked: false,
        }));
};

export const palGenColours = createLocalStorageSyncedState({
    key: "palGenColours",
    defaultValue: generateDefaultPalGenColours(),
    validationFunc: isPalGenColoursValid,
});

export const setPalGenColoursHexAtIndex = (index: number, newValue: string) => {
    const tempVal = [...palGenColours.val];
    tempVal[index].colour = newValue;
    palGenColours.set(tempVal);
};

export const togglePalGenColoursLockAtIndex = (index: number) => {
    const tempVal = [...palGenColours.val];
    tempVal[index].isLocked = !tempVal[index].isLocked;
    palGenColours.set(tempVal);
};

export const addToPalGenColours = () => {
    if (palGenColours.val.length >= 5) {
        throw new Error("Cannot have more than five colours in the palette");
    }

    const newColour = {
        isLocked: false,
        colour: getRandomHexCode(),
    };
    palGenColours.set([...palGenColours.val, newColour]);
};

export const removePalGenColoursLockAtIndex = (index: number) => {
    if (palGenColours.val.length <= 2) {
        throw new Error("Cannot have less than two colours in the palette");
    }

    const befPortion = palGenColours.val.slice(0, index);
    const aftPortion = palGenColours.val.slice(index + 1);
    palGenColours.set([...befPortion, ...aftPortion]);
};

export const randomiseUnlockedColoursForPalGen = () => {
    const newVal = palGenColours.val.map(palGenItem => {
        if (palGenItem.isLocked) {
            return palGenItem;
        }

        return {
            isLocked: false,
            colour: getRandomHexCode(),
        };
    });

    palGenColours.set(newVal);
};

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