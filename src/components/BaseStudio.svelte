<script lang="ts">
    import BaseColourInput from "src/components/BaseColourInput.svelte";
    import BaseSizeSelect from "src/components/BaseSizeSelect.svelte";
	import { generateImage } from "src/lib/canvas.js";
	import { colourGallery, currHexCode, getCurrSizeOption, shouldShowSampleText } from "src/lib/states.svelte.js";
	import { getColourName } from "src/lib/utils.js";

    const handleDownloadClick = () => {
        generateImage({
            width: getCurrSizeOption().width,
            height: getCurrSizeOption().height,
            bgHex: currHexCode.val,
            filename: getColourName(currHexCode.val, colourGallery.val)
        });
    };

    const handleCheckboxSwitch = () => {
        shouldShowSampleText.set(!shouldShowSampleText.val);
    };
</script>

<div class="Studio">
    <div class="Studio__Canvas">
        <!-- <canvas id="PreviewCanvas"></canvas> -->
        <div class="Studio__PreviewBlock"
            style={`background-color: #${currHexCode.val};`}
        >
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
            <BaseColourInput/>
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

<style>
    .Studio {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 3rem;
        width: 100%;
        padding: 1.5rem 0;
    }

    .Studio__Canvas {
        flex-grow: 1;
        max-width: 350px;
        position: relative;
    }

    .Studio__PreviewBlock {
        aspect-ratio: 1;
        border: 1px solid var(--colPri);
        box-sizing: border-box;
    }

    .Studio__PreviewSettings {
        padding-top: 1rem;
        text-align: center;
    }

    .Studio__SampleTextContainer {
        width: 100%;
        /* Height doesn't fully match up, because parent also containts the checkbox */
        height: 88%;
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
        .Studio {
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 1.5rem 0;
            gap: 4rem;
        }

        .Studio__Canvas {
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
        }

        .Studio__Buttons {
            justify-content: center;
        }
    }

</style>
