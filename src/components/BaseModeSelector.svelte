<script lang="ts">
    import { WallpaperMode } from "src/lib/types.js";
    import { currWallpaperMode } from "src/lib/states.svelte.js";

    let isSolidMode = $derived(currWallpaperMode.val === WallpaperMode.SOLID);
    let isGradientMode = $derived(currWallpaperMode.val === WallpaperMode.GRADIENT);

    const handleWallpaperModeChange = (newValue: WallpaperMode) => {
        currWallpaperMode.set(newValue);
    }
</script>

<section class="ModeSelect">
    <h3>Wallpaper Style</h3>
    <div class="ModeSelect__Container">
        <button class="ModeSelect__ModeItem"
            class:ModeSelect__ModeItem--IsSelected={isSolidMode}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.SOLID); }}
        >
            Solid wallpaper
        </button>
        <button class="ModeSelect__ModeItem"
            class:ModeSelect__ModeItem--IsSelected={isGradientMode}
            onclick={() => { handleWallpaperModeChange(WallpaperMode.GRADIENT); }}
        >
            Gradient wallpaper
        </button>
    </div>
</section>

<style>
    .ModeSelect {
        margin-top: 1.5rem;
    }

    .ModeSelect__Container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
    }

    .ModeSelect__ModeItem {
        outline-offset: 3px;
        outline-color: transparent;
        outline-width: 2px;
        outline-style: dashed;
        flex-grow: 1;
    }

    .ModeSelect__ModeItem--IsSelected {
        outline-color: var(--colPri);
    }

</style>