import { type PaletteStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isValidBoolean } from "./stateUtils.svelte.js"

const isPaletteConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValidBoolean(data.isVertical)) {
        return false;
    }

    if (!isValidBoolean(data.isAsymmetrical)) {
        return false;
    }

    if (!isValidBoolean(data.isFlipped)) {
        return false;
    }

    return true;
};

export const paletteStyleConfigDefaultValue = {
    isVertical: false,
    isAsymmetrical: false,
    isFlipped: false,
};

export const paletteStyleConfig = <State<PaletteStyleConfigProps>>createLocalStorageSyncedState({
    key: "paletteStyleConfig",
    defaultValue: paletteStyleConfigDefaultValue,
    validationFunc: isPaletteConfigValid
});

export const setPaletteStyleIsVertical = (newValue: boolean) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        isVertical: newValue,
    });
};

export const setPaletteStyleIsAsymmetrical = (newValue: boolean) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        isAsymmetrical: newValue,
    });
};

export const setPaletteStyleIsFlipped = (newValue: boolean) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        isFlipped: newValue,
    });
};
