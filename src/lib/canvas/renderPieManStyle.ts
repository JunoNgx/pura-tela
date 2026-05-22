import { PIE_MAN_CONFIG_SIZE_MAX_VALUE } from "src/lib/constants.js";
import { drawFilledArc, type RenderOptions } from "./canvasUtils.js";

export const renderPieManStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
    if (!config?.pieman) {
        throw new Error("Cannot access Pie-Man config");
    }

    // Background
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);

    const centerX = size.width / 2;
    const centerY = size.height / 2;

    const smallerSide = Math.min(size.width, size.height);
    const minRadius = smallerSide * 0.1;
    const maxRadius = smallerSide * 0.5;
    const radius =
        minRadius
        + ((maxRadius - minRadius) * config.pieman.size)
            / PIE_MAN_CONFIG_SIZE_MAX_VALUE;

    // angle=180 -> missing quadrant points to 3 o'clock
    const missingCenterAngle = (config.pieman.angle * Math.PI) / 180 + Math.PI;
    const missingStartAngle = missingCenterAngle - Math.PI / 4;

    // Draw quadrants
    for (let i = 0; i < 3; i++) {
        const startAngle = missingStartAngle + (Math.PI / 2) * (i + 1);
        const endAngle = startAngle + Math.PI / 2;

        drawFilledArc({
            ctx,
            colour: colours[i + 1],
            x: centerX,
            y: centerY,
            radius,
            startAngle,
            endAngle,
        });
    }
};
