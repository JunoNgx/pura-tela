<script lang="ts">
	import RadioCheckbox from "src/components/RadioCheckbox.svelte";
	import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
	import { SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";
	import { ColourSwatchStyleItemShape, type InputEvent, type MouseInputEvent } from "src/lib/types.js";
	import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
	import { colourSwatchStyleConfig, colourSwatchStyleConfigDefaultValue, setColourSwatchStyleDirection, setColourSwatchStyleItemShape, setColourSwatchStyleItemSize, setColourSwatchStyleItemSpacing, setColourSwatchStylePositionX, setColourSwatchStylePositionY } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";

    // const handleChangePositionX = (e: InputEvent) => {
    //     const newValue = e.currentTarget.value;

    //     try {
    //         const parsedValue = parseInt(newValue);
    //         if (!isValueWithinRange(parsedValue, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
    //             throw new Error("Invalid positionX value");

    //         setColourSwatchStylePositionX(parsedValue);
    //     } catch(err) {
    //         console.log(err)
    //         console.error("Invalid positionX value")
    //     }
    // };

    // const handleChangePositionY = (e: InputEvent) => {
    //     const newValue = e.currentTarget.value;

    //     try {
    //         const parsedValue = parseInt(newValue);
    //         if (!isValueWithinRange(parsedValue, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
    //             throw new Error("Invalid positionY value");

    //         setColourSwatchStylePositionY(parsedValue);
    //     } catch(err) {
    //         console.log(err)
    //         console.error("Invalid positionY value")
    //     }
    // };

    // const handleChangeItemSize = (e: InputEvent) => {
    //     const newValue = e.currentTarget.value;

    //     try {
    //         const parsedValue = parseInt(newValue);
    //         if (!isValueWithinRange(parsedValue, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
    //             throw new Error("Invalid item size value");

    //         setColourSwatchStyleItemSize(parsedValue);
    //     } catch(err) {
    //         console.log(err)
    //         console.error("Invalid item size value")
    //     }
    // };

    const isItemShapeSquare = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.SQUARE);
    const isItemShapeCircle = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.CIRCLE);
    const isItemShapeRhombus = $derived(colourSwatchStyleConfig.val.itemShape
        === ColourSwatchStyleItemShape.RHOMBUS);

    const handleItemShapeChange = ( e: MouseInputEvent ) => {
        const newValue = e.currentTarget.value as ColourSwatchStyleItemShape;
        setColourSwatchStyleItemShape(newValue);
    };

    const handleDataChange = (
        e: InputEvent,
        setFunc: (value: number) => void,
        valueLabel: string
    ) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (!isValueWithinRange(parsedValue, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
                throw new Error(`Invalid ${valueLabel} value`);

            setFunc(parsedValue);
        } catch(err) {
            console.log(err)
            console.error(`Invalid ${valueLabel} value`)
        }
    };

    const resetPosition = () => {
        setColourSwatchStylePositionX(
            colourSwatchStyleConfigDefaultValue.positionX);
        setColourSwatchStylePositionY(
            colourSwatchStyleConfigDefaultValue.positionY);
    };

    const resetItemSettings = () => {
        setColourSwatchStyleDirection(
            colourSwatchStyleConfigDefaultValue.direction);
        setColourSwatchStyleItemShape(
            colourSwatchStyleConfigDefaultValue.itemShape);
        setColourSwatchStyleItemSize(
            colourSwatchStyleConfigDefaultValue.itemSize);
        setColourSwatchStyleItemSpacing(
            colourSwatchStyleConfigDefaultValue.itemSpacing);
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
                <StyleConfigItemSlider
                    domId="SwatchPosX"
                    label="Horizontal position"
                    min={SWATCH_CONFIG_MIN_VALUE}
                    max={SWATCH_CONFIG_MAX_VALUE}
                    step={5}
                    value={colourSwatchStyleConfig.val.positionX}
                    changeHandler={(e) => {
                        handleDataChange(e, setColourSwatchStylePositionX, "position X");
                    }}
                />
                <StyleConfigItemSlider
                    domId="SwatchPosY"
                    label="Vertical position"
                    min={SWATCH_CONFIG_MIN_VALUE}
                    max={SWATCH_CONFIG_MAX_VALUE}
                    step={5}
                    value={colourSwatchStyleConfig.val.positionY}
                    changeHandler={(e) => {
                        handleDataChange(e, setColourSwatchStylePositionY, "position Y");
                    }}
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

        <fieldset class="ColourSwatchConfig__Fieldset">
            <legend>
                <h4 class="ColourSwatchConfig__FieldsetLegend">
                    swatch item spacing
                </h4>
            </legend>

            <div class="ColourSwatchConfig__FieldsetContent">

                <div class="ColourSwatchConfig__RadiogroupItem"
                    role="radiogroup"
                    aria-labelledby="SwatchItemShapeTitle"
                >
                    <div class="ColourSwatchConfig__RadiogroupItemTitle"
                        id="SwatchItemShapeTitle"
                    >
                        Item shape
                    </div>

                    <RadioCheckbox
                        value={ColourSwatchStyleItemShape.SQUARE}
                        checked={isItemShapeSquare}
                        onclick={handleItemShapeChange}
                    >
                        Square
                    </RadioCheckbox>
                    <RadioCheckbox
                        value={ColourSwatchStyleItemShape.CIRCLE}
                        checked={isItemShapeCircle}
                        onclick={handleItemShapeChange}
                    >
                        Circle
                    </RadioCheckbox>
                    <RadioCheckbox
                        value={ColourSwatchStyleItemShape.RHOMBUS}
                        checked={isItemShapeRhombus}
                        onclick={handleItemShapeChange}
                    >
                        Rhombus
                    </RadioCheckbox>
                </div>

                <StyleConfigItemSlider
                    domId="SwatchItemSize"
                    label="Item size"
                    min={SWATCH_CONFIG_MIN_VALUE}
                    max={SWATCH_CONFIG_MAX_VALUE}
                    step={5}
                    value={colourSwatchStyleConfig.val.itemSize}
                    changeHandler={(e) => {
                        handleDataChange(e, setColourSwatchStyleItemSize, "position Y");
                    }}
                />

                <StyleConfigItemSlider
                    domId="SwatchItemSpacing"
                    label="In-between spacing"
                    min={SWATCH_CONFIG_MIN_VALUE}
                    max={SWATCH_CONFIG_MAX_VALUE}
                    step={5}
                    value={colourSwatchStyleConfig.val.itemSpacing}
                    changeHandler={(e) => {
                        handleDataChange(e, setColourSwatchStyleItemSpacing, "position Y");
                    }}
                />
            </div>

            <div class="ColourSwatchConfig__FieldsetButtonsContainer">
                <button class="ColourSwatchConfig__ResetBtn TertBtn"
                    title="Reset item settings to default"
                    aria-label="Reset item settings to default"
                    onclick={resetItemSettings}
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
        gap: 0.5rem;
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