import {
    POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
    POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";
import { drawSquare, mapToRange, type RenderOptions } from "./canvasUtils.js";

export const renderPopArtSquareStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
    if (!config?.popArtSquare) {
        throw new Error("Cannot access Pop Art Squre config");
    }

    // Draw background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const smallerCanvasSide = Math.min(size.width, size.height);

    const minSize = smallerCanvasSide / 8;
    const maxSize = smallerCanvasSide;
    const mainSquareSize = mapToRange({
        outputMin: minSize,
        outputMax: maxSize,
        input: config.popArtSquare.size,
        inputMax: POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
    });

    const minMainSquareX = 0;
    const maxMainSquareX = size.width - mainSquareSize;
    const mainSquareX = mapToRange({
        outputMin: minMainSquareX,
        outputMax: maxMainSquareX,
        input: config.popArtSquare.positionX,
        inputMax: POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
    });

    const minMainSquareY = 0;
    const maxMainSquareY = size.height - mainSquareSize;
    const mainSquareY = mapToRange({
        outputMin: minMainSquareY,
        outputMax: maxMainSquareY,
        input: config.popArtSquare.positionY,
        inputMax: POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
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
