<script lang="ts">
    import {
    POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
        POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
        POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
        POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
    } from "src/lib/constants.js";
    import {
        type InputEvent,
    } from "src/lib/types.js";

    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
    import { popArtSquareStyleConfig, resetPopArtSquareStylePositionX, resetPopArtSquareStylePositionY, resetPopArtSquareStyleSize, setPopArtSquareStylePositionX, setPopArtSquareStylePositionY, setpopArtSquareStyleSize } from "src/states/wallGenStyleConfigPopArtSquareState.svelte.js";

    type handleNumericDataChangeProps = {
        event: InputEvent,
        setFunc: (value: number) => void,
        minValue: number,
        maxValue: number,
        valueLabel: string,
    };

    const handleNumericDataChange = ({
        event,
        setFunc,
        minValue,
        maxValue,
        valueLabel,
    }: handleNumericDataChangeProps) => {
        const newValue = event.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (!isValueWithinRange(parsedValue, minValue, maxValue))
                throw new Error(`Invalid ${valueLabel} value`);

            setFunc(parsedValue);
        } catch (err) {
            console.warn(err);
            console.error(`Invalid ${valueLabel} value`);
        }
    };

    const resetConfig = () => {
        resetPopArtSquareStyleSize();
        resetPopArtSquareStylePositionX();
        resetPopArtSquareStylePositionY();
    };
</script>

<div class="PopArtSquareConfig">
    <h3 class="PopArtSquareConfig__Title">Pop Art Square Configurations</h3>

        <fieldset class="PopArtSquareConfig__Fieldset">
            <legend>
                <h4 class="PopArtSquareConfig__FieldsetLegend">Size and Position</h4>
            </legend>
            <div class="PopArtSquareConfig__FieldsetContent">
                <StyleConfigItemSlider
                    domId="PopArtSquareSize "
                    label="Size"
                    min={POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE}
                    max={POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE}
                    step={1}
                    value={popArtSquareStyleConfig.val.size}
                    changeHandler={(e) => {
                        handleNumericDataChange({
                            event: e,
                            setFunc: setpopArtSquareStyleSize,
                            minValue: POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
                            maxValue: POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
                            valueLabel: "size"
                        });
                    }}
                />
                <StyleConfigItemSlider
                    domId="PopArtSquarePositionX"
                    label="Horizontal position"
                    min={POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE}
                    max={POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE}
                    step={5}
                    value={popArtSquareStyleConfig.val.positionX}
                    changeHandler={(e) => {
                        handleNumericDataChange({
                            event: e,
                            setFunc: setPopArtSquareStylePositionX,
                            minValue: POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
                            maxValue: POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
                            valueLabel: "position X"
                        });
                    }}
                />
                <StyleConfigItemSlider
                    domId="PopArtSquarePositionY"
                    label="Vertical position"
                    min={POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE}
                    max={POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE}
                    step={5}
                    value={popArtSquareStyleConfig.val.positionY}
                    changeHandler={(e) => {
                        handleNumericDataChange({
                            event: e,
                            setFunc: setPopArtSquareStylePositionY,
                            minValue: POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
                            maxValue: POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
                            valueLabel: "position Y"
                        });
                    }}
                />
            </div>

            <div class="PopArtSquareConfig__FieldsetButtonsContainer">
                <button
                    class="PopArtSquareConfig__ResetBtn TertBtn"
                    title="Reset position to center"
                    aria-label="Reset position to center"
                    onclick={resetConfig}
                >
                    Reset
                </button>
            </div>
        </fieldset>
</div>

<style>
    .PopArtSquareConfig {
        margin-top: 3rem;
    }

    .PopArtSquareConfig__Title {
        margin-bottom: 0.5rem;
    }

    .PopArtSquareConfig__Fieldset {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .PopArtSquareConfig__FieldsetLegend {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .PopArtSquareConfig__FieldsetContent {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .PopArtSquareConfig__FieldsetButtonsContainer {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }
</style>
