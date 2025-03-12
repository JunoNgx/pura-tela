<script lang="ts">
	import { onDestroy } from "svelte";

    type SharePanelProps = {
        title: string,
        desc?: string,
        content: string
    }
    
    let { title, desc, content }: SharePanelProps = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(content);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, 1000);
        } catch(error) {
            throw new Error("Unable to copy colour code to clipboard")
        }
    };

    onDestroy(() => {
        clearTimeout(copyRestoreStatusTimeout);
    })
</script>

<div class="SharePanel">
    <h3 class="SharePanel__Title">{title}</h3>
    {#if desc}
        <p class="SharePanel__Description">{desc}</p>
    {/if}
    <div class="SharePanel__Container">
        <div class="SharePanel__Content">{content}</div>
        <button class="SharePanel__CopyBtn"
            onclick={copyContent}
            title="Copy this content"
            aria-label="Copy this content"
        >
            {#if hasBeenCopied}
                Copied
            {:else}
                Copy
            {/if}
        </button>
    </div>
</div>

<style>
    .SharePanel {
        margin-top: 3rem;
    }

    .SharePanel__Container {
        border: 1px solid var(--colPri);
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
    }

    .SharePanel__Content {
        flex-shrink: 3;
        word-break: break-all;
    }
</style>