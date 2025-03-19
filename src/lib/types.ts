export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto"
}

export type ColourItem = {
    name: string,
    hexCode: string,
};

// Colour object with hex code and id
export type ColObj = {
    id: string,
    colour: string, // hexCode
};

// Palette generator colour object, with isLocked state
export type PalGenColObj = ColObj & {
    isLocked: boolean,
};

// TODO: comment out
export type PalGenItem = {
    colour: string,
    isLocked: boolean,
};

export type PaletteItem = {
    name: string,
    colours: string[],
};

export type SizeItem = {
    name: string,
    width: number,
    height: number,
};

export type SizeData = {
    width: number,
    height: number,
};

export type RgbColour = {
    red: number,
    green: number,
    blue: number,
};

export enum RgbChannel {
    R = "red",
    G = "green",
    B = "blue"
};

export type State<T> = {
    readonly val: T;
    set: (newValue: T) => void,
};

export enum WallpaperStyle {
    SOLID = "solid",
    GRADIENT = "gradient",
    POP_ART_SQUARE = "popArtSquare",
    PALETTE_ROW = "paletteRow",
};

export type WallpaperStyleInfo = {
    minColourCount: number,
    maxColourCount: number,
    defaultColourCount: number,
};

export type WallGenQueryProps = {
    style: string | null,
    colours: string | null,
    width: string | null,
    height: string | null,
};