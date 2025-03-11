<script lang="ts">
    import { WallpaperMode } from "src/lib/types.js";
	import { isGradientMode, isPaletteRowMode, isPopArtSquareMode, isSolidMode, readjustWallGenColoursInUseCount, wallGenMode } from "src/states/wallGenState.svelte.js";

    const handleWallpaperModeChange = (newValue: WallpaperMode) => {
        wallGenMode.set(newValue);
        readjustWallGenColoursInUseCount();
    }
</script>

<section class="ModeSelect">
    <h3>Wallpaper Style</h3>
    <div class="ModeSelect__Container">
        <button class="ModeSelect__ModeItem"
            class:ModeSelect__ModeItem--IsSelected={isSolidMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.SOLID); }}
        >
            Solid wallpaper
        </button>
        <button class="ModeSelect__ModeItem"
            class:ModeSelect__ModeItem--IsSelected={isGradientMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.GRADIENT); }}
        >
            Gradient wallpaper
        </button>
        <button class="ModeSelect__ModeItem"
            class:ModeSelect__ModeItem--IsSelected={isPopArtSquareMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.POP_ART_SQUARE); }}
        >
            Pop Art Square
        </button>
        <button class="ModeSelect__ModeItem"
            class:ModeSelect__ModeItem--IsSelected={isPaletteRowMode()}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.PALETTE_ROW); }}
        >
            Palette Row
        </button>
    </div>
</section>

<style>
    .ModeSelect {
        /* margin-top: 1.5rem; */
    }

    .ModeSelect__Container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }

    .ModeSelect__ModeItem--IsSelected {
        box-shadow: 0 0 0 4px var(--colPri);
    }

</style>