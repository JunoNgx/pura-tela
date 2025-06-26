<script lang="ts">
    import { createScrollPositionManager } from "src/lib/scrollPositionManager.js";

    import SizeList from "src/routes/sizes/SizeList.svelte";
    import { sizeGalleryScrollPos } from "src/states/scrollPositionState.svelte.js";

    createScrollPositionManager("/sizes", sizeGalleryScrollPos);
</script>

<h2>Size Presets</h2>
<div class="RouteInstruction">
    These are preset for common device sizes. Pass them to <code
        >Wallpaper Generator</code
    > and fine tune them further there.
</div>
<SizeList />
