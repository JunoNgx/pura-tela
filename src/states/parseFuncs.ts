import { MAX_COLOUR_COUNT, MAX_HEIGHT, MAX_WIDTH } from "src/lib/constants.js";
import { isArrayOfHexCodesValid } from "./stateUtils.svelte.js";

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

export const tryParseColours = (inputStr: string) => {
    const allowedSeparators = ["-", ","];

    try {
        for (const separator of allowedSeparators) {
            const colourList = inputStr.split(separator, MAX_COLOUR_COUNT).map(colour => {
                const strippedStr = colour.replaceAll("\"", "")
                    .replaceAll("\'", "")
                    .replaceAll("#", "");

                if (strippedStr.length === 3) {
                    // Attempt to convert 3-char hex codes to 6-char hex codes
                    return strippedStr
                        .split("")
                        .map(char => char + char)
                        .join("");
                } else return strippedStr;
            });

            if (isArrayOfHexCodesValid(colourList)) {
                return colourList;
            }
        }

    } catch(error) {
        console.error("Invalid size data");
        return null;
    }
};
