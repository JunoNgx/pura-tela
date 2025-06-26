import type { PalGenQueryProps } from "src/lib/types.js";

export const load = ({ url }): PalGenQueryProps => {
    const paletteQueryStr = url.searchParams.get("colours");

    return {
        paletteQueryStr,
    };
};
