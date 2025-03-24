<script lang="ts">
    import { onDestroy } from "svelte";
	import { HAS_COPY_TIMEOUT_DURATION_MS } from "src/lib/constants.js";

    let { colourItem } = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

    const copyColourCode = async (colourCode: string) => {
        try {
            await navigator.clipboard.writeText(colourCode);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, HAS_COPY_TIMEOUT_DURATION_MS);
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
        {colourItem}
    </span>

    <span class="PaletteListColourBtn__CopiedNotice"
        class:PaletteListColourBtn__CopiedNotice--IsDisplayed={hasBeenCopied}
        aria-hidden={!hasBeenCopied}
    >
        Copied
    </span>
</button>

<style>
    .PaletteListColourBtn {
        position: relative;
        flex-grow: 1;
        border: none;
        overflow: hidden;
        transition: all var(--transTimeFast) ease-in-out;
        padding: 0;
        /* Stop the content (hexCode) from restricting min-width when not focused*/
        width: 0px;
    }

    .PaletteListColourBtn__Label,
    .PaletteListColourBtn__CopiedNotice {
        padding: 0.25rem;
        color: var(--colWhite);
        background-color: rgba(var(--colBlackRgb), 0.5);
    }

    .PaletteListColourBtn__Label {
        font-family: var(--fontFamilyMono);
        opacity: 0;
        transition: all var(--transTimeFast) ease-in-out;
        text-transform: uppercase;
    }

    .PaletteListColourBtn__CopiedNotice {
        position: absolute;
        right: 0;
        bottom: 0;
        transition: all var(--transTimeFast) ease-in-out;
        opacity: 0;
        bottom: -1rem;
    }

    .PaletteListColourBtn__CopiedNotice--IsDisplayed {
        opacity: 1;
        bottom: 0;
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



