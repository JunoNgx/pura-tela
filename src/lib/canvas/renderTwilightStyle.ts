import {
    TWILIGHT_CONFIG_POSITION_MAX_VALUE,
    TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
    TWILIGHT_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";
import {
    drawFilledArc,
    getRelativeSides,
    mapToRange,
    type RenderOptions,
} from "./canvasUtils.js";

export const renderTwilightStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
    if (!config?.twilight) {
        throw new Error("Cannot access Twilight config");
    }

    const minHorizonY = size.height * 0;
    const maxHorizonY = size.height * 1;
    const horizonY = mapToRange({
        outputMin: minHorizonY,
        outputMax: maxHorizonY,
        input: config.twilight.position,
        inputMax: TWILIGHT_CONFIG_POSITION_MAX_VALUE,
    });
    const sunCenterX = size.width / 2;

    // Draw sky
    ctx.fillStyle = colours[1];
    ctx.fillRect(0, 0, size.width, horizonY);

    // Draw water
    ctx.fillStyle = colours[2];
    ctx.fillRect(0, horizonY, size.width, size.height - horizonY);

    // Sun radius scaled by size config
    const { shorterSide } = getRelativeSides(size);
    const minSunRadius = shorterSide * 0.05;
    const maxSunRadius = shorterSide * 0.5;
    const sunRadius = mapToRange({
        outputMin: minSunRadius,
        outputMax: maxSunRadius,
        input: config.twilight.size,
        inputMax: TWILIGHT_CONFIG_SIZE_MAX_VALUE,
    });

    // Draw full sun circle
    drawFilledArc({
        ctx,
        colour: colours[0],
        x: sunCenterX,
        y: horizonY,
        radius: sunRadius,
        startAngle: 0,
        endAngle: Math.PI * 2,
    });

    const minStripeCount = 5;
    const maxStripeCount = 20;
    const stripeCount = Math.round(
        mapToRange({
            outputMin: minStripeCount,
            outputMax: maxStripeCount,
            input: config.twilight.rippleIntensity,
            inputMax: TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
        })
    );

    const stripeHeightAtMin = sunRadius * 0.1;
    const stripeHeightAtMax = sunRadius * 0.03;
    const stripeHeight = mapToRange({
        outputMin: stripeHeightAtMin,
        outputMax: stripeHeightAtMax,
        input: config.twilight.rippleIntensity,
        inputMax: TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
    });

    const spacingAtMin = sunRadius * 0.2;
    const spacingAtMax = sunRadius * 0.05;
    const spacing = mapToRange({
        outputMin: spacingAtMin,
        outputMax: spacingAtMax,
        input: config.twilight.rippleIntensity,
        inputMax: TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
    });

    // Draw sea-coloured stripes over the lower half of the sun
    for (let i = 0; i < stripeCount; i++) {
        const stripeCenterY = horizonY + spacing * i + stripeHeight / 2;

        ctx.fillStyle = colours[2];
        ctx.fillRect(
            sunCenterX - sunRadius,
            stripeCenterY - stripeHeight / 2,
            sunRadius * 2,
            stripeHeight
        );
    }
};
