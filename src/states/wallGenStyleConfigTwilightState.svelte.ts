import { type TwilightStyleConfigProps, type State } from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    TWILIGHT_CONFIG_SIZE_MAX_VALUE,
    TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE,
    TWILIGHT_CONFIG_POSITION_MAX_VALUE,
} from "src/lib/constants.js";
import { tryParseNumericData } from "src/lib/parseFuncs.js";

const isTwilightConfigValid = (data: any) => {
    if (!data) return false;

    if (!isValueWithinRange(data.size, 0, TWILIGHT_CONFIG_SIZE_MAX_VALUE)) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.position,
            0,
            TWILIGHT_CONFIG_POSITION_MAX_VALUE
        )
    ) {
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
    size: 8,
    position: 10,
    rippleIntensity: 10,
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

export const setTwilightStylePosition = (newValue: number) => {
    twilightStyleConfig.set({
        ...twilightStyleConfig.val,
        position: newValue,
    });
};

export const resetTwilightStylePosition = () => {
    setTwilightStylePosition(twilightStyleConfigDefaultValue.position);
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

export const appendToUrl = (url: URL) => {
    url.searchParams.append(
        "twilightSize",
        twilightStyleConfig.val.size.toString()
    );
    url.searchParams.append(
        "twilightPosition",
        twilightStyleConfig.val.position.toString()
    );
    url.searchParams.append(
        "twilightRippleIntensity",
        twilightStyleConfig.val.rippleIntensity.toString()
    );
};

export const parseFromSearchParams = (params: URLSearchParams) => {
    const size = tryParseNumericData(
        params.get("twilightSize") ?? "",
        0,
        TWILIGHT_CONFIG_SIZE_MAX_VALUE
    );
    if (size !== null) setTwilightStyleSize(size);

    const position = tryParseNumericData(
        params.get("twilightPosition") ?? "",
        0,
        TWILIGHT_CONFIG_POSITION_MAX_VALUE
    );
    if (position !== null) setTwilightStylePosition(position);

    const rippleIntensity = tryParseNumericData(
        params.get("twilightRippleIntensity") ?? "",
        0,
        TWILIGHT_CONFIG_RIPPLE_INTENSITY_MAX_VALUE
    );
    if (rippleIntensity !== null)
        setTwilightStyleRippleIntensity(rippleIntensity);
};
