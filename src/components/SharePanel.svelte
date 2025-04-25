<script lang="ts">
	import { onDestroy } from "svelte";

    type SharePanelProps = {
        title: string,
        desc?: string,
        content: string,
        shareTitle: string,
        shareText: string,
    }
    
    let {
        title,
        desc,
        content,
        shareTitle,
        shareText,
    }: SharePanelProps = $props();
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

    const shareContent = () => {
        if (!navigator.share) {
            copyContent();
            return;
        }

        navigator.share({
            title: shareTitle,
            text: shareText,
            url: content,
        })
        .catch(error => {
            console.log("Error sharing content", error)
        });
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
    <div class="SharePanel__MainWrapper">
        <div class="SharePanel__ButtonsContainer">
            <button class="SharePanel__ShareBtn"
                onclick={shareContent}
                title="Share this content"
                aria-label="Share this content"
            >
                Share
            </button>
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
        <div class="SharePanel__Content">{content}</div>
    </div>
</div>

<style>
    .SharePanel {
        margin-top: 3rem;
    }

    .SharePanel__MainWrapper {
        border: var(--lineWeight) dashed var(--colPri);
        padding: 1rem;
    }

    .SharePanel__ButtonsContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1rem;
    }

    .SharePanel__Content {
        font-family: var(--fontFamilyMono);
        flex-shrink: 3;
        word-break: break-all;
        margin-top: 1rem;
    }
</style>
