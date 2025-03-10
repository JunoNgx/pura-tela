// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
import { createLocalStorageSyncedState } from "src/states/stateUtils.js";
import { type State } from "src/lib/types.js";
import { isHexCodeValid } from "src/lib/utils.js";

const defaultCurrColoursValue = [
    defaultColourGallery[0].hexCode,
    defaultColourGallery[1].hexCode,
    defaultColourGallery[2].hexCode,
    defaultColourGallery[3].hexCode,
    defaultColourGallery[4].hexCode,
];

const isCurrColoursValid = (data: string[]) => {
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
    defaultValue: defaultCurrColoursValue,
    validationFunc: isCurrColoursValid,
}) as State<string[]>;

// TODO: maybe use getColoursInUse() instead
export const convertWallGensColoursToArrayOfHex = () => {
    const hexCodeList = $derived(wallGenColours.val.map(item => `#${item}`));
    return hexCodeList;
};