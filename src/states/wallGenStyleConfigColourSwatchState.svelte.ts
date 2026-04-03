import {
    ColourSwatchStyleDirection,
    ColourSwatchStyleItemShape,
    type ColourSwatchStyleConfigProps,
    type State,
} from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isEnumValueValid,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    SWATCH_CONFIG_MAX_VALUE,
    SWATCH_CONFIG_MIN_VALUE,
} from "src/lib/constants.js";
import { tryParseNumericData } from "src/lib/parseFuncs.js";

const isColourSwatchConfigValid = (data: any) => {
    if (!data) return false;

    if (
        data.positionX === null
        || data.positionX === undefined
        || data.positionY === null
        || data.positionY === undefined
        || data.itemSize === null
        || data.itemSize === undefined
        || data.itemSpacing === null
        || data.itemSpacing === undefined
        || !data.itemShape
        || !data.direction
    ) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.positionX,
            SWATCH_CONFIG_MIN_VALUE,
            SWATCH_CONFIG_MAX_VALUE
        )
    )
        return false;

    if (
        !isValueWithinRange(
            data.positionY,
            SWATCH_CONFIG_MIN_VALUE,
            SWATCH_CONFIG_MAX_VALUE
        )
    )
        return false;

    if (
        !isValueWithinRange(
            data.itemSize,
            SWATCH_CONFIG_MIN_VALUE,
            SWATCH_CONFIG_MAX_VALUE
        )
    )
        return false;

    if (
        !isValueWithinRange(
            data.itemSpacing,
            SWATCH_CONFIG_MIN_VALUE,
            SWATCH_CONFIG_MAX_VALUE
        )
    )
        return false;

    if (!isEnumValueValid(data.itemShape, ColourSwatchStyleItemShape))
        return false;

    if (!isEnumValueValid(data.direction, ColourSwatchStyleDirection))
        return false;

    return true;
};

export const colourSwatchStyleConfigDefaultValue = {
    positionX: 50,
    positionY: 50,
    direction: ColourSwatchStyleDirection.HORIZONTAL,
    itemShape: ColourSwatchStyleItemShape.CIRCLE,
    itemSize: 25,
    itemSpacing: 50,
};

export const colourSwatchStyleConfig = <State<ColourSwatchStyleConfigProps>>(
    createLocalStorageSyncedState({
        key: "colourSwatchStyleConfig",
        defaultValue: colourSwatchStyleConfigDefaultValue,
        validationFunc: isColourSwatchConfigValid,
    })
);

export const setColourSwatchStylePositionX = (newValue: number) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        positionX: newValue,
    });
};

export const setColourSwatchStylePositionY = (newValue: number) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        positionY: newValue,
    });
};

export const setColourSwatchStyleDirection = (
    newValue: ColourSwatchStyleDirection
) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        direction: newValue,
    });
};

export const setColourSwatchStyleItemShape = (
    newValue: ColourSwatchStyleItemShape
) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        itemShape: newValue,
    });
};

export const setColourSwatchStyleItemSize = (newValue: number) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        itemSize: newValue,
    });
};

export const setColourSwatchStyleItemSpacing = (newValue: number) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        itemSpacing: newValue,
    });
};

export const appendToUrl = (url: URL) => {
    url.searchParams.append(
        "swatchPosX",
        colourSwatchStyleConfig.val.positionX.toString()
    );
    url.searchParams.append(
        "swatchPosY",
        colourSwatchStyleConfig.val.positionY.toString()
    );
    url.searchParams.append(
        "swatchDirection",
        colourSwatchStyleConfig.val.direction
    );
    url.searchParams.append(
        "swatchItemShape",
        colourSwatchStyleConfig.val.itemShape
    );
    url.searchParams.append(
        "swatchItemSize",
        colourSwatchStyleConfig.val.itemSize.toString()
    );
    url.searchParams.append(
        "swatchItemSpacing",
        colourSwatchStyleConfig.val.itemSpacing.toString()
    );
};

export const parseFromSearchParams = (params: URLSearchParams) => {
    const posX = tryParseNumericData(
        params.get("swatchPosX") ?? "",
        SWATCH_CONFIG_MIN_VALUE,
        SWATCH_CONFIG_MAX_VALUE
    );
    if (posX !== null) setColourSwatchStylePositionX(posX);

    const posY = tryParseNumericData(
        params.get("swatchPosY") ?? "",
        SWATCH_CONFIG_MIN_VALUE,
        SWATCH_CONFIG_MAX_VALUE
    );
    if (posY !== null) setColourSwatchStylePositionY(posY);

    const itemSize = tryParseNumericData(
        params.get("swatchItemSize") ?? "",
        SWATCH_CONFIG_MIN_VALUE,
        SWATCH_CONFIG_MAX_VALUE
    );
    if (itemSize !== null) setColourSwatchStyleItemSize(itemSize);

    const itemSpacing = tryParseNumericData(
        params.get("swatchItemSpacing") ?? "",
        SWATCH_CONFIG_MIN_VALUE,
        SWATCH_CONFIG_MAX_VALUE
    );
    if (itemSpacing !== null) setColourSwatchStyleItemSpacing(itemSpacing);

    const direction = params.get("swatchDirection");
    if (
        direction
        && isEnumValueValid(direction as any, ColourSwatchStyleDirection)
    )
        setColourSwatchStyleDirection(direction as ColourSwatchStyleDirection);

    const itemShape = params.get("swatchItemShape");
    if (
        itemShape
        && isEnumValueValid(itemShape as any, ColourSwatchStyleItemShape)
    )
        setColourSwatchStyleItemShape(itemShape as ColourSwatchStyleItemShape);
};
