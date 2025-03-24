<script lang="ts">
    import MaterialSymbolsLightColorize from '~icons/material-symbols-light/colorize';
    import MaterialSymbolsLightColorizeOutline from '~icons/material-symbols-light/colorize-outline';
    import MaterialSymbolsLightDelete from '~icons/material-symbols-light/delete';
    import MaterialSymbolsLightDeleteOutline from '~icons/material-symbols-light/delete-outline';
    import MaterialSymbolsLightContentCopy from "~icons/material-symbols-light/content-copy";
    import MaterialSymbolsLightContentCopyOutline from "~icons/material-symbols-light/content-copy-outline";
    import MaterialSymbolsLightPalette from "~icons/material-symbols-light/palette";
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";

	import { goto } from '$app/navigation';
	import PaletteListItemColourBtn from "./PaletteListItemColourBtn.svelte";
	import type { PaletteItem } from 'src/lib/types.js';
	import { deletePaletteAtIndex, passPaletteToWallpaperGenerator } from 'src/states/paletteGalleryState.svelte.js';
	import { passPaletteToPaletteGenerator } from 'src/states/palGenState.svelte.js';
	import { HAS_COPY_TIMEOUT_DURATION_MS } from 'src/lib/constants.js';

    type PaletteListItemProps = {
        paletteItem: PaletteItem,
        index: number,
    };

    let { paletteItem, index }: PaletteListItemProps = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

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

    const handleCopyPaletteString = async () => {
        try {
            const strContent = paletteItem.colours.join("-");
            await navigator.clipboard.writeText(strContent);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, HAS_COPY_TIMEOUT_DURATION_MS);
        } catch(error) {
            throw new Error("Unable to copy colour code to clipboard")
        }
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
            <div class="ColourListItem__Title">
                {#if hasBeenCopied}
                    Copied
                {:else}
                    {paletteItem.name}
                {/if}
            </div>
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

            <button class="ColourListItem__ActionBtn IconButton"
                onclick={handleCopyPaletteString}
                title={"Copy this hex colour code"}
                aria-label="Copy this hex colour code"
            >       
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightContentCopyOutline/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightContentCopy/>
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
        padding: 0.5rem 0;
    }

    .PaletteListItem__Buttons {
        display: flex;
    }
</style>
