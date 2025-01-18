import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
import { isHexCodeValid } from "./utils.js";
import { ThemeMode, type SizeItem } from "./types.js";

export const createLocalStorageSyncedStore = <T>(
    { key, defaultValue }:
    {
        key: string,
        defaultValue: T
    } 
): Writable<T> => {
    const fallback = () => {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return writable(defaultValue);
    };

    const createStoreWithSubscription = (verifiedData: T) => {
        const store = writable(verifiedData);
        store.subscribe(value => {
            if (!browser) {
                return;
            }
    
            localStorage.setItem(key, JSON.stringify(value));
        });
        return store;
    };

    if (!browser) {
        return writable(defaultValue);
    }

    try {
        const existingData = localStorage.get(key);
        if (existingData === null) {
            console.log(`INFO: localStorage data for ${key} is empty, using fallback data`)
            return fallback();
        }

        const parsedData = JSON.parse(existingData) as T;
        if (!parsedData) {
            console.warn(`WARN: localStorage data for ${key} is invalid, using fallback data`)
            return fallback();
        }
    
        return createStoreWithSubscription(parsedData);

    } catch (error) {
        console.warn(`Unable to retrieve key ${key} from localStorage`);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return createStoreWithSubscription(defaultValue);
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
    } catch (err) {        
        return false;
    }
};

export const isCurrSizeOptionIndexValid = (
    data: any, sizeOptions: SizeItem[]
) => {
    if (!data || !sizeOptions) {
        return false;
    }

    try {
        parseInt(data);

        if (data < 0 || data > sizeOptions.length - 1) {
            return false;
        }
    } catch (err) {        
        return false;
    }
}

export const isThemeModeValid = (data: any) => {
    if ( data !== ThemeMode.AUTO
        && data !== ThemeMode.DARK
        && data !== ThemeMode.LIGHT
    ) {
        return false
    }

    return true;
}