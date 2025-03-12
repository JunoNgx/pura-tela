<script lang="ts">
    import { WallpaperMode } from "src/lib/types.js";
	import { isGradientMode, isPaletteRowMode, isPopArtSquareMode, isSolidMode, readjustWallGenColoursInUseCount, wallGenStyle } from "src/states/wallGenState.svelte.js";

    const handleWallpaperModeChange = (newValue: WallpaperMode) => {
        wallGenStyle.set(newValue);
        readjustWallGenColoursInUseCount();
    }
</script>

<section class="ModeSelector">
    <h3>Wallpaper Style</h3>
    <div class="ModeSelector__Container">
        <button class="ModeSelector__ModeItem"
            class:ModeSelector__ModeItem--IsSelected={isSolidMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.SOLID); }}
        >
            Solid wallpaper
        </button>
        <button class="ModeSelector__ModeItem"
            class:ModeSelector__ModeItem--IsSelected={isGradientMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.GRADIENT); }}
        >
            Gradient wallpaper
        </button>
        <button class="ModeSelector__ModeItem"
            class:ModeSelector__ModeItem--IsSelected={isPopArtSquareMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.POP_ART_SQUARE); }}
        >
            Pop Art Square
        </button>
        <button class="ModeSelector__ModeItem"
            class:ModeSelector__ModeItem--IsSelected={isPaletteRowMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.PALETTE_ROW); }}
        >
            Palette Row
        </button>
    </div>
</section>

<style>
    .ModeSelector__Container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }

    .ModeSelector__ModeItem--IsSelected {
        box-shadow: 0 0 0 4px var(--colPri);
    }

</style>