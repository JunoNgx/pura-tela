import type { SizeData, RenderStyleConfig } from "src/lib/types.js";

export type RenderOptions = {
    ctx: CanvasRenderingContext2D;
    colours: string[];
    size: SizeData;
    config?: RenderStyleConfig;
};

type ArcProps = {
    ctx: CanvasRenderingContext2D;
    colour: string;
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    isCounterClockwise?: boolean;
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

type MapToRangeProps = {
    outputMin: number;
    outputMax: number;
    input: number;
    inputMin?: number;
    inputMax: number;
};

export type ShapeProps = {
    ctx: CanvasRenderingContext2D;
    colour: string;
    x: number;
    y: number;
    size: number;
    isVertical?: boolean;
};

export const drawSquare = ({ ctx, colour, x, y, size }: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

export const drawSquareFromCenter = ({
    ctx,
    colour,
    x,
    y,
    size,
}: ShapeProps) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
};

export const drawRhombus = ({ ctx, colour, x, y, size }: ShapeProps) => {
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

export const drawCircle = ({
    ctx,
    colour,
    x,
    y,
    radius,
}: {
    ctx: CanvasRenderingContext2D;
    colour: string;
    x: number;
    y: number;
    radius: number;
}) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
};

export const drawShapeCircle = ({ ctx, colour, x, y, size }: ShapeProps) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
    ctx.fillStyle = colour;
    ctx.fill();
};

export const drawFilledArc = ({
    ctx,
    colour,
    x,
    y,
    radius,
    startAngle,
    endAngle,
    isCounterClockwise = false,
}: ArcProps) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle, isCounterClockwise);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
};

export const drawPolygon = ({
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

export const drawTriangle = ({ ctx, colour, x, y, size }: ShapeProps) => {
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

export const drawInvertedTriangle = ({
    ctx,
    colour,
    x,
    y,
    size,
}: ShapeProps) => {
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

export const drawHexagon = ({ ctx, colour, x, y, size }: ShapeProps) => {
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

export const drawThinStrip = ({
    ctx,
    colour,
    x,
    y,
    size,
    isVertical,
}: ShapeProps) => {
    const longEdge = size;
    const shortEdge = size / 8;
    const drawOptions: [number, number, number, number] = isVertical
        ? [x - shortEdge / 2, y - longEdge / 2, shortEdge, longEdge]
        : [x - longEdge / 2, y - shortEdge / 2, longEdge, shortEdge];

    ctx.fillStyle = colour;
    ctx.fillRect(...drawOptions);
};

export const mapToRange = ({
    outputMin,
    outputMax,
    input,
    inputMin = 0,
    inputMax,
}: MapToRangeProps): number => {
    const normalisedInput = (input - inputMin) / (inputMax - inputMin);
    const outputRange = outputMax - outputMin;
    const result = outputMin + outputRange * normalisedInput;
    return result;
};

export const getRelativeSides = (size: { width: number; height: number }) => {
    const longerSide = size.width >= size.height ? size.width : size.height;
    const shorterSide = size.width >= size.height ? size.height : size.width;

    return { longerSide, shorterSide };
};
