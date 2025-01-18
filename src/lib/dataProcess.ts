import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

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
            return fallback();
        }

        const parsedData = JSON.parse(existingData) as T;
        if (!parsedData) {
            return fallback();
        }
    
        return createStoreWithSubscription(parsedData);

    } catch (error) {
        console.warn(`Unable to retrieve key ${key} from localStorage`);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return createStoreWithSubscription(defaultValue);
    }
};
