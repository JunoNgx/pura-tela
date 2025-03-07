<script lang="ts">
    import MaterialSymbolsLightResetSettingsRounded from "~icons/material-symbols-light/reset-settings-rounded";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        // TODO
        // resetGallery();
    };
</script>

<h2 class="VisuallyHidden">Palette Gallery</h2>

<button class="ResetButton"
    onclick={handleResetGallery}
    aria-label="Reset colour gallery"
>
    <MaterialSymbolsLightResetSettingsRounded/>
    Reset gallery
</button>
