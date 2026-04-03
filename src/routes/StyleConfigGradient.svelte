<script lang="ts">
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import {
        gradientStyleConfig,
        setGradientStyleConfigAngle,
    } from "src/states/wallGenStyleConfigGradientState.svelte.js";

    const resetTo90Deg = () => {
        setGradientStyleConfigAngle(90);
    };
</script>

<div class="GradientConfig">
    <h3 class="GradientConfig__Title">Gradient Configurations</h3>

    <div class="GradientConfig__ItemsContainer">
        <StyleConfigFieldset title="Angle" onReset={resetTo90Deg}>
            <StyleConfigItemSlider
                domId="GradientAngle"
                label="Gradient angle config"
                min={0}
                max={360}
                step={5}
                value={gradientStyleConfig.val.angleInDeg}
                unit="°"
                shouldHideLabel={true}
                changeHandler={(e) =>
                    handleSliderChange(e, setGradientStyleConfigAngle)}
            />
        </StyleConfigFieldset>
    </div>
</div>

<style>
    .GradientConfig {
        margin-top: 3rem;
    }

    .GradientConfig__Title {
        margin-bottom: 0.5rem;
    }
</style>
