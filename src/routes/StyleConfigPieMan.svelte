<script lang="ts">
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import {
        PIE_MAN_CONFIG_SIZE_MAX_VALUE,
        PIE_MAN_CONFIG_ANGLE_MAX_VALUE,
    } from "src/lib/constants.js";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import {
        pieManStyleConfig,
        resetPieManStyleSize,
        resetPieManStyleAngle,
        setPieManStyleSize,
        setPieManStyleAngle,
    } from "src/states/wallGenStyleConfigPieManState.svelte.js";
</script>

<div class="PieManConfig">
    <h3 class="PieManConfig__Title">Pie-Man Configurations</h3>

    <div class="PieManConfig__ItemsContainer">
        <StyleConfigFieldset title="Size" onReset={resetPieManStyleSize}>
            <StyleConfigItemSlider
                domId="PieManConfigSize"
                label="Pie-Man size config"
                min={0}
                max={PIE_MAN_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={pieManStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => handleSliderChange(e, setPieManStyleSize)}
            />
        </StyleConfigFieldset>

        <StyleConfigFieldset title="Angle" onReset={resetPieManStyleAngle}>
            <StyleConfigItemSlider
                domId="PieManConfigAngle"
                label="Pie-Man angle config"
                min={0}
                max={PIE_MAN_CONFIG_ANGLE_MAX_VALUE}
                step={45}
                value={pieManStyleConfig.val.angle}
                shouldHideLabel={true}
                changeHandler={(e) =>
                    handleSliderChange(e, setPieManStyleAngle)}
            />
        </StyleConfigFieldset>
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
</style>
