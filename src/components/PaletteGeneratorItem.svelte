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
	import { togglePalGenColoursLockAtIndex } from "src/lib/states.svelte.js";

    type PaletteGeneratorItemProps = {
        palGenItem: PalGenItem,
        index: number,
    };

    let { palGenItem, index }: PaletteGeneratorItemProps = $props();

    const toggleLockColour = () => {
        togglePalGenColoursLockAtIndex(index);
    };

</script>

<div class="PalGenItem"
    style={`background-color: #${palGenItem.colour}`}
>
    <div class="PalGenItem__HexCode">
        {palGenItem.colour}
    </div>

    <div class="PalGenItem__ActionPanel">
        {#if palGenItem.isLocked}
            <button class="PalGenItem__ActionButton IconButton"
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
            <button class="PalGenItem__ActionButton IconButton"
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
    </div>
</div>

<style>
    .PalGenItem {
        position: relative;
        flex-grow: 1;
    }

    .PalGenItem__HexCode {
        padding: 0.25rem;
        background-color: rgba(var(--colBlackRgb), 0.5);
        width: fit-content;
    }

    .PalGenItem__ActionPanel {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        background-color: rgba(var(--colBlackRgb), 0.5);
    }

    @media screen and (width < 850px) {
        .PalGenItem__ActionPanel {
            flex-direction: row;
        }
    }
</style>

