import { type PieManStyleConfigProps, type State } from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    PIE_MAN_CONFIG_SIZE_MAX_VALUE,
    PIE_MAN_CONFIG_ANGLE_MAX_VALUE,
} from "src/lib/constants.js";

const isPieManConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.size, 0, PIE_MAN_CONFIG_SIZE_MAX_VALUE)) {
        return false;
    }

    if (!isValueWithinRange(data.angle, 0, PIE_MAN_CONFIG_ANGLE_MAX_VALUE)) {
        return false;
    }

    return true;
};

const pieManStyleConfigDefaultValue = {
    size: 10,
    angle: 180,
};

export const pieManStyleConfig = <State<PieManStyleConfigProps>>(
    createLocalStorageSyncedState({
        key: "pieManStyleConfig",
        defaultValue: pieManStyleConfigDefaultValue,
        validationFunc: isPieManConfigValid,
    })
);

export const setPieManStyleSize = (newValue: number) => {
    pieManStyleConfig.set({
        ...pieManStyleConfig.val,
        size: newValue,
    });
};

export const resetPieManStyleSize = () => {
    setPieManStyleSize(pieManStyleConfigDefaultValue.size);
};

export const setPieManStyleAngle = (newValue: number) => {
    pieManStyleConfig.set({
        ...pieManStyleConfig.val,
        angle: newValue,
    });
};

export const resetPieManStyleAngle = () => {
    setPieManStyleAngle(pieManStyleConfigDefaultValue.angle);
};
