<script lang="ts">
	import { tryParseSize } from "src/lib/parseFuncs.js";
	import type { WallGenQueryProps, WallpaperStyle } from "src/lib/types.js";
    import Studio from "src/routes/Studio.svelte";
	import { isWallGenStyleValid, setWallGenSize, wallGenStyle, } from "src/states/wallGenState.svelte.js";

    export let data: WallGenQueryProps;

    const tryParseStyleFromQueryToWallGen = () => {
        if (!data.style) {
            return;
        }

        if (isWallGenStyleValid(data.style)) {
            wallGenStyle.set(data.style as WallpaperStyle);
        }
    };

    const tryParseSizeFromQueryToWallGen = () => {
        if (!data.width || !data.height) {
            return;
        }

        const sizeData = tryParseSize(data.width, data.height);

        if (!sizeData) {
            return;
        }

        setWallGenSize(sizeData.width, sizeData.height);
    };

    tryParseStyleFromQueryToWallGen();
    tryParseSizeFromQueryToWallGen();

</script>

<h2 class="VisuallyHidden">Generate wallpaper</h2>
<Studio/>