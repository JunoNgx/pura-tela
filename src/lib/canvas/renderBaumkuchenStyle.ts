import {
    BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE,
    BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";
import {
    drawCircle,
    drawFilledArc,
    drawSquare,
    mapToRange,
    type RenderOptions,
} from "./canvasUtils.js";

export const renderBaumkuchenStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
    if (!config?.baumkuchen) {
        throw new Error("Cannot access Baumkuchen config");
    }

    // Draw background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const smallerCanvasSide = Math.min(size.width, size.height);

    const minBaseDiameter = smallerCanvasSide / 16;
    const maxBaseDiameter = smallerCanvasSide / 2;
    const baseDiameter = mapToRange({
        outputMin: minBaseDiameter,
        outputMax: maxBaseDiameter,
        input: config.baumkuchen.size,
        inputMax: BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE,
    });

    const minCorePosX = baseDiameter;
    const maxCorePosX = size.width - baseDiameter;
    const corePosX = mapToRange({
        outputMin: minCorePosX,
        outputMax: maxCorePosX,
        input: config.baumkuchen.positionX,
        inputMax: BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE,
    });

    const minCorePosY = baseDiameter;
    const maxCorePosY = size.height - baseDiameter;
    const corePosY = mapToRange({
        outputMin: minCorePosY,
        outputMax: maxCorePosY,
        input: config.baumkuchen.positionY,
        inputMax: BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE,
    });

    // Draw bottom left square
    drawSquare({
        ctx,
        colour: colours[3],
        x: corePosX - baseDiameter,
        y: corePosY,
        size: baseDiameter,
    });

    // Draw bottom right square
    drawSquare({
        ctx,
        colour: colours[1],
        x: corePosX,
        y: corePosY,
        size: baseDiameter,
    });

    const baseRadius = baseDiameter / 2;

    drawCircle({
        ctx,
        colour: colours[1],
        x: corePosX,
        y: corePosY,
        radius: baseRadius * 2,
    });

    drawCircle({
        ctx,
        colour: colours[2],
        x: corePosX,
        y: corePosY,
        radius: baseRadius * 1.5,
    });

    drawCircle({
        ctx,
        colour: colours[3],
        x: corePosX,
        y: corePosY,
        radius: baseRadius,
    });

    // Corner arc
    drawFilledArc({
        ctx,
        colour: colours[4],
        x: corePosX,
        y: corePosY,
        radius: baseDiameter,
        startAngle: 0,
        endAngle: Math.PI / 2,
    });

    // Two halves of core
    const coreRadius = baseRadius * 0.5;

    drawFilledArc({
        ctx,
        colour: colours[4],
        x: corePosX,
        y: corePosY,
        radius: coreRadius,
        startAngle: 0,
        endAngle: Math.PI,
        isCounterClockwise: true,
    });

    drawFilledArc({
        ctx,
        colour: colours[1],
        x: corePosX,
        y: corePosY,
        radius: coreRadius,
        startAngle: 0,
        endAngle: Math.PI,
    });
};
