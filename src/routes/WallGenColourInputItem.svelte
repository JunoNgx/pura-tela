<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    
    import MaterialSymbolsLightDragIndicator from "~icons/material-symbols-light/drag-indicator";
    import MaterialSymbolsLightRemove from "~icons/material-symbols-light/remove";
    import MaterialSymbolsLightShuffle from "~icons/material-symbols-light/shuffle";
    import MaterialSymbolsLightSaveOutline from "~icons/material-symbols-light/save-outline";
    
	import { isHexCodeValid, getRandomHexCode } from 'src/lib/utils.js';
	import { promptAddToColourGallery } from 'src/states/colourGalleryState.svelte.js';
	import { decreaseWallGenColourInUseCount, getCurrWallStyleInfo, getWallGenColourInUseCount, retractWallGenColoursById, setWallGenColoursAtIndex } from 'src/states/wallGenState.svelte.js';
	import type { ColObj } from 'src/lib/types.js';

    type ColourInputItemProps = {
        colourObj: ColObj,
        index: number,
        swapyItemId: string,
    };

    let { colourObj, index, swapyItemId }: ColourInputItemProps = $props();

    let colourCodeWithHash = $derived("#" + colourObj?.colour);

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

    const handleRemoveColour = () => {
        retractWallGenColoursById(colourObj.id);
        decreaseWallGenColourInUseCount();
    };
</script>

<div class="ColourInput"
    data-swapy-item={swapyItemId}
>
    <div class="ColourInput__LeftSide">
        {#if getWallGenColourInUseCount() >= 2}
            <div class="ColourInput__DragHandle"
                data-swapy-handle
            >
                <MaterialSymbolsLightDragIndicator />
            </div>
        {/if}
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
        {colourObj.id}
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
                value={colourObj?.colour}
                oninput={e => handleHexCodeChange((e.target as HTMLInputElement).value)}
            />
        </div>
    </div>

    <div class="ColourInput__Buttons">
        <button class="ColourInput__ColourActionBtn IconButtonWithLabel"
            onclick={handleRandomise}
            title="Generate a randomised colour"
            aria-label="Create a random colour"
        >
            <MaterialSymbolsLightShuffle />
            <span class="ColourInput__BtnLabelText">Randomise</span>
        </button>
        <button class="ColourInput__ColourActionBtn IconButtonWithLabel"
            onclick={trySaveColour}
            title="Save colour to gallery"
            aria-label="Save colour to gallery"
        >
            <MaterialSymbolsLightSaveOutline/>
            <span class="ColourInput__BtnLabelText">Save</span>
        </button>

        {#if getWallGenColourInUseCount() > getCurrWallStyleInfo().minColourCount}
            <button class="ColourInput__RemoveBtn IconButton"
                title="Remove this colour"
                aria-label="Remove this colour"
                onclick={handleRemoveColour}
            >
                <MaterialSymbolsLightRemove />
            </button>
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
    }

    :global(.ColourInput__IsDragged) {
        .ColourInput__Buttons {
            display: none;
        }
    }

    .ColourInput__LeftSide {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .ColourInput__DragHandle {
        cursor: grab;
    }

    .ColourInput__HexInputContainer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .ColourInput__HexInput {
        width: 6rem;
    }

    .ColourInput__Buttons {
        display: flex;
        justify-content: flex-end;
        flex-wrap: nowrap;
        gap: 1rem;
    }

    .ColourInput__RemoveBtn {
        color: var(--colDanger);
    }

    @media screen and (width <= 500px) {

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