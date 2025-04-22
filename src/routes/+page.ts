import type { WallGenQueryProps } from "src/lib/types.js";

export const load = ({
    url,
}): WallGenQueryProps => {

    const style = url.searchParams.get("style");
    const colours = url.searchParams.get("colours");
    const width = url.searchParams.get("width");
    const height = url.searchParams.get("height");

    // Gradient config
    const gradientAngle = url.searchParams.get("gradientAngle");

    // Colour swatch config
    const swatchPosX = url.searchParams.get("swatchPosX");
    const swatchPosY = url.searchParams.get("swatchPosY");
    const swatchDirection = url.searchParams.get("swatchDirection");
    const swatchItemShape = url.searchParams.get("swatchItemShape");
    const swatchItemSize = url.searchParams.get("swatchItemSize");
    const swatchItemSpacing = url.searchParams.get("swatchItemSpacing");

    const paletteAngle = url.searchParams.get("paletteAngle");
    const paletteSize = url.searchParams.get("paletteSize");
    const palettePosition = url.searchParams.get("palettePosition");

    return {
        style,
        colours,
        width,
        height,

        gradientAngle,

        swatchPosX,
        swatchPosY,
        swatchDirection,
        swatchItemShape,
        swatchItemSize,
        swatchItemSpacing,

        paletteAngle,
        paletteSize,
        palettePosition,
    };
};
