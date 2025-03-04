<script lang="ts">
    import MaterialSymbolsLightRemoveRounded from "~icons/material-symbols-light/remove-rounded";

	import { getColoursInUse } from "src/lib/states.svelte.js";

    import ColourInputItem from "src/components/ColourInputItem.svelte";

    const coloursInUse = $derived(getColoursInUse());
</script>

<div class="ColourInputContainer">
    <ul class="ColourInputContainer__List">
        {#each coloursInUse as _, index}
            <li class="ColourInputContainer__Item">
                <ColourInputItem index={index}/>
                <!-- TODO: if has more than one colour -->
                <button class="ColourInputContainer__RemoveBtn IconButton">
                    <MaterialSymbolsLightRemoveRounded />
                </button>
            </li>
        {/each}
    </ul>
</div>

<style>
    .ColourInputContainer__List {
        padding-left: 0;
    }

    .ColourInputContainer__Item {
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .ColourInputContainer__RemoveBtn {
        color: var(--colDanger);
    }
</style>
