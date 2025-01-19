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
            <p class="SizeItem__Label">{SizeItem.name}</p>
            <p class="SizeItem__SizeInfo">{SizeItem.width} × {SizeItem.height}</p>
        </li>
    {/each}
</ul>

<style>
    .SizeList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        padding-left: 0;
    }

    .SizeItem {
        list-style: none;
        min-width: 150px;
        border-bottom: 1px solid var(--colPri);
        padding: 0.25rem;
    }

    .SizeItem__PreviewContainer {
        aspect-ratio: 1;
        max-width: 100%;
        background-color: Khaki;
        padding: 2rem;
        display: grid;
        place-items: center;
    }

    .SizeItem__PreviewScreen {
        width: 100%;
        height: auto;
        background-color: DodgerBlue;
    }

    .SizeItem__PreviewScreen--IsPortraitMode {
        width: auto;
        height: 100%;
    }

    .SizeItem__Label,
    .SizeItem__SizeInfo {
        margin: 0;
    }

    .SizeItem__Label {
        margin-top: 0.25rem;
    }
    
    .SizeItem__SizeInfo {
        font-size: var(--fontSizeSm);
    }

    @media screen and (width < 600px) {
        .SizeList {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (width < 375px) {
        .SizeList {
            grid-template-columns: 1fr;
        }
    }

</style>