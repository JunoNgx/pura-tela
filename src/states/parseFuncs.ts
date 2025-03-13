import { MAX_HEIGHT, MAX_WIDTH } from "src/lib/constants.js";

export const tryParseSize = ( widthStr: string, heightStr: string ) => {

    try {
        const width = parseInt(widthStr);
        const height = parseInt(heightStr);

        const isWidthValid = 1 < width && width < MAX_WIDTH;
        const isHeightValid = 1 < height && height < MAX_HEIGHT;

        const isValid = isWidthValid && isHeightValid;
        
        if (isValid) return { width, height }
        else return null;

    } catch(err) {
        console.error("Invalid size data");
        return null;
    }
};

