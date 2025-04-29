<script lang="ts">
    import { dragHandle } from "svelte-dnd-action";
    import ColorPicker from "svelte-awesome-color-picker";
    import type { ColObj } from "src/lib/types.js";
    
    import MaterialSymbolsDragIndicator from "~icons/material-symbols/drag-indicator";
    import MaterialSymbolsShuffle from "~icons/material-symbols/shuffle";
    import MaterialSymbolsSaveOutlineSharp from "~icons/material-symbols/save-outline-sharp";
    
    import { isHexCodeValid, getRandomHexCode } from "src/lib/utils.js";
    import { promptAddToColourGallery } from "src/states/colourGalleryState.svelte.js";
    import { getWallGenColourInUseCount, setWallGenColoursAtIndex } from "src/states/wallGenState.svelte.js";

    type ColourInputItemProps = {
        colourObj: ColObj,
        index: number,
    };

    let { colourObj, index }: ColourInputItemProps = $props();

    let colourCodeWithHash = $derived("#" + colourObj.colour);

    const handlePickerValueChange = (hexStr: string) => {
        setWallGenColoursAtIndex(index, hexStr.replace("#", "").toUpperCase());
    };

    const handleHexCodeChange = (hexStr: string) => {
        if (!isHexCodeValid(hexStr)) return;
        setWallGenColoursAtIndex(index, hexStr.replace("#", "").toUpperCase());
    };

    const handleRandomise = () => {
        setWallGenColoursAtIndex(index, getRandomHexCode());
    };

    const trySaveColour = () => {
        promptAddToColourGallery(colourObj.colour);
    };

    const isColourInUse = $derived(index <= getWallGenColourInUseCount() - 1);
</script>

<div class="ColourInput">
    <div class="ColourInput__LeftSide">
        <div class="ColourInput__DragHandle"
            aria-label="drag-handle for colour at position {index}"
            use:dragHandle
        >
            <MaterialSymbolsDragIndicator />
        </div>
        <div class="ColourInput__Picker">
            <ColorPicker
                label=""
                texts={{
                    changeTo: "to",
                }}
                hex={colourCodeWithHash}
                isAlpha={false}
                position="responsive"
                on:input={e => { 
                    // TODO: find out how to import this type and implement this separately in `<script>`
                    handlePickerValueChange(e.detail.hex as string);
                }}
            />
        </div>
        <div class="ColourInput__HexInputContainer">
            <label class="ColourInput__HexLabel"
                for="hexCode"
                aria-label="Hex colour code"
            >
                #
            </label>
            <input class="ColourInput__HexInput"
                id="hexCode"
                name="hexCode"
                type="text"
                minlength="3"
                maxlength="6"
                spellcheck="false"
                title="Requires a valid hex code"
                value={colourObj.colour}
                oninput={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
            />
        </div>
    </div>

    <div class="ColourInput__RightSide">
        {#if isColourInUse}
            <button class="ColourInput__ColourActionBtn IconButtonWithLabel"
                onclick={handleRandomise}
                title="Generate a randomised colour"
                aria-label="Create a random colour"
            >
                <MaterialSymbolsShuffle />
                <span class="ColourInput__BtnLabelText">Randomise</span>
            </button>
            <button class="ColourInput__ColourActionBtn IconButtonWithLabel"
                onclick={trySaveColour}
                title="Save colour to gallery"
                aria-label="Save colour to gallery"
            >
                <MaterialSymbolsSaveOutlineSharp />
                <span class="ColourInput__BtnLabelText">Save</span>
            </button>
        {:else}
            <span class="ColourInput__NotInUseNotice">Not in use</span>
        {/if}
    </div>
</div>

<style>
    .ColourInput {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        height: var(--colourInputItemHeight);
        padding: 0 0.5rem 0 1rem;
    }

    :global(.ColourInput__IsDragged) {
        .ColourInput__RightSide {
            display: none;
        }
    }

    .ColourInput__LeftSide {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .ColourInput__DragHandle {
        cursor: grab;
        display: grid;
        place-items: center;
    }

    :global(.ColourInput__Picker .color-picker label) {
        border: 1px solid var(--colPri);
        border-radius: 0;
    }

    .ColourInput__HexInputContainer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .ColourInput__HexInput {
        width: 6rem;
    }

    .ColourInput__RightSide {
        display: flex;
        justify-content: flex-end;
        flex-wrap: nowrap;
        gap: 1rem;
    }

    .ColourInput__NotInUseNotice {
        text-align: left;
        color: var(--colSec);
        text-transform: lowercase;
    }

    @media screen and (width <= 650px) {

        .ColourInput__LeftSide {
            gap: 0.5rem;
        }

        .ColourInput__HexInput {
            width: 4rem;
        }

        .ColourInput__ColourActionBtn {
            padding: 0.5rem;
        }

        .ColourInput__BtnLabelText {
            display: none;
        }
    }
</style>
