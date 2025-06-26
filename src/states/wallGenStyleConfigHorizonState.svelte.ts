import { type HorizonStyleConfigProps, type State } from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValidBoolean,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    HORIZON_CONFIG_POSITION_MAX_VALUE,
    HORIZON_CONFIG_SIZE_MAX_VALUE,
} from "src/lib/constants.js";

const isHorizonConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValidBoolean(data.shouldShowCore)) return false;

    if (!isValueWithinRange(data.size, 0, HORIZON_CONFIG_SIZE_MAX_VALUE)) {
        return false;
    }

    if (!isValueWithinRange(data.position, 0, HORIZON_CONFIG_POSITION_MAX_VALUE)) {
        return false;
    }

    return true;
};

const horizonStyleConfigDefaultValue = {
    shouldShowCore: true,
    size: 5,
    position: 50,
};

export const horizonStyleConfig = <State<HorizonStyleConfigProps>>createLocalStorageSyncedState({
    key: "horizonStyleConfig",
    defaultValue: horizonStyleConfigDefaultValue,
    validationFunc: isHorizonConfigValid,
});

export const setHorizonStyleShouldShowCore = (newValue: boolean) => {
    horizonStyleConfig.set({
        ...horizonStyleConfig.val,
        shouldShowCore: newValue,
    });
};

export const resetHorizonStyleShouldShowCore = () => {
    horizonStyleConfig.set({
        ...horizonStyleConfig.val,
        shouldShowCore: horizonStyleConfigDefaultValue.shouldShowCore,
    });
};

export const setHorizonStyleSize = (newValue: number) => {
    horizonStyleConfig.set({
        ...horizonStyleConfig.val,
        size: newValue,
    });
};

export const resetHorizonStyleSize = () => {
    setHorizonStyleSize(horizonStyleConfigDefaultValue.size);
};

export const setHorizonStylePosition = (newValue: number) => {
    horizonStyleConfig.set({
        ...horizonStyleConfig.val,
        position: newValue,
    });
};

export const resetHorizonStylePosition = () => {
    setHorizonStylePosition(horizonStyleConfigDefaultValue.position);
};
