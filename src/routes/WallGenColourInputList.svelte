<script lang="ts">
    import Sortable, { type SortableEvent } from 'sortablejs';

    import { goto } from "$app/navigation";

    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";
    import MaterialSymbolsLightNetworkIntelligence from "~icons/material-symbols-light/network-intelligence";

    import WallGenColourInputItem from "src/routes/WallGenColourInputItem.svelte";
	import { getColourObjectsInUse, getColourStringsInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, passSomeColourObjectsToWallpaperGenerator, tryParseFromStringToWallGen, wallGenColours } from "src/states/wallGenState.svelte.js";
	import { addToPaletteGalleryFromWallpaperGenerator } from "src/states/paletteGalleryState.svelte.js";
	import { MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";
	import { onDestroy, onMount } from "svelte";
	import { passWallGenToPaletteGenerator } from 'src/states/palGenState.svelte.js';
	import { generatePaletteWithGemini } from 'src/states/geminiState.svelte.js';

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

    const generatePaletteWithAi = async () => {
        const response = await generatePaletteWithGemini();
        if (!response) return;

        tryParseFromStringToWallGen(response);
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
            store: {
                get(_sortable: Sortable) {
                    const idOrder = wallGenColours.val.map(
                        palGenItem => palGenItem.id.toString()
                    );
                    console.log("get", idOrder)
                    return idOrder;
                },
                set(sortable: Sortable) {
                    // TODO: find a way to abstract and re-use this logic for both PalGen and WallGen
                    const newIdOrder = sortable.toArray();
                    console.log("sort", newIdOrder)
                    const newValue = newIdOrder.map(id => {
                        const correspondingWalGenCol = wallGenColours.val
                            .find(wallGenCol => wallGenCol.id === parseInt(id));

                        if (!correspondingWalGenCol) {
                            throw new Error(
                                "Cannot find corresponding wallpaper generator colour item while re-sorting after drag and drop");
                        }
                        
                        return correspondingWalGenCol;
                    });

                    wallGenColours.set(newValue);
                },
            }
        };

        sortableColourInput = new Sortable(inputList, sortableOptions);
    });

    onDestroy(() => {
        sortableColourInput.destroy();
    });

    $effect(() => {
        $inspect(wallGenColours)
    })
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <ul class="ColourInputContainer__List"
        bind:this={inputList}
    >
        {#each getColourObjectsInUse() as colourObj, index (colourObj.id)}
            <WallGenColourInputItem
                colourObj={colourObj}
                index={index}
            />
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

        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={generatePaletteWithAi}
            title={"Generate a palette using AI"}
            aria-label={"Generate a palette using AI"}
        >
            <MaterialSymbolsLightNetworkIntelligence />
            <span>Generate with AI</span>
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
