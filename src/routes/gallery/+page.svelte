<script lang="ts">
    import MaterialSymbolsLightResetSettingsRounded from '~icons/material-symbols-light/reset-settings-rounded';

    import BaseColourList from "src/components/BaseColourList.svelte";
    import { resetGallery } from "src/lib/states.svelte";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Please confirm gallery reset. Your data will be unrecoverably lost.");
        if (!isConfirmed) {
            return;
        }

        resetGallery();
    };
</script>

<h2 class="VisuallyHidden">Gallery</h2>
<BaseColourList/>
<button class="ResetButton"
    onclick={handleResetGallery}
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