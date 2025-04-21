<script lang="ts">
	import { SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";
	import { ColourSwatchStyleDirection, ColourSwatchStyleItemShape, type InputEvent, type MouseInputEvent } from "src/lib/types.js";

	import RadioCheckbox from "src/components/RadioCheckbox.svelte";
	import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";

	import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
	import { colourSwatchStyleConfig, colourSwatchStyleConfigDefaultValue, setColourSwatchStyleDirection, setColourSwatchStyleItemShape, setColourSwatchStyleItemSize, setColourSwatchStyleItemSpacing, setColourSwatchStylePositionX, setColourSwatchStylePositionY } from "src/states/wallGenStyleConfigColourSwatchState.svelte.js";

    const isDirectionHorizontal = $derived(colourSwatchStyleConfig.val.direction
        === ColourSwatchStyleDirection.HORIZONTAL);
    const isDirectionVertical = $derived(colourSwatchStyleConfig.val.direction
        === ColourSwatchStyleDirection.VERTICAL);

    const handleSwatchDirectionChange = ( e: MouseInputEvent ) => {
        const newValue = e.currentTarget.value as ColourSwatchStyleDirection;
        setColourSwatchStyleDirection(newValue);
    };

    const itemShapeOptionList = [
        { label: "Square", value: ColourSwatchStyleItemShape.SQUARE },
        { label: "Circle", value: ColourSwatchStyleItemShape.CIRCLE },
        { label: "Rhombus", value: ColourSwatchStyleItemShape.RHOMBUS },
        { label: "Triangle", value: ColourSwatchStyleItemShape.TRIANGLE },
        { label: "Inverted Triangle", value: ColourSwatchStyleItemShape.INVERTED_TRIANGLE },
        { label: "Thin strip", value: ColourSwatchStyleItemShape.THIN_STRIP },
        { label: "Hexagon", value: ColourSwatchStyleItemShape.HEXAGON },
    ];

    const handleItemShapeChange = (e: Event) => {
        const newValue = (e.target as HTMLSelectElement).value as ColourSwatchStyleItemShape;
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
                    swatch item settings
                </h4>
            </legend>

            <div class="ColourSwatchConfig__FieldsetContent">

                <div class="ColourSwatchConfig__RadiogroupItem"
                    role="radiogroup"
                    aria-labelledby="SwatchDirectionTitle"
                >
                    <div class="ColourSwatchConfig__RadiogroupItemTitle"
                        id="SwatchDirectionTitle"
                    >
                        swatch direction
                    </div>

                    <div class="ColourSwatchConfig__RadiogroupItemContent">
                        <RadioCheckbox
                            value={ColourSwatchStyleDirection.HORIZONTAL}
                            checked={isDirectionHorizontal}
                            onclick={handleSwatchDirectionChange}
                        >
                            Horizontal
                        </RadioCheckbox>
                        <RadioCheckbox
                            value={ColourSwatchStyleDirection.VERTICAL}
                            checked={isDirectionVertical}
                            onclick={handleSwatchDirectionChange}
                        >
                            Vertical
                        </RadioCheckbox>
                    </div>
                </div>

                <div class="ColourSwatchConfig__DropdownItem"
                    role="radiogroup"
                    aria-labelledby="SwatchItemShapeTitle"
                >
                    <div class="ColourSwatchConfig__DropdownItemTitle"
                        id="SwatchItemShapeTitle"
                    >
                        <label for="SwatchItemShapeTitle">Item shape</label>
                    </div>

                    <select class="ColourSwatchConfig__DropdownSelect"
                        id="SwatchItemShapeDropdown"
                        value={colourSwatchStyleConfig.val.itemShape}
                        oninput={handleItemShapeChange}
                    >
                        {#each itemShapeOptionList as itemShapeOption}
                            <option class="ColourSwatchConfig__DropdownOption"
                                value={itemShapeOption.value}
                            >
                                {itemShapeOption.label}
                            </option>
                        {/each}
                    </select>
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
                    label="gap"
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

    .ColourSwatchConfig__RadiogroupItem,
    .ColourSwatchConfig__DropdownItem{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
        align-items: center;
    }

    .ColourSwatchConfig__RadiogroupItemTitle,
    .ColourSwatchConfig__DropdownItemTitle {
        grid-column: 1/3;
        text-transform: lowercase;
    }

    .ColourSwatchConfig__RadiogroupItemContent {
        grid-column: 3/8;
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
    }
</style>