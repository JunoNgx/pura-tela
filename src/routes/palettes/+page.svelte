<script lang="ts">
    import MaterialSymbolsLightResetSettingsRounded from "~icons/material-symbols-light/reset-settings-rounded";

    import BasePaletteList from "src/components/BasePaletteList.svelte";
	import { resetPaletteGallery } from "src/lib/states.svelte.js";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        resetPaletteGallery();
    };
</script>

<h2 class="VisuallyHidden">Palette Gallery</h2>
<div class="PaletteRouteNotice">Click on any colour to copy its hex code.</div>
<BasePaletteList/>
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