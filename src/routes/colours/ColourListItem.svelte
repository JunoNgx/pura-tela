<script lang="ts">
    import { goto } from "$app/navigation";

    import { type ColourItem } from "src/lib/types.js";
	import { HAS_COPY_TIMEOUT_DURATION_MS } from "src/lib/constants.js";

    import MaterialSymbolsLightColorize from "~icons/material-symbols-light/colorize";
    import MaterialSymbolsLightColorizeOutline from "~icons/material-symbols-light/colorize-outline";
    import MaterialSymbolsLightContentCopy from "~icons/material-symbols-light/content-copy";
    import MaterialSymbolsLightContentCopyOutline from "~icons/material-symbols-light/content-copy-outline";
    import MaterialSymbolsLightDelete from "~icons/material-symbols-light/delete";
    import MaterialSymbolsLightDeleteOutline from "~icons/material-symbols-light/delete-outline";
	import {getWallGenColourInUseCount, setWallGenColoursAtIndex } from "src/states/wallGenState.svelte.js";
	import { deleteColourAtIndex } from "src/states/colourGalleryState.svelte.js";
	import { onDestroy } from "svelte";

    type ColourItemProps = {
        colourItem: ColourItem,
        index: number,
        showColourActionDialog: (colourInput: string) => void,
    } ;

    let { colourItem, index, showColourActionDialog = $bindable() }: ColourItemProps = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

    const handleChooseColour = () => {
        if (getWallGenColourInUseCount() === 1) {
            setWallGenColoursAtIndex(0, colourItem.hexCode);
            goto("/");
            return;
        }

        showColourActionDialog(colourItem.hexCode);
    };

    const handleCopyHexCode = async () => {
        try {
            await navigator.clipboard.writeText(colourItem.hexCode);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, HAS_COPY_TIMEOUT_DURATION_MS);
        } catch(error) {
            throw new Error("Unable to copy colour code to clipboard")
        }
    };

    const handleDeleteColour = () => {
        const isConfirmed = window.confirm("Delete this colour from the gallery?");
        if (!isConfirmed) return;

        deleteColourAtIndex(index);
    };

    onDestroy(() => {
        clearTimeout(copyRestoreStatusTimeout);
    })
</script>

<li class="ColourListItem">
    <div class="ColourListItem__Preview"
        style={`background-color: #${colourItem.hexCode};`}
    >
        <div class="ColourListItem__Title">
            {colourItem.name}
        </div>
    </div>
    <div class="ColourListItem__Footer">
        <div class="ColourListItem__Subtitle">
            {#if hasBeenCopied}
                Copied
            {:else}
                {colourItem.hexCode}
            {/if}
        </div>
        <div class="ColourListItem__Buttons">
            <button class="ColourListItem__ActionBtn
                IconButton
                "
                onclick={handleChooseColour}
                title={"Choose this colour"}
                aria-label="Choose this colour"
            >       
                <div class="IconButton__RegularIcon">
                    <MaterialSymbolsLightColorizeOutline/>
                </div>
                <div class="IconButton__HoverIcon">
                    <MaterialSymbolsLightColorize/>
                </div>
            </button>

            <button class="ColourListItem__ActionBtn
                IconButton
                "
                onclick={handleCopyHexCode}
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

            <button class="ColourListItem__ActionBtn IconButton Danger"
                onclick={handleDeleteColour}
                title={"Delete this colour"}
                aria-label="Delete this colour"
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
</li>

<style>
    .ColourListItem {
        list-style: none;
        border-bottom: var(--lineWeight) solid var(--colPri);
        min-width: 120px;
    }

    .ColourListItem__Preview {
        height: 150px;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .ColourListItem__Title {
        padding: 0.5rem;
        background-color: rgba(var(--colBlackRgb), 0.5);
        color: var(--colWhite);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;

    }

    .ColourListItem__Footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    .ColourListItem__Subtitle {
        font-family: var(--fontFamilyMono);
        padding-left: 0.5rem;
    }

    .ColourListItem__Buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 0.1rem;
    }
</style>
