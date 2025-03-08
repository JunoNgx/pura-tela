<script lang="ts">
	import PaletteListItemColourBtn from "./PaletteListItemColourBtn.svelte";

    let { paletteItem } = $props();
</script>

<ul class="PaletteListItem">
    <div class="PaletteListItem__PaletteBox">
        {#each paletteItem.colours as colourItem}
            <PaletteListItemColourBtn colourItem={colourItem} />
        {/each}
    </div>
    <div class="PaletteListItem__Name">{paletteItem.name}</div>
</ul>

<style>
    .PaletteListItem {
        list-style: none;
        border-bottom: 1px solid var(--colPri);
        min-width: 120px;
        padding-left: 0;
    }

    .PaletteListItem__PaletteBox {
        height: 200px;
        width: 100%;
        display: flex;
        flex-direction: row;
    }
</style>