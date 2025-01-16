export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto"
}

export enum ComputedThemeMode {
    LIGHT = "light",
    DARK = "dark"
}

export type ColourItem = {
    name: string,
    hexCode: string,
};

export type SizeItem = {
    name: string,
    width: number,
    height: number,
};

export type RgbColour = {
    red: number,
    green: number,
    blue: number,
};