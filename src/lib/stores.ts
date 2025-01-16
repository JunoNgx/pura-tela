import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { ThemeMode, type RgbColour } from "./types.js";

// TODO: load settings from localStorage, fallback to auto
export const themeMode = writable(ThemeMode.AUTO);

// TODO: load gallery from localStorage
// export const colourGallery =

// TODO: load from localStorage
// export const sizeOptions =

// TODO: load from storage
export const sizeOptionIndex = writable(0);
// export const currSizeOption = derived(sizeOptions, sizeOptionIndex
//      => sizeOptions[sizeOptionIndex];

// TODO: load from localStorage, fallback to gallery[0]
export const currHexCode = writable("#FFF")
// TODO: calculate from hex code
export const currRgbColour: Writable<RgbColour> = writable({
    red: 255,
    green: 255,
    blue: 255,
});
