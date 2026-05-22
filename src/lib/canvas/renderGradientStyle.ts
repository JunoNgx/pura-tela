import type { RenderOptions } from "./canvasUtils.js";

export const renderGradientStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
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
