<script lang="ts">
    import { dragHandleZone, type DndEvent, type TransformDraggedElementFunction } from "svelte-dnd-action";
    import { goto } from "$app/navigation";
    import { flip } from "svelte/animate";

    import WallGenColourInputItem from "src/routes/WallGenColourInputItem.svelte";
    import DropdownMenu from "src/components/DropdownMenu.svelte";
    import type { ColObj } from "src/lib/types.js";

    import MaterialSymbolsAdd from "~icons/material-symbols/add";
    import MaterialSymbolsRemove from "~icons/material-symbols/remove";
    import MaterialSymbolsPaletteOutline from "~icons/material-symbols/palette-outline";
    import MaterialSymbolsViewWeekSharp from "~icons/material-symbols/view-week-sharp";
    import MaterialSymbolsNetworkIntelligence from "~icons/material-symbols/network-intelligence";

    import { decreaseWallGenColourInUseCount, getColourStringsInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, passSomeColourObjectsToWallpaperGenerator, tryParseFromStringToWallGen, wallGenColours } from "src/states/wallGenState.svelte.js";
    import { addToPaletteGalleryFromWallpaperGenerator } from "src/states/paletteGalleryState.svelte.js";
    import { passWallGenToPaletteGenerator } from "src/states/palGenState.svelte.js";
    import { generatePaletteWithGemini } from "src/states/geminiState.svelte.js";

    const handleRemoveColour = () => {
        decreaseWallGenColourInUseCount();
    };

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

    const indicatorHeightVal = $derived(`calc(${getWallGenColourInUseCount()} * var(--colourInputItemHeight) + ${getWallGenColourInUseCount() - 1} * var(--colourInputItemGap) + 1rem)`);

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
            icon: MaterialSymbolsPaletteOutline
        },
        {
            id: "generateAi",
            label: "Generate with AI",
            tooltip: "Generate a palette using AI",
            action: generatePaletteWithAi,
            icon: MaterialSymbolsNetworkIntelligence
        },
    ];
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <div class="ColourInputContainer__MainWrapper">
        <div class="ColourInputContainer__InUseIndicator"
            data-colour-in-use-count={getWallGenColourInUseCount()}
            style={ `height: ${indicatorHeightVal};` }
        ></div>

        <ul class="ColourInputContainer__List"
            use:dragHandleZone="{{
                items: wallGenColours.val,
                flipDurationMs,
                dropTargetStyle: {
                    // outline: "2px solid var(--colPri)",
                    outline: "none",
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
    </div>

    <div class="ColourInputContainer__ActionsContainerUpper">
        <button class="ColourInputContainer__RemoveBtn IconButtonWithLabel"
            disabled={getWallGenColourInUseCount() <= getCurrWallStyleInfo().minColourCount}
            onclick={handleRemoveColour}
            title="Decrease the number of colours for this wallpaper by one"
            aria-label="Decrease the number of colours for this wallpaper by one"
        >
            <MaterialSymbolsRemove />
            <span>Remove</span>
        </button>

        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            disabled={getWallGenColourInUseCount() >= getCurrWallStyleInfo().maxColourCount}
            onclick={handleAddColour}
            title="Increase the number of colours for this wallpaper by one"
            aria-label="Increase the number of colours for this wallpaper by one"
        >
            <MaterialSymbolsAdd />
            <span>Add</span>
        </button>
    </div>

    <div class="ColourInputContainer__ActionContainer">
        <div class="SplitBtn">
            <button class="ColourInputContainer__Btn SplitBtn__Pri IconButtonWithLabel"
                disabled={getWallGenColourInUseCount() <= 1}
                onclick={handleSavePalette}
                title="Save the current colours as a Palette"
                aria-label="Save the current colours as a Palette"
            >
                <MaterialSymbolsViewWeekSharp />
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
    .ColourInputContainer__MainWrapper {
        position: relative;
    }

    .ColourInputContainer__List {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--colourInputItemGap);
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
        margin-top: 1.5rem;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    }

    .ColourInputContainer__ActionContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .ColourInputContainer__InUseIndicator {
        position: absolute;
        top: -0.5rem;
        width: 100%;
        border: 2px dashed var(--colPri);
        transition: height ease-in-out var(--transTime);
        box-sizing: border-box;
        pointer-events: none;
    }

    @media screen and (width <= 850px) {
        .ColourInputContainer__ActionContainer {
            justify-content: flex-end;
        }
    }
</style>
