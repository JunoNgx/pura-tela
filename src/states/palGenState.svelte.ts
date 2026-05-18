import defaultPaletteGallery from "src/data/palettes.json" with { type: "json" };
import {
    MAX_COLOUR_COUNT,
    MIN_COLOUR_COUNT_PALETTE,
} from "src/lib/constants.js";
import { getRandomHexCode } from "src/lib/utils.js";
import {
    generateTrueRandom,
    generateSmartRandom,
    generateAnalogous,
    generateComplementary,
    generateTriadic,
} from "src/lib/paletteGeneration.js";
import {
    createColState,
    createLocalStorageSyncedState,
    isEnumValueValid,
    isValidBoolean,
} from "src/states/stateUtils.svelte.js";
import { isHexCodeValid } from "src/lib/utils.js";
import { tryParseColours } from "src/lib/parseFuncs.js";
import { generateId } from "./idGenState.svelte.js";
import {
    PaletteGenerationMode,
    type PalGenColObj,
    type State,
} from "src/lib/types.js";
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

const isPaletteGenerationModeValid = (data: any) => {
    if (!isEnumValueValid(data, PaletteGenerationMode)) return false;
    return true;
};

export const paletteGenerationMode = createLocalStorageSyncedState({
    key: "paletteGenerationMode",
    defaultValue: PaletteGenerationMode.SMART_RANDOM,
    validationFunc: isPaletteGenerationModeValid,
}) as State<PaletteGenerationMode>;

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
        throw new Error(
            `Cannot have more than ${MAX_COLOUR_COUNT} colours in the palette`
        );
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

export const generateUnlockedColoursForPalGen = () => {
    const lockedColours = palGenColours.val
        .filter((item) => item.isLocked)
        .map((item) => item.colour);
    const unlockedCount = palGenColours.val.filter(
        (item) => !item.isLocked
    ).length;

    let generatedColours: string[];

    switch (paletteGenerationMode.val) {
        case PaletteGenerationMode.SMART_RANDOM:
        default:
            generatedColours = generateSmartRandom(lockedColours, unlockedCount);
            break;
        case PaletteGenerationMode.ANALOGOUS:
            generatedColours = generateAnalogous(lockedColours, unlockedCount);
            break;
        case PaletteGenerationMode.COMPLEMENTARY:
            generatedColours = generateComplementary(lockedColours, unlockedCount);
            break;
        case PaletteGenerationMode.TRIADIC:
            generatedColours = generateTriadic(lockedColours, unlockedCount);
            break;
        case PaletteGenerationMode.TRUE_RANDOM:
            generatedColours = generateTrueRandom(unlockedCount);
            break;
    }

    let colourIndex = 0;
    const newVal = palGenColours.val.map((palGenItem) => {
        if (palGenItem.isLocked) {
            return palGenItem;
        }

        const colour = generatedColours[colourIndex];
        colourIndex++;
        return {
            id: generateId(),
            isLocked: false,
            colour,
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
