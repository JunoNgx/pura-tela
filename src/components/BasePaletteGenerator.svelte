<script lang="ts">
    import MaterialSymbolsLightAdd from "~icons/material-symbols-light/add";
    import MaterialSymbolsLightGesture from '~icons/material-symbols-light/gesture';
    import MaterialSymbolsLightPaletteOutline from "~icons/material-symbols-light/palette-outline";

	import { addToPaletteGalleryFromPaletteGenerator, addToPalGenColours, palGenColours, randomiseUnlockedColoursForPalGen } from "src/lib/states.svelte.js";
	import PaletteGeneratorItem from "./PaletteGeneratorItem.svelte";

    const addColour = () => {
        addToPalGenColours();
    };

    const generatePalette = () => {
        randomiseUnlockedColoursForPalGen();
    };

    const savePalette = () => {
        addToPaletteGalleryFromPaletteGenerator();
    };
</script>

<div class="PaletteGenerator">
    <div class="PaletteGenerator__PaletteBox">
        {#each palGenColours.val as palGenItem, index}
            <PaletteGeneratorItem 
                palGenItem={palGenItem}
                index={index}
            />
        {/each}
    </div>

    <div class="PaletteGenerator__ActionsContainerUpper">
        <button class="ColourInputContainer__AddBtn IconButtonWithLabel"
            onclick={addColour}
            title={"Add colour"}
            aria-label={"Add colour"}
        >
            <MaterialSymbolsLightAdd />
            <span>Add colour</span>
        </button>
    </div>

    <div class="PaletteGenerator__ActionsContainer">
        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={generatePalette}
            title={"Generate new palettes"}
            aria-label={"Generate new palettes"}
        >
            <MaterialSymbolsLightGesture />
            <span>Generate</span>
        </button>

        <button class="PaletteGenerator__ActionBtn IconButtonWithLabel"
            onclick={savePalette}
            title={"Save current palette"}
            aria-label={"Save current palette"}
        >
            <MaterialSymbolsLightPaletteOutline />
            <span>Save palette</span>
        </button>
    </div>
</div>

<style>
    .PaletteGenerator__PaletteBox {
        display: flex;
        flex-direction: row;
        width: 100%;
        min-height: 40rem;
    }

    .PaletteGenerator__ActionsContainerUpper {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    .PaletteGenerator__ActionsContainer {
        margin-top: 2rem;
        display: flex;
        justify-content: space-around;
        gap: 2rem;
    }

    @media screen and (width < 850px) {
        .PaletteGenerator__PaletteBox {
            display: flex;
            flex-direction: column;
            min-height: 60vh;
        }
    }
</style>