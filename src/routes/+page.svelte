<script lang="ts">
    import { tryParseColours, tryParseSize } from "src/lib/parseFuncs.js";
    import { WallpaperStyle } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";
    import {
        passSomeColourStringsToWallpaperGenerator,
        readjustWallGenColoursInUseCount,
        setWallGenColourInUseCount,
        setWallGenSizeFull,
        wallGenStyle,
    } from "src/states/wallGenState.svelte.js";
    import { parseFromSearchParams as parseGradient } from "src/states/wallGenStyleConfigGradientState.svelte.js";
    import { parseFromSearchParams as parseSwatch } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
    import { parseFromSearchParams as parsePalette } from "src/states/wallGenStyleConfigPaletteState.svelte.js";
    import { parseFromSearchParams as parseHorizon } from "src/states/wallGenStyleConfigHorizonState.svelte.js";
    import { parseFromSearchParams as parsePopArtSquare } from "src/states/wallGenStyleConfigPopArtSquareState.svelte.js";
    import { parseFromSearchParams as parseTwilight } from "src/states/wallGenStyleConfigTwilightState.svelte.js";
    import { parseFromSearchParams as parsePieMan } from "src/states/wallGenStyleConfigPieManState.svelte.js";
    import { parseFromSearchParams as parseBaumkuchen } from "src/states/wallGenStyleConfigBaumkuchenState.svelte.js";
    import { isEnumValueValid } from "src/states/stateUtils.svelte.js";

    export let data: { searchParams: URLSearchParams };

    const tryParseStyleFromQueryToWallGen = () => {
        const style = data.searchParams.get("style");
        if (!style) return;
        if (isEnumValueValid(style as any, WallpaperStyle)) {
            wallGenStyle.set(style as WallpaperStyle);
        }
    };

    const tryParseColoursFromQueryToWallGen = () => {
        const colours = data.searchParams.get("colours");
        if (!colours) return;

        const coloursData = tryParseColours(colours);
        if (!coloursData) return;

        passSomeColourStringsToWallpaperGenerator(coloursData);
        setWallGenColourInUseCount(coloursData.length);
        readjustWallGenColoursInUseCount();
    };

    const tryParseSizeFromQueryToWallGen = () => {
        const width = data.searchParams.get("width");
        const height = data.searchParams.get("height");
        if (!width || !height) return;

        const sizeData = tryParseSize(width, height);
        if (!sizeData) return;

        setWallGenSizeFull(sizeData.width, sizeData.height);
    };

    tryParseStyleFromQueryToWallGen();
    tryParseColoursFromQueryToWallGen();
    tryParseSizeFromQueryToWallGen();

    const allParsers = [
        parseGradient,
        parseSwatch,
        parsePalette,
        parseHorizon,
        parsePopArtSquare,
        parseTwilight,
        parsePieMan,
        parseBaumkuchen,
    ];
    allParsers.forEach((parse) => parse(data.searchParams));
</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio />
