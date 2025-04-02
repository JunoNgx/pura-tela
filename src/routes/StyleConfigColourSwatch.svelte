<script lang="ts">
	import RadioCheckbox from "src/components/RadioCheckbox.svelte";
	import StyleConfigItem from "src/components/StyleConfigItem.svelte";
	import { SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";
	import { type InputEvent } from "src/lib/types.js";
	import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
	import { colourSwatchStyleConfig, colourSwatchStyleConfigDefaultValue, setColourSwatchStyleItemShape, setColourSwatchStylePositionX, setColourSwatchStylePositionY } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";

    const handleChangePositionX = (e: InputEvent) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (!isValueWithinRange(parsedValue, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
                throw new Error("Invalid positionX value");

            setColourSwatchStylePositionX(parsedValue);
        } catch(err) {
            console.log(err)
            console.error("Invalid positionX value")
        }
    };

    const handleChangePositionY = (e: InputEvent) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (!isValueWithinRange(parsedValue, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
                throw new Error("Invalid positionY value");

            setColourSwatchStylePositionY(parsedValue);
        } catch(err) {
            console.log(err)
            console.error("Invalid positionY value")
        }
    };

    const resetPosition = () => {
        setColourSwatchStylePositionX(
            colourSwatchStyleConfigDefaultValue.positionX);
        setColourSwatchStylePositionY(
            colourSwatchStyleConfigDefaultValue.positionY);
    };

</script>

<div class="ColourSwatchConfig">
    <h3 class="ColourSwatchConfig__Title">
        Colour Swatch Configurations
    </h3>

    <div class="ColourSwatchConfig__FieldsetsContainer">
        <fieldset class="ColourSwatchConfig__Fieldset">
            <legend>
                <h4 class="ColourSwatchConfig__FieldsetLegend">
                    Position
                </h4>
            </legend>
            <div class="ColourSwatchConfig__FieldsetContent">
                <StyleConfigItem
                    domId="swatchPosX"
                    label="Horizontal position"
                    min={SWATCH_CONFIG_MIN_VALUE}
                    max={SWATCH_CONFIG_MAX_VALUE}
                    step={5}
                    value={colourSwatchStyleConfig.val.positionX}
                    changeHandler={handleChangePositionX}
                />
                <StyleConfigItem
                    domId="swatchPosY"
                    label="Vertical position"
                    min={SWATCH_CONFIG_MIN_VALUE}
                    max={SWATCH_CONFIG_MAX_VALUE}
                    step={5}
                    value={colourSwatchStyleConfig.val.positionY}
                    changeHandler={handleChangePositionY}
                />
            </div>

            <div class="ColourSwatchConfig__FieldsetButtonsContainer">
                <button class="ColourSwatchConfig__ResetBtn TertBtn"
                    title="Reset position to center"
                    aria-label="Reset position to center"
                    onclick={resetPosition}
                >
                    Reset
                </button>
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

    .ColourSwatchConfig__Fieldset {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .ColourSwatchConfig__FieldsetLegend {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .ColourSwatchConfig__FieldsetContent {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .ColourSwatchConfig__FieldsetButtonsContainer {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }

    /* .ColourSwatchConfig__ButtonsContainer {
        display: flex;
        gap: 2rem;
    } */

    /* @media screen and (width <= 1000px) {
        .ColourSwatchConfig__ItemsContainer {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (width <= 500px) {
        .ColourSwatchConfig__ItemsContainer {
            grid-template-columns: repeat(1, 1fr);
        }
    } */
</style>