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
import { tryParseNumericData } from "src/lib/parseFuncs.js";
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
    size: 10,
    position: 25,
};

const paletteStyleConfigLandscapeDefaultValue = {
    angleInDeg: 0,
    size: 10,
    position: 25,
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

export const appendToUrl = (url: URL) => {
    url.searchParams.append(
        "paletteAngle",
        paletteStyleConfig.val.angleInDeg.toString()
    );
    url.searchParams.append(
        "paletteSize",
        paletteStyleConfig.val.size.toString()
    );
    url.searchParams.append(
        "palettePosition",
        paletteStyleConfig.val.position.toString()
    );
};

export const parseFromSearchParams = (params: URLSearchParams) => {
    const angle = tryParseNumericData(
        params.get("paletteAngle") ?? "",
        0,
        PALETTE_CONFIG_ANGLE_MAX_VALUE
    );
    if (angle !== null) setPaletteStyleAngle(angle);

    const size = tryParseNumericData(
        params.get("paletteSize") ?? "",
        0,
        PALETTE_CONFIG_SIZE_MAX_VALUE
    );
    if (size !== null) setPaletteStyleSize(size);

    const position = tryParseNumericData(
        params.get("palettePosition") ?? "",
        0,
        PALETTE_CONFIG_POSITION_MAX_VALUE
    );
    if (position !== null) setPaletteStylePosition(position);
};
