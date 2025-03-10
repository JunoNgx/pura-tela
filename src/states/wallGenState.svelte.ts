// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
import { createLocalStorageSyncedState } from "src/states/stateUtils.js";
import { type State } from "src/lib/types.js";
import { getRandomHexCode, isHexCodeValid } from "src/lib/utils.js";

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

// TODO: maybe use getColoursInUse() instead
export const convertWallGensColoursToArrayOfHex = () => {
    const hexCodeList = $derived(wallGenColours.val.map(item => `#${item}`));
    return hexCodeList;
};

const isColourIndexValid = (index: number) => {
    return (0 <= index && index <= wallGenColours.val.length - 1);
};

export const getCurrColourAtIndex = (index: number) => {
    if (!isColourIndexValid(index)) {
        throw new Error("ERROR: attempt to retrieve colour with an invalid index");
        return;
    }

    return wallGenColours.val[index];
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

    const tempArr = [...wallGenColours.val];
    tempArr[index] = newValue;
    wallGenColours.set(tempArr);
};
/**
 * This pulls the colour at the target index, and adds another random colour to
 * the end, to maintain the amount of `wallGenColours`.
 * @param index The target index
 */
export const retractCurrColourAtIndex = (index: number) => {
    const befPortion = wallGenColours.val.slice(0, index);
    const aftPortion = wallGenColours.val.slice(index + 1);
    const newRandomisedColour = getRandomHexCode();
    wallGenColours.set([...befPortion, ...aftPortion, newRandomisedColour]);
};

// export const getColoursInUse = () => {
//     const colourCount = getCurrColourInUseCount();
//     const colourList = $derived(wallGenColours.val.slice(0, colourCount));
//     return colourList;
// };