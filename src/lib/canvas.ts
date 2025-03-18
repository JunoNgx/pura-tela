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
