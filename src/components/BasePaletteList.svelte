<script lang="ts">
    import { paletteGallery } from "src/lib/states.svelte.js";
    import PaletteListItem from "./PaletteListItem.svelte";    
</script>

<ul class="PaletteList FlexList">
    {#each paletteGallery.val as paletteItem}
        <PaletteListItem
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

    @media screen and (width < 350px) {
        .PaletteList {
            grid-template-columns: 1fr;
        }
    }
</style>