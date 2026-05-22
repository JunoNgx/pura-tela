import { SWATCH_CONFIG_MAX_VALUE } from "src/lib/constants.js";
import {
    ColourSwatchStyleDirection,
    ColourSwatchStyleItemShape,
} from "src/lib/types.js";
import {
    drawSquareFromCenter,
    drawShapeCircle,
    drawRhombus,
    drawTriangle,
    drawInvertedTriangle,
    drawThinStrip,
    drawHexagon,
    mapToRange,
    type ShapeProps,
    type RenderOptions,
} from "./canvasUtils.js";

export const renderColourSwatchStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
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
            drawFunc = drawShapeCircle;
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
    const itemSize = mapToRange({
        outputMin: minItemSize,
        outputMax: maxItemSize,
        input: config.colourSwatch.itemSize,
        inputMax: SWATCH_CONFIG_MAX_VALUE,
    });

    const minSpacing = -itemSize / 4;
    const maxSpacing = itemSize / 4;
    const spacing = mapToRange({
        outputMin: minSpacing,
        outputMax: maxSpacing,
        input: config.colourSwatch.itemSpacing,
        inputMax: SWATCH_CONFIG_MAX_VALUE,
    });

    const swatchSlotSize = itemSize + spacing * 2;
    const midPostionRenderOffset = swatchSlotSize / 2;
    const fullSwatchSize = swatchSlotSize * itemCount;

    const isThinStrip =
        config.colourSwatch.itemShape === ColourSwatchStyleItemShape.THIN_STRIP;
    const crossAxisSize = isThinStrip ? itemSize / 8 : itemSize;

    const drawHorizontally = () => {
        const minCommonY = crossAxisSize / 2;
        const maxCommonY = size.height - crossAxisSize / 2;
        const commonY = mapToRange({
            outputMin: minCommonY,
            outputMax: maxCommonY,
            input: config.colourSwatch.positionY,
            inputMax: SWATCH_CONFIG_MAX_VALUE,
        });

        const maxStartingXOffset = size.width - fullSwatchSize;
        const startingXOffset = mapToRange({
            outputMin: 0,
            outputMax: maxStartingXOffset,
            input: config.colourSwatch.positionX,
            inputMax: SWATCH_CONFIG_MAX_VALUE,
        });

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
        const commonX = mapToRange({
            outputMin: minCommonX,
            outputMax: maxCommonX,
            input: config.colourSwatch.positionX,
            inputMax: SWATCH_CONFIG_MAX_VALUE,
        });

        const maxStartingYOffset = size.height - fullSwatchSize;
        const startingYOffset = mapToRange({
            outputMin: 0,
            outputMax: maxStartingYOffset,
            input: config.colourSwatch.positionY,
            inputMax: SWATCH_CONFIG_MAX_VALUE,
        });

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
