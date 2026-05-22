<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { renderCanvas, refitCanvasToContainer } from "src/lib/canvas.js";
    import { computeBaseUrl } from "src/lib/utils.js";
    import {
        getHexColourCodesInUse,
        wallGenStyle,
        wallGenSize,
        readjustWallGenColoursInUseCount,
        getColourStringsInUse,
        getStyleConfig,
    } from "src/states/wallGenState.svelte.js";

    import StyleConfigContainer from "src/routes/StyleConfigContainer.svelte";
    import WallGenColourInputList from "./WallGenColourInputList.svelte";
    import SizeInput from "src/routes/SizeInput.svelte";
    import SharePanel from "src/components/SharePanel.svelte";
    import { WallpaperStyle } from "src/lib/types.js";
    import { appendToUrl as gradientAppendToUrl } from "src/states/wallGenStyleConfigGradientState.svelte.js";
    import { appendToUrl as swatchAppendToUrl } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
    import { appendToUrl as paletteAppendToUrl } from "src/states/wallGenStyleConfigPaletteState.svelte.js";
    import { appendToUrl as horizonAppendToUrl } from "src/states/wallGenStyleConfigHorizonState.svelte.js";
    import { appendToUrl as popArtSquareAppendToUrl } from "src/states/wallGenStyleConfigPopArtSquareState.svelte.js";
    import { appendToUrl as twilightAppendToUrl } from "src/states/wallGenStyleConfigTwilightState.svelte.js";
    import { appendToUrl as pieManAppendToUrl } from "src/states/wallGenStyleConfigPieManState.svelte.js";
    import { appendToUrl as baumkuchenAppendToUrl } from "src/states/wallGenStyleConfigBaumkuchenState.svelte.js";
    import StudioPreview from "./StudioPreview.svelte";

    const handleResize = () => {
        refitCanvasToContainer();
    };

    const urlAppenders: Partial<Record<WallpaperStyle, (url: URL) => void>> = {
        [WallpaperStyle.GRADIENT]: gradientAppendToUrl,
        [WallpaperStyle.COLOUR_SWATCH]: swatchAppendToUrl,
        [WallpaperStyle.PALETTE]: paletteAppendToUrl,
        [WallpaperStyle.HORIZON]: horizonAppendToUrl,
        [WallpaperStyle.POP_ART_SQUARE]: popArtSquareAppendToUrl,
        [WallpaperStyle.TWILIGHT]: twilightAppendToUrl,
        [WallpaperStyle.PIE_MAN]: pieManAppendToUrl,
        [WallpaperStyle.BAUMKUCHEN]: baumkuchenAppendToUrl,
    };

    const computeShareableUrl = () => {
        const url = new URL(computeBaseUrl());
        url.searchParams.append("style", wallGenStyle.val);
        url.searchParams.append("colours", getColourStringsInUse().toString());
        url.searchParams.append("width", wallGenSize.val.width.toString());
        url.searchParams.append("height", wallGenSize.val.height.toString());
        urlAppenders[wallGenStyle.val]?.(url);
        return url.toString();
    };

    onMount(() => {
        window.addEventListener("resize", handleResize);
        readjustWallGenColoursInUseCount();
    });

    onDestroy(() => {
        window.removeEventListener("resize", handleResize);
    });

    $effect(() => {
        renderCanvas({
            size: wallGenSize.val,
            colours: getHexColourCodesInUse(),
            style: wallGenStyle.val,
            config: getStyleConfig(),
        });
    });
</script>

<div class="Studio">
    <h2 class="VisuallyHidden">Generate Wallpaper</h2>

    <StudioPreview />

    <div class="Studio__ModeContainer">
        <StyleConfigContainer />
    </div>
    <div class="Studio__ColourInputContainer">
        <WallGenColourInputList />
    </div>
    <div class="Studio__Size">
        <SizeInput />
    </div>

    <SharePanel
        domId="ShareWallpaper"
        title="Share this wallpaper"
        desc="Save this as a bookmark, or share your creation with someone. Access this url to retrieve the current wallpaper settings."
        shareItemList={[
            {
                label: "Direct link",
                content: computeShareableUrl(),
                shareTitle: "Wallpaper from Pura Tela",
                shareText:
                    "Check out this custom wallpaper I made in Pura Tela:",
            },
        ]}
    />
</div>

<style>
    .Studio {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
</style>
