<script lang="ts">
    import { colourGallery } from "src/lib/states.svelte.js";
    import ColourItem from "src/components/ColourItem.svelte";
</script>

<ul class="ColourList">
    {#each colourGallery.val as colourItem}
        <ColourItem colourItem={colourItem}/>
    {/each}
</ul>

<style>
    .ColourList {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
</style>