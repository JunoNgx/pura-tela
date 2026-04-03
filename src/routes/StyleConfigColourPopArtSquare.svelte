<script lang="ts">
    import {
        POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
        POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
        POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
        POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
    } from "src/lib/constants.js";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import {
        popArtSquareStyleConfig,
        resetPopArtSquareStylePositionX,
        resetPopArtSquareStylePositionY,
        resetPopArtSquareStyleSize,
        setPopArtSquareStylePositionX,
        setPopArtSquareStylePositionY,
        setpopArtSquareStyleSize,
    } from "src/states/wallGenStyleConfigPopArtSquareState.svelte.js";

    const resetConfig = () => {
        resetPopArtSquareStyleSize();
        resetPopArtSquareStylePositionX();
        resetPopArtSquareStylePositionY();
    };
</script>

<div class="PopArtSquareConfig">
    <h3 class="PopArtSquareConfig__Title">Pop Art Square Configurations</h3>

    <fieldset class="PopArtSquareConfig__Fieldset">
        <legend>
            <h4 class="PopArtSquareConfig__FieldsetLegend">
                Size and Position
            </h4>
        </legend>
        <div class="PopArtSquareConfig__FieldsetContent">
            <StyleConfigItemSlider
                domId="PopArtSquareSize "
                label="Size"
                min={POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE}
                max={POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={popArtSquareStyleConfig.val.size}
                changeHandler={(e) => {
                    handleSliderChange(e, setpopArtSquareStyleSize, "size", POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE, POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE);
                }}
            />
            <StyleConfigItemSlider
                domId="PopArtSquarePositionX"
                label="Horizontal position"
                min={POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE}
                max={POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE}
                step={5}
                value={popArtSquareStyleConfig.val.positionX}
                changeHandler={(e) => {
                    handleSliderChange(e, setPopArtSquareStylePositionX, "position X", POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE, POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE);
                }}
            />
            <StyleConfigItemSlider
                domId="PopArtSquarePositionY"
                label="Vertical position"
                min={POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE}
                max={POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE}
                step={5}
                value={popArtSquareStyleConfig.val.positionY}
                changeHandler={(e) => {
                    handleSliderChange(e, setPopArtSquareStylePositionY, "position Y", POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE, POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE);
                }}
            />
        </div>

        <div class="PopArtSquareConfig__FieldsetButtonsContainer">
            <button
                class="PopArtSquareConfig__ResetBtn TertBtn"
                title="Reset position to center"
                aria-label="Reset position to center"
                onclick={resetConfig}
            >
                Reset
            </button>
        </div>
    </fieldset>
</div>

<style>
    .PopArtSquareConfig {
        margin-top: 3rem;
    }

    .PopArtSquareConfig__Title {
        margin-bottom: 0.5rem;
    }

    .PopArtSquareConfig__Fieldset {
        border: var(--lineWeight) solid var(--colPri);
        padding: 0.5rem 1rem 1rem;
    }

    .PopArtSquareConfig__FieldsetLegend {
        text-transform: lowercase;
        margin: 0.5rem 0 0.5rem;
    }

    .PopArtSquareConfig__FieldsetContent {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .PopArtSquareConfig__FieldsetButtonsContainer {
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
    }
</style>
