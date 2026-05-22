import type { RenderOptions } from "./canvasUtils.js";

export const renderSolidStyle = ({ ctx, colours, size }: RenderOptions) => {
    ctx.fillStyle = colours[0];
    ctx.fillRect(0, 0, size.width, size.height);
};
