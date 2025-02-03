<script lang="ts">
	import { onDestroy, onMount } from "svelte";
    import BaseSolidColourInput from "src/components/BaseSolidColourInput.svelte";
    import BaseSizeSelect from "src/components/BaseSizeSelect.svelte";
	import { generateImage, renderCanvas, refitCanvasToContainer } from "src/lib/canvas.js";
	import { colourGallery, getSolidColour, getCurrSizeOption, shouldShowSampleText, isSolidMode, currWallpaperMode, currColours, currColoursAsHexCodes } from "src/lib/states.svelte.js";
	import { getColourName } from "src/lib/utils.js";
	import BaseModeSelector from "./BaseModeSelector.svelte";
	import BaseGradientColourInput from "./BaseGradientColourInput.svelte";

    const handleDownloadClick = () => {
        generateImage(getColourName(getSolidColour(), colourGallery.val));
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
            colours: currColoursAsHexCodes(),
            mode: currWallpaperMode.val,
        });
    });
</script>

<div class="Studio">
    <div class="Studio__ModeContainer">
        <BaseModeSelector/>
    </div>
    <div class="Studio__Bottom">
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
        </div>
        <div class="Studio__Control">
            <div class="Studio__Colour">
                {#if isSolidMode()}
                    <BaseSolidColourInput/>
                {:else}
                    <BaseGradientColourInput/>
                {/if}
            </div>
            <div class="Studio__Size">
                <BaseSizeSelect/>
            </div>
            <div class="Studio__Buttons">
                <button class="Studio_DownloadBtn"
                    onclick={handleDownloadClick}
                    aria-label="Download"
                >
                    Download
                </button>
            </div>
        </div>

    </div>
</div>

<style>
    .Studio__Bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
        padding: 1.5rem 0;
    }

    .Studio__PreviewContainer {
        flex-grow: 1;
        max-width: 350px;
        position: relative;
    }

    .Studio__PreviewBlock {
        aspect-ratio: 1;
        width: 100%;
        height: auto;
        border: 1px solid var(--colPri);
        box-sizing: border-box;

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
        padding-top: 1rem;
        text-align: center;
    }

    .Studio__Control {
        flex-grow: 1;
    }

    .Studio__Size {
        margin-top: 3rem;
    }

    .Studio__Buttons {
        display: flex;
        justify-content: flex-start;
        margin-top: 3rem;
    }

    .Studio_DownloadBtn {
        padding: 1rem 2rem;
        display: block;
        width: 100%;
        color: var(--colBg);
        background-color: var(--colPri);
    }

    .Studio_DownloadBtn:hover {
        color: var(--colPri);
        background-color: var(--colBg);
    }

    @media screen and (width < 600px) {
        .Studio__Bottom {
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 1.5rem 0;
            gap: 4rem;
        }

        .Studio__PreviewContainer {
            max-width: none;
            height: 180px;
            width: 100%;
        }

        .Studio__PreviewBlock {
            aspect-ratio: unset;
            height: 180px;
        }
        
        .Studio__SampleTextContainer {
            height: 100%;
            font-size: var(--fontSizeSm);
        }

        .Studio__Buttons {
            justify-content: center;
        }
    }

</style>
