<script lang="ts">
	import type { WallGenQueryProps, WallpaperStyle } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";
	import { isWallGenStyleValid, wallGenStyle, } from "src/states/wallGenState.svelte.js";

    export let data: WallGenQueryProps;

    const tryParseStyleFromQueryToWallGen = () => {
        if (!data.style) {
            return;
        }

        if (isWallGenStyleValid(data.style)) {
            wallGenStyle.set(data.style as WallpaperStyle);
        }
    };

    tryParseStyleFromQueryToWallGen();

</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio/>