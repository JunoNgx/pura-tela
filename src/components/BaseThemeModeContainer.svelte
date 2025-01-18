<script lang="ts">
    import MaterialSymbolsLightSettings from '~icons/material-symbols-light/settings';
    import MaterialSymbolsLightSettingsOutline from '~icons/material-symbols-light/settings-outline';
    import MaterialSymbolsLightLightMode from '~icons/material-symbols-light/light-mode';
    import MaterialSymbolsLightLightModeOutline from '~icons/material-symbols-light/light-mode-outline';
    import MaterialSymbolsLightModeNight from '~icons/material-symbols-light/mode-night';
    import MaterialSymbolsLightModeNightOutline from '~icons/material-symbols-light/mode-night-outline';
</script>

<div class="ThemeMode">
    <button class="ThemeMode__Item">
        <MaterialSymbolsLightSettingsOutline />
    </button>
    <button class="ThemeMode__Item">
        <MaterialSymbolsLightLightModeOutline />
    </button>
    <button class="ThemeMode__Item">
        <MaterialSymbolsLightModeNightOutline />
    </button>
</div>

<style>
    .ThemeMode {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    .ThemeMode__Item {
        font-size: 16px;
        cursor: pointer;
        border: none;
    }
</style>