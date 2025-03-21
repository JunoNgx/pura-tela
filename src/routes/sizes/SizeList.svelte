<script lang="ts">
	import { goto } from "$app/navigation";

    import MaterialSymbolsLightGestureSelectSharp from "~icons/material-symbols-light/gesture-select-sharp";
    import MaterialSymbolsLightGestureSelectOutlineSharp from "~icons/material-symbols-light/gesture-select-outline-sharp";

	import { sizeGallery } from "src/states/sizeGalleryState.svelte.js";
	import { setWallGenSizeFromSizeGalleryIndex } from "src/states/wallGenState.svelte.js";

    const handlePassToWallgen = (index: number) => {
        setWallGenSizeFromSizeGalleryIndex(index);
        goto("/");
    };
</script>

<ul class="SizeList FlexList">
    {#each sizeGallery as SizeItem, index}
        <li class="SizeItem">
            <div class="SizeItem__PreviewContainer">
                <div class="SizeItem__PreviewScreen"
                    class:SizeItem__PreviewScreen--IsPortraitMode
                        ={SizeItem.height > SizeItem.width}
                    style={`aspect-ratio: ${SizeItem.width} / ${SizeItem.height};`}
                ></div>
            </div>
            <div class="SizeItem__Footer">
                <div class="SizeItem__Info">
                    <p class="SizeItem__Label">{SizeItem.name}</p>
                    <p class="SizeItem__SizeInfo">{SizeItem.width} × {SizeItem.height}</p>
                </div>

                <div class="SizeItem__ActionContainer">
                    <button class="SizeItem__ActionBtn IconButton"
                        onclick={() => { handlePassToWallgen(index) }}
                        title="Pass this size preset to Wallpaper Generator"
                        aria-label="Pass this size preset to Wallpaper Generator"
                    >
                        <div class="IconButton__RegularIcon">
                            <MaterialSymbolsLightGestureSelectOutlineSharp/>
                        </div>
                        <div class="IconButton__HoverIcon">
                            <MaterialSymbolsLightGestureSelectSharp/>
                        </div>
                    </button>
                </div>
            </div>
        </li>
    {/each}
</ul>

<style>
    .SizeList {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    .SizeItem {
        list-style: none;
        min-width: 150px;
        border-bottom: var(--lineWeight) solid var(--colPri);
    }

    .SizeItem__PreviewContainer {
        aspect-ratio: 1;
        max-width: 100%;
        background-color: var(--colBg2);
        padding: 2rem;
        display: grid;
        place-items: center;
    }

    .SizeItem__PreviewScreen {
        width: 100%;
        height: auto;
        background-color: var(--colPri);
    }

    .SizeItem__PreviewScreen--IsPortraitMode {
        width: auto;
        height: 100%;
    }

    .SizeItem__Footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .SizeItem__Label {
        margin: 0.75rem 0 0 0.25rem;
        font-weight: 700;
    }

    .SizeItem__SizeInfo {
        font-family: var(--fontFamilyMono);
        margin: 0.5rem 0 0.5rem 0.25rem;
    }

    .SizeItem__ActionBtn {
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        margin-right: 0.25rem;
        background-color: var(--colAcc);
    }
    
    @media screen and (width < 850px) {
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