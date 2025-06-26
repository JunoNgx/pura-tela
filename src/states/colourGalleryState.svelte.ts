// @ts-ignore
import defaultColourGallery from "src/data/colours.json";
import type { ColourItem, State } from "src/lib/types.js";
import { isHexCodeValid } from "src/lib/utils.js";
import { createLocalStorageSyncedState } from "src/states/stateUtils.svelte.js";

const isColourGalleryValid = (data: any[]) => {
    if (!data) return false;

    try {
        for (const item of data) {
            if (!item.name) return false;
            if (!isHexCodeValid(item.hexCode)) return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

export const colourGallery = createLocalStorageSyncedState({
    key: "colourGallery",
    defaultValue: defaultColourGallery,
    validationFunc: isColourGalleryValid,
}) as State<ColourItem[]>;

export const promptAddToColourGallery = (colourCode: string) => {
    const colourName = window.prompt("Enter name for new colour", `#${colourCode}`);
    if (!colourName) return;

    try {
        const newColour = {
            name: colourName,
            hexCode: colourCode,
        };

        colourGallery.set([...colourGallery.val, newColour]);
    } catch (error) {
        console.error(error);
        window.alert("Error adding new colour to gallery. Please see the console for more info.");
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
