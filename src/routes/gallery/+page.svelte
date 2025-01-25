<script lang="ts">
    import { beforeNavigate, afterNavigate } from '$app/navigation'
    import MaterialSymbolsLightResetSettingsRounded from '~icons/material-symbols-light/reset-settings-rounded';

    import BaseColourList from "src/components/BaseColourList.svelte";
    import { galleryScrollPos, resetGallery } from "src/lib/states.svelte";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        resetGallery();
    };

    beforeNavigate(({ from }) => {
        if (from?.url.pathname !== "/gallery") return;
        galleryScrollPos.set(window.scrollY);
    })

    afterNavigate(({ to }) => {
        if (to?.url.pathname !== "/gallery") return;
        scrollTo({
            top: galleryScrollPos.val,
            left: 0,
            behavior: "smooth",
        });
    })
</script>

<h2 class="VisuallyHidden">Gallery</h2>
<BaseColourList/>
<button class="ResetButton"
    onclick={handleResetGallery}
    aria-label="Reset colour gallery"
>
    <MaterialSymbolsLightResetSettingsRounded/>
    Reset gallery
</button>

<style>

    .ResetButton {
        display: flex;
        gap: 0.5rem;
        color: var(--colDanger);
        float: right;
    }
</style>