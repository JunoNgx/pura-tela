<script lang="ts">
    import { goto } from '$app/navigation';
    import { currHexCode, currRgbColour, colourGallery } from "src/lib/states.svelte";
	import { convertHexToRgb } from "src/lib/utils.js";
    import MaterialSymbolsLightDeleteSharp from "~icons/material-symbols-light/delete-sharp";
    import MaterialSymbolsLightColorizeSharp from '~icons/material-symbols-light/colorize-sharp';

    let { colourItem } = $props();

    const handleChooseColour = () => {
        currHexCode.set(colourItem.hexCode);
        currRgbColour.set(convertHexToRgb(colourItem.hexCode));
        goto("/");
    };

    const handleDeleteColour = () => {
        const isConfirmed = window.confirm("Please confirm the colour deletion.");
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
                <MaterialSymbolsLightColorizeSharp/>
            </button>
            <button class="ColourItem__ActionBtn
                ColourItem__ActionBtn--Delete
                IconButton
                "
                onclick={handleDeleteColour}
                title={"Delete this colour"}
                aria-label="Delete this colour"
            >
                <MaterialSymbolsLightDeleteSharp/>
            </button>
        </div>
    </div>
</li>

<style>
    .ColourItem {
        list-style: none;
        border-bottom: 1px solid var(--colPri);
        min-width: 150px;
        padding: 0.25rem;
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
        padding: 0.25rem;
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
        padding-top: 0.25rem;
        gap: 0.5rem;
    }

    .ColourItem__Subtitle {
        font-size: var(--fontSizeSm);
        padding-left: 0.25rem;
    }

    .ColourItem__Buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .ColourItem__ActionBtn {
        border: none;
    }

    .ColourItem__ActionBtn--Delete {
        color: var(--colDanger);
    }
</style>