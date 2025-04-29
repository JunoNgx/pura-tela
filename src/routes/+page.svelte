<script lang="ts">
    import { PALETTE_CONFIG_ANGLE_MAX_VALUE, PALETTE_CONFIG_POSITION_MAX_VALUE, PALETTE_CONFIG_SIZE_MAX_VALUE, SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";
    import { tryParseColours, tryParseNumericData, tryParseSize } from "src/lib/parseFuncs.js";
    import { ColourSwatchStyleDirection, ColourSwatchStyleItemShape, type WallGenQueryProps, type WallpaperStyle } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";
    import { isEnumValueValid } from "src/states/stateUtils.svelte.js";
    import { isWallGenStyleValid, passSomeColourStringsToWallpaperGenerator, readjustWallGenColoursInUseCount, setWallGenColourInUseCount, setWallGenSize, wallGenStyle, } from "src/states/wallGenState.svelte.js";
    import { setColourSwatchStyleDirection, setColourSwatchStyleItemShape, setColourSwatchStyleItemSize, setColourSwatchStyleItemSpacing, setColourSwatchStylePositionX, setColourSwatchStylePositionY } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
    import { setGradientStyleConfigAngle } from "src/states/wallGenStyleConfigGradientState.svelte.js";
    import { setPaletteStyleAngle, setPaletteStylePosition, setPaletteStyleSize } from "src/states/wallGenStyleConfigPaletteState.svelte.js";

    export let data: WallGenQueryProps;

    // General shared data
    const tryParseStyleFromQueryToWallGen = () => {
        if (!data.style) {
            return;
        }

        if (isWallGenStyleValid(data.style)) {
            wallGenStyle.set(data.style as WallpaperStyle);
        }
    };

    const tryParseColoursFromQueryToWallGen = () => {
        if (!data.colours) {
            return;
        }

        const coloursData = tryParseColours(data.colours);

        if (!coloursData) {
            return;
        }

        passSomeColourStringsToWallpaperGenerator(coloursData);
        setWallGenColourInUseCount(coloursData.length);
        readjustWallGenColoursInUseCount();
    };

    const tryParseSizeFromQueryToWallGen = () => {
        if (!data.width || !data.height) {
            return;
        }

        const sizeData = tryParseSize(data.width, data.height);

        if (!sizeData) {
            return;
        }

        setWallGenSize(sizeData.width, sizeData.height);
    };

    tryParseStyleFromQueryToWallGen();
    tryParseColoursFromQueryToWallGen();
    tryParseSizeFromQueryToWallGen();

    type tryParseNumericConfigOptions = {
        dataKey: keyof WallGenQueryProps,
        minVal: number,
        maxVal: number,
        stateSetterFunc: (newValue: number) => void,
    };

    const tryParseNumericConfig = (
        {
            dataKey,
            minVal,
            maxVal,
            stateSetterFunc,
        }: tryParseNumericConfigOptions
    ) => {
        if (!data[dataKey]) return;
        const value = tryParseNumericData(data[dataKey], minVal, maxVal);
        if (!value) return;

        stateSetterFunc(value);
    };

    // Gradient style
    tryParseNumericConfig({
        dataKey: "gradientAngle",
        minVal: 0,
        maxVal: 360,
        stateSetterFunc: setGradientStyleConfigAngle,
    });

    // Swatch style
    tryParseNumericConfig({
        dataKey: "swatchPosX",
        minVal: SWATCH_CONFIG_MIN_VALUE,
        maxVal: SWATCH_CONFIG_MAX_VALUE,
        stateSetterFunc: setColourSwatchStylePositionX,
    });
    tryParseNumericConfig({
        dataKey: "swatchPosY",
        minVal: SWATCH_CONFIG_MIN_VALUE,
        maxVal: SWATCH_CONFIG_MAX_VALUE,
        stateSetterFunc: setColourSwatchStylePositionY,
    });
    tryParseNumericConfig({
        dataKey: "swatchItemSize",
        minVal: SWATCH_CONFIG_MIN_VALUE,
        maxVal: SWATCH_CONFIG_MAX_VALUE,
        stateSetterFunc: setColourSwatchStyleItemSize,
    });
    tryParseNumericConfig({
        dataKey: "swatchItemSpacing",
        minVal: SWATCH_CONFIG_MIN_VALUE,
        maxVal: SWATCH_CONFIG_MAX_VALUE,
        stateSetterFunc: setColourSwatchStyleItemSpacing,
    });
    const tryParseSwatchDirection = () => {
        if (!data.swatchDirection) return;
        if (!isEnumValueValid(data.swatchDirection as any, ColourSwatchStyleDirection))
            return;

        setColourSwatchStyleDirection(data.swatchDirection as ColourSwatchStyleDirection);
    };
    const tryParseSwatchItemShape = () => {
        if (!data.swatchItemShape) return;
        if (!isEnumValueValid(data.swatchItemShape as any, ColourSwatchStyleItemShape))
            return;

        setColourSwatchStyleItemShape(data.swatchItemShape as ColourSwatchStyleItemShape);
    };

    tryParseSwatchDirection();
    tryParseSwatchItemShape();

    // Palette style
    tryParseNumericConfig({
        dataKey: "paletteAngle",
        minVal: 0,
        maxVal: PALETTE_CONFIG_ANGLE_MAX_VALUE,
        stateSetterFunc: setPaletteStyleAngle,
    });
    tryParseNumericConfig({
        dataKey: "paletteSize",
        minVal: 0,
        maxVal: PALETTE_CONFIG_SIZE_MAX_VALUE,
        stateSetterFunc: setPaletteStyleSize,
    });
    tryParseNumericConfig({
        dataKey: "palettePosition",
        minVal: 0,
        maxVal: PALETTE_CONFIG_POSITION_MAX_VALUE,
        stateSetterFunc: setPaletteStylePosition,
    });

</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio/>
