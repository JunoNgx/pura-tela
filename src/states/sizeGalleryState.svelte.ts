import defaultSizeGallery from "src/data/sizes.json" with { type: "json" };

export const sizeGallery = defaultSizeGallery.map((sizeOption) => ({
    name: sizeOption.name,
    width: parseInt(sizeOption.width),
    height: parseInt(sizeOption.height),
    isFeatured: sizeOption.isFeatured ?? false,
}));
