<script lang="ts">
    import MaterialSymbolsLightSettings from "~icons/material-symbols-light/settings";
    import MaterialSymbolsLightSettingsOutline from "~icons/material-symbols-light/settings-outline";
    import MaterialSymbolsLightLightMode from "~icons/material-symbols-light/light-mode";
    import MaterialSymbolsLightLightModeOutline from "~icons/material-symbols-light/light-mode-outline";
    import MaterialSymbolsLightDarkMode from "~icons/material-symbols-light/dark-mode";
    import MaterialSymbolsLightDarkModeOutline from "~icons/material-symbols-light/dark-mode-outline";

    import { themeMode } from "src/states/themeModeState.svelte.js";
    import { ThemeMode } from "src/lib/types.js";
    import { handleThemeModeChange } from "src/lib/nightMode.js";

    const handleClickOnThemeMode = (newThemeModeVal: ThemeMode) => {
        themeMode.set(newThemeModeVal);
        handleThemeModeChange();
    };
</script>

<div class="ThemeMode">
    <button
        class="ThemeMode__Item IconButton"
        onclick={() => handleClickOnThemeMode(ThemeMode.AUTO)}
        aria-label="Auto setting theme mode button"
    >
        <div class="IconButton__RegularIcon">
            {#if themeMode.val === ThemeMode.AUTO}
                <MaterialSymbolsLightSettings />
            {:else}
                <MaterialSymbolsLightSettingsOutline />
            {/if}
        </div>
        <div class="IconButton__HoverIcon">
            <MaterialSymbolsLightSettings />
        </div>
    </button>

    <button
        class="ThemeMode__Item IconButton"
        onclick={() => handleClickOnThemeMode(ThemeMode.LIGHT)}
        aria-label="Light theme mode button"
    >
        <div class="IconButton__RegularIcon">
            {#if themeMode.val === ThemeMode.LIGHT}
                <MaterialSymbolsLightLightMode />
            {:else}
                <MaterialSymbolsLightLightModeOutline />
            {/if}
        </div>
        <div class="IconButton__HoverIcon">
            <MaterialSymbolsLightLightMode />
        </div>
    </button>

    <button
        class="ThemeMode__Item IconButton"
        onclick={() => handleClickOnThemeMode(ThemeMode.DARK)}
        aria-label="Dark theme mode button"
    >
        <div class="IconButton__RegularIcon">
            {#if themeMode.val === ThemeMode.DARK}
                <MaterialSymbolsLightDarkMode />
            {:else}
                <MaterialSymbolsLightDarkModeOutline />
            {/if}
        </div>
        <div class="IconButton__HoverIcon">
            <MaterialSymbolsLightDarkMode />
        </div>
    </button>
</div>

<style>
    .ThemeMode {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .ThemeMode__Item,
    .ThemeMode__Item:hover {
        border: none;
        background-color: none;
        color: var(--colPri);
    }

    @media screen and (width < 850px) {
        .ThemeMode__Item {
            transition: none;
        }
    }
</style>
