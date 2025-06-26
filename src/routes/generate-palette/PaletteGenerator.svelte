<script lang="ts">
    import {
        dragHandleZone,
        type DndEvent,
        type TransformDraggedElementFunction,
    } from "svelte-dnd-action";
    import { goto } from "$app/navigation";
    import { flip } from "svelte/animate";

    import SharePanel from "src/components/SharePanel.svelte";
    import DropdownMenu from "src/components/DropdownMenu.svelte";
    import PaletteGeneratorItem from "src/routes/generate-palette/PaletteGeneratorItem.svelte";
    import type { PalGenColObj } from "src/lib/types.js";
    import { MAX_COLOUR_COUNT } from "src/lib/constants.js";

    import MaterialSymbolsAdd from "~icons/material-symbols/add";
    import MaterialSymbolsGesture from "~icons/material-symbols/gesture";
    import MaterialSymbolsColorize from "~icons/material-symbols/colorize";
    import MaterialSymbolsViewWeekSharp from "~icons/material-symbols/view-week-sharp";
    import MaterialSymbolsNetworkIntelligence from "~icons/material-symbols/network-intelligence";
    import MaterialSymbolsConvertToTextOutlineSharp from "~icons/material-symbols/convert-to-text-outline-sharp";

    import {
        addToPalGenColours,
        exportToStringFromPalGen,
        palGenColours,
        tryParseFromStringToPalGen,
        randomiseUnlockedColoursForPalGen,
    } from "src/states/palGenState.svelte.js";
    import { addToPaletteGalleryFromPaletteGenerator } from "src/states/paletteGalleryState.svelte.js";
    import {
        passSomeColourStringsToWallpaperGenerator,
        readjustWallGenColoursInUseCount,
        setWallGenColourInUseCount,
    } from "src/states/wallGenState.svelte.js";
    import { generatePaletteWithGemini } from "src/states/geminiState.svelte.js";
    import { computeBaseUrl } from "src/lib/utils.js";

    const addColour = () => {
        addToPalGenColours();
    };

    const generatePalette = () => {
        randomiseUnlockedColoursForPalGen();
    };

    const passToWallpaperGenerator = () => {
        const newColours = palGenColours.val.map((item) => item.colour);

        passSomeColourStringsToWallpaperGenerator(newColours);
        setWallGenColourInUseCount(newColours.length);
        readjustWallGenColoursInUseCount();

        goto("/");
    };

    const savePalette = () => {
        addToPaletteGalleryFromPaletteGenerator();
    };

    const parseFromString = () => {
        const inputData = window.prompt(
            "Enter palette data. This should be a list of hex codes, with or without the hash sign, with or without double quotes, separated by either dash or comma. Refer to help for more details."
        );
        if (!inputData) return;

        tryParseFromStringToPalGen(inputData);
    };

    const generatePaletteWithAi = async () => {
        const response = await generatePaletteWithGemini();
        if (!response) return;

        tryParseFromStringToPalGen(response);
    };

    const computeShareableUrl = () => {
        const url = new URL(`${computeBaseUrl()}/generate-palette`);
        url.searchParams.append("colours", exportToStringFromPalGen());

        return url.toString();
    };

    const handleDndSort = (e: CustomEvent<DndEvent<PalGenColObj>>) => {
        palGenColours.set(e.detail.items);
    };

    const transformDraggedElement: TransformDraggedElementFunction = (
        draggedEl,
        data,
        index
    ) => {
        draggedEl?.classList.add("IsDragged");
    };

    const flipDurationMs = 200;

    const dropdownActionItems = [
        {
            id: "savePalette",
            label: "Save as palette",
            tooltip: "Save current settings as a palette",
            action: savePalette,
            icon: MaterialSymbolsViewWeekSharp,
        },
        {
            id: "passToWallGen",
            label: "Pass to Wallpaper Generator",
            tooltip: "Pass the palette to Wallpaper Generator",
            action: passToWallpaperGenerator,
            icon: MaterialSymbolsColorize,
        },
        {
            id: "generateAi",
            label: "Generate with AI",
            tooltip: "Generate a palette using AI with a theme prompt",
            action: generatePaletteWithAi,
            icon: MaterialSymbolsNetworkIntelligence,
        },
        {
            id: "import",
            label: "Import from string",
            tooltip: "Enter a string of data to recover a palette",
            action: parseFromString,
            icon: MaterialSymbolsConvertToTextOutlineSharp,
        },
    ];
</script>

<div class="PaletteGenerator">
    <div
        class="PaletteGenerator__PaletteBox"
        use:dragHandleZone={{
            items: palGenColours.val,
            flipDurationMs,
            dropTargetStyle: {
                outline: "2px solid var(--colPri)",
            },
            transformDraggedElement,
        }}
        onconsider={handleDndSort}
        onfinalize={handleDndSort}
    >
        {#each palGenColours.val as palGenItem, index (palGenItem.id)}
            <div
                class="PaletteGenerator__ItemWrapper"
                animate:flip={{ duration: flipDurationMs }}
            >
                <PaletteGeneratorItem {palGenItem} {index} />
            </div>
        {/each}
    </div>

    <div class="PaletteGenerator__ActionsContainerUpper">
        <button
            class="ColourInputContainer__AddBtn IconButtonWithLabel"
            disabled={palGenColours.val.length >= MAX_COLOUR_COUNT}
            onclick={addColour}
            title={"Add colour"}
            aria-label={"Add colour"}
        >
            <MaterialSymbolsAdd />
            <span>Add colour</span>
        </button>
    </div>

    <div class="PaletteGenerator__ActionsContainerLower">
        <div class="SplitBtn SplitBtn--IsPri">
            <button
                class="PaletteGenerator__ActionBtn IconButtonWithLabel SplitBtn__Pri"
                onclick={generatePalette}
                title={"Generate new palettes"}
                aria-label={"Generate new palettes"}
            >
                <MaterialSymbolsGesture />
                <span>Generate</span>
            </button>
            <DropdownMenu
                actionItems={dropdownActionItems}
                isSplitBtnPart={true}
            />
        </div>
    </div>

    <div class="PaletteGenerator__ShareContainer">
        <SharePanel
            domId="SharePalette"
            title="Share this palette"
            desc="Save this or send it to someone. Choose [Import from string] to re-access this palette."
            shareItemList={[
                {
                    label: "Importable plain string",
                    content: exportToStringFromPalGen(),
                    shareTitle: "Colour palette from Pura Tela",
                    shareText:
                        "Check out this beautiful colour palette you can import to Pura Tela:",
                    isContentPlainText: true,
                },
                {
                    label: "Direct link",
                    content: computeShareableUrl(),
                    shareTitle: "Colour palette from Pura Tela",
                    shareText:
                        "Check out this beautiful colour palette in Pura Tela:",
                },
            ]}
        />
    </div>
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
        transition:
            width var(--transTime) ease-in-out,
            height var(--transTime) ease-in-out;
    }

    :global(.PaletteGenerator__ItemWrapper.IsDragged) {
        opacity: 0.5 !important;
    }

    .PaletteGenerator__ActionsContainerUpper,
    .PaletteGenerator__ActionsContainerLower {
        margin-top: 2rem;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
    }

    .PaletteGenerator__ActionsContainerUpper {
        justify-content: flex-end;
    }

    .PaletteGenerator__ActionsContainerLower {
        justify-content: flex-start;
    }

    .PaletteGenerator__ShareContainer {
        margin-top: 3rem;
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

        .PaletteGenerator__ActionsContainerLower {
            justify-content: flex-end;
        }
    }
</style>
