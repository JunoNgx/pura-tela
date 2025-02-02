import type { SizeItem } from "./types.js";

const CANVAS_ID = "Canvas";

/**
 * Using array of hex colours to setup for future complex features,
 * where multiple colours are involved.
 */
// TODO: to refactor to ColourItem[]
export const renderPreviewCanvas = (
    { size, colours }: { size: SizeItem, colours: string[] }
) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;

    setCanvasFitMode(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = `#${colours[0]}`;
    ctx.fillRect(0, 0, size.width, size.height);
};

const setCanvasFitMode = (canvas: HTMLCanvasElement) => {
    const container = document.getElementById("CanvasContainer");
    if (!container) return;

    const isContainerWide = container.clientWidth > container.clientHeight;
    const isCanvasWide = canvas.width > canvas.height;

    if (!isContainerWide && isCanvasWide)
        setCanvasFitToWidth(canvas)
    else setCanvasFitToHeight(canvas);
};

const setCanvasFitToWidth = (canvas: HTMLCanvasElement) => {
    canvas.style.width = "95%";
    canvas.style.height = "";
};

const setCanvasFitToHeight = (canvas: HTMLCanvasElement) => {
    canvas.style.width = "";
    canvas.style.height = "95%";
};

export const generateImage = (filename: string) => {
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.toBlob((blob) => {
        if (blob === null) return;

        const url = URL.createObjectURL(blob);

        const anchorEl = document.createElement("a");
        anchorEl.href = url;
        anchorEl.download = filename;

        document.body.appendChild(anchorEl);
        anchorEl.click();
        document.body.removeChild(anchorEl);


        setTimeout(() => {
            URL.revokeObjectURL(url);
        })
    });
};
