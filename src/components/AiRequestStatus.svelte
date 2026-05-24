<script lang="ts">
    import {
        isAiGenerating,
        lastAiError,
    } from "src/states/aiProviderState.svelte.js";

    let { shouldAlignRight = false }: { shouldAlignRight?: boolean } = $props();
</script>

<div class:AiRequestStatus--Right={shouldAlignRight}>
    {#if isAiGenerating.val}
        <p class="AiRequestStatus AiRequestStatus--Loading">
            Awaiting response...
        </p>
    {/if}
    {#if lastAiError.val}
        <p class="AiRequestStatus AiRequestStatus--Error">{lastAiError.val}</p>
    {/if}
</div>

<style>
    .AiRequestStatus {
        margin-top: 0.5rem;
    }

    .AiRequestStatus--Right {
        text-align: right;
    }

    .AiRequestStatus--Loading {
        color: var(--colInfo);
    }

    .AiRequestStatus--Error {
        color: var(--colDanger);
    }
</style>
