<script lang="ts">
	import { goto } from "$app/navigation";
	import { MAX_HEIGHT, MAX_WIDTH } from "src/lib/constants.js";
	import { tryParseSize } from "src/lib/parseFuncs.js";
	import { setWallGenSize, wallGenSize } from "src/states/wallGenState.svelte.js";

    let width = $state(wallGenSize.val.width);
    let height = $state(wallGenSize.val.height);
    let shouldShowIncorrectInput = $state(false);

    const onWidthChange = (value: string) => {
        tryUpdateWallGenSize(value, height);
    }

    const onHeightChange = (value: string) => {
        tryUpdateWallGenSize(width, value);
    }

    const isInputValid = () => {
        const isWidthValid = 1 < width && width < MAX_WIDTH;
        const isHeightValid = 1 < height && height < MAX_HEIGHT;

        return isWidthValid && isHeightValid;
    }

    const tryUpdateWallGenSize = (
        widthStr: string | number,
        heightStr: string | number
    ) => {
        const data = tryParseSize(widthStr, heightStr);

        if (!data) {
            shouldShowIncorrectInput = true;
            return;
        }

        shouldShowIncorrectInput = false;
        setWallGenSize(data.width, data.height);
    };

    const goToSizeGallery = () => {
        goto("/sizes")
    }
</script>

<section class="SizeInput">
    <h3>
        <label for="size">Dimensions</label>
    </h3>

    {#if shouldShowIncorrectInput}
        <p class="Error">
            Dimension input is invalid. Please try again and consider using presets.
        </p>
    {/if}

    <div class="SizeInput__MainContent">
        <div class="SizeInput__LeftSide">
            <div class="SizeInput__InputItem">
                <label class="SizeInput__Label"
                    for="wallGenWidth"
                >
                    Width
                </label>
                <input class="SizeInput__Input"
                    id="wallGenWidth"
                    name="sizeWidth"
                    type="number"
                    min=1
                    max={MAX_WIDTH}
                    title="Width of the wallpaper"
                    aria-label="Width of the wallpaper"
                    pattern="[0-9]*"
                    value={width}
                    oninput={e => {onWidthChange((e.target as HTMLInputElement).value)}}
                />
            </div>

            <div class="SizeInput__InputItem">
                <label class="SizeInput__Label"
                    for="wallGenHeight"
                >
                    Height
                </label>
                <input class="SizeInput__Input"
                    id="wallGenHeight"
                    name="sizeHeight"
                    type="number"
                    min=1
                    max={MAX_HEIGHT}
                    title="Height of the wallpaper"
                    aria-label="Height of the wallpaper"
                    bind:value={height}
                    oninput={e => {onHeightChange((e.target as HTMLInputElement).value)}}
                />
            </div>
        </div>


        <div class="SizeInput__RightSide">
            <button class="SizeInput__ActionBtn"
                onclick={goToSizeGallery}
                title="View list of size presets"
                aria-label="View list of size presets"
            >
                View presets
            </button>
        </div>
    </div>
</section>

<style>
    .SizeInput__MainContent {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
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
</style>