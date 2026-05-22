import {
    WallpaperStyle,
    type RenderStyleConfig,
    type SizeData,
} from "src/lib/types.js";
import { type RenderOptions } from "./canvasUtils.js";

import { renderGradientStyle } from "./renderGradientStyle.js";
import { renderSolidStyle } from "./renderSolidStyle.js";
import { renderPopArtSquareStyle } from "./renderPopArtSquareStyle.js";
import { renderColourSwatchStyle } from "./renderColourSwatchStyle.js";
import { renderPaletteStyle } from "./renderPaletteStyle.js";
import { renderHorizonStyle } from "./renderHorizonStyle.js";
import { renderTwilightStyle } from "./renderTwilightStyle.js";
import { renderPieManStyle } from "./renderPieManStyle.js";
import { renderBaumkuchenStyle } from "./renderBaumkuchenStyle.js";

const CANVAS_ID = "Canvas";

export type CanvasRenderOptions = {
    size: SizeData;
    colours: string[];
    style: WallpaperStyle;
    config?: RenderStyleConfig;
};

// ---- Core logic

export const renderCanvas = ({
    size,
    colours,
    style,
    config,
}: CanvasRenderOptions) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;

    setCanvasFitMode(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderOptions: RenderOptions = {
        ctx,
        colours,
        size,
        config,
    };

    switch (style) {
        case WallpaperStyle.GRADIENT:
            renderGradientStyle(renderOptions);
            break;

        case WallpaperStyle.POP_ART_SQUARE:
            renderPopArtSquareStyle(renderOptions);
            break;

        case WallpaperStyle.COLOUR_SWATCH:
            renderColourSwatchStyle(renderOptions);
            break;

        case WallpaperStyle.PALETTE:
            renderPaletteStyle(renderOptions);
            break;

        case WallpaperStyle.HORIZON:
            renderHorizonStyle(renderOptions);
            break;

        case WallpaperStyle.TWILIGHT:
            renderTwilightStyle(renderOptions);
            break;

        case WallpaperStyle.PIE_MAN:
            renderPieManStyle(renderOptions);
            break;

        case WallpaperStyle.BAUMKUCHEN:
            renderBaumkuchenStyle(renderOptions);
            break;

        case WallpaperStyle.SOLID:
        default:
            renderSolidStyle(renderOptions);
    }
};

// ---- Size fitting logic

export const refitCanvasToContainer = () => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    setCanvasFitMode(canvas);
};

const setCanvasFitMode = (canvas: HTMLCanvasElement) => {
    const container = document.getElementById("CanvasContainer");
    if (!container) return;

    /**
     * `containerMaxHeight` is used to fully utilise the provided space.
     */
    const containerMaxHeightStyle =
        window.getComputedStyle(container).maxHeight;
    const containerMaxHeight = parseFloat(containerMaxHeightStyle);

    const containerRatio = container.clientWidth / containerMaxHeight;
    const canvasRatio = canvas.width / canvas.height;
    const isContainerWiderThanCanvas = containerRatio > canvasRatio;

    if (isContainerWiderThanCanvas) {
        // Fit to height
        const height = containerMaxHeight;
        const width = height * canvasRatio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    } else {
        // Fit to width
        const width = container.clientWidth * 1.0;
        const height = width / canvasRatio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }
};

// ---- File export logic

export const generateImage = (filename: string) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.toBlob((blob) => {
        if (blob === null) return;

        const url = URL.createObjectURL(blob);

        const anchorEl = document.createElement("a");
        anchorEl.href = url;
        anchorEl.download = filename;

        document.body.appendChild(anchorEl);
        anchorEl.click();
        document.body.removeChild(anchorEl);

        setTimeout(() => {
            URL.revokeObjectURL(url);
        });
    });
};
