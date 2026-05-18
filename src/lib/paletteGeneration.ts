import { getRandomHexCode, convertHexToRgb, convertRgbToHex } from "./utils.js";
import type { RgbColour } from "./types.js";

type Oklch = {
    l: number;
    c: number;
    h: number;
};

const srgbToLinear = (c: number): number => {
    return c <= 0.04045
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4);
};

const linearToSrgb = (c: number): number => {
    const clamped = Math.max(0, Math.min(1, c));
    return clamped <= 0.0031308
        ? clamped * 12.92
        : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
};

const rgbToOklab = ({ red, green, blue }: RgbColour): { l: number; a: number; b: number } => {
    const r = srgbToLinear(red / 255);
    const g = srgbToLinear(green / 255);
    const b = srgbToLinear(blue / 255);

    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

    const lCbrt = Math.cbrt(l);
    const mCbrt = Math.cbrt(m);
    const sCbrt = Math.cbrt(s);

    return {
        l: 0.2104542553 * lCbrt + 0.7936177850 * mCbrt - 0.0040720468 * sCbrt,
        a: 1.9779984951 * lCbrt - 2.4285922050 * mCbrt + 0.4505937099 * sCbrt,
        b: 0.0259040371 * lCbrt + 0.7827717662 * mCbrt - 0.8086757660 * sCbrt,
    };
};

const oklabToRgb = (lab: { l: number; a: number; b: number }): RgbColour => {
    const lCbrt = lab.l + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
    const mCbrt = lab.l - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
    const sCbrt = lab.l - 0.0894841775 * lab.a - 1.2914855480 * lab.b;

    const l = lCbrt * lCbrt * lCbrt;
    const m = mCbrt * mCbrt * mCbrt;
    const s = sCbrt * sCbrt * sCbrt;

    const r = linearToSrgb(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s);
    const g = linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s);
    const b = linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);

    return {
        red: Math.round(r * 255),
        green: Math.round(g * 255),
        blue: Math.round(b * 255),
    };
};

const oklabToOklch = (lab: { l: number; a: number; b: number }): Oklch => {
    return {
        l: lab.l,
        c: Math.sqrt(lab.a * lab.a + lab.b * lab.b),
        h: (Math.atan2(lab.b, lab.a) * 180) / Math.PI,
    };
};

const oklchToOklab = (oklch: Oklch): { l: number; a: number; b: number } => {
    const hRad = (oklch.h * Math.PI) / 180;
    return {
        l: oklch.l,
        a: oklch.c * Math.cos(hRad),
        b: oklch.c * Math.sin(hRad),
    };
};

const hexToOklch = (hex: string): Oklch => {
    return oklabToOklch(rgbToOklab(convertHexToRgb(hex)));
};

const oklchToHex = (oklch: Oklch): string => {
    return convertRgbToHex(oklabToRgb(oklchToOklab(oklch)));
};

const analyseBounds = (lockedColours: string[]) => {
    if (lockedColours.length === 0) {
        return { lMin: 0.2, lMax: 0.8, cMin: 0, cMax: 0.3, avgHue: 0 };
    }

    const oklchColours = lockedColours.map(hexToOklch);
    let lMin = Infinity, lMax = -Infinity;
    let cMin = Infinity, cMax = -Infinity;
    let hueSum = 0;

    for (const colour of oklchColours) {
        lMin = Math.min(lMin, colour.l);
        lMax = Math.max(lMax, colour.l);
        cMin = Math.min(cMin, colour.c);
        cMax = Math.max(cMax, colour.c);
        hueSum += colour.h;
    }

    const avgHue = hueSum / oklchColours.length;
    const lRange = lMax - lMin;
    const cRange = cMax - cMin;

    return {
        lMin: Math.max(0, lMin - lRange * 0.3),
        lMax: Math.min(1, lMax + lRange * 0.3),
        cMin: Math.max(0, cMin - cRange * 0.3),
        cMax: Math.min(0.4, cMax + cRange * 0.3),
        avgHue,
    };
};

const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

const random = (min: number, max: number): number => {
    return min + Math.random() * (max - min);
};

const normaliseHue = (hue: number): number => {
    return ((hue % 360) + 360) % 360;
};

export const generateTrueRandom = (count: number): string[] => {
    return Array.from({ length: count }, () => getRandomHexCode());
};

// Pick a random locked colour as parent per slot,
// vary lightness/chroma by ±30% for variety,
// use full 0–360° hue range
export const generateSmartRandom = (lockedColours: string[], count: number): string[] => {
    if (count === 0) return [];
    if (lockedColours.length === 0) return generateTrueRandom(count);

    const lockedOklch = lockedColours.map(hexToOklch);

    return Array.from({ length: count }, () => {
        const randomParentIndex = Math.floor(Math.random() * lockedOklch.length);
        const parent = lockedOklch[randomParentIndex];
        const l = clamp(parent.l + random(-0.3, 0.3), 0, 1);
        const c = clamp(parent.c + random(-0.15, 0.15), 0, 0.4);
        const h = random(0, 360);

        return oklchToHex({ l, c, h });
    });
};

// Pick a random locked colour as parent per slot,
// offset hue ±15–30° for analogous harmony,
// vary lightness/chroma by ±30%
export const generateAnalogous = (lockedColours: string[], count: number): string[] => {
    if (count === 0) return [];
    if (lockedColours.length === 0) return generateTrueRandom(count);

    const lockedOklch = lockedColours.map(hexToOklch);

    return Array.from({ length: count }, () => {
        const parent = lockedOklch[Math.floor(Math.random() * lockedOklch.length)];
        const l = clamp(parent.l + random(-0.3, 0.3), 0, 1);
        const c = clamp(parent.c + random(-0.15, 0.15), 0, 0.4);
        const offset = Math.random() > 0.5 ? random(15, 30) : random(-30, -15);
        const h = normaliseHue(parent.h + offset);

        return oklchToHex({ l, c, h });
    });
};

// Pick a random locked colour as parent per slot,
// offset hue 160–200° for complementary harmony with variety,
// vary lightness/chroma by ±30%
export const generateComplementary = (lockedColours: string[], count: number): string[] => {
    if (count === 0) return [];
    if (lockedColours.length === 0) return generateTrueRandom(count);

    const lockedOklch = lockedColours.map(hexToOklch);

    return Array.from({ length: count }, () => {
        const parent = lockedOklch[Math.floor(Math.random() * lockedOklch.length)];
        const l = clamp(parent.l + random(-0.3, 0.3), 0, 1);
        const c = clamp(parent.c + random(-0.15, 0.15), 0, 0.4);
        const h = normaliseHue(parent.h + 180 + random(-20, 20));

        return oklchToHex({ l, c, h });
    });
};

// Pick a random locked colour as parent per slot,
// offset hue by 120° or 240° for triadic harmony,
// vary lightness/chroma by ±30%
export const generateTriadic = (lockedColours: string[], count: number): string[] => {
    if (count === 0) return [];
    if (lockedColours.length === 0) return generateTrueRandom(count);

    const lockedOklch = lockedColours.map(hexToOklch);
    const triadicOffsets = [120, 240];

    return Array.from({ length: count }, () => {
        const parent = lockedOklch[Math.floor(Math.random() * lockedOklch.length)];
        const l = clamp(parent.l + random(-0.3, 0.3), 0, 1);
        const c = clamp(parent.c + random(-0.15, 0.15), 0, 0.4);
        const randomOffsetIndex = Math.floor(Math.random() * triadicOffsets.length);
        const baseOffset = triadicOffsets[randomOffsetIndex];
        const offset = baseOffset + random(-15, 15);
        const rawHue = parent.h + offset;
        const h = normaliseHue(rawHue);

        return oklchToHex({ l, c, h });
    });
};
