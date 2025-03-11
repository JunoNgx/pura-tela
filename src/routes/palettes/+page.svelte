<script lang="ts">
    import MaterialSymbolsLightResetSettingsRounded from "~icons/material-symbols-light/reset-settings-rounded";

    import PaletteList from "src/routes/palettes/PaletteList.svelte";
	import { resetPaletteGallery } from "src/states/paletteGalleryState.svelte.js";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        resetPaletteGallery();
    };
</script>

<h2 class="VisuallyHidden">Palette Gallery</h2>
<div class="PaletteRouteNotice">Click on any colour to copy its hex code.</div>
<PaletteList/>
<button class="ResetButton"
    onclick={handleResetGallery}
    aria-label="Reset colour gallery"
>
    <MaterialSymbolsLightResetSettingsRounded/>
    Reset gallery
</button>

<style>
    .PaletteRouteNotice {
        margin-bottom: 2rem;
    }
</style>