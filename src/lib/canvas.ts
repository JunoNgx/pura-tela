import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, WallpaperStyle, type RenderStyleConfig, type SizeData } from "./types.js";

const CANVAS_ID = "Canvas";

export type CanvasRenderOptions = {
    size: SizeData,
    colours: string[],
    style: WallpaperStyle,
    config?: RenderStyleConfig,
};

type ShapeProps = {
    ctx: CanvasRenderingContext2D,
    colour: string,
    x: number,
    y: number,
    size: number,
};

const drawSquare = ({ ctx, colour, x, y, size}: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

const drawSquareFromCenter = ({ ctx, colour, x, y, size}: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x - size/2, y - size/2, size, size);
};

const drawCircle = ({ ctx, colour, x, y, size}: ShapeProps) => {
    ctx.beginPath();
    ctx.arc(x, y, size/2, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
};

export const renderCanvas = (
    { size, colours, style, config }: CanvasRenderOptions
) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;

    setCanvasFitMode(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderOptions = { ctx, size, colours, style, config };

    switch(style) {
    case WallpaperStyle.GRADIENT:
        renderForGradientStyle(renderOptions);
        break;

    case WallpaperStyle.POP_ART_SQUARE:
        renderForPopArtSquareStyle(renderOptions);
        break;

    case WallpaperStyle.COLOUR_SWATCH:
        renderForColourSwatchStyle(renderOptions);
        break;

    case WallpaperStyle.SOLID:
    default:
        renderForSolidStyle(renderOptions);
    }
};

const renderForGradientStyle = (
    { ctx, colours, size, config }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    /**
     * Drawing gradient at an angle is unfortunately not as perfect specifically
     * setting it at from x `0` to `size.height`.
     * 
     * What entails is a gradient drawn from a circle passing through the four
     * points of the rectangle, whose quality is variable, depending on the ratio
     * of the rectangle. Works best with square, but not 100% perfect.
     */

    if (!config?.gradient) {
        throw new Error("Cannot access Gradient config");
    }

    const calculateGradientPoints = (
        angleInDeg: number, width: number, height: number
    ) => {
        const diagonalLength = Math.sqrt(width * width + height * height);
        const distanceFromMid = diagonalLength/2;
        const angleInRadian = (angleInDeg * Math.PI) / 180;
        const midX = width / 2;
        const midY = height /2;
        
        const x1 = midX - distanceFromMid * Math.cos(angleInRadian);
        const y1 = midY - distanceFromMid * Math.sin(angleInRadian);

        const x2 = midX + distanceFromMid * Math.cos(angleInRadian);
        const y2 = midY + distanceFromMid * Math.sin(angleInRadian);

        return { x1, y1, x2, y2 };
    };

    const { x1, y1, x2, y2 } = calculateGradientPoints(
        config.gradient.angleInDeg, size.width, size.height
    );

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    const colourCount = colours.length;
    const intervalGap = 1 / (colourCount - 1);

    for (let i = 0; i < colourCount; i++) {
        const position = intervalGap * i;
        const colour = colours[i];
        gradient.addColorStop(position, colour);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);
};

const renderForSolidStyle = (
    { ctx, colours, size }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);
};

const renderForPopArtSquareStyle = (
    { ctx, colours, size }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    // Draw background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const smallerSide = Math.min(size.width, size.height);

    // Draw main square
    const mainSquareSize = smallerSide / 2;
    const mainSquareX = (size.width - mainSquareSize) / 2;
    const mainSquareY = (size.height - mainSquareSize) / 2;
    drawSquare({
        ctx,
        colour: colours[1],
        x: mainSquareX,
        y: mainSquareY,
        size: mainSquareSize,
    });

    const secSquareSize = mainSquareSize / 2;
    // Draw top right square
    drawSquare({
        ctx,
        colour: colours[2],
        x: mainSquareX + (mainSquareSize / 2),
        y: mainSquareY,
        size: secSquareSize,
    }); 

    // Draw bottom right square
    drawSquare({
        ctx,
        colour: colours[3],
        x: mainSquareX + (mainSquareSize / 2),
        y: mainSquareY + (mainSquareSize / 2),
        size: secSquareSize,
    }); 
};

const renderForColourSwatchStyle = (
    { ctx, colours, size, config }: CanvasRenderOptions & {
        ctx: CanvasRenderingContext2D,
    }
) => {
    if (!config?.colourSwatch) {
        throw new Error("Cannot access Colour Swatch config");
    }

    // Draw background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const colourCount = colours.length;
    const mainColours = colours.slice(1, colourCount);
    const itemCount = mainColours.length; // First one is background

    const shouldDrawSquare = config.colourSwatch.itemShape
        === ColourSwatchStyleItemShape.SQUARE;
    const drawFunc = shouldDrawSquare
        ? drawSquareFromCenter
        : drawCircle;

    const shouldDrawCenter = config.colourSwatch.position
        === ColourSwatchStylePosition.CENTERED;

    const drawCenter = () => {
        for (let i = 0; i < mainColours.length; i++) {
            const slotSize = size.width / (itemCount + 2); // Use one slot on each side as padding
            const itemSize = config.colourSwatch.hasSpacing
                ? slotSize * 4/5
                : slotSize;
            const spacingGap = config.colourSwatch.hasSpacing
                ? slotSize / 10
                : 0;
            const commonY = size.height / 2;
            const startingOffset = slotSize + spacingGap;
            const midRenderPostionOffset = slotSize / 2;
            const x = startingOffset + (slotSize) * i + midRenderPostionOffset;
    
            drawFunc({
                ctx,
                colour: mainColours[i],
                x,
                y: commonY,
                size: itemSize,
            });
        };
    };

    const drawTopRight = () => {
        for (let i = 0; i < mainColours.length; i++) {    
            // Use only half of height
            const slotSize = (size.height / 2) / (itemCount + 1);
            const itemSize = config.colourSwatch.hasSpacing
                ? slotSize * 4/5
                : slotSize;
            const commonX = size.width - itemSize * 1;
            const startingOffset = itemSize;
            const midRenderPostionOffset = slotSize / 2;
            const y = startingOffset + slotSize * i + midRenderPostionOffset;

            drawFunc({
                ctx,
                colour: mainColours[i],
                x: commonX,
                y,
                size: itemSize,
            });
        };
    };

    if (shouldDrawCenter) drawCenter();
    else drawTopRight();
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
