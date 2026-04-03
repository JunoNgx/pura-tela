<script lang="ts">
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import {
        TWILIGHT_CONFIG_SIZE_MAX_VALUE,
        TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
        TWILIGHT_CONFIG_POSITION_MAX_VALUE,
    } from "src/lib/constants.js";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import {
        twilightStyleConfig,
        resetTwilightStyleSize,
        resetTwilightStyleRippleIntensity,
        setTwilightStyleSize,
        setTwilightStyleRippleIntensity,
        setTwilightStylePosition,
        resetTwilightStylePosition,
    } from "src/states/wallGenStyleConfigTwilightState.svelte.js";
</script>

<div class="TwilightConfig">
    <h3 class="TwilightConfig__Title">Twilight Configurations</h3>

    <div class="TwilightConfig__ItemsContainer">
        <fieldset class="TwilightConfig__Item">
            <legend>
                <h4 class="TwilightConfig__ItemTitle">Size</h4>
            </legend>
            <StyleConfigItemSlider
                domId="TwilightConfigSize"
                label="Twilight size config"
                min={0}
                max={TWILIGHT_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={twilightStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setTwilightStyleSize,
                        "size",
                        0,
                        TWILIGHT_CONFIG_SIZE_MAX_VALUE
                    );
                }}
            />
            <div class="TwilightConfig__ActionsContainer">
                <button
                    class="TwilightConfig__ResetBtn TertBtn"
                    title="Reset Twilight config size to default"
                    aria-label="Reset Twilight config size to default"
                    onclick={resetTwilightStyleSize}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="TwilightConfig__Item">
            <legend>
                <h4 class="TwilightConfig__ItemTitle">Position</h4>
            </legend>
            <StyleConfigItemSlider
                domId="TwilightConfigPosition"
                label="Twilight position config"
                min={0}
                max={TWILIGHT_CONFIG_POSITION_MAX_VALUE}
                step={1}
                value={twilightStyleConfig.val.position}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setTwilightStylePosition,
                        "position",
                        0,
                        TWILIGHT_CONFIG_POSITION_MAX_VALUE
                    );
                }}
            />
            <div class="TwilightConfig__ActionsContainer">
                <button
                    class="TwilightConfig__ResetBtn TertBtn"
                    title="Reset Twilight config position to default"
                    aria-label="Reset Twilight config position to default"
                    onclick={resetTwilightStylePosition}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="TwilightConfig__Item">
            <legend>
                <h4 class="TwilightConfig__ItemTitle">Ripple Intensity</h4>
            </legend>
            <StyleConfigItemSlider
                domId="TwilightConfigRippleIntensity"
                label="Twilight ripple intensity config"
                min={0}
                max={TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE}
                step={1}
                value={twilightStyleConfig.val.rippleIntensity}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setTwilightStyleRippleIntensity,
                        "ripple intensity",
                        0,
                        TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE
                    );
                }}
            />
            <div class="TwilightConfig__ActionsContainer">
                <button
                    class="TwilightConfig__ResetBtn TertBtn"
                    title="Reset Twilight config ripple intensity to default"
                    aria-label="Reset Twilight config ripple intensity to default"
                    onclick={resetTwilightStyleRippleIntensity}
                >
                    Reset
                </button>
            </div>
        </fieldset>
    </div>
</div>

<style>
    .TwilightConfig {
        margin-top: 3rem;
    }

    .TwilightConfig__Title {
        margin-bottom: 0.5rem;
    }

    .TwilightConfig__ItemsContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }

    .TwilightConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .TwilightConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .TwilightConfig__ActionsContainer {
        display: flex;
        justify-content: flex-end;
    }
</style>
