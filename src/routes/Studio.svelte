<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { generateImage, renderCanvas, refitCanvasToContainer } from "src/lib/canvas.js";
	import { computeFilename } from "src/lib/utils.js";
	import { getHexColourCodesInUse, shouldShowSampleText, wallGenStyle, wallGenSize, readjustWallGenColoursInUseCount, getColourStringsInUse, getStyleConfig } from "src/states/wallGenState.svelte.js";
	import { colourGallery } from "src/states/colourGalleryState.svelte.js";
    
	import StyleConfigContainer from "src/routes/StyleConfigContainer.svelte";
	import WallGenColourInputList from "./WallGenColourInputList.svelte";
    import SizeInput from "src/routes/SizeInput.svelte";
	import SharePanel from "src/components/SharePanel.svelte";
	import { page } from "$app/state";
	import { WallpaperStyle } from "src/lib/types.js";
	import { gradientStyleConfig } from "src/states/wallGenStyleConfigGradientState.svelte.js";
	import { colourSwatchStyleConfig } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";
    
    const handleDownloadClick = () => {
        const fileName = computeFilename({
            colours: getColourStringsInUse(),
            gallery: colourGallery.val,
            mode: wallGenStyle.val,
        });

        generateImage(fileName);
    };

    const handleCheckboxSwitch = () => {
        shouldShowSampleText.set(!shouldShowSampleText.val);
    };

    const handleResize = () => {
        refitCanvasToContainer();
    };

    const computeBaseUrl = () => {
        const topLevelDomain = page.url.hostname;

        if (topLevelDomain === "localhost") {
            return `http://localhost:${page.url.port}`
        } else return `https://${topLevelDomain}`;
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
    <h2 class="VisuallyHidden">Create Wallpaper</h2>
    <div class="Studio__ModeContainer">
        <StyleConfigContainer/>
    </div>
    <div class="Studio__Generator">
        <div class="Studio__PreviewContainer">
            <div class="Studio__PreviewBlock"
                id="CanvasContainer"    
            >
                <canvas class="Studio__Canvas"
                    id="Canvas"
                ></canvas>
                <div class="Studio__SampleTextContainer"
                    class:Studio__SampleTextContainer--IsDisplayed={shouldShowSampleText.val}
                >
                    <p class="Studio__SampleText Studio__SampleText--White">
                        White text
                    </p>
                    <p class="Studio__SampleText Studio__SampleText--Black">
                        Black text
                    </p>
                </div>
            </div>

            <div class="Studio__PreviewSettings">
                <div class="Studio__SampleTextSetting">
                    <input class="Studio__SampleTextCheckBox"
                        id="shouldShowSampleText"
                        type=checkbox
                        checked={shouldShowSampleText.val}
                        onclick={handleCheckboxSwitch}
                    >
                    <label class="Studio__SampleTextLabel"
                        for="shouldShowSampleText"
                    >
                        Show sample texts
                    </label>
                </div>

                <button class="Studio_DownloadBtn PriBtn"
                    onclick={handleDownloadClick}
                    aria-label="Download"
                >
                    Download
                </button>
            </div>
        </div>

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
        title="Share this wallpaper"
        desc="Save this as a bookmark, or share your creation with someone. Access this url to retrieve the current wallpaper settings."
        shareTitle="Wallpaper from Pura Tela"
        shareText="Check out this custom wallpaper I made in Pura Tela:"
        shareContent={computeShareableUrl()}
    />
</div>

<style>
    .Studio__Generator {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 0 0;
    }

    .Studio__PreviewContainer {
        position: relative;
        width: 100%;
    }

    .Studio__PreviewBlock,
    .Studio__SampleTextContainer {
        aspect-ratio: 3/2;
    }

    .Studio__PreviewBlock {
        height: auto;
        border: var(--lineWeight) solid var(--colPri);
        box-sizing: border-box;
        overflow: hidden;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .Studio__SampleTextContainer {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        display: none;
    }

    .Studio__SampleTextContainer--IsDisplayed {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .Studio__SampleText--White {
        color: var(--colWhite);
    }

    .Studio__SampleText--Black {
        color: var(--colBlack);
    }

    .Studio__SampleTextCheckBox {
        margin-left: 0;
    }

    .Studio__PreviewSettings {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        /* text-align: center; */
    }

    .Studio__Control {
        flex-grow: 1;
    }

    .Studio__Size {
        margin-top: 3rem;
    }

    .Studio_DownloadBtn {
        padding: 1rem 2rem;
        display: block;
    }

    @media screen and (width < 850px) {
        .Studio__Generator {
            padding: 1.5rem 0;
            gap: 4rem;
        }

        .Studio__PreviewBlock,
        .Studio__SampleTextContainer {
            aspect-ratio: 1;
        }
    }

</style>
