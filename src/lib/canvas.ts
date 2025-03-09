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
    { size, colours, colourCount, mode }: CanvasRenderOptions
) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;

    setCanvasFitMode(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderOptions = { ctx, size, colours, colourCount, mode };

    switch(mode) {
    case WallpaperMode.GRADIENT:
        renderForGradientMode(renderOptions);
        break;

    case WallpaperMode.POP_ART_SQUARE:
        renderForPopArtSquareMode(renderOptions);
        break;

    case WallpaperMode.SOLID:
    default:
        renderForSolidMode(renderOptions);
    }
};

const renderForGradientMode = (
    { ctx, colours, colourCount, size }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    const midXPoint = size.width / 2;
    const gradient = ctx.createLinearGradient(
        midXPoint, 0, midXPoint, size.height);
    const intervalGap = 1 / (colourCount - 1);

    for (let i = 0; i < colourCount; i++) {
        const position = intervalGap * i;
        const colour = colours[i];
        gradient.addColorStop(position, colour);
    }

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

const renderForPopArtSquareMode = (
    { ctx, colours, size }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    // Draw background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const smallerSide = Math.min(size.width, size.height);
    type squareProps = {
        colour: string,
        x: number,
        y: number,
        size: number,
    };
    const drawSquare = ({ colour, x, y, size}: squareProps) => {
        ctx.fillStyle = colour;
        ctx.fillRect(x, y, size, size);
    }

    // Draw main square
    const mainSquareSize = smallerSide / 2;
    const mainSquareX = (size.width - mainSquareSize) / 2;
    const mainSquareY = (size.height - mainSquareSize) / 2;
    drawSquare({
        colour: colours[1],
        x: mainSquareX,
        y: mainSquareY,
        size: mainSquareSize,
    });

    const secSquareSize = mainSquareSize / 2;
    // Draw top right square
    drawSquare({
        colour: colours[2],
        x: mainSquareX + secSquareSize,
        y: mainSquareY,
        size: secSquareSize,
    }); 

    // Draw bottom right square
    drawSquare({
        colour: colours[3],
        x: mainSquareX + secSquareSize,
        y: mainSquareY + secSquareSize,
        size: secSquareSize,
    }); 
};

export const refitCanvasToContainer = () => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    setCanvasFitMode(canvas);
};

const setCanvasFitMode = (canvas: HTMLCanvasElement) => {
    const container = document.getElementById("CanvasContainer");
    if (!container) return;

    const containerRatio = container.clientWidth / container.clientHeight;
    const canvasRatio = canvas.width / canvas.height;
    const isContainerWiderThanCanvas = containerRatio > canvasRatio;

    if (isContainerWiderThanCanvas)
        setCanvasFitToHeight(canvas);
    else setCanvasFitToWidth(canvas);
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
