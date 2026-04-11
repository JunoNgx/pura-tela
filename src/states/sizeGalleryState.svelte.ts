import defaultSizeGallery from "src/data/sizes.json" with { type: "json" };

/**
 * Size gallery
 */
type rawParseSizeOptionItem = {
    name: string;
    width: string;
    height: string;
};

const generateSizeGallery = (rawOptions: rawParseSizeOptionItem[]) => {
    return rawOptions.map((sizeOption) => ({
        name: sizeOption.name,
        width: parseInt(sizeOption.width),
        height: parseInt(sizeOption.height),
    }));
};

export const sizeGallery = generateSizeGallery(defaultSizeGallery);
