import { ThemeMode, WallpaperMode, type State } from "src/lib/types.js";

export const createLocalStorageSyncedState = <T>({
    key, defaultValue, validationFunc = () => true
}: {
    key: string,
    defaultValue: T
    validationFunc?: (data: any) => boolean
}): State<T> => {
    const createStateWithSyncEffect = (verifiedData: T) => {
        let state = $state<T>(verifiedData);

        return {
            get val() { return state; },
            set(newVal: T) {
                state = newVal;
                localStorage.setItem(key, JSON.stringify(state));
            }
        };
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
        set(v: T) { state = v;}
    }
};

export const isValidBoolean = (data: any) => {
    if (data === null || data === undefined) {
        return false;
    }

    if (data !== true && data !== false) {
        return false;
    }

    return true;
}

export const isHexCodeValid = (str: string): boolean => {
    const validHexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return validHexRegex.test(str);
};
