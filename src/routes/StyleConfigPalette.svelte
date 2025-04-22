<script lang="ts">
	import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
	import type { InputEvent } from "src/lib/types.js";
	import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
	import { paletteStyleConfig, setPaletteStyleAngle } from "src/states/wallGenStyleConfigPaletteState.svelte.js";

    // const handleIsVerticalSwitch = () => {
    //     switchPaletteStyleIsVertical();
    // };

    // const handleIsAsymmetricalSwitch = () => {
    //     switchPaletteStyleIsAsymmetrical();
    // };

    // const handleIsFlippedSwitch = () => {
    //     switchPaletteStyleIsFlipped();
    // };

    // const resetToDefault = () => {
    //     resetPaletteStyleToDefault();
    // }

    const handleDataChange = (
        e: InputEvent,
        setFunc: (value: number) => void,
        valueLabel: string,
        minVal: number,
        maxVal: number
    ) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (!isValueWithinRange(parsedValue, minVal, maxVal))
                throw new Error(`Invalid ${valueLabel} value`);

            setFunc(parsedValue);
        } catch(err) {
            console.log(err)
            console.error(`Invalid ${valueLabel} value`)
        }
    };

</script>

<div class="PaletteConfig">
    <h3 class="PaletteConfig__Title">
        Palette Configurations
    </h3>

    <!-- <Checkbox
        className="PaletteConfig__Checkbox"
        domId="paletteCheckboxIsVertical"
        label="Display vertically"
        checked={paletteStyleConfig.val.isVertical}
        changeHandler={handleIsVerticalSwitch}
    />

    <Checkbox
        className="PaletteConfig__Checkbox"
        domId="paletteCheckboxIsAsymmetrical"
        label="Display asymetrically"
        checked={paletteStyleConfig.val.isAsymmetrical}
        changeHandler={handleIsAsymmetricalSwitch}
    />

    <Checkbox
        className="PaletteConfig__Checkbox"
        domId="paletteCheckboxIsFlipped"
        label="Flip"
        checked={paletteStyleConfig.val.isVertical}
        changeHandler={handleIsFlippedSwitch}
    /> -->

    <div class="PaletteConfig__ItemsContainer">
        <fieldset class="PaletteConfig__Item">
            <legend>
                <h4 class="PaletteConfig__ItemTitle">Angle</h4>
            </legend>

            <StyleConfigItemSlider
                domId="PaletteAngle"
                label="Angle"
                min={0}
                max={360}
                step={5}
                value={paletteStyleConfig.val.angleInDeg}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setPaletteStyleAngle, "angle", 0, 360);
                }}
            />

            <!-- <div class="PaletteConfig__ItemContent">
                <StyleConfigItemSlider
                    domId="PaletteAngle"
                    label="Angle"
                    min={0}
                    max={360}
                    step={5}
                    value={paletteStyleConfig.val.angleInDeg}
                    changeHandler={(e) => {
                        handleDataChange(e, setPaletteStyleAngle, "angle", 0, 360);
                    }}
                />
            </div>

            <div class="PaletteConfig__ActionsContainer">
                <button class="PaletteConfig__ResetButton TertBtn"
                    title="Reset Palette config to default"
                    aria-label="Reset Palette config to default"
                >
                    Reset
                </button>
            </div> -->

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

    /* .PaletteConfig__Content {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        align-items: center;
    } */

</style>