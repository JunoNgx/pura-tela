<script lang="ts">
    import MaterialSymbolsLightRemove from "~icons/material-symbols-light/remove";
    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";

	import { getColoursInUse, getCurrColourInUseCount, getMaxColourCount, increaseCurrColourInUseCount } from "src/lib/states.svelte.js";

    import ColourInputItem from "src/components/ColourInputItem.svelte";

    const coloursInUse = $derived(getColoursInUse());

    const handleColourRemoval = () => {
        // TODO: removeCurrColourAtIndex(index)
    };

    const handleAddColour = () => {
        increaseCurrColourInUseCount();
    };
</script>

<div class="ColourInputContainer">
    <ul class="ColourInputContainer__List">
        {#each coloursInUse as _, index}
            <li class="ColourInputContainer__Item">
                <ColourInputItem index={index}/>
                <!-- TODO: if has more than one colour -->
                <button class="ColourInputContainer__RemoveBtn IconButton"
                    onclick={handleColourRemoval}
                >
                    <MaterialSymbolsLightRemove />
                </button>
            </li>
        {/each}
    </ul>
    <div class="ColourInputContainer__ActionContainer">
        {#if getCurrColourInUseCount() < getMaxColourCount()}
            <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
                onclick={handleAddColour}
            >
                <MaterialSymbolsLightAdd />
                <span>Add colour</span>
            </button>
        {/if}
    </div>
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
