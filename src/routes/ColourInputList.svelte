<script lang="ts">
    import { goto } from "$app/navigation";

    import MaterialSymbolsLightRemove from "~icons/material-symbols-light/remove";
    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";

    import ColourInputItem from "src/routes/ColourInputItem.svelte";
	import { decreaseWallGenColourInUseCount, getColoursInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, retractWallGenColoursAtIndex } from "src/states/wallGenState.svelte.js";
	import { addToPaletteGalleryFromWallpaperGenerator, passWallGenToPaletteGenerator } from "src/states/paletteGalleryState.svelte.js";
	import { MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";

    const handleRemoveColour = (index: number) => {
        retractWallGenColoursAtIndex(index);
        decreaseWallGenColourInUseCount();
    };

    const handleAddColour = () => {
        increaseWallGenColourInUseCount();
    };

    const passColoursToPaletteGenerator = () => {
        passWallGenToPaletteGenerator(getColoursInUse());
        goto("/generate");
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
                {#if getWallGenColourInUseCount() > getCurrWallStyleInfo().minColourCount}
                    <button class="ColourInputContainer__RemoveBtn IconButton"
                        onclick={() => {handleRemoveColour(index)}}
                    >
                        <MaterialSymbolsLightRemove />
                    </button>
                {/if}
            </li>
        {/each}
    </ul>

    <div class="ColourInputContainer__ActionsContainerUpper">
        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            disabled={getWallGenColourInUseCount() >= getCurrWallStyleInfo().maxColourCount}
            onclick={handleAddColour}
            title="Add another colour to this wallpaper"
            aria-label="Add another colour to this wallpaper"
        >
            <MaterialSymbolsLightAdd />
            <span>Add colour</span>
        </button>
    </div>

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
            disabled={getWallGenColourInUseCount() < MIN_COLOUR_COUNT_PALETTE}
            onclick={passColoursToPaletteGenerator}
            title="Pass the current colours to the Palette Generator"
            aria-label="Pass the current colours to the Palette Generator"
        >
            <MaterialSymbolsLightPaletteOutline />
            <span>Pass to Palette Generator</span>
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

    .ColourInputContainer__ActionsContainerUpper {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    .ColourInputContainer__ActionContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .ColourInputContainer__RemoveBtn {
        color: var(--colDanger);
    }
</style>
