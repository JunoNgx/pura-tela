import { type GradientStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isValueWithinRange } from "./stateUtils.svelte.js"

const isGradientConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.angleInDeg, 0, 360))
        return false;

    return true;
};

const gradientStyleConfigDefaultValue = {
    angleInDeg: 90,
};

export const gradientStyleConfig = <State<GradientStyleConfigProps>>createLocalStorageSyncedState({
    key: "gradientStyleConfig",
    defaultValue: gradientStyleConfigDefaultValue,
    validationFunc: isGradientConfigValid
});

export const setGradientStyleConfigAngle = (
    newValue: number
) => {
    gradientStyleConfig.set({
        ...gradientStyleConfig.val,
        angleInDeg: newValue,
    });
};
