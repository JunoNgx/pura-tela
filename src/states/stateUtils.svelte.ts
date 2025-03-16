import { MAX_COLOUR_COUNT } from "src/lib/constants.js";
import { type ColObj, type PalGenColObj, type State } from "src/lib/types.js";
import { generateId } from "./idGenState.svelte.js";

export const createLocalStorageSyncedState = <T>({
    key, defaultValue, validationFunc = () => true
}: {
    key: string,
    defaultValue: T,
    validationFunc: (data: any) => boolean,
    shouldHandleId?: boolean,
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
            localStorage.setItem(key, JSON.stringify(defaultValue));
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

type ColState = ColObj[] | PalGenColObj[];
type ColStateStoreFormat = { colour: string, isLocked?: boolean }[];

export const createColState = ({
    key,
    defaultValue,
    validationFunc = () => true,
}: {
    key: string,
    defaultValue: { colour: string, isLocked?: boolean }[],
    validationFunc: (data: any) => boolean,
    shouldHandleId?: boolean,
}): State<ColState> => {

    const createColStateWithSyncEffect = (verifiedData: ColStateStoreFormat) => {
        const dataWithId = verifiedData.map(item => ({
            ...item,
            id: generateId(),
        }));

        let state = $state<ColState>(dataWithId);

        return {
            get val() { return state; },
            set(newVal: ColState) {
                state = newVal;

                const localStorageStoredVal = state.map(item => {
                    const {id, ...rest} = item;
                    return {...rest};
                });

                localStorage.setItem(key, JSON.stringify(localStorageStoredVal));
            }
        };
    }

    try {
        const existingData = localStorage.getItem(key);
        if (existingData === null) {
            console.log(`INFO: localStorage data for ${key} is empty, using fallback data`)
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return createColStateWithSyncEffect(defaultValue);
        }

        const parsedData = JSON.parse(existingData) as ColState;
        if (!validationFunc(parsedData)) {
            console.warn(`WARN: localStorage data for ${key} is invalid, using fallback data`)
            return createColStateWithSyncEffect(defaultValue);
        }
    
        return createColStateWithSyncEffect(parsedData);

    } catch (error) {
        console.warn(`WARN: Unable to retrieve key ${key} from localStorage`, error);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return createColStateWithSyncEffect(defaultValue);
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

export const isArrayOfHexCodesValid = (arr: string[]): boolean => {
    if (arr.length < 2 || arr.length > MAX_COLOUR_COUNT) {
        return false;
    }

    for (const colour of arr) {
        if (!isHexCodeValid(colour)) {
            return false;
        }
    }

    return true;
};

export const moveItemWithinArray = <T>(
    arr: T[],
    fromIndex: number,
    toIndex: number,
) => {
    const newTempVal = $state.snapshot(arr);

    const movedItem = newTempVal.splice(fromIndex, 1)[0];
    newTempVal.splice(toIndex, 0, movedItem);

    return newTempVal;
};

// Unused, attempted to abstract `sortableJs`' `store.set` unsucessfully
export const reorderColStateFromSortableJs = (
    colState: State<ColObj[]>, idOrder: string[]
) => {
    const newValue = idOrder.map(id => {
        const correspondingItem =
            colState.val.find(palGenItem => palGenItem.id === parseInt(id));

        if (!correspondingItem) {
            throw new Error(
                "Cannot find corresponding colour item while re-sorting after drag and drop");
        }
        
        return correspondingItem;
    });

    colState.set(newValue); 
};
