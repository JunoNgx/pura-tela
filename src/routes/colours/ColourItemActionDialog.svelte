<script lang="ts">
    import { goto } from "$app/navigation";

    import DialogBase from "src/components/DialogBase.svelte";
    import ColourSpan from "src/components/ColourSpan.svelte";
    import { getColourStringsInUse, setWallGenColoursAtIndex } from "src/states/wallGenState.svelte.js";

    let { shouldShowDialog = $bindable(), inputColour } = $props();
    let dialogBase: DialogBase | undefined = $state();

    const handlePassColour = (targetIndex: number) => {
        setWallGenColoursAtIndex(targetIndex, inputColour);
        goto("/");
    };
</script>

<DialogBase className="ColourActionDialog"
    bind:shouldShowDialog
    bind:this={dialogBase}
>
    <h3 class="ColourActionDialog__Title">Confirm colour passing</h3>
    <p class="ColourActionDialog__PromptContent">Pass <ColourSpan colour={inputColour}/> to Wallpaper Generator?</p>
    <div class="ColourActionDialog__ActionContainer ColourActionDialog__ActionContainer--MainActions">
        {#each getColourStringsInUse() as colour, index}
            <button class="ColourActionDialog__ActionBtn"
                onclick={() => handlePassColour(index)}
            >
                Replace <ColourSpan colour={colour}/> at position {index + 1}
            </button>
        {/each}
    </div>
    <div class="ColourActionDialog__ActionContainer ColourActionDialog__ActionContainer--Exit">
        <button class="ColourActionDialog__ActionBtn"
            onclick={() => { dialogBase?.closeDialog() }}
        >
            Cancel
        </button>
    </div>
</DialogBase>

<style>
    .ColourActionDialog__ActionContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .ColourActionDialog__ActionContainer--MainActions {
        margin-top: 3rem;
        gap: 1rem;
    }

    .ColourActionDialog__ActionContainer--Exit {
        margin-top: 2rem;
    }
</style>
