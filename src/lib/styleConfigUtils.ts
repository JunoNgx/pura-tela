import type { InputEvent } from "src/lib/types.js";

export const handleSliderChange = (
    e: InputEvent,
    setter: (v: number) => void
): void => {
    setter(parseInt(e.currentTarget.value));
};
