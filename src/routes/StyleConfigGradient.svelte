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

    const resetTo90Deg = () => {
        setGradientStyleConfigAngle(90);
    };

</script>

<div class="GradientConfig">
    <h3 class="GradientConfig__Title">
        Colour Swatch Configurations
    </h3>

    <div class="GradientConfig__ItemsContainer">
        <fieldset class="GradientConfig__Item">
            <legend>
                <h4 class="GradientConfig__ItemTitle">Angle</h4>
            </legend>

            <div class="GradientConfig__ButtonsContainer">

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

                <button class="GradientConfig__AngleResetButton"
                    title="Reset to 90 degree"
                    aria-label="Reset to 90 degree"
                    onclick={resetTo90Deg}
                >
                    Reset
                </button>
            </div>
        </fieldset>
    </div>
</div>

<style>
    .GradientConfig {
        margin-top: 3rem;
    }

    .GradientConfig__Title {
        margin-bottom: 0.5rem;
    }

    /* .GradientConfig__ItemsContainer {
    } */

    .GradientConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .GradientConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .GradientConfig__ButtonsContainer {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
    }
</style>