import { ColourSwatchStyleDirection, ColourSwatchStyleItemShape, ColourSwatchStylePosition, WallpaperStyle, type RenderStyleConfig, type SizeData } from "./types.js";

const CANVAS_ID = "Canvas";

export type CanvasRenderOptions = {
    size: SizeData,
    colours: string[],
    style: WallpaperStyle,
    config?: RenderStyleConfig,
};

type StyleRenderOptions = CanvasRenderOptions & {
    ctx: CanvasRenderingContext2D,
};

type ShapeProps = {
    ctx: CanvasRenderingContext2D,
    colour: string,
    x: number,
    y: number,
    size: number,
    isVertical?: boolean,
};

const drawSquare = ({ ctx, colour, x, y, size}: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

const drawSquareFromCenter = ({ ctx, colour, x, y, size}: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x - size/2, y - size/2, size, size);
};

const drawRhombus = ({ ctx, colour, x, y, size}: ShapeProps) => {
    const semiDiagonal = size / 2;

    ctx.beginPath();
    ctx.moveTo(x, y - semiDiagonal);
    ctx.lineTo(x + semiDiagonal, y);
    ctx.lineTo(x, y + semiDiagonal);
    ctx.lineTo(x - semiDiagonal, y);
    ctx.closePath();

    ctx.fillStyle = colour;
    ctx.fill();
};

const drawCircle = ({ ctx, colour, x, y, size}: ShapeProps) => {
    ctx.beginPath();
    ctx.arc(x, y, size/2, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
};

type PolygonProps = {
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    sideCount: number,
    colour: string,
    startingAngle?: number
};

const drawPolygon = ({
    ctx,
    x,
    y,
    radius,
    sideCount,
    colour,
    startingAngle = 0
}: PolygonProps ) => {

    const arcSegment = (Math.PI * 2) /sideCount;

    ctx.beginPath();
    for (let i = 0; i < sideCount; i++) {
        const posX = x + radius * Math.cos(startingAngle + arcSegment * i);
        const posY = y + radius * Math.sin(startingAngle + arcSegment * i);
        const position: [ number, number ] = [posX, posY];

        if (i === 0) ctx.moveTo(...position)
        else ctx.lineTo(...position);
    }
    ctx.closePath();

    ctx.fillStyle = colour;
    ctx.fill();
};

const drawTriangle = ({ ctx, colour, x, y, size}: ShapeProps) => {
    drawPolygon({
        sideCount: 3,
        radius: size/2,
        ctx, x, y, colour,
        startingAngle: -Math.PI / 2
    });
};

const drawInvertedTriangle = ({ ctx, colour, x, y, size}: ShapeProps) => {
    drawPolygon({
        sideCount: 3,
        radius: size/2,
        ctx, x, y, colour,
        startingAngle: Math.PI / 2
    });
};

const drawHexagon = ({ ctx, colour, x, y, size}: ShapeProps) => {
    drawPolygon({
        sideCount: 6,
        radius: size/2,
        ctx, x, y, colour,
        startingAngle: -Math.PI / 2
    });
};

const drawThinStrip = ({ ctx, colour, x, y, size, isVertical}: ShapeProps) => {
    const longEdge = size;
    const shortEdge = size/8;
    const drawOptions: [number, number, number, number] = isVertical
        ? [x - shortEdge/2, y - longEdge/2, shortEdge, longEdge]
        : [x - longEdge/2, y - shortEdge/2, longEdge, shortEdge];

    ctx.fillStyle = colour;
    ctx.fillRect(...drawOptions);
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

    case WallpaperStyle.PALETTE:
        renderForPaletteStyle(renderOptions);
        break;

    case WallpaperStyle.SOLID:
    default:
        renderForSolidStyle(renderOptions);
    }
};

const renderForGradientStyle = (
    { ctx, colours, size, config }: StyleRenderOptions
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
    { ctx, colours, size }: StyleRenderOptions
) => {
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);
};

const renderForPopArtSquareStyle = (
    { ctx, colours, size }: StyleRenderOptions
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
    { ctx, colours, size, config }: StyleRenderOptions
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

    let drawFunc: (props: ShapeProps) => void;
    switch(config.colourSwatch.itemShape) {
    case ColourSwatchStyleItemShape.SQUARE:
        drawFunc = drawSquareFromCenter;
        break;
    case ColourSwatchStyleItemShape.CIRCLE:
        drawFunc = drawCircle;
        break;
    case ColourSwatchStyleItemShape.RHOMBUS:
        drawFunc = drawRhombus;
        break;
    case ColourSwatchStyleItemShape.TRIANGLE:
        drawFunc = drawTriangle;
        break;
    case ColourSwatchStyleItemShape.INVERTED_TRIANGLE:
        drawFunc = drawInvertedTriangle;
        break;
    case ColourSwatchStyleItemShape.THIN_STRIP:
        drawFunc = drawThinStrip;
        break;
    case ColourSwatchStyleItemShape.HEXAGON:
        drawFunc = drawHexagon;
        break;
    }

    const shouldDrawHorizontally = config.colourSwatch.direction
        === ColourSwatchStyleDirection.HORIZONTAL;

    const priAxisLength = shouldDrawHorizontally
        ? size.width
        : size.height;
    const baseItemSize = priAxisLength / itemCount;
    const minItemSize = baseItemSize / 7;
    const maxItemSize = baseItemSize * 1.5;
    const itemSize = minItemSize + (maxItemSize - minItemSize)
        * config.colourSwatch.itemSize/100;

    const minSpacing = -itemSize/4;
    const maxSpacing = itemSize/4;
    const spacing = minSpacing + (maxSpacing - minSpacing)
        * config.colourSwatch.itemSpacing/100;

    const swatchSlotSize = itemSize + spacing * 2;
    const midPostionRenderOffset = swatchSlotSize / 2;
    const fullSwatchSize = swatchSlotSize * itemCount;

    const isThinStrip = config.colourSwatch.itemShape
        === ColourSwatchStyleItemShape.THIN_STRIP;
    const crossAxisSize = isThinStrip
        ? itemSize/8
        : itemSize;

    const drawHorizontally = () => {
        const minCommonY = crossAxisSize/2;
        const maxCommonY = size.height - crossAxisSize/2;
        const commonY = minCommonY + (maxCommonY - minCommonY)
            * config.colourSwatch.positionY/100;

        const maxStartingXOffset = size.width - fullSwatchSize;
        const startingXOffset = maxStartingXOffset
            * config.colourSwatch.positionX/100;

        for (let i = 0; i < mainColours.length; i++) {
            const x = startingXOffset + (itemSize + spacing * 2)
                * i + midPostionRenderOffset;
    
            drawFunc({
                ctx,
                colour: mainColours[i],
                x,
                y: commonY,
                size: itemSize,
                isVertical: false,
            });
        };
    };

    const drawVertically = () => {
        const minCommonX = crossAxisSize/2;
        const maxCommonX = size.width - crossAxisSize/2;
        const commonX = minCommonX + (maxCommonX - minCommonX)
            * config.colourSwatch.positionX/100;

        const maxStartingYOffset = size.height - fullSwatchSize;
        const startingYOffset = maxStartingYOffset
            * config.colourSwatch.positionY/100;

        for (let i = 0; i < mainColours.length; i++) {
            const y = startingYOffset + (itemSize + spacing * 2)
                * i + midPostionRenderOffset;
    
            drawFunc({
                ctx,
                colour: mainColours[i],
                x: commonX,
                y,
                size: itemSize,
                isVertical: true
            });
        };
    };

    if (shouldDrawHorizontally) drawHorizontally();
    else drawVertically();
};

export const renderForPaletteStyle = (
    { ctx, colours, size, config }: StyleRenderOptions
) => {

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
