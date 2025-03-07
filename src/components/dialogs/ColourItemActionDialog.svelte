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

<DialogBase bind:shouldShowDialog>
    <h3>Pass #{inputColour} to Wallpaper Generator position</h3>
    {#each getColoursInUse() as colour, index}
        <button
            onclick={() => handlePassColour(index)}
        >
            Replace #{colour} at position {index}
        </button>
    {/each}
</DialogBase>