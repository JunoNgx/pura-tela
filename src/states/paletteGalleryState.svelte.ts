// @ts-ignore
import defaultPaletteGallery from "src/data/palettes.json";
import { createLocalStorageSyncedState, isHexCodeValid } from "src/states/stateUtils.svelte.js";
import { getColoursInUse, readjustWallGenColoursInUseCount, setWallGenColourInUseCount, wallGenColours } from "./wallGenState.svelte.js";
import { palGenColours } from "./palGenState.svelte.js";

export const isPaletteGalleryValid = (data: any[]) => {
    if (!data) return false;

    try {
        for (const item of data) {
            if (!item.name) return false;
            if (!item.colours) return false;
            if (item.colours.length < 2 || item.colours.length > 5) return false;

            for (const colour of item.colours) {
                if (!isHexCodeValid(colour)) return false;
            }
        }

        return true;
    } catch (err) {        
        return false;
    }
};

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
        const coloursToBeKept = wallGenColours.val.slice(newColours.length);

        wallGenColours.set([...newColours, ...coloursToBeKept]);
        setWallGenColourInUseCount(newColours.length);
        readjustWallGenColoursInUseCount();
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