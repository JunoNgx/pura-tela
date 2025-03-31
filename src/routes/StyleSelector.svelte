<script lang="ts">
    import { WallpaperStyle } from "src/lib/types.js";
	import { getCurrWallStyleInfo, isGradientStyle, isPaletteRowStyle, isPopArtSquareStyle, isSolidStyle, setWallGenColourInUseCount, wallGenStyle } from "src/states/wallGenState.svelte.js";

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
            <label class="StyleSelector__StyleItem CustomRadioCheckbox">
                <input
                    type="radio"
                    value={WallpaperStyle.SOLID}
                    checked={isSolidStyle()}
                    onclick={handleWallpaperStyleChange}
                />
                <span class="CustomRadioCheckbox__Checkmark"
                    aria-hidden=true
                ></span>
                Solid wallpaper
            </label>

            <label class="StyleSelector__StyleItem CustomRadioCheckbox">
                <input
                    type="radio"
                    value={WallpaperStyle.GRADIENT}
                    checked={isGradientStyle()}
                    onclick={handleWallpaperStyleChange}
                />
                <span class="CustomRadioCheckbox__Checkmark"
                    aria-hidden=true
                ></span>
                Gradient wallpaper
            </label>

            <label class="StyleSelector__StyleItem CustomRadioCheckbox">
                <input
                    type="radio"
                    value={WallpaperStyle.POP_ART_SQUARE}
                    checked={isPopArtSquareStyle()}
                    onclick={handleWallpaperStyleChange}
                />
                <span class="CustomRadioCheckbox__Checkmark"
                    aria-hidden=true
                ></span>
                Pop art square
            </label>

            <label class="StyleSelector__StyleItem CustomRadioCheckbox">
                <input
                    type="radio"
                    value={WallpaperStyle.PALETTE_ROW}
                    checked={isPaletteRowStyle()}
                    onclick={handleWallpaperStyleChange}
                />
                <span class="CustomRadioCheckbox__Checkmark"
                    aria-hidden=true
                ></span>
                Palette row
            </label>
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
