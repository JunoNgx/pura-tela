import { ThemeMode, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState, isEnumValueValid } from "./stateUtils.svelte.js";

const isThemeModeValid = (data: any) => {
    if (!isEnumValueValid(data, ThemeMode))
        return false;

    return true;
};

export const themeMode = createLocalStorageSyncedState({
    key: "themeMode",
    defaultValue: ThemeMode.AUTO,
    validationFunc: isThemeModeValid,
}) as State<ThemeMode>;
