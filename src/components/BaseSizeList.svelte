<script lang="ts">
    import { sizeOptions } from "src/lib/states.svelte.js";
</script>

<ul class="SizeList">
    {#each sizeOptions as SizeItem}
        <li class="SizeItem">
            {SizeItem.name}: {SizeItem.width} × {SizeItem.height}
        </li>
    {/each}
</ul>

<style>
    .SizeItem {
        list-style: none;
        width: 100%;
        border: 1px solid #000;
    }
</style>