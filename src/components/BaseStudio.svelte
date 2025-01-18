<script lang="ts">
    import BaseColourInput from "src/components/BaseColourInput.svelte";
    import BaseDimensionsSelection from "src/components/BaseDimensionsSelection.svelte";
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
            <BaseDimensionsSelection/>
        </div>
        <div class="Studio__Buttons">
            <button on:click={handleDownloadClick}>
                download
            </button>
        </div>
    </div>
</div>

<style>
    .Studio {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        gap: 16px;
    }

    .Studio__Canvas {
        flex-grow: 1;
        /* background-color: aqua; */
    }

    .Studio__Control {
        flex-grow: 1;
    }

    .Studio__PreviewBlock {
        aspect-ratio: 1/1;
        height: 100%;
        border: 1px solid #000;
    }
</style>
