<script lang="ts">
    import { beforeNavigate, afterNavigate } from "$app/navigation"

    import SizeList from "src/routes/sizes/SizeList.svelte";
	import { sizeGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";

    beforeNavigate(({ from }) => {
        if (from?.url.pathname !== "/sizes") return;
        sizeGalleryScrollPos.set(window.scrollY);
    });

    afterNavigate(({ to }) => {
        if (to?.url.pathname !== "/sizes") return;
        scrollTo({
            top: sizeGalleryScrollPos.val,
            left: 0,
            behavior: "smooth",
        });
    });
</script>

<h2>Size Presets</h2>
<div class="RouteInstruction">These are preset for common device sizes. Pass them to <code>Wallpaper Generator</code> and fine tune them further there.</div>
<SizeList/>
