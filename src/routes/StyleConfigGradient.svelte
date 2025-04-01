<script lang="ts">

	import { gradientStyleConfig, setGradientStyleConfigAngle } from "src/states/wallGenStyleConfigGradientState.svelte.js";

    const handleSliderChange = (
        e: Event & { currentTarget: EventTarget & HTMLInputElement; }
    ) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (parsedValue < 0 || parsedValue > 360)
                throw new Error("Invalid angle value");

            setGradientStyleConfigAngle(parsedValue);
        } catch(err) {
            console.log(err)
            console.error("Invalid angle value")
        }
    };

</script>

<div class="GradientConfig">
    <h3 class="GradientConfig__Title">
        Colour Swatch Configurations
    </h3>

    <div class="GradientConfig__Angle">
        <h4 class="GradientConfig__AngleTitle">Angle</h4>

        <div class="GradientConfig__AngleContentContainer">

            <div class="GradientConfig__AngleInputContainer">
                <label class="VisuallyHidden" for="gradientAngleInput">Angle input as number input</label>
                <input class="GradientConfig__AngleInput"
                    id="gradientAngleInput"
                    type="number"
                    min="0"
                    max="360"
                    value="{gradientStyleConfig.val.angleInDeg}"
                    oninput={handleSliderChange}
                />
                <span class="GradientConfig__AngleInputUnit">°</span>
            </div>

            <div class="GradientConfig__AngleSliderContainer">
                <label class="VisuallyHidden" for="gradientAngleSlider">Angle input as slider</label>
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