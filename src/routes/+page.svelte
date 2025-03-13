<script lang="ts">
	import type { WallGenQueryProps } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";

    export let data: WallGenQueryProps;
</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio/>