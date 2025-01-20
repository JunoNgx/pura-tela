<script lang="ts">
    import MaterialSymbolsLightSettings from '~icons/material-symbols-light/settings';
    import MaterialSymbolsLightSettingsOutline from '~icons/material-symbols-light/settings-outline';
    import MaterialSymbolsLightLightMode from '~icons/material-symbols-light/light-mode';
    import MaterialSymbolsLightLightModeOutline from '~icons/material-symbols-light/light-mode-outline';
    import MaterialSymbolsLightModeNight from '~icons/material-symbols-light/mode-night';
    import MaterialSymbolsLightModeNightOutline from '~icons/material-symbols-light/mode-night-outline';

    import { themeMode } from 'src/lib/states.svelte.js';
	import { ThemeMode } from 'src/lib/types.js';
	import { handleThemeModeChange } from 'src/lib/nightMode.js';

    const handleClickOnThemeMode = (newThemeModeVal: ThemeMode) => {
        themeMode.set(newThemeModeVal);
        handleThemeModeChange();
    };
</script>

<div class="ThemeMode">
    <button class="ThemeMode__Item"
        onclick={() => handleClickOnThemeMode(ThemeMode.AUTO)}
    >
        {#if themeMode.val === ThemeMode.AUTO}
            <MaterialSymbolsLightSettings/>
        {:else}
            <MaterialSymbolsLightSettingsOutline/>
        {/if}
    </button>
    <button class="ThemeMode__Item"
        onclick={() => handleClickOnThemeMode(ThemeMode.LIGHT)}
    >
        {#if themeMode.val === ThemeMode.LIGHT}
            <MaterialSymbolsLightLightMode/>
        {:else}
            <MaterialSymbolsLightLightModeOutline/>
        {/if}
    </button>
    <button class="ThemeMode__Item"
        onclick={() => handleClickOnThemeMode(ThemeMode.DARK)}
    >
        {#if themeMode.val === ThemeMode.DARK}
            <MaterialSymbolsLightModeNight/>
        {:else}
            <MaterialSymbolsLightModeNightOutline/>
        {/if}
    </button>
</div>

<style>
    .ThemeMode {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .ThemeMode__Item {
        font-size: 20px;
        cursor: pointer;
        border: none;
        line-height: 0;
        padding: 0.25rem;
    }
</style>