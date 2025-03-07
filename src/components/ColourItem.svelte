<script lang="ts">
    import { type ColourItem } from "src/lib/types.js";

    import { goto } from '$app/navigation';
    import { colourGallery, getCurrColourInUseCount, setCurrColourAtIndex } from "src/lib/states.svelte";
    import MaterialSymbolsLightColorize from '~icons/material-symbols-light/colorize';
    import MaterialSymbolsLightColorizeOutline from '~icons/material-symbols-light/colorize-outline';
    import MaterialSymbolsLightDelete from '~icons/material-symbols-light/delete';
    import MaterialSymbolsLightDeleteOutline from '~icons/material-symbols-light/delete-outline';

    type ColourItemProps = {
        colourItem: ColourItem,
        showColourActionDialog: (colourInput: string) => void,
    } ;

    let { colourItem, showColourActionDialog = $bindable() }: ColourItemProps = $props();

    const handleChooseColour = () => {
        // TODO: implement passing from gallery to currColours
        if (getCurrColourInUseCount() === 1) {
            setCurrColourAtIndex(0, colourItem.hexCode);
            goto("/");
            return;
        }

        showColourActionDialog(colourItem.hexCode);
    };

    const handleDeleteColour = () => {
        const isConfirmed = window.confirm("Delete this colour from the gallery?");
        if (!isConfirmed) return;

        const hexCode = colourItem.hexCode
        const index = colourGallery.val.findIndex(item => item.hexCode === hexCode);

        if (index === -1) {
            console.error("ERROR: failed to delete colour");
        }

        colourGallery.set(colourGallery.val.toSpliced(index, 1));
    };
</script>

<li class="ColourItem">
    <div class="ColourItem__Preview"
        style={`background-color: #${colourItem.hexCode};`}
    >
        <div class="ColourItem__Title">
            {colourItem.name}
        </div>
    </div>
    <div class="ColourItem__Footer">
        <div class="ColourItem__Subtitle">
            {`#${colourItem.hexCode}`}
        </div>
        <div class="ColourItem__Buttons">
            <button class="ColourItem__ActionBtn
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

            <button class="ColourItem__ActionBtn
                ColourItem__ActionBtn--Delete
                IconButton
                "
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
    .ColourItem {
        list-style: none;
        border-bottom: 1px solid var(--colPri);
        min-width: 120px;
    }

    .ColourItem__Preview {
        height: 150px;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .ColourItem__Title {
        padding: 0.5rem;
        background-color: rgba(var(--colBlackRgb), 0.5);
        color: var(--colWhite);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;  
        overflow: hidden;

    }

    .ColourItem__Footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    .ColourItem__Subtitle {
        font-size: var(--fontSizeSm);
        padding-left: 0.5rem;
    }

    .ColourItem__Buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 0.1rem;
    }

    .ColourItem__ActionBtn--Delete {
        color: var(--colDanger);
    }
</style>