export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto"
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

export enum RgbChannel {
    R = "red",
    G = "green",
    B = "blue"
};

export type State<T> = {
    readonly val: T;
    set: (newValue: T) => void,
};
