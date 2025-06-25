import { beforeNavigate, afterNavigate } from "$app/navigation"
import type { ScrollPositionState } from "./types.js";

export const createScrollPositionManager = (
    routePath: string,
    scrollPositionStore: ScrollPositionState
) => {
    beforeNavigate(({ from }) => {
        if (from?.url.pathname !== routePath) return;
        scrollPositionStore.set(window.scrollY);
    });

    afterNavigate(({ to }) => {
        if (to?.url.pathname !== routePath) return;
        scrollTo({
            top: scrollPositionStore.val || 0,
            left: 0,
            behavior: "smooth",
        });
    });
};
