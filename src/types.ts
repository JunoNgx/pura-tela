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