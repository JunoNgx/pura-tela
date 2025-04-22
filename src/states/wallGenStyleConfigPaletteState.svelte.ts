import { type PaletteStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isValueWithinRange } from "./stateUtils.svelte.js"

const isPaletteConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.angleInDeg, 0, 360))
        return false;

    if (!isValueWithinRange(data.size, 0, 10)) {
        return false;
    }

    if (!isValueWithinRange(data.position, 0, 100)) {
        return false;
    }

    return true;
};

export const paletteStyleConfigDefaultValue = {
    angleInDeg: 0,
    size: 100,
    position: 50,
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
