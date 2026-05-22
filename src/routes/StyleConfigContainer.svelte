<script lang="ts">
    import type { Component } from "svelte";
    import { WallpaperStyle, type MouseButtonEvent } from "src/lib/types.js";
    import {
        isSelectedStyle,
        wallGenStyle,
        tryResetWallGenColourInUseCount,
    } from "src/states/wallGenState.svelte.js";
    import { WALLPAPER_STYLES } from "src/lib/styleButtonList.js";
    import StyleConfigColourSwatch from "./StyleConfigColourSwatch.svelte";
    import StyleConfigGradient from "./StyleConfigGradient.svelte";
    import StyleConfigPalette from "./StyleConfigPalette.svelte";
    import StyleConfigHorizon from "./StyleConfigHorizon.svelte";
    import StyleConfigColourPopArtSquare from "./StyleConfigColourPopArtSquare.svelte";
    import StyleConfigTwilight from "./StyleConfigTwilight.svelte";
    import StyleConfigPieMan from "./StyleConfigPieMan.svelte";
    import StyleConfigColourBaumkuchen from "./StyleConfigColourBaumkuchen.svelte";

    // Solid style doesn't have config UI
    const configComponents: Partial<Record<WallpaperStyle, Component>> = {
        [WallpaperStyle.GRADIENT]: StyleConfigGradient,
        [WallpaperStyle.COLOUR_SWATCH]: StyleConfigColourSwatch,
        [WallpaperStyle.PALETTE]: StyleConfigPalette,
        [WallpaperStyle.HORIZON]: StyleConfigHorizon,
        [WallpaperStyle.POP_ART_SQUARE]: StyleConfigColourPopArtSquare,
        [WallpaperStyle.TWILIGHT]: StyleConfigTwilight,
        [WallpaperStyle.PIE_MAN]: StyleConfigPieMan,
        [WallpaperStyle.BAUMKUCHEN]: StyleConfigColourBaumkuchen,
    };

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
            {#each WALLPAPER_STYLES as item}
                <button
                    class="StyleSelectButton"
                    class:StyleSelectButton--IsSelected={isSelectedStyle(
                        item.style
                    )}
                    aria-label="Select wallpaper style {item.label}"
                    title="Select wallpaper style {item.label}"
                    data-value={item.style}
                    onclick={handleWallpaperStyleChange}
                >
                    <img
                        class="StyleSelectButton__Img"
                        src={item.image}
                        alt="Illustration for style {item.label}"
                    />
                    <span class="StyleSelectButton__Label">{item.label}</span>
                </button>
            {/each}
        </div>
    </fieldset>
</section>

<section class="StyleConfig">
    <svelte:component this={configComponents[wallGenStyle.val] ?? null} />
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
