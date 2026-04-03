<script lang="ts">
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
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
        <StyleConfigFieldset title="Size" onReset={resetTwilightStyleSize}>
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
        </StyleConfigFieldset>

        <StyleConfigFieldset
            title="Position"
            onReset={resetTwilightStylePosition}
        >
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
        </StyleConfigFieldset>

        <StyleConfigFieldset
            title="Ripple Intensity"
            onReset={resetTwilightStyleRippleIntensity}
        >
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
        </StyleConfigFieldset>
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
</style>
