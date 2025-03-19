<script lang="ts">
    import { dragHandleZone, type DndEvent, type TransformDraggedElementFunction } from "svelte-dnd-action";
	import { goto } from "$app/navigation";
    import { flip } from 'svelte/animate';

    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightGesture from "~icons/material-symbols-light/gesture";    
    import MaterialSymbolsLightColorize from "~icons/material-symbols-light/colorize";
    import MaterialSymbolsLightCalendarViewWeekSharp from "~icons/material-symbols-light/calendar-view-week-sharp";
    import MaterialSymbolsLightNetworkIntelligence from "~icons/material-symbols-light/network-intelligence";

	import PaletteGeneratorItem from "src/routes/generate/PaletteGeneratorItem.svelte";
	import { addToPalGenColours, exportToStringFromPalGen, palGenColours, tryParseFromStringToPalGen, randomiseUnlockedColoursForPalGen } from "src/states/palGenState.svelte.js";
	import { addToPaletteGalleryFromPaletteGenerator } from "src/states/paletteGalleryState.svelte.js";
	import { passSomeColourStringsToWallpaperGenerator, readjustWallGenColoursInUseCount, setWallGenColourInUseCount } from "src/states/wallGenState.svelte.js";
	import SharePanel from "src/components/SharePanel.svelte";
	import { MAX_COLOUR_COUNT } from "src/lib/constants.js";
	import { generatePaletteWithGemini } from "src/states/geminiState.svelte.js";
	import type { PalGenColObj } from "src/lib/types.js";

    const addColour = () => {
        addToPalGenColours();
    };

    const generatePalette = () => {
        randomiseUnlockedColoursForPalGen();
    };

    const passToWallpaperGenerator = () => {
        const newColours = palGenColours.val.map(item => item.colour);

        passSomeColourStringsToWallpaperGenerator(newColours);
        setWallGenColourInUseCount(newColours.length);
        readjustWallGenColoursInUseCount();

        goto("/");
    };

    const savePalette = () => {
        addToPaletteGalleryFromPaletteGenerator();
    };

    const parseFromString = () => {
        const inputData = window.prompt("Enter palette data. This should be a list of hex codes, with or without the hash sign, with or without double quotes, separated by either dash or comma. Refer to help for more details.");
        if (!inputData) return;

        tryParseFromStringToPalGen(inputData);
    };

    const generatePaletteWithAi = async () => {
        const response = await generatePaletteWithGemini();
        if (!response) return;

        tryParseFromStringToPalGen(response);
    };

    const handleDndSort = (e: CustomEvent<DndEvent<PalGenColObj>>) => {
        palGenColours.set(e.detail.items);
    };

    const transformDraggedElement: TransformDraggedElementFunction = (draggedEl, data, index) => {
        draggedEl?.classList.add("IsDragged");
    };

    const flipDurationMs = 200;
</script>

<div class="PaletteGenerator">
    <div class="PaletteGenerator__PaletteBox"
        use:dragHandleZone="{{
            items: palGenColours.val,
            flipDurationMs,
            dropTargetStyle: {
                outline: "2px solid var(--colPri)",
            },
            transformDraggedElement
        }}"
        onconsider="{handleDndSort}"
        onfinalize="{handleDndSort}"
    >
        {#each palGenColours.val as palGenItem, index (palGenItem.id)}
            <div class="PaletteGenerator__ItemWrapper"
                animate:flip={{ duration: flipDurationMs }}
            >
                <PaletteGeneratorItem 
                    palGenItem={palGenItem}
                    index={index}
                />
            </div>
        {/each}
    </div>

    <div class="PaletteGenerator__ActionsContainerUpper">
        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            onclick={parseFromString}
            title={"Enter a string of data to access a palette"}
            aria-label={"Enter a string of data to access a palette"}
        >
            <MaterialSymbolsLightAdd />
            <span>Import from string</span>
        </button>

        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            disabled={palGenColours.val.length >= MAX_COLOUR_COUNT}
            onclick={addColour}
            title={"Add colour"}
            aria-label={"Add colour"}
        >
            <MaterialSymbolsLightAdd />
            <span>Add colour</span>
        </button>
    </div>

    <div class="PaletteGenerator__ActionsContainer">
        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={generatePalette}
            title={"Generate new palettes"}
            aria-label={"Generate new palettes"}
        >
            <MaterialSymbolsLightGesture />
            <span>Generate</span>
        </button>

        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={passToWallpaperGenerator}
            title={"Pass the palette to Wallpaper Generator"}
            aria-label={"Pass the palette to Wallpaper Generator"}
        >
            <MaterialSymbolsLightColorize />
            <span>Pass to Wallpaper Generator</span>
        </button>

        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={generatePaletteWithAi}
            title={"Generate a palette using AI"}
            aria-label={"Generate a palette using AI"}
        >
            <MaterialSymbolsLightNetworkIntelligence />
            <span>Generate with AI</span>
        </button>

        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={savePalette}
            title={"Save current palette"}
            aria-label={"Save current palette"}
        >
            <MaterialSymbolsLightCalendarViewWeekSharp />
            <span>Save palette</span>
        </button>
    </div>

    <SharePanel
        title="Share this palette"
        desc="Save this or send it to someone. Choose [Import from string] to re-access this palette."
        content={exportToStringFromPalGen()}
    />
</div>

<style>
    .PaletteGenerator__PaletteBox {
        display: flex;
        flex-direction: row;
        width: 100%;
        /* min-height: 35rem; */
    }

    .PaletteGenerator__ItemWrapper {
        position: relative;
        flex-grow: 1;
        height: 500px;
    }

    :global(.PaletteGenerator__ItemWrapper.IsDragged) {
        opacity: 0.5 !important;
    }

    .PaletteGenerator__ActionsContainerUpper {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 2rem;
    }

    .PaletteGenerator__ActionsContainer {
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 2rem;
    }

    @media screen and (width < 850px) {
        .PaletteGenerator__PaletteBox {
            display: flex;
            flex-direction: column;
            min-height: 60vh;
        }

        .PaletteGenerator__ItemWrapper {
            height: 7.5rem;
        }
    }
</style>