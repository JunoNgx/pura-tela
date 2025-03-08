<script lang="ts">
	import type { ColourItem } from "src/lib/types.js";

    type ColourSpanProps = {
        colour: string,
    };

    let { colour }: ColourSpanProps = $props();

</script>

<span class="ColourSpan">
    <div class="ColourSpan__Block"
        style={`background-color: #${colour}`}
    ></div>
    <span class="ColourSpan__HexCode">#{colour}</span>
</span>

<style>
    .ColourSpan {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        vertical-align: bottom;
    }

    .ColourSpan__Block {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
    }

    .ColourSpan__HexCode {
        display: inline-block;
    }
</style>