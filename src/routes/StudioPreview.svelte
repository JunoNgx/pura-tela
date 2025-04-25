<script lang="ts">
	import Checkbox from "src/components/Checkbox.svelte";

	import { generateImage } from "src/lib/canvas.js";
	import { computeFilename } from "src/lib/utils.js";
	import { colourGallery } from "src/states/colourGalleryState.svelte.js";
	import { getColourStringsInUse, shouldShowSampleText, wallGenStyle } from "src/states/wallGenState.svelte.js";
    
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
</script>

<div class="StudioPreview">
    <div class="StudioPreview__Content"
        id="CanvasContainer"    
    >
        <canvas class="StudioPreview__Canvas"
            id="Canvas"
        ></canvas>

        <div class="StudioPreview__SampleTextContainer"
            class:StudioPreview__SampleTextContainer--IsDisplayed={shouldShowSampleText.val}
        >
            <p class="StudioPreview__SampleText StudioPreview__SampleText--White">
                White text
            </p>
            <p class="StudioPreview__SampleText StudioPreview__SampleText--Black">
                Black text
            </p>
        </div>
    </div>

    <div class="StudioPreview__Footer">
        <div class="StudioPreview__SampleTextSetting">
            <Checkbox
                className="StudioPreview__SampleTextCheckBox"
                domId="shouldShowSampleText"
                label="Show sample texts"
                checked={shouldShowSampleText.val}
                changeHandler={handleCheckboxSwitch}
            />
        </div>

        <button class="StudioPreview__DownloadBtn PriBtn"
            onclick={handleDownloadClick}
            aria-label="Download"
        >
            Download
        </button>
    </div>
</div>

<style>
    .StudioPreview {
        position: sticky;
        top: var(--outerPaddingMobile);
        background-color: var(--colBg);
        z-index: 20;
        /* width: 100%; */
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem;
    }

    .StudioPreview__Content,
    .StudioPreview__SampleTextContainer {
        aspect-ratio: 3/2;
        position: relative;
    }

    .StudioPreview__Content {
        height: auto;
        box-sizing: border-box;
        overflow: hidden;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .StudioPreview__SampleTextContainer {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        display: none;
    }

    .StudioPreview__SampleTextContainer--IsDisplayed {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .StudioPreview__SampleText--White {
        color: var(--colWhite);
    }

    .StudioPreview__SampleText--Black {
        color: var(--colBlack);
    }

    .StudioPreview__Footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.5rem;
        /* text-align: center; */
    }

    .StudioPreview__DownloadBtn {
        /* padding: 1rem 2rem; */
        display: block;
    }

    @media screen and (width < 850px) {
        .StudioPreview__Content,
        .StudioPreview__SampleTextContainer {
            aspect-ratio: 1;
        }
    }
</style>