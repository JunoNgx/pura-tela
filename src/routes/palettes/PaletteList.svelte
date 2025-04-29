<script lang="ts">
    import { paletteGallery } from "src/states/paletteGalleryState.svelte.js";
    import PaletteListItem from "src/routes/palettes/PaletteListItem.svelte";    
</script>

<ul class="PaletteList FlexList">
    {#each paletteGallery.val as paletteItem, index}
        <PaletteListItem
            index={index}
            paletteItem={paletteItem}
        />
    {/each}
</ul>

<style>
    .PaletteList {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    @media screen and (width < 600px) {
        .PaletteList {
            grid-template-columns: 1fr;
        }
    }
</style>
