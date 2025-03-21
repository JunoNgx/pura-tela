<script lang="ts">
    import MaterialSymbolsLightColorize from '~icons/material-symbols-light/colorize';
    import MaterialSymbolsLightColorizeOutline from '~icons/material-symbols-light/colorize-outline';
    import MaterialSymbolsLightDelete from '~icons/material-symbols-light/delete';
    import MaterialSymbolsLightDeleteOutline from '~icons/material-symbols-light/delete-outline';
    import MaterialSymbolsLightPalette from "~icons/material-symbols-light/palette";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";

	import { goto } from '$app/navigation';
	import PaletteListItemColourBtn from "./PaletteListItemColourBtn.svelte";
	import type { PaletteItem } from 'src/lib/types.js';
	import { deletePaletteAtIndex, passPaletteToWallpaperGenerator } from 'src/states/paletteGalleryState.svelte.js';
	import { passPaletteToPaletteGenerator } from 'src/states/palGenState.svelte.js';

    type PaletteListItemProps = {
        paletteItem: PaletteItem,
        index: number,
    };

    let { paletteItem, index }: PaletteListItemProps = $props();

    const handleChoosePalette = () => {
        passPaletteToWallpaperGenerator(index);
        goto("/");
    };

    const passToPalGen = () => {
        passPaletteToPaletteGenerator(index);
        goto("/generate");
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

            <button class="PaletteListItem__ActionBtn IconButton"
                onclick={passToPalGen}
                title={"Pass this palette to Palette Generator"}
                aria-label="Pass this palette to Palette Generator"
            >
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightPaletteOutline/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightPalette/>
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
        border-bottom: var(--lineWeight) solid var(--colPri);
        min-width: 120px;
        padding-left: 0;
        display: flex;
        flex-direction: column;
    }

    .PaletteListItem__PaletteBox {
        height: 200px;
        width: 100%;
        border: var(--lineWeight) solid var(--colPri);
        display: flex;
        flex-direction: row;
    }

    .PaletteListItem__Footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        flex-grow: 1;
    }
</style>