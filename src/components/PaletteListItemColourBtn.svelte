<script lang="ts">
	import { onDestroy } from "svelte";

    let { colourItem } = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

    const copyColourCode = async (colourCode: string) => {
        try {
            await navigator.clipboard.writeText(colourCode);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, 1000);
        } catch(error) {
            throw new Error("Unable to copy colour code to clipboard")
        }
    };

    onDestroy(() => {
        clearTimeout(copyRestoreStatusTimeout);
    })
</script>

<button class="PaletteListColourBtn"
    style="{`background-color: #${colourItem}`}"
    onclick={() => {copyColourCode(colourItem)}}
>
    <span class="PaletteListColourBtn__Label">
        {#if hasBeenCopied}
            Copied
        {:else}
            {colourItem}
        {/if}
    </span>
</button>

<style>
    .PaletteListColourBtn {
        flex-grow: 1;
        border: none;
        transition: all var(--transTimeFast) ease-in-out;
        padding: 0;
        /* Stop the content (hexCode) from restricting min-width when not focused*/
        width: 0px;
    }

    .PaletteListColourBtn__Label {
        opacity: 0;
        padding: 0.25rem;
        color: var(--colWhite);
        background-color: rgba(var(--colBlackRgb), 0.5);
        transition: all var(--transTimeFast) ease-in-out;
    }

    .PaletteListColourBtn:focus,
    .PaletteListColourBtn:hover {
        flex-grow: 2;
        z-index: 30;

        .PaletteListColourBtn__Label {
            opacity: 1;
        }
    }
</style>



