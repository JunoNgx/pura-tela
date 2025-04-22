<script lang="ts">
	import { tryParseAngle, tryParseColours, tryParseSize, tryParseSwatchNumericConfig } from "src/lib/parseFuncs.js";
	import { ColourSwatchStyleDirection, ColourSwatchStyleItemShape, type WallGenQueryProps, type WallpaperStyle } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";
	import { isEnumValueValid } from "src/states/stateUtils.svelte.js";
	import { isWallGenStyleValid, passSomeColourStringsToWallpaperGenerator, readjustWallGenColoursInUseCount, setWallGenColourInUseCount, setWallGenSize, wallGenStyle, } from "src/states/wallGenState.svelte.js";
	import { setColourSwatchStyleDirection, setColourSwatchStyleItemShape, setColourSwatchStyleItemSize, setColourSwatchStyleItemSpacing, setColourSwatchStylePositionX, setColourSwatchStylePositionY } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
	import { setGradientStyleConfigAngle } from "src/states/wallGenStyleConfigGradientState.svelte.js";

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


    // Gradient style
    const tryParseGradientConfig = () => {
        if (!data.gradientAngle) {
            return;
        }

        const angle = tryParseAngle(data.gradientAngle);

        if (!angle) {
            return;
        }

        setGradientStyleConfigAngle(angle);
    };

    tryParseGradientConfig();

    // Swatch style
    const tryParseSwatchPositionX = () => {
        if (!data.swatchPosX) return;
        const value = tryParseSwatchNumericConfig(data.swatchPosX);
        if (!value) return;

        setColourSwatchStylePositionX(value);
    };

    const tryParseSwatchPositionY = () => {
        if (!data.swatchPosY) return;
        const value = tryParseSwatchNumericConfig(data.swatchPosY);
        if (!value) return;

        setColourSwatchStylePositionY(value);
    };

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

    const tryParseSwatchItemSize = () => {
        if (!data.swatchItemSize) return;
        const value = tryParseSwatchNumericConfig(data.swatchItemSize);
        if (!value) return;

        setColourSwatchStyleItemSize(value);
    };

    const tryParseSwatchItemSpacing = () => {
        if (!data.swatchItemSpacing) return;
        const value = tryParseSwatchNumericConfig(data.swatchItemSpacing);
        if (!value) return;

        setColourSwatchStyleItemSpacing(value);
    };

    tryParseSwatchPositionX();
    tryParseSwatchPositionY();
    tryParseSwatchDirection();
    tryParseSwatchItemShape();
    tryParseSwatchItemSize();
    tryParseSwatchItemSpacing();
</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio/>
