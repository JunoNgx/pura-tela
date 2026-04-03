<script lang="ts">
    import {
        POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
        POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
        POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
        POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
    } from "src/lib/constants.js";
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
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

    <StyleConfigFieldset title="Size and Position" onReset={resetConfig}>
        <div class="PopArtSquareConfig__FieldsetContent">
            <StyleConfigItemSlider
                domId="PopArtSquareSize "
                label="Size"
                min={POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE}
                max={POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={popArtSquareStyleConfig.val.size}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setpopArtSquareStyleSize,
                        "size",
                        POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
                        POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE
                    );
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
                    handleSliderChange(
                        e,
                        setPopArtSquareStylePositionX,
                        "position X",
                        POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
                        POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE
                    );
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
                    handleSliderChange(
                        e,
                        setPopArtSquareStylePositionY,
                        "position Y",
                        POP_ART_SQUARE_CONFIG_POSITION_MIN_VALUE,
                        POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE
                    );
                }}
            />
        </div>
    </StyleConfigFieldset>
</div>

<style>
    .PopArtSquareConfig {
        margin-top: 3rem;
    }

    .PopArtSquareConfig__Title {
        margin-bottom: 0.5rem;
    }

    .PopArtSquareConfig__FieldsetContent {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
