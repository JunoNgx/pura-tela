import { getRandomHexCode, convertHexToRgb, convertRgbToHex } from "./utils.js";

type Hsl = {
    h: number;
    s: number;
    l: number;
};

const hexToHsl = (hex: string): Hsl => {
    const { red, green, blue } = convertHexToRgb(hex);
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    const l = (max + min) / 2;

    if (diff === 0) {
        return { h: 0, s: 0, l };
    }

    const s = diff / (1 - Math.abs(2 * l - 1));

    let h: number;
    switch (max) {
        case r:
            h = ((g - b) / diff + (g < b ? 6 : 0)) * 60;
            break;
        case g:
            h = ((b - r) / diff + 2) * 60;
            break;
        default:
            h = ((r - g) / diff + 4) * 60;
            break;
    }

    return { h, s, l };
};

const hslToHex = ({ h, s, l }: Hsl): string => {
    if (s === 0) {
        const grey = Math.round(l * 255);
        return convertRgbToHex({ red: grey, green: grey, blue: grey });
    }

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
        g = 0,
        b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    return convertRgbToHex({
        red: Math.round((r + m) * 255),
        green: Math.round((g + m) * 255),
        blue: Math.round((b + m) * 255),
    });
};

const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

const random = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
};

export const generateTrueRandom = (count: number): string[] => {
    return Array.from({ length: count }, () => getRandomHexCode());
};

// Pick a random locked colour as parent per slot,
// offset hue ±15–30° for analogous harmony,
// vary saturation/lightness by ±30%
export const generateAnalogous = (
    lockedColours: string[],
    count: number
): string[] => {
    if (count === 0) return [];
    if (lockedColours.length === 0) return generateTrueRandom(count);

    const lockedHsl = lockedColours.map(hexToHsl);

    return Array.from({ length: count }, () => {
        const parent = lockedHsl[Math.floor(Math.random() * lockedHsl.length)];
        const offset = Math.random() > 0.5 ? random(15, 30) : random(-30, -15);
        const h = parent.h + offset;
        const s = clamp(parent.s + random(-0.3, 0.3), 0, 1);
        const l = clamp(parent.l + random(-0.3, 0.3), 0, 1);

        return hslToHex({ h, s, l });
    });
};

// Pick a random locked colour as parent per slot,
// offset hue 160–200° for complementary harmony,
// vary saturation/lightness by ±30%
export const generateComplementary = (
    lockedColours: string[],
    count: number
): string[] => {
    if (count === 0) return [];
    if (lockedColours.length === 0) return generateTrueRandom(count);

    const lockedHsl = lockedColours.map(hexToHsl);

    return Array.from({ length: count }, () => {
        const parent = lockedHsl[Math.floor(Math.random() * lockedHsl.length)];
        const h = parent.h + 180 + random(-20, 20);
        const s = clamp(parent.s + random(-0.3, 0.3), 0, 1);
        const l = clamp(parent.l + random(-0.3, 0.3), 0, 1);

        return hslToHex({ h, s, l });
    });
};
