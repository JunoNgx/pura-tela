<script lang="ts">
    import { WallpaperStyle } from "src/lib/types.js";
	import { isGradientMode, isPaletteRowMode, isPopArtSquareMode, isSolidMode, readjustWallGenColoursInUseCount, wallGenStyle } from "src/states/wallGenState.svelte.js";

    const handleWallpaperStyleChange = (newValue: WallpaperStyle) => {
        wallGenStyle.set(newValue);
        readjustWallGenColoursInUseCount();
    }
</script>

<section class="StyleSelector">
    <h3>Wallpaper Style</h3>
    <div class="StyleSelector__Container">
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isSolidMode()}
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.SOLID); }}
        >
            Solid wallpaper
        </button>
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isGradientMode()}
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.GRADIENT); }}
        >
            Gradient wallpaper
        </button>
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isPopArtSquareMode()}
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.POP_ART_SQUARE); }}
        >
            Pop Art Square
        </button>
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isPaletteRowMode()}
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.PALETTE_ROW); }}
        >
            Palette Row
        </button>
    </div>
</section>

<style>
    .StyleSelector__Container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }

    .StyleSelector__ModeItem--IsSelected {
        box-shadow: 0 0 0 4px var(--colPri);
    }

</style>