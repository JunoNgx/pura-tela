
// @ts-ignore
import defaultSizeOptions from "src/data/sizes.json";
import type { SizeItem, State } from "src/lib/types.js";
import { createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";

/**
 * Size gallery
 */
type rawParseSizeOptionItem = {
    name: string,
    width: string,
    height: string
};

const generateSizeGallery = (rawOptions: rawParseSizeOptionItem[]) => {
    return rawOptions.map(sizeOption => ({
        name: sizeOption.name,
        width: parseInt(sizeOption.width),
        height: parseInt(sizeOption.height)
    }));
};

const isSizeGalleryValid = (data: any) => {
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

export const sizeOptions = generateSizeGallery(defaultSizeOptions);

export const sizeGallery = createLocalStorageSyncedState({
    key: "sizeOptionsIndex",
    defaultValue: 0,
    validationFunc: isSizeGalleryValid,
}) as State<number>;
 
export const getCurrSizeOption = () => {
    const option = $derived<SizeItem>(sizeOptions[currSizeOptionIndex.val]);
    return option;
};
