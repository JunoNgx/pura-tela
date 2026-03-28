<script lang="ts">
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import {
        PIE_MAN_CONFIG_SIZE_MAX_VALUE,
        PIE_MAN_CONFIG_ANGLE_MAX_VALUE,
    } from "src/lib/constants.js";
    import type { InputEvent } from "src/lib/types.js";
    import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
    import {
        pieManStyleConfig,
        resetPieManStyleSize,
        resetPieManStyleAngle,
        setPieManStyleSize,
        setPieManStyleAngle,
    } from "src/states/wallGenStyleConfigPieManState.svelte.js";

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
        } catch (err) {
            console.warn(err);
            console.error(`Invalid ${valueLabel} value`);
        }
    };
</script>

<div class="PieManConfig">
    <h3 class="PieManConfig__Title">Pie-Man Configurations</h3>

    <div class="PieManConfig__ItemsContainer">
        <fieldset class="PieManConfig__Item">
            <legend>
                <h4 class="PieManConfig__ItemTitle">Size</h4>
            </legend>
            <StyleConfigItemSlider
                domId="PieManConfigSize"
                label="Pie-Man size config"
                min={0}
                max={PIE_MAN_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={pieManStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(
                        e,
                        setPieManStyleSize,
                        "size",
                        0,
                        PIE_MAN_CONFIG_SIZE_MAX_VALUE
                    );
                }}
            />
            <div class="PieManConfig__ActionsContainer">
                <button
                    class="PieManConfig__ResetBtn TertBtn"
                    title="Reset Pie-Man config size to default"
                    aria-label="Reset Pie-Man config size to default"
                    onclick={resetPieManStyleSize}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="PieManConfig__Item">
            <legend>
                <h4 class="PieManConfig__ItemTitle">Angle</h4>
            </legend>
            <StyleConfigItemSlider
                domId="PieManConfigAngle"
                label="Pie-Man angle config"
                min={0}
                max={PIE_MAN_CONFIG_ANGLE_MAX_VALUE}
                step={45}
                value={pieManStyleConfig.val.angle}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(
                        e,
                        setPieManStyleAngle,
                        "angle",
                        0,
                        PIE_MAN_CONFIG_ANGLE_MAX_VALUE
                    );
                }}
            />
            <div class="PieManConfig__ActionsContainer">
                <button
                    class="PieManConfig__ResetBtn TertBtn"
                    title="Reset Pie-Man config angle to default"
                    aria-label="Reset Pie-Man config angle to default"
                    onclick={resetPieManStyleAngle}
                >
                    Reset
                </button>
            </div>
        </fieldset>
    </div>
</div>

<style>
    .PieManConfig {
        margin-top: 3rem;
    }

    .PieManConfig__Title {
        margin-bottom: 0.5rem;
    }

    .PieManConfig__ItemsContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .PieManConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .PieManConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .PieManConfig__ActionsContainer {
        display: flex;
        justify-content: flex-end;
    }
</style>
