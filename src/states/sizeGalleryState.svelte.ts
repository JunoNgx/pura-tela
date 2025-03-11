
// @ts-ignore
import defaultSizeOptions from "src/data/sizes.json";
import type { SizeItem, State } from "src/lib/types.js";
import { createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";
import { currSizeOptionIndex } from "./wallGenState.svelte.js";

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
    if (data === null || data === undefined || !sizeGallery) {
        return false;
    }

    try {
        parseInt(data);

        if (data < 0 || data > sizeGallery.length - 1) {
            return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

export const sizeGallery = generateSizeGallery(defaultSizeOptions);
