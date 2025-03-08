<script lang="ts">
    import MaterialSymbolsLightColorize from '~icons/material-symbols-light/colorize';
    import MaterialSymbolsLightColorizeOutline from '~icons/material-symbols-light/colorize-outline';
    import MaterialSymbolsLightDelete from '~icons/material-symbols-light/delete';
    import MaterialSymbolsLightDeleteOutline from '~icons/material-symbols-light/delete-outline';

	import { goto } from '$app/navigation';
	import PaletteListItemColourBtn from "./PaletteListItemColourBtn.svelte";
	import type { PaletteItem } from 'src/lib/types.js';
	import { deletePaletteAtIndex, passPaletteToWallpaperGenerator } from 'src/lib/states.svelte.js';

    type PaletteListItemProps = {
        paletteItem: PaletteItem,
        index: number,
    };

    let { paletteItem, index }: PaletteListItemProps = $props();

    const handleChoosePalette = () => {
        passPaletteToWallpaperGenerator(index);
        goto("/");
    };

    const handleDeletePalette = () => {
        deletePaletteAtIndex(index)
    };
</script>

<ul class="PaletteListItem">
    <div class="PaletteListItem__PaletteBox">
        {#each paletteItem.colours as colourItem}
            <PaletteListItemColourBtn colourItem={colourItem} />
        {/each}
    </div>
    <div class="PaletteListItem__Footer">
        <div class="PaletteListItem__Name">
            {paletteItem.name}
        </div>

        <div class="PaletteListItem__Buttons">
            <button class="PaletteListItem__ActionBtn
                IconButton
                "
                onclick={handleChoosePalette}
                title={"Pass this palette to Wallpaper Generator"}
                aria-label="Pass this palette to Wallpaper Generator"
            >       
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightColorizeOutline/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightColorize/>
                </div>
                
            </button>

            <button class="PaletteListItem__ActionBtn Danger IconButton"
                onclick={handleDeletePalette}
                title={"Delete this palette"}
                aria-label="Delete this palette"
            >
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightDeleteOutline/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightDelete/>
                </div>
            </button>
        </div>
    </div>
</ul>

<style>
    .PaletteListItem {
        list-style: none;
        border-bottom: 1px solid var(--colPri);
        min-width: 120px;
        padding-left: 0;
    }

    .PaletteListItem__PaletteBox {
        height: 200px;
        width: 100%;
        border: 1px solid var(--colPri);
        display: flex;
        flex-direction: row;
    }

    .PaletteListItem__Footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }
</style>