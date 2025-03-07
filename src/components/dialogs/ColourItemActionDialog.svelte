<script lang="ts">
    import { goto } from '$app/navigation';

	import { getColoursInUse, setCurrColoursAtIndex } from "src/lib/states.svelte.js";
    import DialogBase from "src/components/dialogs/DialogBase.svelte";

    let { shouldShowDialog = $bindable(), inputColour } = $props();

    const handlePassColour = (targetIndex: number) => {
        setCurrColoursAtIndex(targetIndex, inputColour);
        goto("/");
    };
</script>

<DialogBase className="ColourActionDialog"
    bind:shouldShowDialog
>
    <h3 class="ColourActionDialog__Title">Would you like to pass #{inputColour} to Wallpaper Generator?</h3>
    <div class="ColourActionDialog__ActionContainer">
        {#each getColoursInUse() as colour, index}
            <button class="ColourActionDialog__ActionBtn"
                onclick={() => handlePassColour(index)}
            >
                Replace #{colour} at position {index + 1}
            </button>
        {/each}
    </div>
</DialogBase>

<style>
    .ColourActionDialog__ActionContainer {
        margin-top: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
</style>