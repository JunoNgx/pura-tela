import type { ScrollPositionState } from "src/lib/types.js";

const createGalleryScrollPositionState = (): ScrollPositionState => {
    let scrollingPosition = $state(0);

    return {
        get val() {
            return scrollingPosition;
        },
        set: (newVal: number) => {
            scrollingPosition = newVal;
        },
    };
};

export const colourGalleryScrollPos = createGalleryScrollPositionState();
export const paletteGalleryScrollPos = createGalleryScrollPositionState();
export const sizeGalleryScrollPos = createGalleryScrollPositionState();
