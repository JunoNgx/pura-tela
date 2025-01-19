<script lang="ts">
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
<button onclick={handleResetGallery}>Reset gallery</button>