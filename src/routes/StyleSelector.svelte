<script lang="ts">
    import { WallpaperStyle } from "src/lib/types.js";
	import { getCurrWallStyleInfo, isGradientStyle, isPaletteRowStyle, isPopArtSquareStyle, isSolidStyle, setWallGenColourInUseCount, wallGenStyle } from "src/states/wallGenState.svelte.js";

    const handleWallpaperStyleChange = (newValue: WallpaperStyle) => {
        wallGenStyle.set(newValue);

        const newDefaultColourCount = getCurrWallStyleInfo().defaultColourCount
        setWallGenColourInUseCount(newDefaultColourCount);
    }
</script>

<section class="StyleSelector">
    <h3>Wallpaper Style</h3>
    <div class="StyleSelector__Container">
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isSolidStyle()}
            title="Switch to Wallpaper Style: Solid"
            aria-label="Switch to Wallpaper Style: Solid"
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.SOLID); }}
        >
            Solid wallpaper
        </button>
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isGradientStyle()}
            title="Switch to Wallpaper Style: Gradient"
            aria-label="Switch to Wallpaper Style: Gradient"
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.GRADIENT); }}
        >
            Gradient wallpaper
        </button>
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isPopArtSquareStyle()}
            title="Switch to Wallpaper Style: Pop Art Square"
            aria-label="Switch to Wallpaper Style: Pop Art Square"
            onclick={() => { handleWallpaperStyleChange(WallpaperStyle.POP_ART_SQUARE); }}
        >
            Pop Art Square
        </button>
        <button class="StyleSelector__ModeItem"
            class:StyleSelector__ModeItem--IsSelected={isPaletteRowStyle()}
            title="Switch to Wallpaper Style: Palette Row"
            aria-label="Switch to Wallpaper Style: Palette Row"
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
