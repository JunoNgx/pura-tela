<script lang="ts">
    import Checkbox from "src/components/Checkbox.svelte";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
	import { HORIZON_CONFIG_POSITION_MAX_VALUE, HORIZON_CONFIG_SIZE_MAX_VALUE } from "src/lib/constants.js";
    import type { InputEvent } from "src/lib/types.js";
    import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
	import { tryResetWallGenColourInUseCount } from "src/states/wallGenState.svelte.js";
	import { horizonStyleConfig, resetHorizonStylePosition, resetHorizonStyleSize, setHorizonStylePosition, setHorizonStyleShouldShowCore, setHorizonStyleSize } from "src/states/wallGenStyleConfigHorizonState.svelte.js";

    const handleDataChange = (
        e: InputEvent,
        setFunc: (value: number) => void,
        valueLabel: string,
        minVal: number,
        maxVal: number
    ) => {
        const newValue = e.currentTarget.value;

        try {
            const parsedValue = parseInt(newValue);
            if (!isValueWithinRange(parsedValue, minVal, maxVal))
                throw new Error(`Invalid ${valueLabel} value`);

            setFunc(parsedValue);
        } catch(err) {
            console.log(err)
            console.error(`Invalid ${valueLabel} value`)
        }
    };

    const handleCheckboxSwitch = () => {
        setHorizonStyleShouldShowCore(!horizonStyleConfig.val.shouldShowCore);
        tryResetWallGenColourInUseCount();
    };

</script>

<div class="HorizonConfig">
    <h3 class="HorizonConfig__Title">
        Horizon Configurations
    </h3>

    <div class="HorizonConfig__ItemsContainer">

        <div class="HorizonConfig__ShowCoreCheckbox">
            <Checkbox
                domId="HorizonConfigShowCoreCheckbox"
                label="Render center core"
                checked={horizonStyleConfig.val.shouldShowCore}
                changeHandler={handleCheckboxSwitch}
            />
        </div>

        <fieldset class="HorizonConfig__Item">
            <legend>
                <h4 class="HorizonConfig__ItemTitle">Size</h4>
            </legend>
            <StyleConfigItemSlider
                domId="HorizonConfigSize"
                label="Horizon size config"
                min={0}
                max={HORIZON_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={horizonStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setHorizonStyleSize, "size", 0, HORIZON_CONFIG_SIZE_MAX_VALUE);
                }}
            />
            <div class="HorizonConfig__ActionsContainer">
                <button class="HorizonConfig__ResetSizeButton TertBtn"
                    title="Reset Horizon config size to default"
                    aria-label="Reset Horizon config size to default"
                    onclick={resetHorizonStyleSize}
                >
                    Reset
                </button>
            </div>
        </fieldset>

        <fieldset class="HorizonConfig__Item">
            <legend>
                <h4 class="HorizonConfig__ItemTitle">Position</h4>
            </legend>
            <StyleConfigItemSlider
                domId="HorizonConfigPosition"
                label="Horizon position config"
                min={0}
                max={100}
                step={5}
                value={horizonStyleConfig.val.position}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleDataChange(e, setHorizonStylePosition, "position", 0, HORIZON_CONFIG_POSITION_MAX_VALUE);
                }}
            />
            <div class="HorizonConfig__ActionsContainer">
                <button class="HorizonConfig__ResetPositionButton TertBtn"
                    title="Reset Horizon config position to default"
                    aria-label="Reset Horizon config position to default"
                    onclick={resetHorizonStylePosition}
                >
                    Reset
                </button>
            </div>
        </fieldset>

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

    .HorizonConfig__Item {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .HorizonConfig__ItemTitle {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .HorizonConfig__ActionsContainer {
        display: flex;
        justify-content: flex-end;
    }

</style>