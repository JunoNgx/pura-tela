import { type PaletteStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isValidBoolean, isValueWithinRange } from "./stateUtils.svelte.js"

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

// export const switchPaletteStyleIsVertical = () => {
//     paletteStyleConfig.set({
//         ...paletteStyleConfig.val,
//         isVertical: paletteStyleConfig.val.isVertical,
//     });
// };

// export const switchPaletteStyleIsAsymmetrical = () => {
//     paletteStyleConfig.set({
//         ...paletteStyleConfig.val,
//         isAsymmetrical: paletteStyleConfig.val.isAsymmetrical,
//     });
// };

// export const switchPaletteStyleIsFlipped = () => {
//     paletteStyleConfig.set({
//         ...paletteStyleConfig.val,
//         isFlipped: paletteStyleConfig.val.isFlipped,
//     });
// };

// export const resetPaletteStyleToDefault = () => {
//     paletteStyleConfig.set(paletteStyleConfigDefaultValue);
// };
