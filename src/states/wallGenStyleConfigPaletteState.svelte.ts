import { type PaletteStyleConfigProps, type State } from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    PALETTE_CONFIG_ANGLE_MAX_VALUE,
    PALETTE_CONFIG_POSITION_MAX_VALUE,
    PALETTE_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";
import { isPortraitScreen } from "./wallGenState.svelte.js";

const isPaletteConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.angleInDeg, 0, PALETTE_CONFIG_ANGLE_MAX_VALUE))
        return false;

    if (!isValueWithinRange(data.size, 0, PALETTE_CONFIG_SIZE_MAX_VALUE)) {
        return false;
    }

    if (
        !isValueWithinRange(data.position, 0, PALETTE_CONFIG_POSITION_MAX_VALUE)
    ) {
        return false;
    }

    return true;
};

const paletteStyleConfigDefaultValue = {
    angleInDeg: 90,
    size: 0,
    position: 10,
};

const paletteStyleConfigLandscapeDefaultValue = {
    angleInDeg: 0,
    size: 10,
    position: 0,
};

export const paletteStyleConfig = <State<PaletteStyleConfigProps>>(
    createLocalStorageSyncedState({
        key: "paletteStyleConfig",
        defaultValue: paletteStyleConfigDefaultValue,
        validationFunc: isPaletteConfigValid,
    })
);

export const setPaletteStyleAngle = (newValue: number) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        angleInDeg: newValue,
    });
};

export const resetPaletteStyleAngle = () => {
    const val = isPortraitScreen()
        ? paletteStyleConfigDefaultValue.angleInDeg
        : paletteStyleConfigLandscapeDefaultValue.angleInDeg;

    setPaletteStyleAngle(val);
};

export const setPaletteStyleSize = (newValue: number) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        size: newValue,
    });
};

export const resetPaletteStyleSize = () => {
    const val = isPortraitScreen()
        ? paletteStyleConfigDefaultValue.size
        : paletteStyleConfigLandscapeDefaultValue.size;

    setPaletteStyleSize(val);
};

export const setPaletteStylePosition = (newValue: number) => {
    paletteStyleConfig.set({
        ...paletteStyleConfig.val,
        position: newValue,
    });
};

export const resetPaletteStylePosition = () => {
    const val = isPortraitScreen()
        ? paletteStyleConfigDefaultValue.position
        : paletteStyleConfigLandscapeDefaultValue.position;

    setPaletteStylePosition(val);
};
