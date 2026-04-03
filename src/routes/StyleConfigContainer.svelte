<script lang="ts">
    import { WallpaperStyle, type MouseButtonEvent } from "src/lib/types.js";
    import {
        isSelectedStyle,
        wallGenStyle,
        tryResetWallGenColourInUseCount,
    } from "src/states/wallGenState.svelte.js";
    import StyleConfigColourSwatch from "./StyleConfigColourSwatch.svelte";
    import StyleConfigGradient from "./StyleConfigGradient.svelte";
    import StyleConfigPalette from "./StyleConfigPalette.svelte";
    import StyleConfigHorizon from "./StyleConfigHorizon.svelte";
    import StyleConfigColourPopArtSquare from "./StyleConfigColourPopArtSquare.svelte";
    import StyleConfigTwilight from "./StyleConfigTwilight.svelte";
    import StyleConfigPieMan from "./StyleConfigPieMan.svelte";

    const handleWallpaperStyleChange = (e: MouseButtonEvent) => {
        const newValue = e.currentTarget.getAttribute(
            "data-value"
        ) as WallpaperStyle;
        wallGenStyle.set(newValue);

        tryResetWallGenColourInUseCount();
    };
</script>

<section class="StyleSelector">
    <fieldset class="StyleSelector__Fieldset">
        <legend><h3>Wallpaper Style</h3></legend>

        <div class="StyleSelector__Container">
            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.SOLID)}
                aria-label="Select wallpaper style Solid"
                title="Select wallpaper style Solid"
                data-value={WallpaperStyle.SOLID}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-solid.png"
                    alt="Illustration for style Solid"
                />
                <span class="StyleSelectButton__Label"> Solid Colour </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.GRADIENT)}
                aria-label="Select wallpaper style Gradient"
                title="Select wallpaper style Gradient"
                data-value={WallpaperStyle.GRADIENT}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-gradient.png"
                    alt="Illustration for style Gradient"
                />
                <span class="StyleSelectButton__Label"> Gradient </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.POP_ART_SQUARE)}
                aria-label="Select wallpaper style Pop Art Square"
                title="Select wallpaper style Pop Art Square"
                data-value={WallpaperStyle.POP_ART_SQUARE}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-popart.png"
                    alt="Illustration for style Pop Art Square"
                />
                <span class="StyleSelectButton__Label"> Pop Art Square </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.HORIZON)}
                aria-label="Select wallpaper style Horizon"
                title="Select wallpaper style Horizon"
                data-value={WallpaperStyle.HORIZON}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-horizon.png"
                    alt="Illustration for style Horizon"
                />
                <span class="StyleSelectButton__Label"> Horizon </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.PALETTE)}
                aria-label="Select wallpaper style Colour Palette"
                title="Select wallpaper style Colour Palette"
                data-value={WallpaperStyle.PALETTE}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-palette.png"
                    alt="Illustration for style Colour Palette"
                />
                <span class="StyleSelectButton__Label"> Colour Palette </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.COLOUR_SWATCH)}
                aria-label="Select wallpaper style Colour Swatch"
                title="Select wallpaper style Colour Swatch"
                data-value={WallpaperStyle.COLOUR_SWATCH}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-swatch.png"
                    alt="Illustration for style Colour Swatch"
                />
                <span class="StyleSelectButton__Label"> Colour Swatch </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.TWILIGHT)}
                aria-label="Select wallpaper style Twilight"
                title="Select wallpaper style Twilight"
                data-value={WallpaperStyle.TWILIGHT}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-twilight.png"
                    alt="Illustration for style Twilight"
                />
                <span class="StyleSelectButton__Label"> Twilight </span>
            </button>

            <button
                class="StyleSelectButton"
                class:StyleSelectButton--IsSelected={isSelectedStyle(WallpaperStyle.PIE_MAN)}
                aria-label="Select wallpaper style Pie-Man"
                title="Select wallpaper style Pie-Man"
                data-value={WallpaperStyle.PIE_MAN}
                onclick={handleWallpaperStyleChange}
            >
                <img
                    class="StyleSelectButton__Img"
                    src="/styleImages/style-pieman.png"
                    alt="Illustration for style Pie-Man"
                />
                <span class="StyleSelectButton__Label"> Pie-Man </span>
            </button>
        </div>
    </fieldset>
</section>

<section class="StyleConfig">
    {#if isSelectedStyle(WallpaperStyle.COLOUR_SWATCH)}
        <StyleConfigColourSwatch />
    {:else if isSelectedStyle(WallpaperStyle.GRADIENT)}
        <StyleConfigGradient />
    {:else if isSelectedStyle(WallpaperStyle.PALETTE)}
        <StyleConfigPalette />
    {:else if isSelectedStyle(WallpaperStyle.HORIZON)}
        <StyleConfigHorizon />
    {:else if isSelectedStyle(WallpaperStyle.POP_ART_SQUARE)}
        <StyleConfigColourPopArtSquare />
    {:else if isSelectedStyle(WallpaperStyle.TWILIGHT)}
        <StyleConfigTwilight />
    {:else if isSelectedStyle(WallpaperStyle.PIE_MAN)}
        <StyleConfigPieMan />
    {/if}
</section>

<style>
    .StyleSelector__Container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;
    }

    .StyleSelector__Fieldset {
        border: none;
        padding: 0;
        margin: 0;
    }

    .StyleSelectButton {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        position: relative;
        color: var(--colPri);
        background-color: var(--colBg);
    }

    .StyleSelectButton:hover {
        color: var(--colBg);
        background-color: var(--colPri);
    }

    .StyleSelectButton--IsSelected,
    .StyleSelectButton--IsSelected:hover {
        color: var(--colPri);
        background-color: var(--colBg2);
    }

    .StyleSelectButton:after {
        content: "";
        width: 1rem;
        height: 1rem;
        background-color: var(--colPri);
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        opacity: 0;
        transition: opacity ease-in-out var(--transTime);
    }

    .StyleSelectButton--IsSelected:after {
        opacity: 1;
    }

    .StyleSelectButton__Img {
        width: 4rem;
        height: 4rem;
    }

    .StyleSelectButton--IsSelected .StyleSelectButton__Label {
        text-decoration: underline;
    }

    @media screen and (width < 550px) {
        .StyleSelector__Container {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and (width < 320px) {
        .StyleSelector__Container {
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
