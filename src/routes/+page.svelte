<script lang="ts">
	import { tryParseAngle, tryParseColours, tryParseSize } from "src/lib/parseFuncs.js";
	import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, type WallGenQueryProps, type WallpaperStyle } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";
	import { isEnumValueValid } from "src/states/stateUtils.svelte.js";
	import { isWallGenStyleValid, passSomeColourStringsToWallpaperGenerator, readjustWallGenColoursInUseCount, setWallGenColourInUseCount, setWallGenSize, wallGenStyle, } from "src/states/wallGenState.svelte.js";
	import { setColourSwatchStyleItemShape, setColourSwatchStylePosition, setColourSwatchStyleSpacing } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
	import { setGradientStyleConfigAngle } from "src/states/wallGenStyleConfigGradientState.svelte.js";

    export let data: WallGenQueryProps;

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

    const tryParseColourSwatchShape = () => {
        if (!data.swatchShape) return;
        if (!isEnumValueValid(data.swatchShape as any, ColourSwatchStyleItemShape))
            return;

        setColourSwatchStyleItemShape(data.swatchShape as ColourSwatchStyleItemShape);
    };

    const tryParseColourSwatchPosition = () => {
        if (!data.swatchPosition) return;
        if (!isEnumValueValid(data.swatchPosition as any, ColourSwatchStylePosition))
            return;

        setColourSwatchStylePosition(data.swatchPosition as ColourSwatchStylePosition);
    };

    const tryParseColourSwatchHasSpacing = () => {
        if (!data.swatchHasSpacing) return;
        const parsedValue = data.swatchHasSpacing === "true";
        setColourSwatchStyleSpacing(parsedValue);
    };

    tryParseStyleFromQueryToWallGen();
    tryParseColoursFromQueryToWallGen();
    tryParseSizeFromQueryToWallGen();

    tryParseGradientConfig();

    tryParseColourSwatchShape();
    tryParseColourSwatchPosition();
    tryParseColourSwatchHasSpacing();
</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio/>
