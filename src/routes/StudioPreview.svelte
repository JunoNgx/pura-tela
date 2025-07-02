<script lang="ts">
    import MaterialSymbolsKeyboardArrowDown from "~icons/material-symbols/keyboard-arrow-down";

    import Checkbox from "src/components/Checkbox.svelte";

    import { generateImage } from "src/lib/canvas.js";
    import { computeFilename } from "src/lib/utils.js";
    import { colourGallery } from "src/states/colourGalleryState.svelte.js";
    import {
        getColourStringsInUse,
        shouldShowSampleText,
        wallGenStyle,
    } from "src/states/wallGenState.svelte.js";

    let isExpanded = $state(true);
    let containerEl: HTMLElement;

    const toggleExpanded = () => {
        if (isExpanded) collapse();
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

        containerEl.addEventListener(
            "transitionend",
            function transitionEndHandler() {
                containerEl.style.height = "auto";
                containerEl.removeEventListener(
                    "transitionend",
                    transitionEndHandler
                );
            }
        );
    };

    const collapse = () => {
        isExpanded = false;

        const computedStyle = window.getComputedStyle(containerEl);
        const targetHeight = parseFloat(computedStyle.height);
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

<div
    class="StudioPreview"
    class:StudioPreview--IsExpanded={isExpanded}
    bind:this={containerEl}
>
    <button
        class="StudioPreview__ToggleExpandBtn"
        title={isExpanded
            ? "Collapse the preview panel"
            : "Expand the preview panel"}
        aria-label={isExpanded
            ? "Collapse the preview panel"
            : "Expand the preview panel"}
        onclick={toggleExpanded}
    >
        <h3 class="StudioPreview__Title">Preview</h3>

        <div class="StudioPreview__ExpandedIcon">
            <MaterialSymbolsKeyboardArrowDown />
        </div>
    </button>

    <div class="StudioPreview__Content" id="CanvasContainer">
        <canvas class="StudioPreview__Canvas" id="Canvas"></canvas>

        <div
            class="StudioPreview__SampleTextContainer"
            class:StudioPreview__SampleTextContainer--IsDisplayed={shouldShowSampleText.val}
        >
            <p
                class="StudioPreview__SampleText StudioPreview__SampleText--White"
            >
                White text
            </p>
            <p
                class="StudioPreview__SampleText StudioPreview__SampleText--Black"
            >
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

        <button
            class="StudioPreview__DownloadBtn PriBtn"
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
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem;
        overflow: hidden;
        transition: height ease-in-out var(--transTime);
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
        font-weight: 400;
        margin: 0 0 0 0.5rem;
    }

    .StudioPreview__ExpandedIcon {
        display: grid;
        place-items: center;
        font-size: 1.5rem;
        transition: rotate ease-in-out var(--transTime);
    }

    .StudioPreview__Content,
    .StudioPreview__SampleTextContainer {
        position: relative;
        width: 100%;
        max-height: 40vh;
        transition: opacity ease-in-out var(--transTime);
    }

    .StudioPreview__Content {
        height: auto;
        box-sizing: border-box;
        overflow: hidden;
        display: grid;
        place-items: center;
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
        margin-top: 1rem;
        /* text-align: center; */
        transition: opacity ease-in-out var(--transTime);
    }

    .StudioPreview__DownloadBtn {
        /* padding: 1rem 2rem; */
        display: block;
    }

    .StudioPreview--IsExpanded .StudioPreview__ExpandedIcon {
        rotate: 180deg;
    }

    .StudioPreview:not(.StudioPreview--IsExpanded) .StudioPreview__Content {
        opacity: 0;
    }

    .StudioPreview:not(.StudioPreview--IsExpanded) .StudioPreview__Footer {
        opacity: 0;
    }

    @media screen and (width < 850px) {
        .StudioPreview__Content,
        .StudioPreview__SampleTextContainer {
            max-height: 30vh;
        }
    }
</style>
