import { isValueWithinRange } from "src/states/stateUtils.svelte.js";
import type { InputEvent } from "src/lib/types.js";

export const handleSliderChange = (
    e: InputEvent,
    setter: (v: number) => void,
    label: string,
    min: number,
    max: number
): void => {
    const newValue = e.currentTarget.value;

    try {
        const parsedValue = parseInt(newValue);
        if (!isValueWithinRange(parsedValue, min, max))
            throw new Error(`Invalid ${label} value`);

        setter(parsedValue);
    } catch (err) {
        console.warn(err);
        console.error(`Invalid ${label} value`);
    }
};
