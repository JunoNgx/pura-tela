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

</div>

<style>
    .PalGenItem {
        flex-grow: 1;
    }
</style>

