<script lang="ts">
    import { goto } from "$app/navigation";
    import { MAX_HEIGHT, MAX_WIDTH, MIN_DIMENSION } from "src/lib/constants.js";
    import { tryParseNumericData } from "src/lib/parseFuncs.js";
    import {
        setWallGenSizeHeight,
        setWallGenSizeWidth,
        wallGenSize,
    } from "src/states/wallGenState.svelte.js";
    import { sizeGallery } from "src/states/sizeGalleryState.svelte.js";
    import DropdownMenu from "src/components/DropdownMenu.svelte";

    let width = $derived(wallGenSize.val.width);
    let height = $derived(wallGenSize.val.height);
    let shouldShowIncorrectInput = $state(false);

    const onWidthChange = (value: string) => {
        const parsedValue = tryParseNumericData(
            value,
            MIN_DIMENSION,
            MAX_WIDTH
        );

        if (!parsedValue) {
            shouldShowIncorrectInput = true;
            return;
        }

        shouldShowIncorrectInput = false;
        setWallGenSizeWidth(parsedValue);
    };

    const onHeightChange = (value: string) => {
        const parsedValue = tryParseNumericData(
            value,
            MIN_DIMENSION,
            MAX_HEIGHT
        );

        if (!parsedValue) {
            shouldShowIncorrectInput = true;
            return;
        }

        shouldShowIncorrectInput = false;
        setWallGenSizeHeight(parsedValue);
    };

    const goToSizeGallery = () => {
        goto("/sizes");
    };

    const presetActionItems = sizeGallery
        .filter(preset => preset.isFeatured)
        .map((preset) => ({
            id: preset.name,
            label: `${preset.name} (${preset.width}×${preset.height})`,
            action: () => {
                console.log("fksdjk")
                setWallGenSizeWidth(preset.width);
                setWallGenSizeHeight(preset.height);
            },
        })
    );
</script>

<section class="SizeInput">
    <h3>Dimensions</h3>

    {#if shouldShowIncorrectInput}
        <p class="Error">
            Dimension input is invalid. Please try again and consider using
            presets.
        </p>
    {/if}

    <div class="SizeInput__MainContent">
        <div class="SizeInput__LeftSide">
            <div class="SizeInput__InputItem">
                <label class="SizeInput__Label" for="wallGenWidth">
                    Width
                </label>
                <input
                    class="SizeInput__Input"
                    id="wallGenWidth"
                    name="sizeWidth"
                    type="number"
                    min="1"
                    max={MAX_WIDTH}
                    title="Width of the wallpaper"
                    aria-label="Width of the wallpaper"
                    pattern="[0-9]*"
                    value={width}
                    oninput={(e) => {
                        onWidthChange((e.target as HTMLInputElement).value);
                    }}
                />
            </div>

            <div class="SizeInput__InputItem">
                <label class="SizeInput__Label" for="wallGenHeight">
                    Height
                </label>
                <input
                    class="SizeInput__Input"
                    id="wallGenHeight"
                    name="sizeHeight"
                    type="number"
                    min="1"
                    max={MAX_HEIGHT}
                    title="Height of the wallpaper"
                    aria-label="Height of the wallpaper"
                    value={height}
                    oninput={(e) => {
                        onHeightChange((e.target as HTMLInputElement).value);
                    }}
                />
            </div>
        </div>

        <div class="SizeInput__RightSide">
            <div class="SplitBtn">
                <button
                    class="SizeInput__ActionBtn SplitBtn__Pri"
                    onclick={goToSizeGallery}
                    title="View list of size presets"
                    aria-label="View list of size presets"
                >
                    Presets
                </button>
                <DropdownMenu
                    actionItems={presetActionItems}
                    isSplitBtnPart={true}
                />
            </div>
        </div>
    </div>
</section>

<style>
    .SizeInput__MainContent {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 4rem;
        margin: 1rem 0;
    }

    .SizeInput__LeftSide {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 3rem;
    }

    .SizeInput__InputItem {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .SizeInput__Input {
        width: 4rem;
    }

    @media screen and (width <= 850px) {
        .SizeInput__MainContent,
        .SizeInput__LeftSide {
            gap: 2rem;
        }
    }
</style>
