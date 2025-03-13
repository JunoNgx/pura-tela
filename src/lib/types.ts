export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto"
}

export type ColourItem = {
    name: string,
    hexCode: string,
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

export type PalGenItem = {
    colour: string,
    isLocked: boolean,
};

export type WallGenQueryProps = {
    style: string | null,
    colours: string | null,
    width: string | null,
    height: string | null,
};