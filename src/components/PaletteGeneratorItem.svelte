<script lang="ts">
	import type { PalGenItem } from "src/lib/types.js";

    type PaletteGeneratorItemProps = {
        palGenItem: PalGenItem,
        index: number,
    };

    let { palGenItem, index }: PaletteGeneratorItemProps = $props();

</script>

<div class="PalGenItem"
    style={`background-color: #${palGenItem.colour}`}
>
    <div class="PalGenItem__HexCode">
        {palGenItem.colour}
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
</style>

