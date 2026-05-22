<script lang="ts">
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import {
        BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE,
        BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE,
        BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE,
        BAUMKUCHEN_CONFIG_SIZE_MIN_VALUE,
    } from "src/lib/constants.js";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import {
        baumkuchenStyleConfig,
        resetBaumkuchenStylePositionX,
        resetBaumkuchenStylePositionY,
        resetBaumkuchenStyleSize,
        setBaumkuchenStylePositionX,
        setBaumkuchenStylePositionY,
        setBaumkuchenStyleSize,
    } from "src/states/wallGenStyleConfigBaumkuchenState.svelte.js";

    const resetConfig = () => {
        resetBaumkuchenStyleSize();
        resetBaumkuchenStylePositionX();
        resetBaumkuchenStylePositionY();
    };
</script>

<div class="BaumkuchenConfig">
    <h3 class="BaumkuchenConfig__Title">Baumkuchen Configurations</h3>

    <StyleConfigFieldset title="Size and Position" onReset={resetConfig}>
        <div class="BaumkuchenConfig__FieldsetContent">
            <StyleConfigItemSlider
                domId="BaumkuchenSize"
                label="Size"
                min={BAUMKUCHEN_CONFIG_SIZE_MIN_VALUE}
                max={BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={baumkuchenStyleConfig.val.size}
                changeHandler={(e) =>
                    handleSliderChange(e, setBaumkuchenStyleSize)}
            />
            <StyleConfigItemSlider
                domId="BaumkuchenPositionX"
                label="Horizontal position"
                min={BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE}
                max={BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE}
                step={5}
                value={baumkuchenStyleConfig.val.positionX}
                changeHandler={(e) =>
                    handleSliderChange(e, setBaumkuchenStylePositionX)}
            />
            <StyleConfigItemSlider
                domId="BaumkuchenPositionY"
                label="Vertical position"
                min={BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE}
                max={BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE}
                step={5}
                value={baumkuchenStyleConfig.val.positionY}
                changeHandler={(e) =>
                    handleSliderChange(e, setBaumkuchenStylePositionY)}
            />
        </div>
    </StyleConfigFieldset>
</div>

<style>
    .BaumkuchenConfig {
        margin-top: 3rem;
    }
    .BaumkuchenConfig__Title {
        margin-bottom: 0.5rem;
    }
    .BaumkuchenConfig__FieldsetContent {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
