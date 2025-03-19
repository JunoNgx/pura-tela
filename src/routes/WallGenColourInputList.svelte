<script lang="ts">
    import { dragHandleZone, type DndEvent, type TransformDraggedElementFunction } from "svelte-dnd-action";
    import { goto } from "$app/navigation";
    import { flip } from 'svelte/animate';

    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";
    import MaterialSymbolsLightNetworkIntelligence from "~icons/material-symbols-light/network-intelligence";

    import WallGenColourInputItem from "src/routes/WallGenColourInputItem.svelte";
	import { getColourObjectsInUse, getColourStringsInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, passSomeColourObjectsToWallpaperGenerator, tryParseFromStringToWallGen, wallGenColours } from "src/states/wallGenState.svelte.js";
	import { addToPaletteGalleryFromWallpaperGenerator } from "src/states/paletteGalleryState.svelte.js";
	import { MIN_COLOUR_COUNT_PALETTE } from "src/lib/constants.js";
	import { passWallGenToPaletteGenerator } from 'src/states/palGenState.svelte.js';
	import { generatePaletteWithGemini } from 'src/states/geminiState.svelte.js';
	import type { ColObj } from "src/lib/types.js";

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

    const handleDndSort = (e: CustomEvent<DndEvent<ColObj>>) => {
        passSomeColourObjectsToWallpaperGenerator(e.detail.items);
    };

    const transformDraggedElement: TransformDraggedElementFunction = (draggedEl, data, index) => {
        draggedEl?.classList.add("IsDragged");
    };

    const flipDurationMs = 200;
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <ul class="ColourInputContainer__List"
        use:dragHandleZone="{{
            items: getColourObjectsInUse(),
            flipDurationMs,
            dropTargetStyle: {
                outline: "2px solid var(--colPri)",
            },
            transformDraggedElement
        }}"
        onconsider="{handleDndSort}"
        onfinalize="{handleDndSort}"
    >
        {#each getColourObjectsInUse() as colourObj, index (colourObj.id)}
            <li class="ColourInputContainer__ItemWrapper"
                animate:flip={{ duration: 200 }}
            >
                <WallGenColourInputItem
                    colourObj={colourObj}
                    index={index}
                />
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
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .ColourInputContainer__ItemWrapper {
        list-style: none;
    }

    :global(.ColourInputContainer__ItemWrapper--IsDragging) {
        outline: 2px solid var(--colPri);
        padding-left: 2rem;
    }

    :global(.ColourInputContainer__ItemWrapper.IsDragged .ColourInput__Buttons) {
        display: none;
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
