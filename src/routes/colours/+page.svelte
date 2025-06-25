<script lang="ts">
    import { beforeNavigate, afterNavigate } from "$app/navigation"
    import MaterialSymbolsDeviceReset from "~icons/material-symbols/device-reset";

    import ColourList from "src/routes/colours/ColourList.svelte";
    import { resetColourGallery } from "src/states/colourGalleryState.svelte.js";
	import { colourGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";

    const handleResetGallery = () => {
        const isConfirmed = window.confirm("Reset the gallery to default colours? This action cannot be undone.");
        if (!isConfirmed) return;

        resetColourGallery();
    };

    beforeNavigate(({ from }) => {
        if (from?.url.pathname !== "/colours") return;
        colourGalleryScrollPos.set(window.scrollY);
    });

    afterNavigate(({ to }) => {
        if (to?.url.pathname !== "/colours") return;
        console.log("after navigate", colourGalleryScrollPos.val)
        scrollTo({
            top: colourGalleryScrollPos.val,
            left: 0,
            behavior: "smooth",
        });
    });
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
