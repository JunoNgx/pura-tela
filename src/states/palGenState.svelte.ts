// @ts-ignore
import defaultPaletteGallery from "src/data/palettes.json";
import { getRandomHexCode } from "src/lib/utils.js";
import { createLocalStorageSyncedState, isHexCodeValid, isValidBoolean } from "src/states/stateUtils.svelte.js";

/**
 * Palette generator's colours
 */
const isPalGenColoursValid = (data: any) => {
    if (!data) {
        return false;
    }

    try {
        if (data.length < 2 || data.length > 5) {
            console.log(0)
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
}

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