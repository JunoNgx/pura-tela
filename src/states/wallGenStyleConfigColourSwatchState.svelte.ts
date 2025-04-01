import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, type ColourSwatchStyleConfigProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isEnumValueValid, isValidBoolean } from "./stateUtils.svelte.js"

const isPaletteRowConfigValid = (data: any) => {
    if (!data) return false;

    if (!isEnumValueValid(data.itemShape, ColourSwatchStyleItemShape))
        return false;

    if (!isEnumValueValid(data.position, ColourSwatchStylePosition))
        return false;

    if (!isValidBoolean(data.hasSpacing))
        return false;

    return true;
};

const colourSwatchStyleConfigDefaultValue = {
    itemShape: ColourSwatchStyleItemShape.SQUARE,
    position: ColourSwatchStylePosition.CENTERED,
    hasSpacing: true,
};

export const colourSwatchStyleConfig = <State<ColourSwatchStyleConfigProps>>createLocalStorageSyncedState({
    key: "colourSwatchStyleConfig",
    defaultValue: colourSwatchStyleConfigDefaultValue,
    validationFunc: isPaletteRowConfigValid
});

export const setColourSwatchStyleItemShape = (
    newValue: ColourSwatchStyleItemShape
) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        itemShape: newValue,
    });
}

export const setColourSwatchStylePosition = (
    newValue: ColourSwatchStylePosition
) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        position: newValue,
    });
}

export const setColourSwatchStyleSpacing = (newValue: boolean) => {
    colourSwatchStyleConfig.set({
        ...colourSwatchStyleConfig.val,
        hasSpacing: newValue,
    });
}
