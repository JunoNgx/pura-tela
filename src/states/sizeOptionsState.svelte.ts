
// @ts-ignore
import defaultSizeOptions from "src/data/sizes.json";
import type { SizeItem, State } from "src/lib/types.js";
import { createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";

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

const isCurrSizeOptionIndexValid = (data: any) => {
    if (data === null || data === undefined || !sizeOptions) {
        return false;
    }

    try {
        parseInt(data);

        if (data < 0 || data > sizeOptions.length - 1) {
            return false;
        }

        return true;
    } catch (err) {
        return false;
    }
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
