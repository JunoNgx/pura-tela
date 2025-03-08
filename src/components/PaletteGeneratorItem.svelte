<script lang="ts">
    import MaterialSymbolsLightDragIndicator from "~icons/material-symbols-light/drag-indicator";

    import MaterialSymbolsLightLockOpenRightOutlineSharp from "~icons/material-symbols-light/lock-open-right-outline-sharp";
    import MaterialSymbolsLightLockOpenRightSharp from "~icons/material-symbols-light/lock-open-right-sharp";

    import MaterialSymbolsLightLockSharp from "~icons/material-symbols-light/lock-sharp";
    import MaterialSymbolsLightLockOutlineSharp from "~icons/material-symbols-light/lock-outline-sharp";

    import MaterialSymbolsLightColorize from "~icons/material-symbols-light/colorize";
    import MaterialSymbolsLightColorizeOutline from "~icons/material-symbols-light/colorize-outline";

    import MaterialSymbolsLightDelete from "~icons/material-symbols-light/delete";
    import MaterialSymbolsLightDeleteOutline from "~icons/material-symbols-light/delete-outline";

	import type { PalGenItem } from "src/lib/types.js";
	import { palGenColours, removePalGenColoursLockAtIndex, setPalGenColoursHexAtIndex, togglePalGenColoursLockAtIndex } from "src/lib/states.svelte.js";
	import ColorPicker from "svelte-awesome-color-picker";

    type PaletteGeneratorItemProps = {
        palGenItem: PalGenItem,
        index: number,
    };

    let { palGenItem, index }: PaletteGeneratorItemProps = $props();
    // let isPickerOpen = $state(false);

    const toggleLockColour = () => {
        togglePalGenColoursLockAtIndex(index);
    };

    const removeColour = () => {
        removePalGenColoursLockAtIndex(index);
    };

    // const togglePickerOpen = () => {
    //     isPickerOpen = !isPickerOpen;
    // };

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

    <div class="PalGenItem__ActionPanel">
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
                title={"Lock this colour"}
                aria-label={"Lock this colour"}
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
            disabled={palGenColours.val.length <= 2}
            onclick={removeColour}
            title={"Remove colour"}
            aria-label={"Remove colour"}
        >
            <div class="IconButton__RegularIcon">
                <MaterialSymbolsLightDeleteOutline/>
            </div>
            <div class="IconButton__HoverIcon">
                <MaterialSymbolsLightDelete/>
            </div>
        </button>
    </div>
</div>

<style>
    .PalGenItem {
        position: relative;
        flex-grow: 1;
    }

    .PalGenItem__HexCode {
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

