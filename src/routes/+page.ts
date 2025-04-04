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
    const swatchShape = url.searchParams.get("swatchShape");
    const swatchPosition = url.searchParams.get("swatchPosition");
    const swatchHasSpacing = url.searchParams.get("swatchHasSpacing");

    return {
        style,
        colours,
        width,
        height,

        gradientAngle,

        swatchShape,
        swatchPosition,
        swatchHasSpacing,
    };
};
