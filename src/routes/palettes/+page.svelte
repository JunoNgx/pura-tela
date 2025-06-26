<script lang="ts">
    import MaterialSymbolsDeviceReset from "~icons/material-symbols/device-reset";

    import PaletteList from "src/routes/palettes/PaletteList.svelte";
    import { resetPaletteGallery } from "src/states/paletteGalleryState.svelte.js";
    import { paletteGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";
    import { createScrollPositionManager } from "src/lib/scrollPositionManager.js";

    createScrollPositionManager("/palettes", paletteGalleryScrollPos);

    const handleResetGallery = () => {
        const isConfirmed = window.confirm(
            "Reset the gallery to default colours? This action cannot be undone."
        );
        if (!isConfirmed) return;

        resetPaletteGallery();
    };
</script>

<h2>Palette Gallery</h2>
<div class="RouteInstruction">
    Pass palettes to <code>Wallpaper Generator</code> or
    <code>Palette Generator</code>. Click on any colour to copy its hex colour
    code.
</div>
<PaletteList />
<button
    class="ResetButton IconButtonWithLabel"
    onclick={handleResetGallery}
    aria-label="Reset colour gallery"
>
    <MaterialSymbolsDeviceReset />
    <span>Reset gallery</span>
</button>

<style>
    .ResetButton {
        color: var(--colDanger);
        margin-top: 2rem;
        margin-left: auto;
    }
</style>
