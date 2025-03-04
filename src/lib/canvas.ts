import { WallpaperMode, type SizeItem } from "./types.js";

const CANVAS_ID = "Canvas";

export type CanvasRenderOptions = {
    size: SizeItem,
    colours: string[],
    colourCount: number,
    mode: WallpaperMode,
};

// TODO: to refactor to ColourItem[]
export const renderCanvas = (
    { size, colours, mode }: CanvasRenderOptions
) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;

    setCanvasFitMode(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    switch(mode) {
    case WallpaperMode.GRADIENT:
        renderForGradientMode({ ctx, size, colours, mode });
        break;

    case WallpaperMode.SOLID:
    default:
        renderForSolidMode({ ctx, size, colours, mode });
    }
};

const renderForGradientMode = (
    { ctx, colours, size }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    const midXPoint = size.width / 2;
    const gradient = ctx.createLinearGradient(
        midXPoint, 0, midXPoint, size.height);

    gradient.addColorStop(0, colours[0]);
    gradient.addColorStop(1, colours[1]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);
};

const renderForSolidMode = (
    { ctx, colours, size }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);
};

export const refitCanvasToContainer = () => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    setCanvasFitMode(canvas);
};

const setCanvasFitMode = (canvas: HTMLCanvasElement) => {
    const container = document.getElementById("CanvasContainer");
    if (!container) return;

    const isContainerWide = container.clientWidth > container.clientHeight;
    const isCanvasWide = canvas.width > canvas.height;

    if (!isContainerWide && isCanvasWide)
        setCanvasFitToWidth(canvas)
    else setCanvasFitToHeight(canvas);
};

const setCanvasFitToWidth = (canvas: HTMLCanvasElement) => {
    canvas.style.width = "95%";
    canvas.style.height = "";
};

const setCanvasFitToHeight = (canvas: HTMLCanvasElement) => {
    canvas.style.width = "";
    canvas.style.height = "95%";
};

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
