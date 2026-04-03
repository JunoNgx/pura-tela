import { WallpaperStyle } from "src/lib/types.js";

type WallpaperStyleButtonProps = {
    style: WallpaperStyle;
    label: string;
    image: string;
};

export const WALLPAPER_STYLES: WallpaperStyleButtonProps[] = [
    {
        style: WallpaperStyle.SOLID,
        label: "Solid Colour",
        image: "/styleImages/style-solid.png",
    },
    {
        style: WallpaperStyle.GRADIENT,
        label: "Gradient",
        image: "/styleImages/style-gradient.png",
    },
    {
        style: WallpaperStyle.POP_ART_SQUARE,
        label: "Pop Art Square",
        image: "/styleImages/style-popart.png",
    },
    {
        style: WallpaperStyle.HORIZON,
        label: "Horizon",
        image: "/styleImages/style-horizon.png",
    },
    {
        style: WallpaperStyle.PALETTE,
        label: "Colour Palette",
        image: "/styleImages/style-palette.png",
    },
    {
        style: WallpaperStyle.COLOUR_SWATCH,
        label: "Colour Swatch",
        image: "/styleImages/style-swatch.png",
    },
    {
        style: WallpaperStyle.TWILIGHT,
        label: "Twilight",
        image: "/styleImages/style-twilight.png",
    },
    {
        style: WallpaperStyle.PIE_MAN,
        label: "Pie-Man",
        image: "/styleImages/style-pieman.png",
    },
];
