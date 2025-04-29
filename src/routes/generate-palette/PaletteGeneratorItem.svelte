<script lang="ts">
    import { dragHandle } from "svelte-dnd-action";
    import ColorPicker from "svelte-awesome-color-picker";

    import type { PalGenColObj } from "src/lib/types.js";
    import { MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";

    import MaterialSymbolsLightDragIndicator from "~icons/material-symbols-light/drag-indicator";
    import MaterialSymbolsLightLockOpenRightOutlineSharp from "~icons/material-symbols-light/lock-open-right-outline-sharp";
    import MaterialSymbolsLightLockOpenRightSharp from "~icons/material-symbols-light/lock-open-right-sharp";
    import MaterialSymbolsLightLockSharp from "~icons/material-symbols-light/lock-sharp";
    import MaterialSymbolsLightLockOutlineSharp from "~icons/material-symbols-light/lock-outline-sharp";
    import MaterialSymbolsLightDeleteForeverSharp from "~icons/material-symbols-light/delete-forever-sharp";
    import MaterialSymbolsLightDeleteForeverOutlineSharp from "~icons/material-symbols-light/delete-forever-outline-sharp";

    import { palGenColours, removePalGenColoursLockAtIndex, setPalGenColoursHexAtIndex, togglePalGenColoursLockAtIndex } from "src/states/palGenState.svelte.js";

    type PaletteGeneratorItemProps = {
        palGenItem: PalGenColObj,
        index: number,
    };

    let { palGenItem, index }: PaletteGeneratorItemProps = $props();

    const toggleLockColour = () => {
        togglePalGenColoursLockAtIndex(index);
    };

    const removeColour = () => {
        removePalGenColoursLockAtIndex(index);
    };

    const handlePickerValueChange = (hexStr: string) => {
        setPalGenColoursHexAtIndex(index, hexStr.replace("#", "").toUpperCase());
    };

</script>

<div class="PalGenItem"
    style={`background-color: #${palGenItem.colour}`}
>
    <div class="PalGenItem__HexCode">
        {palGenItem.colour}
    </div>

    <div class="PalGenItem__ActionBtn PalGenItem__ActionPanel">
        <div class="PalGenItem__DragHandle IconButton"
            aria-label="drag-handle for colour at index {index}"
            use:dragHandle
        >
            <MaterialSymbolsLightDragIndicator />
        </div>

        <div class="PalGenItem__PickerContainer">
            <ColorPicker
                label=""
                texts={{
                    changeTo: "to",
                }}
                hex={`#${palGenItem.colour}`}
                isAlpha={false}
                position="responsive"
                on:input={e => { 
                    handlePickerValueChange(e.detail.hex as string);
                }}
                --input-size="18px"
            />
        </div>

        {#if palGenItem.isLocked}
            <button class="PalGenItem__ActionBtn IconButton"
                onclick={toggleLockColour}
                title={"Unlock colour"}
                aria-label={"Unlock colour"}
            >
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightLockOutlineSharp/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightLockSharp/>
                </div>
            </button>
        {:else}
            <button class="PalGenItem__ActionBtn IconButton"
                onclick={toggleLockColour}
                title={"Lock colour"}
                aria-label={"Lock colour"}
            >
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightLockOpenRightOutlineSharp/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightLockOpenRightSharp/>
                </div>
            </button>
        {/if}

        <button class="PalGenItem__ActionBtn IconButton"
            disabled={palGenColours.val.length <= MIN_COLOUR_COUNT_PALETTE}
            onclick={removeColour}
            title={"Remove colour"}
            aria-label={"Remove colour"}
        >
            <div class="IconButton__RegularIcon">
                <MaterialSymbolsLightDeleteForeverOutlineSharp/>
            </div>
            <div class="IconButton__HoverIcon">
                <MaterialSymbolsLightDeleteForeverSharp/>
            </div>
        </button>
    </div>
</div>

<style>
    .PalGenItem {
        height: 100%;
    }

    .PalGenItem__HexCode {
        font-family: var(--fontFamilyMono);
        padding: 0.25rem;
        color: var(--colWhite);
        background-color: rgba(var(--colBlackRgb), 0.5);
        width: fit-content;
    }

    .PalGenItem__ActionPanel {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(var(--colBlackRgb), 0.5);
    }

    .PalGenItem__ActionBtn,
    .PalGenItem__ActionBtn:hover {
        color: var(--colWhite);
    }

    .PalGenItem__DragHandle {
        height: 1.5rem;
        height: 1.5rem;
        display: grid;
        place-items: center;
        cursor: grab;
    }

    .PalGenItem__DragHandle:hover {
        color: var(--colWhite);
    }

    :global(.PalGenItem__PickerContainer .color-picker label) {
        border: 1px solid var(--colWhite);
        border-radius: 0;
    }

    @media screen and (width < 850px) {
        .PalGenItem__ActionPanel {
            flex-direction: row;
        }

        .PalGenItem__PickerContainer {
            margin-right: 0.2rem;
        }
    }
</style>
