// @ts-ignore
import defaultPaletteGallery from "src/data/palettes.json";
import {
    MAX_COLOUR_COUNT,
    MIN_COLOUR_COUNT_PALETTE,
} from "src/lib/constants.js";
import { getRandomHexCode } from "src/lib/utils.js";
import {
    createColState,
    isHexCodeValid,
    isValidBoolean,
} from "src/states/stateUtils.svelte.js";
import { tryParseColours } from "src/lib/parseFuncs.js";
import { generateId } from "./idGenState.svelte.js";
import type { PalGenColObj, State } from "src/lib/types.js";
import { paletteGallery } from "./paletteGalleryState.svelte.js";

/**
 * Palette generator's colours
 */
const isPalGenColoursValid = (data: any) => {
    if (!data) {
        return false;
    }

    try {
        if (
            data.length < MIN_COLOUR_COUNT_PALETTE
            || data.length > MAX_COLOUR_COUNT
        ) {
            return false;
        }

        for (const palGenItem of data) {
            if (!isValidBoolean(palGenItem.isLocked)) {
                return false;
            }

            if (!isHexCodeValid(palGenItem.colour)) {
                return false;
            }
        }

        return true;
    } catch (err) {
        return false;
    }
};

const generateDefaultPalGenColours = () => {
    return defaultPaletteGallery[0].colours.map((colour) => ({
        colour,
        isLocked: false,
    }));
};

export const palGenColours = <State<PalGenColObj[]>>createColState({
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
    if (palGenColours.val.length >= MAX_COLOUR_COUNT) {
        throw new Error("Cannot have more than five colours in the palette");
    }

    const newColour = {
        id: generateId(),
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
    const newVal = palGenColours.val.map((palGenItem) => {
        if (palGenItem.isLocked) {
            return palGenItem;
        }

        return {
            id: generateId(),
            isLocked: false,
            colour: getRandomHexCode(),
        };
    });

    palGenColours.set(newVal);
};

const derivedHexListString = $derived.by(() => {
    const colourList = palGenColours.val.map((palGenItem) => palGenItem.colour);
    const outputString = colourList.join("-");
    return outputString;
});

export const exportToStringFromPalGen = () => {
    return derivedHexListString;
};

export const tryParseFromStringToPalGen = (inputStr: string) => {
    const newVal = tryParseColours(inputStr);

    if (!newVal) {
        window.alert("Data is invalid");
        return;
    }

    const newValue = newVal.map((colour) => ({
        id: generateId(),
        colour,
        isLocked: false,
    }));
    palGenColours.set([...newValue]);
};

export const passPaletteToPaletteGenerator = (paletteIndex: number) => {
    try {
        const palette = paletteGallery.val[paletteIndex];
        const newVal = palette.colours.map((colour) => ({
            id: generateId(),
            colour,
            isLocked: false,
        }));

        palGenColours.set([...newVal]);
    } catch (error) {
        throw new Error("Failed to pass palette to Palette Generator");
    }
};

export const passWallGenToPaletteGenerator = (colours: string[]) => {
    try {
        const newVal = colours.map((colour) => ({
            id: generateId(),
            colour,
            isLocked: false,
        }));

        palGenColours.set([...newVal]);
    } catch (error) {
        throw new Error("Failed to pass palette to Palette Generator");
    }
};
