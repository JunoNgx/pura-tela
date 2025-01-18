<script lang="ts">
    import BaseColourList from "src/components/BaseColourList.svelte";
    import { resetGallery } from "src/lib/states.svelte.ts";

    const handleResetGallery = () => {
        window.confirm("Please confirm gallery reset. Your data will be unrecoverably lost.");
        resetGallery();
    }
</script>

<h1>Gallery</h1>
<BaseColourList/>
<button onclick={handleResetGallery}>Reset gallery</button>