<script lang="ts">

	import { gradientStyleConfig } from "src/states/wallGenStyleConfigGradientState.svelte.js";

    const handleSliderChange = (
        e: Event & { currentTarget: EventTarget & HTMLInputElement; }
    ) => {

    };

</script>

<div class="GradientConfig">
    <h3 class="GradientConfig__Title">
        Colour Swatch Configurations
    </h3>

    <div class="GradientConfig__Angle">
        <h4 class="GradientConfig__AngleTitle">Angle</h4>

        <div class="GradientConfig__AngleContentContainer">

            <div class="GradientConfig__CurrValueContainer">
                <span class="GradientConfig__CurrVal">{gradientStyleConfig.val.angleInDeg}</span>
            </div>

            <div class="GradientConfig__AngleSlider">
                <label class="VisuallyHidden" for="gradientAngleSlider">Angle slider input</label>
                <input class="GradientConfig__AngleSliderInput"
                    id="gradientAngleSlider"
                    type="range"
                    min="0"
                    max="360"
                    value="{gradientStyleConfig.val.angleInDeg}"
                    oninput={handleSliderChange}
                />
            </div>
        </div>
    </div>
</div>

<style>
    .GradientConfig {
        margin-top: 3rem;
    }

    .GradientConfig__Title {
        margin-bottom: 0.5rem;
    }

    .GradientConfig__AngleContentContainer {
        display: flex;
        gap: 2rem;
    }
</style>