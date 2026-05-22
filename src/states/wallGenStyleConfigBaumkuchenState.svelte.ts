import {
    type BaumkuchenStyleConfigProps,
    type State,
} from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE,
    BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE,
    BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE,
    BAUMKUCHEN_CONFIG_SIZE_MIN_VALUE,
} from "src/lib/constants.js";
import { tryParseNumericData } from "src/lib/parseFuncs.js";

const isBaumkuchenConfigValid = (data: any) => {
    if (!data) return false;

    if (
        !isValueWithinRange(
            data.size,
            BAUMKUCHEN_CONFIG_SIZE_MIN_VALUE,
            BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE
        )
    ) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.positionX,
            BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE,
            BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE
        )
    ) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.positionY,
            BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE,
            BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE
        )
    ) {
        return false;
    }

    return true;
};

const baumkuchenStyleConfigDefaultValue = {
    size: 10,
    positionX: 50,
    positionY: 50,
};

export const baumkuchenStyleConfig = <State<BaumkuchenStyleConfigProps>>(
    createLocalStorageSyncedState({
        key: "baumkuchenStyleConfig",
        defaultValue: baumkuchenStyleConfigDefaultValue,
        validationFunc: isBaumkuchenConfigValid,
    })
);

export const setBaumkuchenStyleSize = (newValue: number) => {
    baumkuchenStyleConfig.set({
        ...baumkuchenStyleConfig.val,
        size: newValue,
    });
};

export const resetBaumkuchenStyleSize = () => {
    setBaumkuchenStyleSize(baumkuchenStyleConfigDefaultValue.size);
};

export const setBaumkuchenStylePositionX = (newValue: number) => {
    baumkuchenStyleConfig.set({
        ...baumkuchenStyleConfig.val,
        positionX: newValue,
    });
};

export const resetBaumkuchenStylePositionX = () => {
    setBaumkuchenStylePositionX(
        baumkuchenStyleConfigDefaultValue.positionX
    );
};

export const setBaumkuchenStylePositionY = (newValue: number) => {
    baumkuchenStyleConfig.set({
        ...baumkuchenStyleConfig.val,
        positionY: newValue,
    });
};

export const resetBaumkuchenStylePositionY = () => {
    setBaumkuchenStylePositionY(
        baumkuchenStyleConfigDefaultValue.positionY
    );
};

export const appendToUrl = (url: URL) => {
    url.searchParams.append(
        "baumkuchenSize",
        baumkuchenStyleConfig.val.size.toString()
    );
    url.searchParams.append(
        "baumkuchenPositionX",
        baumkuchenStyleConfig.val.positionX.toString()
    );
    url.searchParams.append(
        "baumkuchenPositionY",
        baumkuchenStyleConfig.val.positionY.toString()
    );
};

export const parseFromSearchParams = (params: URLSearchParams) => {
    const size = tryParseNumericData(
        params.get("baumkuchenSize") ?? "",
        BAUMKUCHEN_CONFIG_SIZE_MIN_VALUE,
        BAUMKUCHEN_CONFIG_SIZE_MAX_VALUE
    );
    if (size !== null) setBaumkuchenStyleSize(size);

    const posX = tryParseNumericData(
        params.get("baumkuchenPositionX") ?? "",
        BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE,
        BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE
    );
    if (posX !== null) setBaumkuchenStylePositionX(posX);

    const posY = tryParseNumericData(
        params.get("baumkuchenPositionY") ?? "",
        BAUMKUCHEN_CONFIG_POSITION_MIN_VALUE,
        BAUMKUCHEN_CONFIG_POSITION_MAX_VALUE
    );
    if (posY !== null) setBaumkuchenStylePositionY(posY);
};
