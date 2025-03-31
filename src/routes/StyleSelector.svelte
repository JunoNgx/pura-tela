<script lang="ts">
    import RadioCheckbox from "src/components/RadioCheckbox.svelte";
import { WallpaperStyle } from "src/lib/types.js";
	import { getCurrWallStyleInfo, isGradientStyle, isColourSwatchStyle, isPopArtSquareStyle, isSolidStyle, setWallGenColourInUseCount, wallGenStyle } from "src/states/wallGenState.svelte.js";

    type InputEvent = MouseEvent & {
        currentTarget: EventTarget & HTMLInputElement
    };

    const handleWallpaperStyleChange = (e: InputEvent) => {
        const newValue = e.currentTarget.value as WallpaperStyle;
        wallGenStyle.set(newValue);

        const newDefaultColourCount = getCurrWallStyleInfo().defaultColourCount
        setWallGenColourInUseCount(newDefaultColourCount);
    }
</script>

<section class="StyleSelector">
    <fieldset>
        <legend><h3>Wallpaper Style</h3></legend>

        <div class="StyleSelector__Container">
            <RadioCheckbox
                value={WallpaperStyle.SOLID}
                checked={isSolidStyle()}
                onclick={handleWallpaperStyleChange}
            >
                Solid wallpaper
            </RadioCheckbox>

            <RadioCheckbox
                value={WallpaperStyle.GRADIENT}
                checked={isGradientStyle()}
                onclick={handleWallpaperStyleChange}
            >
                Gradient wallpaper
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
                Palette row
            </RadioCheckbox>
        </div>

    </fieldset>
</section>

<style>
    .StyleSelector__Container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }

</style>
