<script lang="ts">
    import Checkbox from "src/components/Checkbox.svelte";
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import {
        HORIZON_CONFIG_POSITION_MAX_VALUE,
        HORIZON_CONFIG_SIZE_MAX_VALUE,
    } from "src/lib/constants.js";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import { tryResetWallGenColourInUseCount } from "src/states/wallGenState.svelte.js";
    import {
        horizonStyleConfig,
        resetHorizonStylePosition,
        resetHorizonStyleSize,
        setHorizonStylePosition,
        setHorizonStyleShouldShowCore,
        setHorizonStyleSize,
    } from "src/states/wallGenStyleConfigHorizonState.svelte.js";

    const handleCheckboxSwitch = () => {
        setHorizonStyleShouldShowCore(!horizonStyleConfig.val.shouldShowCore);
        tryResetWallGenColourInUseCount();
    };
</script>

<div class="HorizonConfig">
    <h3 class="HorizonConfig__Title">Horizon Configurations</h3>

    <div class="HorizonConfig__ItemsContainer">
        <div class="HorizonConfig__ShowCoreCheckbox">
            <Checkbox
                domId="HorizonConfigShowCoreCheckbox"
                label="Render center core"
                checked={horizonStyleConfig.val.shouldShowCore}
                changeHandler={handleCheckboxSwitch}
            />
        </div>

        <StyleConfigFieldset title="Size" onReset={resetHorizonStyleSize}>
            <StyleConfigItemSlider
                domId="HorizonConfigSize"
                label="Horizon size config"
                min={0}
                max={HORIZON_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={horizonStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) =>
                    handleSliderChange(e, setHorizonStyleSize)}
            />
        </StyleConfigFieldset>

        <StyleConfigFieldset
            title="Position"
            onReset={resetHorizonStylePosition}
        >
            <StyleConfigItemSlider
                domId="HorizonConfigPosition"
                label="Horizon position config"
                min={0}
                max={100}
                step={5}
                value={horizonStyleConfig.val.position}
                shouldHideLabel={true}
                changeHandler={(e) =>
                    handleSliderChange(e, setHorizonStylePosition)}
            />
        </StyleConfigFieldset>
    </div>
</div>

<style>
    .HorizonConfig {
        margin-top: 3rem;
    }

    .HorizonConfig__Title {
        margin-bottom: 0.5rem;
    }

    .HorizonConfig__ShowCoreCheckbox {
        margin: 2rem 0;
    }

    .HorizonConfig__ItemsContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }
</style>
