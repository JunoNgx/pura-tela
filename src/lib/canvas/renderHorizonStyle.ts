import {
    HORIZON_CONFIG_POSITION_MAX_VALUE,
    HORIZON_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";
import {
    drawFilledArc,
    getRelativeSides,
    mapToRange,
    type RenderOptions,
} from "./canvasUtils.js";

export const renderHorizonStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
    if (!config?.horizon) {
        throw new Error("Cannot access Horizon config");
    }

    const requiredColourCount = config.horizon.shouldShowCore ? 6 : 4;
    if (colours.length < requiredColourCount) {
        throw new Error("Insufficient colours for Horizon rendering");
    }

    const { shorterSide } = getRelativeSides(size);

    const minFgBlockSize = shorterSide * 0.25;
    const maxFgBlockSize = shorterSide;
    const fgBlockSize = mapToRange({
        outputMin: minFgBlockSize,
        outputMax: maxFgBlockSize,
        input: config.horizon.size,
        inputMax: HORIZON_CONFIG_SIZE_MAX_VALUE,
    });

    const minYPos = fgBlockSize / 2;
    const maxYPos = size.height - fgBlockSize / 2;
    const yPos = mapToRange({
        outputMin: minYPos,
        outputMax: maxYPos,
        input: config.horizon.position,
        inputMax: HORIZON_CONFIG_POSITION_MAX_VALUE,
    });

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
        drawFilledArc({
            ctx,
            colour: colours[4],
            x: size.width / 2,
            y: yPos,
            radius: coreRadius,
            startAngle: Math.PI,
            endAngle: Math.PI * 2,
        });

        // Lower core
        drawFilledArc({
            ctx,
            colour: colours[5],
            x: size.width / 2,
            y: yPos,
            radius: coreRadius,
            startAngle: 0,
            endAngle: Math.PI,
        });
    }
};
