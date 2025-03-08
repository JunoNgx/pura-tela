<script lang="ts">
	import { palGenColours } from "src/lib/states.svelte.js";
	import PaletteGeneratorItem from "./PaletteGeneratorItem.svelte";


</script>

<div class="PaletteGenerator">
    {#each palGenColours.val as palGenItem, index}
        <PaletteGeneratorItem 
            palGenItem={palGenItem}
            index={index}
        />
    {/each}
</div>

<style>
    .PaletteGenerator {
        display: flex;
        flex-direction: row;
        width: 100%;
        min-height: 40rem;
        background-color: aquamarine;
    }

    @media screen and (width < 850px) {
        .PaletteGenerator {
            display: flex;
            flex-direction: column;
            min-height: 60vh;
        }
    }
</style>