<script lang="ts">
    import StyleConfigFieldset from "src/components/StyleConfigFieldset.svelte";
    import StyleConfigItemSlider from "src/components/StyleConfigItemSlider.svelte";
    import {
        PALETTE_CONFIG_ANGLE_MAX_VALUE,
        PALETTE_CONFIG_POSITION_MAX_VALUE,
        PALETTE_CONFIG_SIZE_MAX_VALUE,
    } from "src/lib/constants.js";
    import { handleSliderChange } from "src/lib/styleConfigUtils.js";
    import {
        paletteStyleConfig,
        resetPaletteStyleAngle,
        resetPaletteStylePosition,
        resetPaletteStyleSize,
        setPaletteStyleAngle,
        setPaletteStylePosition,
        setPaletteStyleSize,
    } from "src/states/wallGenStyleConfigPaletteState.svelte.js";
</script>

<div class="PaletteConfig">
    <h3 class="PaletteConfig__Title">Palette Configurations</h3>

    <div class="PaletteConfig__ItemsContainer">
        <StyleConfigFieldset title="Angle" onReset={resetPaletteStyleAngle}>
            <StyleConfigItemSlider
                domId="PaletteAngle"
                label="Palette angle config"
                min={0}
                max={PALETTE_CONFIG_ANGLE_MAX_VALUE}
                step={15}
                value={paletteStyleConfig.val.angleInDeg}
                unit="°"
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setPaletteStyleAngle,
                        "angle",
                        0,
                        PALETTE_CONFIG_ANGLE_MAX_VALUE
                    );
                }}
            />
        </StyleConfigFieldset>

        <StyleConfigFieldset title="Size" onReset={resetPaletteStyleSize}>
            <StyleConfigItemSlider
                domId="PaletteSize"
                label="Palette size config"
                min={0}
                max={PALETTE_CONFIG_SIZE_MAX_VALUE}
                step={1}
                value={paletteStyleConfig.val.size}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setPaletteStyleSize,
                        "size",
                        0,
                        PALETTE_CONFIG_SIZE_MAX_VALUE
                    );
                }}
            />
        </StyleConfigFieldset>

        <StyleConfigFieldset
            title="Position"
            onReset={resetPaletteStylePosition}
        >
            <StyleConfigItemSlider
                domId="PalettePosition"
                label="Palette position config"
                min={0}
                max={100}
                step={5}
                value={paletteStyleConfig.val.position}
                shouldHideLabel={true}
                changeHandler={(e) => {
                    handleSliderChange(
                        e,
                        setPaletteStylePosition,
                        "position",
                        0,
                        PALETTE_CONFIG_POSITION_MAX_VALUE
                    );
                }}
            />
        </StyleConfigFieldset>
    </div>
</div>

<style>
    .PaletteConfig {
        margin-top: 3rem;
    }

    .PaletteConfig__Title {
        margin-bottom: 0.5rem;
    }

    .PaletteConfig__ItemsContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }
</style>
