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
        if (!isConfirmed) {
            return;
        }

        const hexCode = colourItem.hexCode
        const index = colourGallery.val.find(item => item.hexCode === hexCode);

        if (index === -1) {
            console.error("ERROR: failed to delete colour");
        }

        colourGallery.set(colourGallery.val.toSpliced(index, 1));
    };
</script>

<li class="ColourItem">
    <div class="ColourItem__Preview"
        style={`background-color: #${colourItem.hexCode};`}
    ></div>
    <div class="ColourItem__Name">
        {colourItem.name}
    </div>
    <div class="ColourItem__HexCode">
        {`#${colourItem.hexCode}`}
    </div>
    <div class="ColourItem__Buttons">
        <button onclick={handleChooseColour}
            title={"Choose this colour"}
        >
            <MaterialSymbolsLightColorizeSharp/>
        </button>
        <button onclick={handleDeleteColour}
            title={"Delete"}
        >
            <MaterialSymbolsLightDeleteSharp/>
        </button>
    </div>
</li>

<style>
    .ColourItem {
        list-style: none;
        border: 1px solid #000;
        width: 20%;
        padding: 4px;
    }

    .ColourItem__Preview {
        aspect-ratio: 1;
        width: 100%;
    }

    .ColourItem__Buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
</style>