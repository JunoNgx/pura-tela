<script lang="ts">
    import { dragHandleZone, type DndEvent, type TransformDraggedElementFunction } from "svelte-dnd-action";
    import { goto } from "$app/navigation";
    import { flip } from "svelte/animate";

    import WallGenColourInputItem from "src/routes/WallGenColourInputItem.svelte";
	import DropdownMenu from "src/components/DropdownMenu.svelte";
	import type { ColObj } from "src/lib/types.js";

    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";
    import MaterialSymbolsLightNetworkIntelligence from "~icons/material-symbols-light/network-intelligence";

	import { getColourObjectsInUse, getColourStringsInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, passSomeColourObjectsToWallpaperGenerator, tryParseFromStringToWallGen, wallGenColours } from "src/states/wallGenState.svelte.js";
	import { addToPaletteGalleryFromWallpaperGenerator } from "src/states/paletteGalleryState.svelte.js";
	import { passWallGenToPaletteGenerator } from "src/states/palGenState.svelte.js";
	import { generatePaletteWithGemini } from "src/states/geminiState.svelte.js";

    const handleAddColour = () => {
        increaseWallGenColourInUseCount();
    };

    const passColoursToPaletteGenerator = () => {
        passWallGenToPaletteGenerator(getColourStringsInUse());
        goto("/generate-palette");
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

    const dropdownActionItems = [
        {
            id: "passToPalGen",
            label: "Pass to Palette Generator",
            tooltip: "Pass the current colours to the Palette Generator",
            action: passColoursToPaletteGenerator,
            icon: MaterialSymbolsLightPaletteOutline
        },
        {
            id: "generateAi",
            label: "Generate with AI",
            tooltip: "Generate a palette using AI",
            action: generatePaletteWithAi,
            icon: MaterialSymbolsLightNetworkIntelligence
        },
    ];
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <ul class="ColourInputContainer__List"
        use:dragHandleZone="{{
            items: wallGenColours.val,
            flipDurationMs,
            dropTargetStyle: {
                outline: "2px solid var(--colPri)",
            },
            transformDraggedElement
        }}"
        onconsider="{handleDndSort}"
        onfinalize="{handleDndSort}"
    >
        {#each wallGenColours.val as colourObj, index (colourObj.id)}
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
        <div class="SplitBtn">
            <button class="ColourInputContainer__AddBtn SplitBtn__Pri IconButtonWithLabel"
                disabled={getWallGenColourInUseCount() <= 1}
                onclick={handleSavePalette}
                title="Save the current colours as a Palette"
                aria-label="Save the current colours as a Palette"
            >
                <MaterialSymbolsLightCalendarViewWeekSharp />
                <span>Save palette</span>
            </button>
            <DropdownMenu
                actionItems={dropdownActionItems}
                isSplitBtnPart={true}
            />
        </div>
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
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
    }

    @media screen and (width <= 850px) {
        .ColourInputContainer__ActionContainer {
            justify-content: flex-end;
        }
    }
</style>
