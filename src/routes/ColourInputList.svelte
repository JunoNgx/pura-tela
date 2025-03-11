<script lang="ts">
    import MaterialSymbolsLightRemove from "~icons/material-symbols-light/remove";
    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";


    import ColourInputItem from "src/routes/ColourInputItem.svelte";
	import { decreaseWallGenColourInUseCount, getColoursInUse, getMaxWallGenColoursInUseCount, getMinWallGenColoursInUseCount, getWallGenColourInUseCount, increaseWallGenColourInUseCount, retractWallGenColoursAtIndex } from "src/states/wallGenState.svelte.js";
	import { addToPaletteGalleryFromWallpaperGenerator } from "src/states/paletteGalleryState.svelte.js";

    const handleRemoveColour = (index: number) => {
        retractWallGenColoursAtIndex(index);
        decreaseWallGenColourInUseCount();
    };

    const handleAddColour = () => {
        increaseWallGenColourInUseCount();
    };

    const handleSavePalette = () => {
        addToPaletteGalleryFromWallpaperGenerator();
    };
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <ul class="ColourInputContainer__List">
        {#each getColoursInUse() as _, index}
            <li class="ColourInputContainer__Item">
                <ColourInputItem index={index}/>
                {#if getWallGenColourInUseCount() > getMinWallGenColoursInUseCount()}
                    <button class="ColourInputContainer__RemoveBtn IconButton"
                        onclick={() => {handleRemoveColour(index)}}
                    >
                        <MaterialSymbolsLightRemove />
                    </button>
                {/if}
            </li>
        {/each}
    </ul>

    <div class="ColourInputContainer__ActionContainer">
        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            disabled={getWallGenColourInUseCount() <= 1}
            onclick={handleSavePalette}
            title="Save the current colours as a Palette"
            aria-label="Save the current colours as a Palette"
        >
            <MaterialSymbolsLightCalendarViewWeekSharp />
            <span>Save palette</span>
        </button>

        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            disabled={getWallGenColourInUseCount() >= getMaxWallGenColoursInUseCount()}
            onclick={handleAddColour}
            title="Add another colour to this wallpaper"
            aria-label="Add another colour to this wallpaper"
        >
            <MaterialSymbolsLightAdd />
            <span>Add colour</span>
        </button>
    </div>
</div>

<style>
    .ColourInputContainer__List {
        padding-left: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .ColourInputContainer__Item {
        list-style: none;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .ColourInputContainer__ActionContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: space-around;
        gap: 1rem;
    }

    .ColourInputContainer__RemoveBtn {
        color: var(--colDanger);
    }
</style>
