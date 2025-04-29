<script lang="ts">
    import PaletteGenerator from "src/routes/generate-palette/PaletteGenerator.svelte";

    import type { PalGenQueryProps } from "src/lib/types.js";
    import { tryParseFromStringToPalGen } from "src/states/palGenState.svelte.js";

    export let data: PalGenQueryProps;

    const tryParseColoursToPalGen = () => {
        if (!data.paletteQueryStr) return;

        tryParseFromStringToPalGen(data.paletteQueryStr);
    };

    tryParseColoursToPalGen();
</script>

<h2>Palette Generator</h2>
<p class="RouteInstruction">
    Create your palette here. Lock the colours you like and randomise the rest. Save this palette for later, or use it for the <code>Wallpaper Generator</code> immediately.
</p>
<PaletteGenerator/>
