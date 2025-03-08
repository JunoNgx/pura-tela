<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import BaseSizeSelect from "src/components/BaseSizeSelect.svelte";
	import { generateImage, renderCanvas, refitCanvasToContainer } from "src/lib/canvas.js";
	import { colourGallery, getCurrSizeOption, shouldShowSampleText, currWallpaperMode, getColoursInUse, convertCurrColoursToArrayOfHexStrings, getCurrColourInUseCount, } from "src/lib/states.svelte.js";
	import { computeFilename } from "src/lib/utils.js";
	import BaseModeSelector from "./BaseModeSelector.svelte";
	import BaseColourInputContainer from "./BaseColourInputContainer.svelte";

    const handleDownloadClick = () => {
        const fileName = computeFilename({
            colours: getColoursInUse(),
            gallery: colourGallery.val,
            mode: currWallpaperMode.val,
        });

        generateImage(fileName);
    };

    const handleCheckboxSwitch = () => {
        shouldShowSampleText.set(!shouldShowSampleText.val);
    };

    const handleResize = () => {
        refitCanvasToContainer();
    };

    onMount(() => {
        window.addEventListener("resize", handleResize);
    });

    onDestroy(() => {
        window.removeEventListener("resize", handleResize);
    });

    $effect(() => {
        renderCanvas({
            size: getCurrSizeOption(),
            colours: convertCurrColoursToArrayOfHexStrings(),
            colourCount: getCurrColourInUseCount(),
            mode: currWallpaperMode.val,
        });
    });
</script>

<div class="Studio">
    <h2 class="VisuallyHidden">Create Wallpaper</h2>
    <div class="Studio__ModeContainer">
        <BaseModeSelector/>
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

                <button class="Studio_DownloadBtn"
                    onclick={handleDownloadClick}
                    aria-label="Download"
                >
                    Download
                </button>
            </div>
        </div>

        <div class="Studio__Control">
            <div class="Studio__ColourInputContainer">
                <BaseColourInputContainer />
            </div>
            <div class="Studio__Size">
                <BaseSizeSelect/>
            </div>
        </div>

    </div>
</div>

<style>
    .Studio__Generator {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1.5rem 0;
    }

    .Studio__PreviewContainer {
        position: relative;
        width: 100%;
    }

    .Studio__PreviewBlock {
        aspect-ratio: 3/2;
        height: auto;
        border: 1px solid var(--colPri);
        box-sizing: border-box;
        overflow: hidden;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .Studio__SampleTextContainer {
        aspect-ratio: 1;
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

    /* .Studio__Buttons {
        display: flex;
        justify-content: flex-start;
        margin-top: 3rem;
    } */

    .Studio_DownloadBtn {
        padding: 1rem 2rem;
        display: block;
        color: var(--colPri);
        background-color: var(--colBrand1);
        border-color: var(--colBrand1);
    }

    .Studio_DownloadBtn:hover {
        color: var(--colBg);
        background-color: var(--colPri);
        border-color: var(--colBg);
    }

    @media screen and (width < 850px) {
        .Studio__Generator {
            padding: 1.5rem 0;
            gap: 4rem;
        }

        .Studio__PreviewContainer {
            /* max-width: none; */
            /* height: 180px; */
            /* width: 100%; */
        }

        .Studio__PreviewBlock {
            aspect-ratio: 7/8;
            /* height: 180px; */
        }
        
        /* .Studio__SampleTextContainer {
            height: 100%;
            font-size: var(--fontSizeSm);
        } */

        /* .Studio__Buttons {
            justify-content: center;
        } */
    }

</style>
