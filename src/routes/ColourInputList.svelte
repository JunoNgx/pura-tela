<script lang="ts">
    import Sortable, { type SortableEvent } from 'sortablejs';

    import { goto } from "$app/navigation";

    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";

    import ColourInputItem from "src/routes/ColourInputItem.svelte";
	import { getColourObjectsInUse, getColourStringsInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, passSomeColourObjectsToWallpaperGenerator, wallGenColours } from "src/states/wallGenState.svelte.js";
	import { addToPaletteGalleryFromWallpaperGenerator } from "src/states/paletteGalleryState.svelte.js";
	import { MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";
	import { onDestroy, onMount } from "svelte";
	import { moveItemWithinArray } from 'src/states/stateUtils.svelte.js';
	import { passWallGenToPaletteGenerator } from 'src/states/palGenState.svelte.js';

    const handleAddColour = () => {
        increaseWallGenColourInUseCount();
    };

    const passColoursToPaletteGenerator = () => {
        passWallGenToPaletteGenerator(getColourStringsInUse());
        goto("/generate");
    };

    const handleSavePalette = () => {
        addToPaletteGalleryFromWallpaperGenerator();
    };

    let sortableColourInput: Sortable;
    let inputList: HTMLUListElement;

    onMount(() => {
        const sortableOptions = {
            animation: 150,
            delay: 0,
            handle: ".ColourInput__DragHandle",
            dragClass: "ColourInput__IsDragged",
            put: false,
            pull: false,
            onEnd: (evt: SortableEvent) => {
                if (evt.oldIndex === null
                    || evt.oldIndex === undefined
                    || evt.newIndex === null
                    || evt.newIndex === undefined
                ) {
                    return;
                }

                if (evt.oldIndex === evt.newIndex) {
                    return;
                }

                const newVal = moveItemWithinArray(
                    getColourObjectsInUse(),
                    evt.oldIndex,
                    evt.newIndex
                );
                passSomeColourObjectsToWallpaperGenerator(newVal);
            },
        };

        sortableColourInput = new Sortable(inputList, sortableOptions);
    });

    onDestroy(() => {
        sortableColourInput.destroy();
    });
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <ul class="ColourInputContainer__List"
        bind:this={inputList}
    >
        {#each wallGenColours.val as colourObj, index (colourObj.id)}
            {#if index < getWallGenColourInUseCount()}
                <li class="ColourInputContainer__Item">
                    <ColourInputItem
                        colourObj={colourObj}
                        index={index}
                    />
                </li>
            {/if}
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
</style>
