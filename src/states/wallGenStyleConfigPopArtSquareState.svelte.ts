import {
    type PopArtSquareStyleConfigProps,
    type State,
} from "src/lib/types.js";
import {
    createLocalStorageSyncedState,
    isValueWithinRange,
} from "./stateUtils.svelte.js";
import {
    POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE,
    POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE,
    POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
} from "src/lib/constants.js";

const isPopArtSquareConfigValid = (data: any) => {
    if (!data) return false;

    if (
        !isValueWithinRange(
            data.size,
            POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
            POP_ART_SQUARE_CONFIG_SIZE_MAX_VALUE
        )
    ) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.positionX,
            POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
            POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE
        )
    ) {
        return false;
    }

    if (
        !isValueWithinRange(
            data.positionY,
            POP_ART_SQUARE_CONFIG_SIZE_MIN_VALUE,
            POP_ART_SQUARE_CONFIG_POSITION_MAX_VALUE
        )
    ) {
        return false;
    }

    return true;
};

const popArtSquareStyleConfigDefaultValue = {
    size: 10,
    positionX: 50,
    positionY: 50,
};

export const popArtSquareStyleConfig = <State<PopArtSquareStyleConfigProps>>(
    createLocalStorageSyncedState({
        key: "popArtSquareStyleConfig",
        defaultValue: popArtSquareStyleConfigDefaultValue,
        validationFunc: isPopArtSquareConfigValid,
    })
);

export const setpopArtSquareStyleSize = (newValue: number) => {
    popArtSquareStyleConfig.set({
        ...popArtSquareStyleConfig.val,
        size: newValue,
    });
};

export const resetPopArtSquareStyleSize = () => {
    setpopArtSquareStyleSize(popArtSquareStyleConfigDefaultValue.size);
};

export const setPopArtSquareStylePositionX = (newValue: number) => {
    popArtSquareStyleConfig.set({
        ...popArtSquareStyleConfig.val,
        positionX: newValue,
    });
};

export const resetPopArtSquareStylePositionX = () => {
    setPopArtSquareStylePositionX(
        popArtSquareStyleConfigDefaultValue.positionX
    );
};

export const setPopArtSquareStylePositionY = (newValue: number) => {
    popArtSquareStyleConfig.set({
        ...popArtSquareStyleConfig.val,
        positionY: newValue,
    });
};

export const resetPopArtSquareStylePositionY = () => {
    setPopArtSquareStylePositionY(
        popArtSquareStyleConfigDefaultValue.positionY
    );
};
