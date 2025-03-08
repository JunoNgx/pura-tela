<script lang="ts">
    import MaterialSymbolsLightDragIndicator from "~icons/material-symbols-light/drag-indicator";

    import MaterialSymbolsLightLockOpenSharp from '~icons/material-symbols-light/lock-open-sharp';
    import MaterialSymbolsLightLockOpenOutlineSharp from "~icons/material-symbols-light/lock-open-outline-sharp";

    import MaterialSymbolsLightLockSharp from "~icons/material-symbols-light/lock-sharp";
    import MaterialSymbolsLightLockOutlineSharp from "~icons/material-symbols-light/lock-outline-sharp";

    import MaterialSymbolsLightColorize from "~icons/material-symbols-light/colorize";
    import MaterialSymbolsLightColorizeOutline from "~icons/material-symbols-light/colorize-outline";

    import MaterialSymbolsLightDelete from "~icons/material-symbols-light/delete";
    import MaterialSymbolsLightDeleteOutline from "~icons/material-symbols-light/delete-outline";

	import type { PalGenItem } from "src/lib/types.js";

    type PaletteGeneratorItemProps = {
        palGenItem: PalGenItem,
        index: number,
    };

    let { palGenItem, index }: PaletteGeneratorItemProps = $props();
    let lockStatusText = $derived(palGenItem.isLocked ? "locked" : "unlocked");

    const toggleLockColour = () => {

    };

</script>

<div class="PalGenItem"
    style={`background-color: #${palGenItem.colour}`}
>
    <div class="PalGenItem__HexCode">
        {palGenItem.colour}
    </div>

    <div class="PalGenItem__ActionPanel">
        <button class="PalGenItem__ActionButton IconButton"
            onclick={toggleLockColour}
            title={"Lock this colour"}
            aria-label={"Lock this colour"}
        >
            <div class="IconButton__RegularIcon">
                <MaterialSymbolsLightLockOutlineSharp/>
            </div>
            <div class="IconButton__HoverIcon">
                <MaterialSymbolsLightLockSharp/>
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
        background-color: rgba(var(--colBlackRgb), 0.5);
        width: fit-content;
    }

    .PalGenItem__ActionPanel {
        position: absolute;
        bottom: 0;
        right: 0;
        background-color: rgba(var(--colBlackRgb), 0.5);
    }
</style>

