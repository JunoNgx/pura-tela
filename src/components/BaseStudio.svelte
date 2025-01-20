<script lang="ts">
    import BaseColourInput from "src/components/BaseColourInput.svelte";
    import BaseSizeSelect from "src/components/BaseSizeSelect.svelte";
	import { generateImage } from "src/lib/canvas.js";
	import { colourGallery, currHexCode, getCurrSizeOption } from "src/lib/states.svelte.js";
	import { getColourName } from "src/lib/utils.js";

    const handleDownloadClick = () => {
        generateImage({
            width: getCurrSizeOption().width,
            height: getCurrSizeOption().height,
            bgHex: currHexCode.val,
            filename: getColourName(currHexCode.val, colourGallery.val)
        });
    };
</script>

<div class="Studio">
    <div class="Studio__Canvas">
        <!-- <canvas id="PreviewCanvas"></canvas> -->
        <div class="Studio__PreviewBlock"
            style={`background-color: #${currHexCode.val};`} 
        ></div>
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
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
        width: 100%;
        padding: 2rem 0;
    }

    .Studio__Canvas {
        flex-grow: 1;
        max-width: 300px;
    }

    /* .Studio__Control {
    } */

    .Studio__PreviewBlock {
        aspect-ratio: 1;
        height: 100%;
        border: 1px solid var(--colPri);
    }

    .Studio__Buttons {
        display: flex;
        justify-content: flex-start;
        margin-top: 2rem;
    }

    .Studio_DownloadBtn {
        padding: 1rem 2rem;
        display: block;
        width: 100%;
        max-width: 300px;
        color: var(--colBg);
        background-color: var(--colPri);
    }

    .Studio_DownloadBtn:hover {
        color: var(--colPri);
        background-color: var(--colBg);
    }

    @media screen and (width < 600px) {
        .Studio {
            /* flex-wrap: wrap; */
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            padding: 0;
        }

        .Studio__Canvas {
            max-width: none;
            height: 180px;
            width: 100%;
        }

        .Studio__PreviewBlock {
            aspect-ratio: unset;
            width: 100%;
        }

        .Studio__Buttons {
            justify-content: center;
        }
    }

</style>
