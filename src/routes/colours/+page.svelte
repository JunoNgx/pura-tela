<script lang="ts">
    import MaterialSymbolsDeviceReset from "~icons/material-symbols/device-reset";

    import ColourList from "src/routes/colours/ColourList.svelte";
    import { resetColourGallery } from "src/states/colourGalleryState.svelte.js";
	import { colourGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";
	import { createScrollPositionManager } from "src/lib/scrollPositionManager.js";

    createScrollPositionManager("/colours", colourGalleryScrollPos);

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        resetColourGallery();
    };
</script>

<h2>Colour Gallery</h2>
<p class="RouteInstruction">
    Pass colour to <code>Wallpaper Generator</code>, or copy its hex colour code for your own use.
</p>
<ColourList/>
<button class="ResetButton IconButtonWithLabel"
    onclick={handleResetGallery}
    aria-label="Reset colour gallery"
>
    <MaterialSymbolsDeviceReset/>
    Reset gallery
</button>

<style>
    .ResetButton {
        color: var(--colDanger);
        margin-top: 2rem;
        margin-left: auto;
    }
</style>
