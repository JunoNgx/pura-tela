<script lang="ts">
	import LogoIcon from "./LogoIcon.svelte";

    let { isMono } = $props();
</script>

<div class="Logo">
    {#if isMono}
        <div class="Logo__Icon Logo__MonoIcon">
            <LogoIcon />
        </div>
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
        gap: 1rem;
        align-items: center;
    }

    .Logo__Icon {
        width: 2rem;
        height: 2rem;
    }

    .Logo__MonoIcon {
        fill: var(--colPri);
    }

    .Logo__Text {
        font-family: var(--fontFamilyMono);
        font-size: var(--fontSizeXl);
        white-space: nowrap;
    }
</style>
