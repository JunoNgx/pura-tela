<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { renderCanvas, refitCanvasToContainer } from "src/lib/canvas.js";
	import { computeBaseUrl } from "src/lib/utils.js";
	import { getHexColourCodesInUse, wallGenStyle, wallGenSize, readjustWallGenColoursInUseCount, getColourStringsInUse, getStyleConfig } from "src/states/wallGenState.svelte.js";
    
	import StyleConfigContainer from "src/routes/StyleConfigContainer.svelte";
	import WallGenColourInputList from "./WallGenColourInputList.svelte";
    import SizeInput from "src/routes/SizeInput.svelte";
	import SharePanel from "src/components/SharePanel.svelte";
	import { WallpaperStyle } from "src/lib/types.js";
	import { gradientStyleConfig } from "src/states/wallGenStyleConfigGradientState.svelte.js";
	import { colourSwatchStyleConfig } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
	import { paletteStyleConfig } from "src/states/wallGenStyleConfigPaletteState.svelte.js";
	import StudioPreview from "./StudioPreview.svelte";

    const handleResize = () => {
        refitCanvasToContainer();
    };

    const computeShareableUrl = () => {
        const url = new URL(computeBaseUrl());
        url.searchParams.append("style", wallGenStyle.val);
        url.searchParams.append("colours", getColourStringsInUse().toString());
        url.searchParams.append("width", wallGenSize.val.width.toString());
        url.searchParams.append("height", wallGenSize.val.height.toString());

        switch (wallGenStyle.val) {
        case WallpaperStyle.GRADIENT:
            url.searchParams.append("gradientAngle", gradientStyleConfig.val.angleInDeg.toString());
            break;
        case WallpaperStyle.COLOUR_SWATCH:
            url.searchParams.append("swatchPosX", colourSwatchStyleConfig.val.positionX.toString());
            url.searchParams.append("swatchPosY", colourSwatchStyleConfig.val.positionY.toString());
            url.searchParams.append("swatchDirection", colourSwatchStyleConfig.val.direction);
            url.searchParams.append("swatchItemShape", colourSwatchStyleConfig.val.itemShape);
            url.searchParams.append("swatchItemSize", colourSwatchStyleConfig.val.itemSize.toString());
            url.searchParams.append("swatchItemSpacing", colourSwatchStyleConfig.val.itemSpacing.toString());
            break;
        case WallpaperStyle.PALETTE:
            url.searchParams.append("paletteAngle", paletteStyleConfig.val.angleInDeg.toString());
            url.searchParams.append("paletteSize", paletteStyleConfig.val.size.toString());
            url.searchParams.append("palettePosition", paletteStyleConfig.val.position.toString());
            break;
        }

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
    <div class="Studio__ModeContainer">
        <StyleConfigContainer/>
    </div>
    <div class="Studio__Generator">
        <StudioPreview />

        <div class="Studio__Control">
            <div class="Studio__ColourInputContainer">
                <WallGenColourInputList />
            </div>
            <div class="Studio__Size">
                <SizeInput/>
            </div>
        </div>

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
                shareText: "Check out this custom wallpaper I made in Pura Tela:",
            },
        ]}
    />
</div>

<style>
    .Studio__Generator {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 0 0;
    }

    .Studio__Control {
        flex-grow: 1;
    }

    .Studio__Size {
        margin-top: 3rem;
    }

    @media screen and (width < 850px) {
        .Studio__Generator {
            padding: 1.5rem 0;
            gap: 4rem;
        }
    }

</style>
