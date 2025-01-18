<script lang="ts">
    import { sizeOptions } from "src/lib/states.svelte.js";
</script>

<ul class="SizeList">
    {#each sizeOptions as SizeItem}
        <li class="SizeItem">
            <div class="SizeItem__PreviewContainer">
                <div class="SizeItem__PreviewScreen"
                    class:SizeItem__PreviewScreen--IsPortraitMode
                        ={SizeItem.height > SizeItem.width}
                    style={`aspect-ratio: ${SizeItem.width} / ${SizeItem.height};`}
                ></div>
            </div>
            {SizeItem.name}: {SizeItem.width} × {SizeItem.height}
        </li>
    {/each}
</ul>

<style>
    .SizeList {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .SizeItem {
        list-style: none;
        width: 30%;
        border: 1px solid #000;
        padding: 5px;
    }

    .SizeItem__PreviewContainer {
        aspect-ratio: 1;
        max-width: 100%;
        /* background-color: SpringGreen; */
        padding: 25px;
        display: grid;
        place-items: center;
    }

    .SizeItem__PreviewScreen {
        width: 100%;
        height: auto;
        background-color: #000;
    }

    .SizeItem__PreviewScreen--IsPortraitMode {
        width: auto;
        height: 100%;
    }
</style>