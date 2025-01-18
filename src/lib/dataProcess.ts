import { browser } from "$app/environment";

// TODO: add param: validateFunc
export const loadFromLocalStorage = <T>({key, defaultValue}:
    {key: string, defaultValue: T}
): T => {
    if (!browser) {
        return defaultValue;
    }

    try {
        const fallback = () => {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        };

        const existingData = localStorage.get(key);
        if (existingData === null) {
            return fallback();
        }

        const parsedData = JSON.parse(existingData) as T;
        if (!parsedData) {
            return fallback();
        }
    
        return parsedData;
    } catch (error) {
        console.warn(`Unable to retrieve key ${key} from localStorage`);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
};
