<script lang="ts">
    import MaterialSymbolsDeviceReset from "~icons/material-symbols/device-reset";
    import MaterialSymbolsResetSettings from "~icons/material-symbols/reset-settings";

    import PaletteList from "src/routes/palettes/PaletteList.svelte";
    import { reloadFactoryPalettes, resetPaletteGallery } from "src/states/paletteGalleryState.svelte.js";
    import { paletteGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";
    import { createScrollPositionManager } from "src/lib/scrollPositionManager.js";

    createScrollPositionManager("/palettes", paletteGalleryScrollPos);

    const handleResetGallery = () => {
        const isConfirmed = window.confirm(
            "Reset the gallery to default colours? This will also erase your custom data and cannot be undone."
        );
        if (!isConfirmed) return;

        resetPaletteGallery();
    };

    const handleReloadFactoryPalettes = () => {
        const isConfirmed = window.confirm(
            "Reload the gallery with factory palettes? Your user-created data will remain intact."
        );
        if (!isConfirmed) return;

        reloadFactoryPalettes();
    };

</script>

<h2>Palette Gallery</h2>
<div class="RouteInstruction">
    Pass palettes to <code>Wallpaper Generator</code> or
    <code>Palette Generator</code>. Click on any colour to copy its hex colour
    code.
</div>
<PaletteList />
<div class="ButtonsContainer RightAlignedButtonsContainer">
    <button
        class="ReloadFactoryButton IconButtonWithLabel"
        title="Restore factory pallettes while retaining your custom data"
        onclick={handleReloadFactoryPalettes}
        aria-label="Restore factory pallettes while retaining your custom data"
    >
        <MaterialSymbolsResetSettings />
        <span>Reload factory palettes</span>
    </button>
    <button
        class="ResetButton IconButtonWithLabel"
        title="Delete everything and reset colour gallery to default factory"
        onclick={handleResetGallery}
        aria-label="Delete everything and reset colour gallery to default factory"
    >
        <MaterialSymbolsDeviceReset />
        <span>Reset gallery</span>
    </button>
</div>

<style>
    .ReloadFactoryButton {
        color: var(--colInfo);
    }

    .ResetButton {
        color: var(--colDanger);
    }
</style>
