export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
    AUTO = "auto",
}

export type ColourItem = {
    name: string;
    hexCode: string;
};

// Colour object with hex code and id
export type ColObj = {
    id: number;
    colour: string; // hexCode
};

// Palette generator colour object, with isLocked state
export type PalGenColObj = ColObj & {
    isLocked: boolean;
};

// TODO: comment out
export type PalGenItem = {
    colour: string;
    isLocked: boolean;
};

export type PaletteItem = {
    name: string;
    colours: string[];
};

export type SizeItem = {
    name: string;
    width: number;
    height: number;
};

export type SizeData = {
    width: number;
    height: number;
};

export type RgbColour = {
    red: number;
    green: number;
    blue: number;
};

export enum RgbChannel {
    R = "red",
    G = "green",
    B = "blue",
}

export type State<T> = {
    readonly val: T;
    set: (newValue: T) => void;
};

export enum WallpaperStyle {
    SOLID = "solid",
    GRADIENT = "gradient",
    POP_ART_SQUARE = "popArtSquare",
    COLOUR_SWATCH = "colourSwatch",
    PALETTE = "palette",
    HORIZON = "horizon",
}

export type WallpaperStyleInfo = {
    minColourCount: number;
    maxColourCount: number;
    defaultColourCount: number;
};

export type WallGenQueryProps = {
    style: string | null;
    colours: string | null;
    width: string | null;
    height: string | null;

    gradientAngle: string | null;

    swatchPosX: string | null;
    swatchPosY: string | null;
    swatchDirection: string | null;
    swatchItemShape: string | null;
    swatchItemSize: string | null;
    swatchItemSpacing: string | null;

    paletteAngle: string | null;
    paletteSize: string | null;
    palettePosition: string | null;

    horizonShowCore: string | null;
    horizonSize: string | null;
    horizonPosition: string | null;
};

export type PalGenQueryProps = {
    paletteQueryStr: string | null;
};

export type MouseInputEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLInputElement;
};

export type MouseButtonEvent = MouseEvent & {
    currentTarget: EventTarget & HTMLButtonElement;
};

export type InputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
};

export enum ColourSwatchStyleItemShape {
    SQUARE = "square",
    CIRCLE = "circle",
    RHOMBUS = "rhombus",
    TRIANGLE = "triangle",
    INVERTED_TRIANGLE = "invertedTriangle",
    THIN_STRIP = "thinStrip",
    HEXAGON = "hexagon",
}

export enum ColourSwatchStyleDirection {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

export type ColourSwatchStyleConfigProps = {
    positionX: number;
    positionY: number;
    direction: ColourSwatchStyleDirection;
    itemShape: ColourSwatchStyleItemShape;
    itemSize: number;
    itemSpacing: number;
};

export type GradientStyleConfigProps = {
    angleInDeg: number;
};

export type PaletteStyleConfigProps = {
    angleInDeg: number;
    size: number;
    position: number;
};

export type HorizonStyleConfigProps = {
    shouldShowCore: boolean;
    size: number;
    position: number;
};

export type PopArtSquareStyleConfigProps = {
    size: number;
    positionX: number;
    positionY: number;
};

export type RenderStyleConfig = {
    colourSwatch: ColourSwatchStyleConfigProps;
    gradient: GradientStyleConfigProps;
    palette: PaletteStyleConfigProps;
    horizon: HorizonStyleConfigProps;
    popArtSquare: PopArtSquareStyleConfigProps;
};

export type ShareItem = {
    label: string;
    content: string;
    shareText: string;
    shareTitle: string;
    isContentPlainText?: boolean;
};

export type ScrollPositionState = {
    get val(): number;
    set: (newVal: number) => void;
};
