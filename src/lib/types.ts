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
    id: number,
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
    COLOUR_SWATCH = "colourSwatch",
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

    gradientAngle?: string | null,

    swatchShape?: string | null,
    swatchPosition?: string | null,
    swatchHasSpacing?: string | null,
};

export type InputEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLInputElement
};

export enum ColourSwatchStyleItemShape {
    SQUARE = "square",
    CIRCLE = "circle",
    RHOMBUS = "rhombus",
};

export enum ColourSwatchStyleDirection {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
};

export type ColourSwatchStyleConfigProps = {
    positionX: number,
    positionY: number,
    itemShape: ColourSwatchStyleItemShape,
    direction: ColourSwatchStyleDirection,
    size: number,
    spacing: number,
};

export type GradientStyleConfigProps = {
    angleInDeg: number,
};

export type RenderStyleConfig = {
    colourSwatch: ColourSwatchStyleConfigProps,
    gradient: GradientStyleConfigProps,
};
