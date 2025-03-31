<script lang="ts">
	import RadioCheckbox from "src/components/RadioCheckbox.svelte";
	import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, type InputEvent } from "src/lib/types.js";
	import { colourSwatchStyleConfig, setColourSwatchStyleItemShape, setColourSwatchStylePosition } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";

    const isShapeSquare = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.SQUARE);
    const isShapeCircle = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.CIRCLE);

    const handleSetItemShape = (e: InputEvent) => {
        const newValue = e.currentTarget.value as ColourSwatchStyleItemShape;
        setColourSwatchStyleItemShape(newValue);
    };

    const handleSetPosition = (e: InputEvent) => {
        const newValue = e.currentTarget.value as ColourSwatchStylePosition;
        setColourSwatchStylePosition(newValue);
    };

</script>

<div class="ColourSwatchConfig">
    <h3 class="ColourSwatchConfig__Title">
        Colour Swatch Configurations
    </h3>

    <fieldset class="ColourSwatchConfig__Item">
        <legend>
            <h4 class="ColourSwatchConfig__ItemTitle">
                Item shape
            </h4>
        </legend>
        <div class="ColourSwatchConfig__ButtonsContainer">
            <RadioCheckbox
                value={ColourSwatchStyleItemShape.SQUARE}
                checked={isShapeSquare}
                onclick={handleSetItemShape}
            >
                Square
            </RadioCheckbox>
            <RadioCheckbox
                value={ColourSwatchStyleItemShape.CIRCLE}
                checked={isShapeCircle}
                onclick={handleSetItemShape}
            >
                Circle
            </RadioCheckbox>
        </div>
    </fieldset>

</div>

<style>
    .ColourSwatchConfig {
        margin-top: 3rem;
    }
    .ColourSwatchConfig__Title {
        margin-bottom: 1rem;
    }

    .ColourSwatchConfig__ItemTitle {
        margin: 0.5rem 0 0.5rem;
    }

    .ColourSwatchConfig__ButtonsContainer {
        display: flex;
        gap: 2rem;
    }
</style>