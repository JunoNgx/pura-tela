import { page } from "$app/state";
import { WallpaperStyle, type ColourItem, type RgbColour } from "./types.js";

export const isHexCodeValid = (str: string): boolean => {
    const validHexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return validHexRegex.test(str);
};

export const convertHexToRgb = (hexStr: string): RgbColour => {
    hexStr = hexStr.replace("#", "");

    // Convert 3-char to 6-char
    if (hexStr.length === 3) {
        hexStr = hexStr
            .split("")
            .map((char) => `${char}${char}`)
            .join("");
    }

    const red = parseInt(hexStr.substring(0, 2), 16);
    const green = parseInt(hexStr.substring(2, 4), 16);
    const blue = parseInt(hexStr.substring(4, 6), 16);

    return { red, green, blue };
};

const clamp8bit = (number: number): number => {
    return Math.max(0, Math.min(number, 255));
};

export const parseRgbChannelValue = (str: string): number => {
    return clamp8bit(parseInt(str, 10));
};

export const convertRgbToHex = (rgb: RgbColour): string => {
    const toHex = (number: number): string => {
        const clampedValue = clamp8bit(number);
        const hexStr = clampedValue.toString(16).toUpperCase();
        const procesedHexStr = hexStr.length === 1 ? `0${hexStr}` : hexStr;

        return procesedHexStr;
    };

    return toHex(rgb.red) + toHex(rgb.green) + toHex(rgb.blue);
};

export const getRandomHexCode = () => {
    const randomHexNum = Math.floor(Math.random() * 0xffffff);
    const str = randomHexNum.toString(16).padStart(6, "0").toUpperCase();

    return str;
};

export const capitaliseFirstLetter = (str: string) => {
    const firstChatCapped = str.charAt(0).toUpperCase();
    const remainingChars = str.slice(1);
    return firstChatCapped + remainingChars;
};

export const computeFilename = ({
    colours,
    gallery,
    mode,
}: {
    colours: string[];
    gallery: ColourItem[];
    mode: WallpaperStyle;
}) => {
    const getColourName = (hexCode: string, gallery: ColourItem[]) => {
        const index = gallery.findIndex((item) => item.hexCode === hexCode);

        if (index === -1) {
            return `#${hexCode}`;
        }

        const colourName = gallery[index].name;

        return colourName.replace(" ", "");
    };

    const computeColourNamePortion = (colours: string[], gallery: ColourItem[]) => {
        const colourNames = colours.map((colour) => getColourName(colour, gallery));
        const colourNamesStr = colourNames.join("-");

        return colourNamesStr;
    };

    const modeStr = capitaliseFirstLetter(mode);
    const coloursStr = computeColourNamePortion(colours, gallery);

    return `Pura-${modeStr}-${coloursStr}`;
};

export const computeBaseUrl = () => {
    const topLevelDomain = page.url.hostname;

    if (topLevelDomain === "localhost") {
        return `http://localhost:${page.url.port}`;
    } else return `https://${topLevelDomain}`;
};
