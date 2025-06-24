<script lang="ts">
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import type { InputEvent } from "src/lib/types.js";
    import { isValueWithinRange } from "src/states/stateUtils.svelte.js";

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

<div class="HorizonConfig">
    <h3 class="HorizonConfig__Title">
        Horizon Configurations
    </h3>

    <div class="HorizonConfig__ItemsContainer">
        <!-- <fieldset class="HorizonConfig__Item">
            <legend>
                <h4 class="HorizonConfig__ItemTitle">Angle</h4>
            </legend>
            <StyleConfigItemSlider
                domId="HorizonAngle"
                label="Horizon angle config"
                min={0}
                max={Horizon_CONFIG_ANGLE_MAX_VALUE}
                step={15}
                value={HorizonStyleConfig.val.angleInDeg}
                unit="°"
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setHorizonStyleAngle, "angle", 0, Horizon_CONFIG_ANGLE_MAX_VALUE);
                }}
            />
            <div class="HorizonConfig__ActionsContainer">
                <button class="HorizonConfig__ResetAngleButton TertBtn"
                    title="Reset Horizon config angle to default"
                    aria-label="Reset Horizon config angle to default"
                    onclick={resetHorizonStyleAngle}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="HorizonConfig__Item">
            <legend>
                <h4 class="HorizonConfig__ItemTitle">Size</h4>
            </legend>
            <StyleConfigItemSlider
                domId="HorizonSize"
                label="Horizon size config"
                min={0}
                max={Horizon_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={HorizonStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setHorizonStyleSize, "size", 0, Horizon_CONFIG_SIZE_MAX_VALUE);
                }}
            />
            <div class="HorizonConfig__ActionsContainer">
                <button class="HorizonConfig__ResetSizeButton TertBtn"
                    title="Reset Horizon config size to default"
                    aria-label="Reset Horizon config size to default"
                    onclick={resetHorizonStyleSize}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="HorizonConfig__Item">
            <legend>
                <h4 class="HorizonConfig__ItemTitle">Position</h4>
            </legend>
            <StyleConfigItemSlider
                domId="HorizonPosition"
                label="Horizon position config"
                min={0}
                max={100}
                step={5}
                value={HorizonStyleConfig.val.position}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setHorizonStylePosition, "position", 0, Horizon_CONFIG_POSITION_MAX_VALUE);
                }}
            />
            <div class="HorizonConfig__ActionsContainer">
                <button class="HorizonConfig__ResetPositionButton TertBtn"
                    title="Reset Horizon config position to default"
                    aria-label="Reset Horizon config position to default"
                    onclick={resetHorizonStylePosition}
                >
                    Reset
                </button>
            </div>
        </fieldset> -->

    </div>
</div>

<style>
    .HorizonConfig {
        margin-top: 3rem;
    }

    .HorizonConfig__Title {
        margin-bottom: 0.5rem;
    }

    .HorizonConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .HorizonConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .HorizonConfig__ActionsContainer {
        display: flex;
        justify-content: flex-end;
    }

</style>