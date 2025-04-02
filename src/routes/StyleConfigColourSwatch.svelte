<script lang="ts">
	import RadioCheckbox from "src/components/RadioCheckbox.svelte";
	import StyleConfigItem from "src/components/StyleConfigItem.svelte";
	import { SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";
	import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, type InputEvent } from "src/lib/types.js";
	import { colourSwatchStyleConfig, colourSwatchStyleConfigDefaultValue, setColourSwatchStyleItemShape, setColourSwatchStylePositionX } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";

    // const isShapeSquare = $derived(colourSwatchStyleConfig.val.itemShape
    //     === ColourSwatchStyleItemShape.SQUARE);
    // const isShapeCircle = $derived(colourSwatchStyleConfig.val.itemShape
    //     === ColourSwatchStyleItemShape.CIRCLE);

    // // const isPositionCentered = $derived(colourSwatchStyleConfig.val.position
    // //     === ColourSwatchStylePosition.CENTERED);
    // // const isPositionTopRight = $derived(colourSwatchStyleConfig.val.position
    // //     === ColourSwatchStylePosition.TOP_RIGHT);

    // const handleSetItemShape = (e: InputEvent) => {
    //     const newValue = e.currentTarget.value as ColourSwatchStyleItemShape;
    //     setColourSwatchStyleItemShape(newValue);
    // };

    // const handleSetPosition = (e: InputEvent) => {
    //     const newValue = e.currentTarget.value as ColourSwatchStylePosition;
    //     setColourSwatchStylePosition(newValue);
    // };

    // const handleSetHasSpacing = (e: InputEvent) => {
    //     const newValue = e.currentTarget.value;
    //     setColourSwatchStyleSpacing(newValue === "true");
    // };

    const handleChangePositionX = (
        e: Event & { currentTarget: EventTarget & HTMLInputElement }
    ) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (parsedValue < 0 || parsedValue > 360)
                throw new Error("Invalid angle value");

            setColourSwatchStylePositionX(parsedValue);
        } catch(err) {
            console.log(err)
            console.error("Invalid angle value")
        }
    };

    const resetPositionX = () => {
        setColourSwatchStylePositionX(
            colourSwatchStyleConfigDefaultValue.positionX);
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
                    Position
                </h4>
            </legend>
            <StyleConfigItem
                domId="swatchPosX"
                label="Horizontal position"
                min={SWATCH_CONFIG_MIN_VALUE}
                max={SWATCH_CONFIG_MAX_VALUE}
                step={5}
                value={colourSwatchStyleConfig.val.positionX}
                changeHandler={handleChangePositionX}
            />

            <button class="ColourSwatchConfig__AngleResetButton TertBtn"
                title="Reset to 90 degree"
                aria-label="Reset to 90 degree"
                onclick={resetPositionX}
            >
                Reset
            </button>
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
        /* display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem; */
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