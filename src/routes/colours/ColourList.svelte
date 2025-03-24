<script lang="ts">
    import ColourListItem from "src/routes/colours/ColourListItem.svelte";
    import ColourItemActionDialog from "src/routes/colours/ColourItemActionDialog.svelte";
	import { colourGallery } from "src/states/colourGalleryState.svelte.js";
    
    let shouldShowDialog = $state(false);
    let inputColour:string | null = $state(null);

    const showColourActionDialog = (newInputColour: string) => {
        inputColour = newInputColour;
        shouldShowDialog = true;
    };
</script>

<ul class="ColourList FlexList">
    <ColourItemActionDialog
        bind:shouldShowDialog
        inputColour={inputColour}
    />
    {#each colourGallery.val as colourItem, index}
        <ColourListItem
            showColourActionDialog={showColourActionDialog}
            colourItem={colourItem}
            index={index}
        />
    {/each}
</ul>

<style>
    .ColourList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    @media screen and (width < 850px) {
        .ColourList {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (width < 420px) {
        .ColourList {
            grid-template-columns: 1fr;
        }
    }
</style>
