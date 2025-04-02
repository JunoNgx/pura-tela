<script lang="ts">
    import RadioCheckbox from "src/components/RadioCheckbox.svelte";
    import { WallpaperStyle, type MouseInputEvent } from "src/lib/types.js";
	import { getCurrWallStyleInfo, isGradientStyle, isColourSwatchStyle, isPopArtSquareStyle, isSolidStyle, setWallGenColourInUseCount, wallGenStyle } from "src/states/wallGenState.svelte.js";
	import StyleConfigColourSwatch from "./StyleConfigColourSwatch.svelte";
	import StyleConfigGradient from "./StyleConfigGradient.svelte";

    const handleWallpaperStyleChange = (e: MouseInputEvent) => {
        const newValue = e.currentTarget.value as WallpaperStyle;
        wallGenStyle.set(newValue);

        const newDefaultColourCount = getCurrWallStyleInfo().defaultColourCount
        setWallGenColourInUseCount(newDefaultColourCount);
    }
</script>

<section class="StyleSelector">
    <fieldset class="StyleSelector__Fieldset">
        <legend><h3>Wallpaper Style</h3></legend>

        <div class="StyleSelector__Container">
            <RadioCheckbox
                value={WallpaperStyle.SOLID}
                checked={isSolidStyle()}
                onclick={handleWallpaperStyleChange}
            >
                Solid colour
            </RadioCheckbox>

            <RadioCheckbox
                value={WallpaperStyle.GRADIENT}
                checked={isGradientStyle()}
                onclick={handleWallpaperStyleChange}
            >
                Gradient
            </RadioCheckbox>

            <RadioCheckbox
                value={WallpaperStyle.POP_ART_SQUARE}
                checked={isPopArtSquareStyle()}
                onclick={handleWallpaperStyleChange}
            >
                Pop art square
            </RadioCheckbox>

            <RadioCheckbox
                value={WallpaperStyle.COLOUR_SWATCH}
                checked={isColourSwatchStyle()}
                onclick={handleWallpaperStyleChange}
            >
                Colour swatch
            </RadioCheckbox>
        </div>

    </fieldset>
</section>

<section class="StyleConfig">
    {#if isColourSwatchStyle()}
        <StyleConfigColourSwatch />
    {:else if isGradientStyle()}
        <StyleConfigGradient />
    {/if}
</section>

<style>
    .StyleSelector__Container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }

    .StyleSelector__Fieldset {
        border: none;
        padding: 0;
        margin: 0;
    }
</style>
