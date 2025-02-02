import type { SizeItem, ColourItem } from "./types.js";

export const renderPreviewCanvas = (
    { size, colours }: { size: SizeItem, colours: string[] }
) => {
    const CANVAS_ID = "Canvas";
    const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = size.width;
    canvas.height = size.height;

    canvas.style.aspectRatio = (size.width/size.height).toString();
    if (size.width >= size.height) {
        canvas.style.width = "90%";
        canvas.style.height = "";
    } else {
        canvas.style.width = "";
        canvas.style.height = "90%";
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = `#${colours[0]}`;
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.fillStyle = `#fff`;
    ctx.fillRect(0, 0, 20, 20);
}

export const generateImage = (
    {width, height, bgHex, filename}:
    {
        width: number,
        height: number,
        bgHex: string,
        filename: string,
    }
) => {
    const CANVAS_ID = "renderCanvas"

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", CANVAS_ID);
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = `#${bgHex}`;
    ctx.fillRect(0, 0, width, height);

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
