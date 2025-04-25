<script lang="ts">
    import MaterialSymbolsLightKeyboardArrowUp from "~icons/material-symbols-light/keyboard-arrow-up";

	import Checkbox from "src/components/Checkbox.svelte";

	import { generateImage } from "src/lib/canvas.js";
	import { computeFilename } from "src/lib/utils.js";
	import { colourGallery } from "src/states/colourGalleryState.svelte.js";
	import { getColourStringsInUse, shouldShowSampleText, wallGenStyle } from "src/states/wallGenState.svelte.js";

    let isExpanded = $state(true);
    let containerEl: HTMLElement;

    const toggleExpanded = () => {
        if (isExpanded) collapse()
        else expand();
    };

    // All these lengthy logic to transition `height: auto`
    const expand = () => {
        isExpanded = true;

        containerEl.style.height = "auto";
        // const targetHeight = containerEl.scrollHeight;
        const computedStyle = window.getComputedStyle(containerEl);
        const targetHeight = parseFloat(computedStyle.height);
        containerEl.style.height = "2rem";
        containerEl.offsetHeight;
        containerEl.style.height = `${targetHeight}px`;

        containerEl.addEventListener('transitionend', function transitionEndHandler() {
            containerEl.style.height = "auto";
            containerEl.removeEventListener('transitionend', transitionEndHandler);
        });
    };

    const collapse = () => {
        isExpanded = false;

        const computedStyle = window.getComputedStyle(containerEl);
        const targetHeight = parseFloat(computedStyle.height);
        console.log("collapse", targetHeight)
        containerEl.style.height = `${targetHeight}px`;
        containerEl.offsetHeight;
        containerEl.style.height = "2rem";
    };
    
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

<div class="StudioPreview"
    class:StudioPreview--IsExpanded={isExpanded}
    bind:this={containerEl}
>
    <button class="StudioPreview__ToggleExpandBtn"
        title={isExpanded ? "Collapse the preview panel" : "Expand the preview panel"}
        aria-label={isExpanded ? "Collapse the preview panel" : "Expand the preview panel"}
        onclick={toggleExpanded}
    >
        <h3 class="StudioPreview__Title">
            Preview
        </h3>

        <div class="StudioPreview__ExpandedIcon">
            <MaterialSymbolsLightKeyboardArrowUp/>
        </div>
    </button>

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
        overflow: hidden;
        transition: height ease-in-out var(--transTime);

        /* display: flex;
        flex-direction: column;
        align-items: stretch; */
    }

    .StudioPreview__ToggleExpandBtn {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 0.5rem;
        border: none;
        padding: 0;
    }

    .StudioPreview__ToggleExpandBtn,
    .StudioPreview__ToggleExpandBtn:hover {
        color: var(--colPri);
        background-color: var(--colBg);
    }

    .StudioPreview__Title {
        font-size: var(--fontSizeMd);
        /* text-transform: lowercase; */
        font-weight: 400;
        margin: 0 0 0 0.5rem;
    }

    .StudioPreview__ExpandedIcon {
        font-size: 1.5rem;
        line-height: 1.5rem;
        transition: rotate ease-in-out var(--transTime);
    }

    .StudioPreview__Content,
    .StudioPreview__SampleTextContainer {
        position: relative;
        width: 100%;
        max-height: 45vh;
        transition: opacity ease-in-out var(--transTime);
    }

    .StudioPreview__Content {
        /* flex-grow: 3; */

        height: auto;
        box-sizing: border-box;
        overflow: hidden;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .StudioPreview__SampleTextContainer {
        height: 100%;
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
        transition: opacity ease-in-out var(--transTime);
    }

    .StudioPreview__DownloadBtn {
        /* padding: 1rem 2rem; */
        display: block;
    }
/* 
    .StudioPreview:not(.StudioPreview--IsExpanded) {
        height: 2rem;
    }

    .StudioPreview.StudioPreview--IsExpanded {
        height: 50vh;
    } */

    .StudioPreview--IsExpanded .StudioPreview__ExpandedIcon {
        rotate: 180deg;
    }

    .StudioPreview:not(.StudioPreview--IsExpanded) .StudioPreview__Content {
        opacity: 0;
    }
    
    .StudioPreview:not(.StudioPreview--IsExpanded) .StudioPreview__Footer {
        opacity: 0;
    }
</style>