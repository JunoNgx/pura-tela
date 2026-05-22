import {
    PALETTE_CONFIG_POSITION_MAX_VALUE,
    PALETTE_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";
import {
    getRelativeSides,
    mapToRange,
    type RenderOptions,
} from "./canvasUtils.js";

export const renderPaletteStyle = ({
    ctx,
    colours,
    size,
    config,
}: RenderOptions) => {
    if (!config?.palette) {
        throw new Error("Cannot access Palette config");
    }

    if (colours.length < 2) {
        throw new Error("Insufficient colours for Palette rendering");
    }

    // Due to this translation, the centerpoint is now (0, 0)
    ctx.translate(size.width / 2, size.height / 2);
    ctx.rotate((config.palette.angleInDeg * Math.PI) / 180);

    const mainColours = [...colours];
    const firstColour = mainColours.shift();
    const lastColour = mainColours.pop();

    const { shorterSide, longerSide } = getRelativeSides(size);

    const maxBaseSize = shorterSide / colours.length;
    const minBaseSize = shorterSide / (colours.length * 8);
    const baseSize = mapToRange({
        outputMin: minBaseSize,
        outputMax: maxBaseSize,
        input: config.palette.size,
        inputMax: PALETTE_CONFIG_SIZE_MAX_VALUE,
    });

    const minStartingPos = -longerSide / 2;
    const maxStartingPos = longerSide / 2;
    const startingPos = mapToRange({
        outputMin: minStartingPos,
        outputMax: maxStartingPos,
        input: config.palette.position,
        inputMax: PALETTE_CONFIG_POSITION_MAX_VALUE,
    });

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
