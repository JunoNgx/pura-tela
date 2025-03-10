import { ThemeMode, type State } from "src/lib/types.js";
import { createLocalStorageSyncedState } from "./stateUtils.svelte.js";

const isThemeModeValid = (data: any) => {
    if ( data !== ThemeMode.AUTO
        && data !== ThemeMode.DARK
        && data !== ThemeMode.LIGHT
    ) {
        return false
    }

    return true;
};

export const themeMode = createLocalStorageSyncedState({
    key: "themeMode",
    defaultValue: ThemeMode.AUTO,
    validationFunc: isThemeModeValid,
}) as State<ThemeMode>;
