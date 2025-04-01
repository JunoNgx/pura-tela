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

    return {
        style,
        colours,
        width,
        height,
        gradientAngle,
    };
};
