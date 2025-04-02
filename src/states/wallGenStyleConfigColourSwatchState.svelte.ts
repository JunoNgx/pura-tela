import { ColourSwatchStyleDirection, ColourSwatchStyleItemShape, type ColourSwatchStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isEnumValueValid, isValueWithinRange } from "./stateUtils.svelte.js"
import { SWATCH_CONFIG_MAX_VALUE, SWATCH_CONFIG_MIN_VALUE } from "src/lib/constants.js";

const isPaletteRowConfigValid = (data: any) => {
    if (!data) return false;

    if (data.positionX === null || data.positionX === undefined
        || data.positionY === null || data.positionY === undefined
        || data.itemSize === null || data.itemSize === undefined
        || data.itemSpacing === null || data.itemSpacing === undefined
        || !data.itemShape
        || !data.direction
    ) {
        return false;
    }

    if (!isValueWithinRange(data.positionX, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
        return false;

    if (!isValueWithinRange(data.positionY, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
        return false;

    if (!isValueWithinRange(data.itemSize, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
        return false;

    if (!isValueWithinRange(data.itemSpacing, SWATCH_CONFIG_MIN_VALUE, SWATCH_CONFIG_MAX_VALUE))
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
    itemShape: ColourSwatchStyleItemShape.SQUARE,
    itemSize: 50,
    itemSpacing: 50,
};

export const colourSwatchStyleConfig = <State<ColourSwatchStyleConfigProps>>createLocalStorageSyncedState({
    key: "colourSwatchStyleConfig",
    defaultValue: colourSwatchStyleConfigDefaultValue,
    validationFunc: isPaletteRowConfigValid
});

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
    newValue: ColourSwatchStyleItemShape
) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        itemShape: newValue,
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
