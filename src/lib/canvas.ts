import {
    HORIZON_CONFIG_POSITION_MAX_VALUE,
    HORIZON_CONFIG_SIZE_MAX_VALUE,
    POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
    POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
} from "./constants.js";
import {
    ColourSwatchStyleDirection,
    ColourSwatchStyleItemShape,
    WallpaperStyle,
    type RenderStyleConfig,
    type SizeData,
} from "./types.js";

const CANVAS_ID = "Canvas";

export type CanvasRenderOptions = {
    size: SizeData;
    colours: string[];
    style: WallpaperStyle;
    config?: RenderStyleConfig;
};

type StyleRenderOptions = CanvasRenderOptions & {
    ctx: CanvasRenderingContext2D;
};

type ShapeProps = {
    ctx: CanvasRenderingContext2D;
    colour: string;
    x: number;
    y: number;
    size: number;
    isVertical?: boolean;
};

// ---- Util draw functions

const drawSquare = ({ ctx, colour, x, y, size }: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

const drawSquareFromCenter = ({ ctx, colour, x, y, size }: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
};

const drawRhombus = ({ ctx, colour, x, y, size }: ShapeProps) => {
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

const drawCircle = ({ ctx, colour, x, y, size }: ShapeProps) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
};

type PolygonProps = {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    sideCount: number;
    colour: string;
    startingAngle?: number;
};

const drawPolygon = ({
    ctx,
    x,
    y,
    radius,
    sideCount,
    colour,
    startingAngle = 0,
}: PolygonProps) => {
    const arcSegment = (Math.PI * 2) / sideCount;

    ctx.beginPath();
    for (let i = 0; i < sideCount; i++) {
        const posX = x + radius * Math.cos(startingAngle + arcSegment * i);
        const posY = y + radius * Math.sin(startingAngle + arcSegment * i);
        const position: [number, number] = [posX, posY];

        if (i === 0) ctx.moveTo(...position);
        else ctx.lineTo(...position);
    }
    ctx.closePath();

    ctx.fillStyle = colour;
    ctx.fill();
};

const drawTriangle = ({ ctx, colour, x, y, size }: ShapeProps) => {
    drawPolygon({
        sideCount: 3,
        radius: size / 2,
        ctx,
        x,
        y,
        colour,
        startingAngle: -Math.PI / 2,
    });
};

const drawInvertedTriangle = ({ ctx, colour, x, y, size }: ShapeProps) => {
    drawPolygon({
        sideCount: 3,
        radius: size / 2,
        ctx,
        x,
        y,
        colour,
        startingAngle: Math.PI / 2,
    });
};

const drawHexagon = ({ ctx, colour, x, y, size }: ShapeProps) => {
    drawPolygon({
        sideCount: 6,
        radius: size / 2,
        ctx,
        x,
        y,
        colour,
        startingAngle: -Math.PI / 2,
    });
};

const drawThinStrip = ({ ctx, colour, x, y, size, isVertical }: ShapeProps) => {
    const longEdge = size;
    const shortEdge = size / 8;
    const drawOptions: [number, number, number, number] = isVertical
        ? [x - shortEdge / 2, y - longEdge / 2, shortEdge, longEdge]
        : [x - longEdge / 2, y - shortEdge / 2, longEdge, shortEdge];

    ctx.fillStyle = colour;
    ctx.fillRect(...drawOptions);
};

// ---- Logic util functions

type deriveValueFromScaleProps = {
    minValue: number;
    maxValue: number;
    scaleValue: number;
    minScaleValue?: number;
    maxScaleValue: number;
};

const deriveValueFromScale = ({
    minValue,
    maxValue,
    scaleValue,
    minScaleValue = 0,
    maxScaleValue,
}: deriveValueFromScaleProps): number => {
    const valueDiff = minValue + (maxValue - minValue);
    const scaleDiff = maxScaleValue - minScaleValue;
    // TODO: rename this variable; need to find a better term
    const scaledScaleValue = scaleValue / scaleDiff;
    const derivedValue = valueDiff * scaledScaleValue;

    return derivedValue;
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

    const renderOptions = {
        ctx,
        size,
        colours,
        style,
        config,
    };

    switch (style) {
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

        case WallpaperStyle.HORIZON:
            renderForHorizonStyle(renderOptions);
            break;

        case WallpaperStyle.SOLID:
        default:
            renderForSolidStyle(renderOptions);
    }
};

const renderForGradientStyle = ({
    ctx,
    colours,
    size,
    config,
}: StyleRenderOptions) => {
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
        angleInDeg: number,
        width: number,
        height: number
    ) => {
        const diagonalLength = Math.sqrt(width * width + height * height);
        const distanceFromMid = diagonalLength / 2;
        const angleInRadian = (angleInDeg * Math.PI) / 180;
        const midX = width / 2;
        const midY = height / 2;

        const x1 = midX - distanceFromMid * Math.cos(angleInRadian);
        const y1 = midY - distanceFromMid * Math.sin(angleInRadian);

        const x2 = midX + distanceFromMid * Math.cos(angleInRadian);
        const y2 = midY + distanceFromMid * Math.sin(angleInRadian);

        return { x1, y1, x2, y2 };
    };

    const { x1, y1, x2, y2 } = calculateGradientPoints(
        config.gradient.angleInDeg,
        size.width,
        size.height
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

const renderForSolidStyle = ({ ctx, colours, size }: StyleRenderOptions) => {
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);
};

const renderForPopArtSquareStyle = ({
    ctx,
    colours,
    size,
    config,
}: StyleRenderOptions) => {
    if (!config?.popArtSquare) {
        throw new Error("Cannot access Pop Art Squre config");
    }

    // Draw background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const smallerCanvasSide = Math.min(size.width, size.height);

    const minSize = smallerCanvasSide / 8;
    const maxSize = smallerCanvasSide;
    const mainSquareSize = deriveValueFromScale({
        minValue: minSize,
        maxValue: maxSize,
        scaleValue: config.popArtSquare.size,
        maxScaleValue: POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
    });

    const minMainSquareX = 0;
    const maxMainSquareX = size.width - mainSquareSize;
    const mainSquareX = deriveValueFromScale({
        minValue: minMainSquareX,
        maxValue: maxMainSquareX,
        scaleValue: config.popArtSquare.positionX,
        maxScaleValue: POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
    });

    const minMainSquareY = 0;
    const maxMainSquareY = size.height - mainSquareSize;
    const mainSquareY = deriveValueFromScale({
        minValue: minMainSquareY,
        maxValue: maxMainSquareY,
        scaleValue: config.popArtSquare.positionY,
        maxScaleValue: POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
    });

    // Draw main square
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
        x: mainSquareX + mainSquareSize / 2,
        y: mainSquareY,
        size: secSquareSize,
    });

    // Draw bottom right square
    drawSquare({
        ctx,
        colour: colours[3],
        x: mainSquareX + mainSquareSize / 2,
        y: mainSquareY + mainSquareSize / 2,
        size: secSquareSize,
    });
};

const renderForColourSwatchStyle = ({
    ctx,
    colours,
    size,
    config,
}: StyleRenderOptions) => {
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
    switch (config.colourSwatch.itemShape) {
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

    const shouldDrawHorizontally =
        config.colourSwatch.direction === ColourSwatchStyleDirection.HORIZONTAL;

    const priAxisLength = shouldDrawHorizontally ? size.width : size.height;
    const baseItemSize = priAxisLength / itemCount;
    const minItemSize = baseItemSize / 7;
    const maxItemSize = baseItemSize * 1.5;
    const itemSize =
        minItemSize
        + ((maxItemSize - minItemSize) * config.colourSwatch.itemSize) / 100;

    const minSpacing = -itemSize / 4;
    const maxSpacing = itemSize / 4;
    const spacing =
        minSpacing
        + ((maxSpacing - minSpacing) * config.colourSwatch.itemSpacing) / 100;

    const swatchSlotSize = itemSize + spacing * 2;
    const midPostionRenderOffset = swatchSlotSize / 2;
    const fullSwatchSize = swatchSlotSize * itemCount;

    const isThinStrip =
        config.colourSwatch.itemShape === ColourSwatchStyleItemShape.THIN_STRIP;
    const crossAxisSize = isThinStrip ? itemSize / 8 : itemSize;

    const drawHorizontally = () => {
        const minCommonY = crossAxisSize / 2;
        const maxCommonY = size.height - crossAxisSize / 2;
        const commonY =
            minCommonY
            + ((maxCommonY - minCommonY) * config.colourSwatch.positionY) / 100;

        const maxStartingXOffset = size.width - fullSwatchSize;
        const startingXOffset =
            (maxStartingXOffset * config.colourSwatch.positionX) / 100;

        for (let i = 0; i < mainColours.length; i++) {
            const x =
                startingXOffset
                + (itemSize + spacing * 2) * i
                + midPostionRenderOffset;

            drawFunc({
                ctx,
                colour: mainColours[i],
                x,
                y: commonY,
                size: itemSize,
                isVertical: false,
            });
        }
    };

    const drawVertically = () => {
        const minCommonX = crossAxisSize / 2;
        const maxCommonX = size.width - crossAxisSize / 2;
        const commonX =
            minCommonX
            + ((maxCommonX - minCommonX) * config.colourSwatch.positionX) / 100;

        const maxStartingYOffset = size.height - fullSwatchSize;
        const startingYOffset =
            (maxStartingYOffset * config.colourSwatch.positionY) / 100;

        for (let i = 0; i < mainColours.length; i++) {
            const y =
                startingYOffset
                + (itemSize + spacing * 2) * i
                + midPostionRenderOffset;

            drawFunc({
                ctx,
                colour: mainColours[i],
                x: commonX,
                y,
                size: itemSize,
                isVertical: true,
            });
        }
    };

    if (shouldDrawHorizontally) drawHorizontally();
    else drawVertically();
};

export const renderForPaletteStyle = ({
    ctx,
    colours,
    size,
    config,
}: StyleRenderOptions) => {
    if (!config?.palette) {
        throw new Error("Cannot access Palette config");
    }

    if (colours.length < 2) {
        throw new Error("Insufficient colours for Palette rendering");
    }

    // Due to this translation, the centerpoint is now (0, 0)
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, 10, 10);

    ctx.translate(size.width / 2, size.height / 2);
    ctx.rotate((config.palette.angleInDeg * Math.PI) / 180);

    const mainColours = [...colours];
    const firstColour = mainColours.shift();
    const lastColour = mainColours.pop();

    const longerSide = size.width >= size.height ? size.width : size.height;
    const shorterSide = size.width >= size.height ? size.height : size.width;

    const maxBaseSize = longerSide / colours.length;
    const minBaseSize = shorterSide / colours.length;
    const baseSize =
        minBaseSize + ((maxBaseSize - minBaseSize) * config.palette.size) / 10;

    const leftmostPosition = -longerSide / 2;
    const minStartingPos = leftmostPosition + maxBaseSize;
    const maxStartingPos = 0;
    const startingPos =
        minStartingPos
        + ((maxStartingPos - minStartingPos) * config.palette.position) / 100;

    const mainColoursWidth = baseSize * mainColours.length;
    const mainColoursCenterpoint = startingPos + mainColoursWidth / 2;

    // Two background colours
    ctx.fillStyle = firstColour!;
    ctx.fillRect(
        -size.width * 2,
        -size.height * 2,
        size.width * 2 + mainColoursCenterpoint,
        size.height * 4
    );
    ctx.fillStyle = lastColour!;
    ctx.fillRect(
        0 + mainColoursCenterpoint,
        -size.height * 2,
        size.width * 2,
        size.height * 4 + mainColoursCenterpoint
    );

    for (let i = 0; i < mainColours.length; i++) {
        const colour = mainColours[i];

        ctx.fillStyle = colour;
        ctx.fillRect(
            startingPos + baseSize * i,
            -size.height * 2,
            baseSize,
            size.height * 4
        );
    }
};

export const renderForHorizonStyle = ({
    ctx,
    colours,
    size,
    config,
}: StyleRenderOptions) => {
    if (!config?.horizon) {
        throw new Error("Cannot access Horizon config");
    }

    const requiredColourCount = config.horizon.shouldShowCore ? 6 : 4;
    if (colours.length < requiredColourCount) {
        throw new Error("Insufficient colours for Horizon rendering");
    }

    // TODO: abstract getShortAndLongerSides(width, height);
    const longerSide = size.width >= size.height ? size.width : size.height;
    const shorterSide = size.width >= size.height ? size.height : size.width;

    const minFgBlockSize = shorterSide * 0.25;
    const maxFgBlockSize = shorterSide;
    const varianceFgBlockSize =
        ((maxFgBlockSize - minFgBlockSize) * config.horizon.size)
        / HORIZON_CONFIG_SIZE_MAX_VALUE;
    const fgBlockSize = minFgBlockSize + varianceFgBlockSize;

    const minYPos = fgBlockSize / 2;
    const maxYPos = size.height - fgBlockSize / 2;
    const varianceYPos =
        ((maxYPos - minYPos) * config.horizon.position)
        / HORIZON_CONFIG_POSITION_MAX_VALUE;
    const yPos = minYPos + varianceYPos;

    // Background upper half
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, yPos);

    // Background lower half
    ctx.fillStyle = colours[1];
    ctx.fillRect(0, yPos, size.width, size.height - yPos);

    // Foreground upper half
    ctx.fillStyle = colours[2];
    ctx.fillRect(
        size.width / 2 - fgBlockSize / 2,
        yPos - fgBlockSize / 2,
        fgBlockSize,
        fgBlockSize / 2
    );

    // Foreground lower half
    ctx.fillStyle = colours[3];
    ctx.fillRect(
        size.width / 2 - fgBlockSize / 2,
        yPos,
        fgBlockSize,
        fgBlockSize / 2
    );

    const shouldDrawCore = config.horizon.shouldShowCore;
    if (shouldDrawCore) {
        const coreRadius = fgBlockSize * 0.35;

        // Upper core
        ctx.beginPath();
        ctx.arc(size.width / 2, yPos, coreRadius, Math.PI, Math.PI * 2);
        ctx.fillStyle = colours[4];
        ctx.fill();

        // Lower core
        ctx.beginPath();
        ctx.arc(size.width / 2, yPos, coreRadius, 0, Math.PI);
        ctx.fillStyle = colours[5];
        ctx.fill();
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
