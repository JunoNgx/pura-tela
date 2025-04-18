import { MAX_COLOUR_COUNT, MAX_HEIGHT, MAX_WIDTH, SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";
import { isArrayOfHexCodesValid, isValueWithinRange } from "../states/stateUtils.svelte.js";

export const tryParseSize = (
    widthStr: string | number,
    heightStr: string | number
) => {

    try {
        const width = parseInt(widthStr as string);
        const height = parseInt(heightStr as string);

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
                const strippedStr = colour
                    .trim()
                    .replaceAll(" ", "")
                    .replaceAll("#", "")
                    .replaceAll("\"", "")
                    .replaceAll("\'", "");

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

        return null;

    } catch(error) {
        return null;
    }
};

export const tryParseAngle = (
    angleStr: string | number,
) => {

    try {
        const angle = parseInt(angleStr as string);

        const isValid = 0 <= angle && angle <= 360;
        
        if (isValid) return angle;
        else return null;

    } catch(err) {
        console.error("Invalid size data");
        return null;
    }
};

export const tryParseSwatchNumericConfig = (
    valueStr: string | number,
) => {
    try {
        const value = parseInt(valueStr as string);
        const isValid = isValueWithinRange(
            value, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE
        );

        if (isValid) return value;
        else return null
    } catch(err) {
        console.error("Invalid swatch data");
        return null;
    }
};
