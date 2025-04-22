import { type PaletteStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isValueWithinRange } from "./stateUtils.svelte.js"
import { PALETTE_CONFIG_ANGLE_MAX_VALUE, PALETTE_CONFIG_POSITION_MAX_VALUE, PALETTE_CONFIG_SIZE_MAX_VALUE } from "src/lib/constants.js";

const isPaletteConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.angleInDeg, 0, PALETTE_CONFIG_ANGLE_MAX_VALUE))
        return false;

    if (!isValueWithinRange(data.size, 0, PALETTE_CONFIG_SIZE_MAX_VALUE)) {
        return false;
    }

    if (!isValueWithinRange(data.position, 0, PALETTE_CONFIG_POSITION_MAX_VALUE)) {
        return false;
    }

    return true;
};

export const paletteStyleConfigDefaultValue = {
    angleInDeg: 0,
    size: 10,
    position: 0,
};

export const paletteStyleConfig = <State<PaletteStyleConfigProps>>createLocalStorageSyncedState({
    key: "paletteStyleConfig",
    defaultValue: paletteStyleConfigDefaultValue,
    validationFunc: isPaletteConfigValid
});

export const setPaletteStyleAngle = (newValue: number) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        angleInDeg: newValue,
    });
};

export const resetPaletteStyleAngle = () => {
    setPaletteStyleAngle(paletteStyleConfigDefaultValue.angleInDeg);
};

export const setPaletteStyleSize = (newValue: number) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        size: newValue,
    });
};

export const resetPaletteStyleSize = () => {
    setPaletteStyleSize(paletteStyleConfigDefaultValue.size);
};

export const setPaletteStylePosition = (newValue: number) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        position: newValue,
    });
};

export const resetPaletteStylePosition = () => {
    setPaletteStylePosition(paletteStyleConfigDefaultValue.position);
};
