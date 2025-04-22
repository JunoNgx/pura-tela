<script lang="ts">
	import { paletteStyleConfig, resetPaletteStyleToDefault, switchPaletteStyleIsAsymmetrical, switchPaletteStyleIsFlipped, switchPaletteStyleIsVertical } from "src/states/wallGenStyleConfigPaletteState.svelte.js";

    const handleIsVerticalSwitch = () => {
        switchPaletteStyleIsVertical();
    };

    const handleIsAsymmetricalSwitch = () => {
        switchPaletteStyleIsAsymmetrical();
    };

    const handleIsFlippedSwitch = () => {
        switchPaletteStyleIsFlipped();
    };

    const resetToDefault = () => {
        resetPaletteStyleToDefault();
    }

</script>

<div class="PaletteConfig">
    <h3 class="PaletteConfig__Title">
        Palette Configurations
    </h3>

    <div class="PaletteConfig__ItemsContainer">
        <fieldset class="PaletteConfig__Item">
            <legend>
                <h4 class="PaletteConfig__ItemTitle">Angle</h4>
            </legend>

            <div class="PaletteConfig__Content">

            </div>

            <div class="PaletteConfig__ActionsContainer">
                <button class="PaletteConfig__ResetButton TertBtn"
                    title="Reset Palette config to default"
                    aria-label="Reset Palette config to default"
                    onclick={resetToDefault}
                >
                    Reset
                </button>
            </div>

        </fieldset>
    </div>
</div>

<style>
    .PaletteConfig {
        margin-top: 3rem;
    }

    .PaletteConfig__Title {
        margin-bottom: 0.5rem;
    }

    .PaletteConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .PaletteConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .PaletteConfig__Content {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
    }

</style>