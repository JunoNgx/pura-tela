import { browser } from "$app/environment";
import { isHexCodeValid } from "./utils.js";
import { ThemeMode, type State } from "./types.js";
import { sizeOptions } from "./states.svelte.js";

export const createLocalStorageSyncedState = <T>(
    { key, defaultValue, validationFunc = () => true }:
    {
        key: string,
        defaultValue: T
        validationFunc?: (data: any) => boolean
    }
): State<T> => {

    const createStateWithSyncEffect = (verifiedData: T) => {
        let state = $state<T>(verifiedData);

        if (browser) {
            localStorage.setItem(key, JSON.stringify(state));
        }

        return {
            get val() { return state; },
            set: (newVal: T) => {
                state = newVal;

                if (!browser) {
                    return;
                }

                localStorage.setItem(key, JSON.stringify(state));
            }
        };
    }

    if (!browser) {
        return createStateWithSyncEffect(defaultValue);
    }

    try {
        const existingData = localStorage.getItem(key);
        if (existingData === null) {
            console.log(`INFO: localStorage data for ${key} is empty, using fallback data`)
            return createStateWithSyncEffect(defaultValue);
        }

        const parsedData = JSON.parse(existingData) as T;
        if (!validationFunc(parsedData)) {
            console.warn(`WARN: localStorage data for ${key} is invalid, using fallback data`)
            return createStateWithSyncEffect(defaultValue);
        }
    
        return createStateWithSyncEffect(parsedData);

    } catch (error) {
        console.warn(`WARN: Unable to retrieve key ${key} from localStorage`, error);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return createStateWithSyncEffect(defaultValue);
    }
};

export const createState = <T>(
    defaultValue: T
): State<T> => {
    let state = $state<T>(defaultValue);

    return {
        get val() { return state; },
        set: (v: T) => { state = v;}
    }
};

export const isColourGalleryValid = (data: any[]) => {
    if (!data) {
        return false;
    }

    try {
        for (const item of data) {
            if (!item.name) {
                return false;
            }

            if (!isHexCodeValid(item.hexCode)) {
                return false;
            }
        }

        return true;
    } catch (err) {        
        return false;
    }
};

export const isSizeOptionsValid = (data: any[]) => {
    if (!data) {
        return false;
    }

    try {
        for (const item of data) {
            if (!item.name) {
                return false;
            }

            parseInt(item.width);
            parseInt(item.height);
        }

        return true;
    } catch (err) {        
        return false;
    }
};

export const isCurrSizeOptionIndexValid = (data: any) => {
    if (data === null || data === undefined || !sizeOptions) {
        return false;
    }

    try {
        parseInt(data);

        if (data < 0 || data > sizeOptions.length - 1) {
            return false;
        }

        return true;
    } catch (err) {
        return false;
    }
};

export const isThemeModeValid = (data: any) => {
    if ( data !== ThemeMode.AUTO
        && data !== ThemeMode.DARK
        && data !== ThemeMode.LIGHT
    ) {
        return false
    }

    return true;
};
