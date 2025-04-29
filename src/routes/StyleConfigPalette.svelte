<script lang="ts">
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import { PALETTE_CONFIG_ANGLE_MAX_VALUE, PALETTE_CONFIG_POSITION_MAX_VALUE, PALETTE_CONFIG_SIZE_MAX_VALUE } from "src/lib/constants.js";
    import type { InputEvent } from "src/lib/types.js";
    import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
    import { paletteStyleConfig, resetPaletteStyleAngle, resetPaletteStylePosition, resetPaletteStyleSize, setPaletteStyleAngle, setPaletteStylePosition, setPaletteStyleSize } from "src/states/wallGenStyleConfigPaletteState.svelte.js";

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

    <div class="PaletteConfig__ItemsContainer">
        <fieldset class="PaletteConfig__Item">
            <legend>
                <h4 class="PaletteConfig__ItemTitle">Angle</h4>
            </legend>
            <StyleConfigItemSlider
                domId="PaletteAngle"
                label="Palette angle config"
                min={0}
                max={PALETTE_CONFIG_ANGLE_MAX_VALUE}
                step={15}
                value={paletteStyleConfig.val.angleInDeg}
                unit="°"
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setPaletteStyleAngle, "angle", 0, PALETTE_CONFIG_ANGLE_MAX_VALUE);
                }}
            />
            <div class="PaletteConfig__ActionsContainer">
                <button class="PaletteConfig__ResetAngleButton TertBtn"
                    title="Reset Palette config angle to default"
                    aria-label="Reset Palette config angle to default"
                    onclick={resetPaletteStyleAngle}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="PaletteConfig__Item">
            <legend>
                <h4 class="PaletteConfig__ItemTitle">Size</h4>
            </legend>
            <StyleConfigItemSlider
                domId="PaletteSize"
                label="Palette size config"
                min={0}
                max={PALETTE_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={paletteStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setPaletteStyleSize, "size", 0, PALETTE_CONFIG_SIZE_MAX_VALUE);
                }}
            />
            <div class="PaletteConfig__ActionsContainer">
                <button class="PaletteConfig__ResetSizeButton TertBtn"
                    title="Reset Palette config size to default"
                    aria-label="Reset Palette config size to default"
                    onclick={resetPaletteStyleSize}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="PaletteConfig__Item">
            <legend>
                <h4 class="PaletteConfig__ItemTitle">Position</h4>
            </legend>
            <StyleConfigItemSlider
                domId="PalettePosition"
                label="Palette position config"
                min={0}
                max={100}
                step={5}
                value={paletteStyleConfig.val.position}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setPaletteStylePosition, "position", 0, PALETTE_CONFIG_POSITION_MAX_VALUE);
                }}
            />
            <div class="PaletteConfig__ActionsContainer">
                <button class="PaletteConfig__ResetPositionButton TertBtn"
                    title="Reset Palette config position to default"
                    aria-label="Reset Palette config position to default"
                    onclick={resetPaletteStylePosition}
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

    .PaletteConfig__ActionsContainer {
        display: flex;
        justify-content: flex-end;
    }

</style>