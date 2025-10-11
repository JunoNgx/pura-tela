<script lang="ts">
    import MaterialSymbolsDeviceReset from "~icons/material-symbols/device-reset";

    import ColourList from "src/routes/colours/ColourList.svelte";
    import { reloadFactoryColours, resetColourGallery } from "src/states/colourGalleryState.svelte.js";
    import { colourGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";
    import { createScrollPositionManager } from "src/lib/scrollPositionManager.js";

    createScrollPositionManager("/colours", colourGalleryScrollPos);

    const handleResetGallery = () => {
        const isConfirmed = window.confirm(
            "Reset the gallery to default colours? This will also erase your data and cannot be undone."
        );
        if (!isConfirmed) return;

        resetColourGallery();
    };

    const handleReloadFactoryColours = () => {
        const isConfirmed = window.confirm(
            "Reload the gallery with factory colours? Your user-created data will remain intact."
        );
        if (!isConfirmed) return;

        reloadFactoryColours();
    };
</script>

<h2>Colour Gallery</h2>
<p class="RouteInstruction">
    Pass colour to <code>Wallpaper Generator</code>, or copy its hex colour code
    for your own use.
</p>
<ColourList />
<div class="ButtonsContainer RightAlignedButtonsContainer">
    <button
        class="ReloadFactoryButton IconButtonWithLabel"
        title="Restore factory colours while retaining your custom data"
        aria-label="Restore factory colours while retaining your custom data"
        onclick={handleReloadFactoryColours}
    >
        <MaterialSymbolsDeviceReset />
        <span>Reset gallery</span>
    </button>
    <button
        class="ResetButton IconButtonWithLabel"
        title="Delete everything and reset palette gallery to default original state"
        aria-label="Delete everything and reset palette gallery to default original state"
        onclick={handleResetGallery}
    >
        <MaterialSymbolsDeviceReset />
        Reset gallery
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
