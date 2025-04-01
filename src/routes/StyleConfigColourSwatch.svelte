<script lang="ts">
	import RadioCheckbox from "src/components/RadioCheckbox.svelte";
	import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, type InputEvent } from "src/lib/types.js";
	import { colourSwatchStyleConfig, setColourSwatchStyleItemShape, setColourSwatchStylePosition, setColourSwatchStyleSpacing } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";

    const isShapeSquare = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.SQUARE);
    const isShapeCircle = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.CIRCLE);

    const isPositionCentered = $derived(colourSwatchStyleConfig.val.position
        === ColourSwatchStylePosition.CENTERED);
    const isPositionTopRight = $derived(colourSwatchStyleConfig.val.position
        === ColourSwatchStylePosition.TOP_RIGHT);

    const handleSetItemShape = (e: InputEvent) => {
        const newValue = e.currentTarget.value as ColourSwatchStyleItemShape;
        setColourSwatchStyleItemShape(newValue);
    };

    const handleSetPosition = (e: InputEvent) => {
        const newValue = e.currentTarget.value as ColourSwatchStylePosition;
        setColourSwatchStylePosition(newValue);
    };

    const handleSetHasSpacing = (e: InputEvent) => {
        const newValue = e.currentTarget.value;
        setColourSwatchStyleSpacing(newValue === "true");
    };

</script>

<div class="ColourSwatchConfig">
    <h3 class="ColourSwatchConfig__Title">
        Colour Swatch Configurations
    </h3>

    <div class="ColourSwatchConfig__ItemsContainer">
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

        <fieldset class="ColourSwatchConfig__Item">
            <legend>
                <h4 class="ColourSwatchConfig__ItemTitle">
                    Position
                </h4>
            </legend>
            <div class="ColourSwatchConfig__ButtonsContainer">
                <RadioCheckbox
                    value={ColourSwatchStylePosition.CENTERED}
                    checked={isPositionCentered}
                    onclick={handleSetPosition}
                >
                    Centered
                </RadioCheckbox>
                <RadioCheckbox
                    value={ColourSwatchStylePosition.TOP_RIGHT}
                    checked={isPositionTopRight}
                    onclick={handleSetPosition}
                >
                    Top right
                </RadioCheckbox>
            </div>
        </fieldset>

        <fieldset class="ColourSwatchConfig__Item">
            <legend>
                <h4 class="ColourSwatchConfig__ItemTitle">
                    Spacing between items
                </h4>
            </legend>
            <div class="ColourSwatchConfig__ButtonsContainer">
                <RadioCheckbox
                    value={true.toString()}
                    checked={colourSwatchStyleConfig.val.hasSpacing}
                    onclick={handleSetHasSpacing}
                >
                    Add gap
                </RadioCheckbox>
                <RadioCheckbox
                    value={false.toString()}
                    checked={!colourSwatchStyleConfig.val.hasSpacing}
                    onclick={handleSetHasSpacing}
                >
                    No gap
                </RadioCheckbox>
            </div>
        </fieldset>
    </div>

</div>

<style>
    .ColourSwatchConfig {
        margin-top: 3rem;
    }

    .ColourSwatchConfig__Title {
        margin-bottom: 0.5rem;
    }

    .ColourSwatchConfig__ItemsContainer {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    .ColourSwatchConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .ColourSwatchConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .ColourSwatchConfig__ButtonsContainer {
        display: flex;
        gap: 2rem;
    }

    @media screen and (width <= 1000px) {
        .ColourSwatchConfig__ItemsContainer {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (width <= 500px) {
        .ColourSwatchConfig__ItemsContainer {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>