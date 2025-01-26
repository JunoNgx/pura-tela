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
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        padding-left: 0;
        margin-top: 1.5rem;
    }

    @media screen and (width < 600px) {
        .ColourList {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (width < 350px) {
        .ColourList {
            grid-template-columns: 1fr;
        }
    }
</style>