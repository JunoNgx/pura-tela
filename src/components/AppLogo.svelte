<script lang="ts">
	import { computeThemeMode } from "src/lib/nightMode.js";
	import { ThemeMode } from "src/lib/types.js";

    let { isMono } = $props();
    let computedThemeMode = $derived(computeThemeMode());
</script>

<div class="Logo">
    {#if isMono}
        {#if computedThemeMode === ThemeMode.LIGHT}
            <img class="Logo__Icon"
                src="/logo-mono-dark-vector.svg"
                alt="Pura Tela logo"
            />
        {:else}
            <img class="Logo__Icon"
                src="/logo-mono-vector.svg"
                alt="Pura Tela logo"
            />
        {/if}
    {:else}
        <img class="Logo__Icon"
            src="/logo-vector.svg"
            alt="Pura Tela logo"
        />
    {/if}
    <h1 class="Logo__Text">Pura Tela</h1>
</div>

<style>
    .Logo {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .Logo__Icon {
        width: 2rem;
        height: 2rem;
    }

    .Logo__Text {
        white-space: nowrap;
        font-size: var(--fontSizeXl);
    }
</style>