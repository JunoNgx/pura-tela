<script lang="ts">
	import { getColoursInUse } from "src/lib/states.svelte.js";

    import ColourInputItem from "src/components/ColourInputItem.svelte";

    const coloursInUse = $derived(getColoursInUse());
</script>

<div class="ColourInputContainer">
    <ul class="ColourInputContainer__MainList">
        {#each coloursInUse as _, index}
            <ColourInputItem index={index}/>
        {/each}
    </ul>
</div>
