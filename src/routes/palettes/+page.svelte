<script lang="ts">
    import { beforeNavigate, afterNavigate } from "$app/navigation"
    import MaterialSymbolsDeviceReset from "~icons/material-symbols/device-reset";

    import PaletteList from "src/routes/palettes/PaletteList.svelte";
    import { resetPaletteGallery } from "src/states/paletteGalleryState.svelte.js";
	import { paletteGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        resetPaletteGallery();
    };

    beforeNavigate(({ from }) => {
        if (from?.url.pathname !== "/palettes") return;
        paletteGalleryScrollPos.set(window.scrollY);
    });

    afterNavigate(({ to }) => {
        if (to?.url.pathname !== "/palettes") return;
        scrollTo({
            top: paletteGalleryScrollPos.val,
            left: 0,
            behavior: "smooth",
        });
    });
</script>

<h2>Palette Gallery</h2>
<div class="RouteInstruction">Pass palettes to <code>Wallpaper Generator</code> or <code>Palette Generator</code>. Click on any colour to copy its hex colour code.</div>
<PaletteList/>
<button class="ResetButton IconButtonWithLabel"
    onclick={handleResetGallery}
    aria-label="Reset colour gallery"
>
    <MaterialSymbolsDeviceReset/>
    <span>Reset gallery</span>
</button>

<style>
    .ResetButton {
        color: var(--colDanger);
        margin-top: 2rem;
        margin-left: auto;
    }
</style>
