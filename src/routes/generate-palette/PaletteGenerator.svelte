<script lang="ts">
    import {
        dragHandleZone,
        type DndEvent,
        type TransformDraggedElementFunction,
    } from "svelte-dnd-action";
    import { goto } from "$app/navigation";
    import { flip } from "svelte/animate";

    import SharePanel from "src/components/SharePanel.svelte";
    import AiRequestStatus from "src/components/AiRequestStatus.svelte";
    import DropdownMenu from "src/components/DropdownMenu.svelte";
    import type { DropdownMenuItem } from "src/lib/types.js";
    import PaletteGeneratorItem from "src/routes/generate-palette/PaletteGeneratorItem.svelte";
    import type { PalGenColObj } from "src/lib/types.js";
    import { MAX_COLOUR_COUNT } from "src/lib/constants.js";

    import MaterialSymbolsAdd from "~icons/material-symbols/add";
    import MaterialSymbolsGesture from "~icons/material-symbols/gesture";
    import MaterialSymbolsColorize from "~icons/material-symbols/colorize";
    import MaterialSymbolsViewWeekSharp from "~icons/material-symbols/view-week-sharp";
    import MaterialSymbolsNetworkIntelligence from "~icons/material-symbols/network-intelligence";
    import MaterialSymbolsConvertToTextOutlineSharp from "~icons/material-symbols/convert-to-text-outline-sharp";
    import MaterialSymbolsRadioButtonChecked from "~icons/material-symbols/radio-button-checked";
    import MaterialSymbolsRadioButtonUnchecked from "~icons/material-symbols/radio-button-unchecked";

    import {
        addToPalGenColours,
        exportToStringFromPalGen,
        palGenColours,
        tryParseFromStringToPalGen,
        generateUnlockedColoursForPalGen,
        paletteGenerationMode,
    } from "src/states/palGenState.svelte.js";
    import { PaletteGenerationMode } from "src/lib/types.js";
    import { addToPaletteGalleryFromPaletteGenerator } from "src/states/paletteGalleryState.svelte.js";
    import {
        passSomeColourStringsToWallpaperGenerator,
        readjustWallGenColoursInUseCount,
        setWallGenColourInUseCount,
    } from "src/states/wallGenState.svelte.js";
    import { generatePaletteWithAi, hasAiProvider } from "src/states/aiProviderState.svelte.js";
    import { computeBaseUrl } from "src/lib/utils.js";
    import { onDestroy, onMount } from "svelte";

    const addColour = () => {
        addToPalGenColours();
    };

    const generatePalette = () => {
        generateUnlockedColoursForPalGen();
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

    const generatePaletteWithAiAction = async () => {
        const response = await generatePaletteWithAi();
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

    const otherActionItems = [
        {
            id: "savePalette",
            label: "Save as palette",
            tooltip: "Save current settings as a palette",
            action: savePalette,
            icon: MaterialSymbolsViewWeekSharp,
        },
        {
            id: "import",
            label: "Import from string",
            tooltip: "Enter a string of data to recover a palette",
            action: parseFromString,
            icon: MaterialSymbolsConvertToTextOutlineSharp,
        },
    ];

    const generationModeItems = $derived.by((): DropdownMenuItem[] => {
        const items: DropdownMenuItem[] = [
            {
                id: PaletteGenerationMode.SMART_RANDOM,
                label: "Smart Random",
                tooltip: "Random colours constrained to locked colours' range",
                action: () =>
                    paletteGenerationMode.set(PaletteGenerationMode.SMART_RANDOM),
                icon:
                    paletteGenerationMode.val === PaletteGenerationMode.SMART_RANDOM
                        ? MaterialSymbolsRadioButtonChecked
                        : MaterialSymbolsRadioButtonUnchecked,
            },
            {
                id: PaletteGenerationMode.ANALOGOUS,
                label: "Analogous",
                tooltip: "Colours near each other on the colour wheel",
                action: () =>
                    paletteGenerationMode.set(PaletteGenerationMode.ANALOGOUS),
                icon:
                    paletteGenerationMode.val === PaletteGenerationMode.ANALOGOUS
                        ? MaterialSymbolsRadioButtonChecked
                        : MaterialSymbolsRadioButtonUnchecked,
            },
            {
                id: PaletteGenerationMode.COMPLEMENTARY,
                label: "Complementary",
                tooltip: "Opposite colours on the colour wheel",
                action: () =>
                    paletteGenerationMode.set(PaletteGenerationMode.COMPLEMENTARY),
                icon:
                    paletteGenerationMode.val
                    === PaletteGenerationMode.COMPLEMENTARY
                        ? MaterialSymbolsRadioButtonChecked
                        : MaterialSymbolsRadioButtonUnchecked,
            },
            {
                id: PaletteGenerationMode.TRIADIC,
                label: "Triadic",
                tooltip: "Evenly spaced colours on the colour wheel",
                action: () =>
                    paletteGenerationMode.set(PaletteGenerationMode.TRIADIC),
                icon:
                    paletteGenerationMode.val === PaletteGenerationMode.TRIADIC
                        ? MaterialSymbolsRadioButtonChecked
                        : MaterialSymbolsRadioButtonUnchecked,
            },
            {
                id: PaletteGenerationMode.TRUE_RANDOM,
                label: "True Random",
                tooltip: "Completely random colours",
                action: () =>
                    paletteGenerationMode.set(PaletteGenerationMode.TRUE_RANDOM),
                icon:
                    paletteGenerationMode.val === PaletteGenerationMode.TRUE_RANDOM
                        ? MaterialSymbolsRadioButtonChecked
                        : MaterialSymbolsRadioButtonUnchecked,
            },
        ];

        if (hasAiProvider.val) {
            const generateAiItem = {
                id: "generateAi",
                label: "Generate with AI",
                tooltip: "Generate a palette using AI with a theme prompt",
                action: generatePaletteWithAiAction,
                icon: MaterialSymbolsNetworkIntelligence,
                hasTopSeparator: true,
            };
            items.push(generateAiItem);
        }

        return items;
    });

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.code === "Space") {
            e.preventDefault();
            generatePalette();
        }
    };

    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
    });

    onDestroy(() => {
        window.removeEventListener("keydown", handleKeydown);
    });
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
        <div class="PaletteGenerator__GenerateBtn SplitBtn SplitBtn--IsPri">
            <button
                class="IconButtonWithLabel SplitBtn__Pri"
                onclick={generatePalette}
                title={"Generate new palettes"}
                aria-label={"Generate new palettes"}
            >
                <MaterialSymbolsGesture />
                <span>Generate</span>
            </button>
            <DropdownMenu
                actionItems={generationModeItems}
                isSplitBtnPart={true}
            />
        </div>

        <button
            class="PaletteGenerator__AddBtn IconButtonWithLabel"
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
        <div class="AiRequestGroup AiRequestGroup--FlexEnd">
            <div class="SplitBtn">
                <button
                    class="IconButtonWithLabel SplitBtn__Pri"
                    onclick={passToWallpaperGenerator}
                    title={"Pass the palette to Wallpaper Generator"}
                    aria-label={"Pass the palette to Wallpaper Generator"}
                >
                    <MaterialSymbolsColorize />
                    <span>Pass to Wallpaper</span>
                </button>
                <DropdownMenu
                    actionItems={otherActionItems}
                    isSplitBtnPart={true}
                />
            </div>
            <AiRequestStatus shouldAlignRight />
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
        margin: 1rem 0;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .PaletteGenerator__ActionsContainerUpper {
        justify-content: space-between;
    }

    .PaletteGenerator__ActionsContainerLower {
        justify-content: flex-end;
    }

    .PaletteGenerator__ShareContainer {
        margin-top: 3rem;
    }

    @media screen and (width < 850px) {
        .PaletteGenerator__PaletteBox {
            display: flex;
            flex-direction: column;
            height: 70vh;
        }

        .PaletteGenerator__ItemWrapper {
            height: 7.5rem;
        }
    }

    @media screen and (width < 370px) {
        .PaletteGenerator__ActionsContainerUpper {
            flex-direction: row-reverse;
        }

        .PaletteGenerator__GenerateBtn {
            order: 1;
        }
    }
</style>
