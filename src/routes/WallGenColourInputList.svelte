<script lang="ts">
	import { createSwapy, type Swapy } from 'swapy';
    import { goto } from "$app/navigation";

    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";
    import MaterialSymbolsLightNetworkIntelligence from "~icons/material-symbols-light/network-intelligence";

    import WallGenColourInputItem from "src/routes/WallGenColourInputItem.svelte";
	import { getColourObjectsInUse, getColourStringsInUse, getCurrWallStyleInfo, getWallGenColourInUseCount, increaseWallGenColourInUseCount, tryParseFromStringToWallGen, wallGenColours } from "src/states/wallGenState.svelte.js";
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

    let swapy: Swapy | null = null;
    let inputList: HTMLUListElement;

    onMount(() => {
        if (!inputList) return;

        swapy = createSwapy(inputList);
        swapy.onSwap(event => {
            console.log("swap", event)
        });
    });

    onDestroy(() => {
        swapy?.destroy();
    });
</script>

<div class="ColourInputContainer">
    <h3 class="ColourInputContainer__Heading">Colour options</h3>
    <ul class="ColourInputContainer__List"
        bind:this={inputList}
    >
        <!-- A very grotesque workaround, see issue #36 on GitHub -->
        {#each getColourObjectsInUse() as colourObj, index
            (import.meta.env.PROD ? Math.random() : colourObj.id)
        }
            <li class="ColourInputeContainer__ItemWrapper"
                data-swapy-slot={index}
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
        padding-left: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .ColourInputeContainer__ItemWrapper {
        list-style: none;
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
