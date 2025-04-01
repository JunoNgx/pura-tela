import { type GradientStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState } from "./stateUtils.svelte.js"

const isGradientConfigValid = (data: any) => {
    if (!data) return false;

    if (data.angleInDeg < 0 || 360 > data.angleInDeg)
        return false;

    return true;
};

const gradientStyleConfigDefaultValue = {
    angleInDeg: 0,
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
