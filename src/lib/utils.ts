import type { RgbColour } from "./types.js";
import { browser } from "$app/environment";

export const isHexCodeValid = (str: string): boolean => {
    const validHexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return validHexRegex.test(str);
};

export const convertHexToRgb = (hexStr: string): RgbColour => {
    hexStr = hexStr.replace("#", "");

    // Convert 3-char to 6-char 
    if (hexStr.length === 3) {
        hexStr = hexStr
            .split("").map(char => `${char}${char}`)
            .join("");
    }

    const red = parseInt(hexStr.substring(0, 2), 16);
    const green = parseInt(hexStr.substring(2, 4), 16);
    const blue = parseInt(hexStr.substring(4, 6), 16);

    return { red, green, blue };
};

const clamp8bit = (number: number): number => {
    return Math.max(0, Math.min(number, 255));
}

export const parseRgbChannelValue = (str: string): number => {
    return clamp8bit(parseInt(str, 10))
}

export const convertRgbToHex = (rgb: RgbColour): string => {
    const toHex = (number: number): string => {
        const clampedValue = clamp8bit(number);
        const hexStr = clampedValue.toString(16);
        const procesedHexStr = hexStr.length === 1
            ? `0${hexStr}`
            : hexStr;
        
        return procesedHexStr;
    }

    return toHex(rgb.red) + toHex(rgb.green) + toHex(rgb.blue);
};

// TODO: add param: validateFunc
export const loadFromLocalStorage = <T>({key, defaultValue}:
    {key: string, defaultValue: T}
): T => {
    if (!browser) {
        return defaultValue;
    }

    try {
        const fallback = () => {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        };

        const existingContent = localStorage.get(key);

        if (existingContent === null) {
            return fallback();
        }

        const parsedContent = JSON.parse(existingContent) as T;

        if (!parsedContent) {
            return fallback();
        }
    
        return parsedContent;
    } catch (error) {
        console.warn(`Unable to retrieve key ${key} from localStorage`);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
};

