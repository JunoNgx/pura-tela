import { ColourSwatchStyleItemShape, ColourSwatchStylePosition, type ColourSwatchStyleSettingsProps, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isEnumValueValid, isValidBoolean } from "./stateUtils.svelte.js"

const isPaletteRowSettingsValid = (data: any) => {
    if (!data) return false;

    if (!isEnumValueValid(data.itemShape, ColourSwatchStyleItemShape))
        return false;

    if (!isEnumValueValid(data.position, ColourSwatchStylePosition))
        return false;

    if (!isValidBoolean(data.hasSpacing))
        return false;

    return true;
};

const colourSwatchStyleSettingsDefaultValue = {
    itemShape: ColourSwatchStyleItemShape.SQUARE,
    position: ColourSwatchStylePosition.CENTERED,
    hasSpacing: true,
};

export const colourSwatchStyleSettings = <State<ColourSwatchStyleSettingsProps>>createLocalStorageSyncedState({
    key: "paletteRowStyleSettings",
    defaultValue: colourSwatchStyleSettingsDefaultValue,
    validationFunc: isPaletteRowSettingsValid
});

export const setColourSwatchStyleItemShape = (
    newValue: ColourSwatchStyleItemShape
) => {
    colourSwatchStyleSettings.set({
        ...colourSwatchStyleSettings.val,
        itemShape: newValue,
    });
}

export const setColourSwatchStylePosition = (
    newValue: ColourSwatchStylePosition
) => {
    colourSwatchStyleSettings.set({
        ...colourSwatchStyleSettings.val,
        position: newValue,
    });
}

export const setColourSwatchStyleSpacing = (newValue: boolean) => {
    colourSwatchStyleSettings.set({
        ...colourSwatchStyleSettings.val,
        hasSpacing: newValue,
    });
}
