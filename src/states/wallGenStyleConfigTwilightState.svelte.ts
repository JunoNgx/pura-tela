import { type TwilightStyleConfigProps, type State } from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    TWILIGHT_CONFIG_SIZE_MAX_VALUE,
    TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
} from "src/lib/constants.js";

const isTwilightConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.size, 0, TWILIGHT_CONFIG_SIZE_MAX_VALUE)) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.rippleIntensity,
            0,
            TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE
        )
    ) {
        return false;
    }

    return true;
};

const twilightStyleConfigDefaultValue = {
    size: 5,
    rippleIntensity: 5,
};

export const twilightStyleConfig = <State<TwilightStyleConfigProps>>(
    createLocalStorageSyncedState({
        key: "twilightStyleConfig",
        defaultValue: twilightStyleConfigDefaultValue,
        validationFunc: isTwilightConfigValid,
    })
);

export const setTwilightStyleSize = (newValue: number) => {
    twilightStyleConfig.set({
        ...twilightStyleConfig.val,
        size: newValue,
    });
};

export const resetTwilightStyleSize = () => {
    setTwilightStyleSize(twilightStyleConfigDefaultValue.size);
};

export const setTwilightStyleRippleIntensity = (newValue: number) => {
    twilightStyleConfig.set({
        ...twilightStyleConfig.val,
        rippleIntensity: newValue,
    });
};

export const resetTwilightStyleRippleIntensity = () => {
    setTwilightStyleRippleIntensity(
        twilightStyleConfigDefaultValue.rippleIntensity
    );
};
