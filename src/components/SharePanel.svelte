<script lang="ts">
	import { onDestroy } from "svelte";

    import MaterialSymbolsLightShareOutline from "~icons/material-symbols-light/share-outline";
    import MaterialSymbolsLightContentCopyOutline from "~icons/material-symbols-light/content-copy-outline";

    type SharePanelProps = {
        title: string,
        desc?: string,
        shareContent: string,
        shareTitle: string,
        shareText: string,
    }
    
    let {
        title,
        desc,
        shareContent,
        shareTitle,
        shareText,
    }: SharePanelProps = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

    const copyItemContent = async () => {
        try {
            await navigator.clipboard.writeText(shareContent);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, 1000);
        } catch(error) {
            throw new Error("Unable to copy colour code to clipboard")
        }
    };

    const shareItemContent = () => {
        if (!navigator.share) {
            copyItemContent();
            return;
        }

        navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareContent,
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
            <button class="SharePanel__ShareBtn IconButtonWithLabel"
                onclick={shareItemContent}
                title="Share this content"
                aria-label="Share this content"
            >
                <MaterialSymbolsLightShareOutline/>
                <span>Share</span>
            </button>
            <button class="SharePanel__CopyBtn IconButtonWithLabel"
                onclick={copyItemContent}
                title="Copy this content"
                aria-label="Copy this content"
            >
                <MaterialSymbolsLightContentCopyOutline/>
                <span>
                    {#if hasBeenCopied}
                        Copied
                    {:else}
                        Copy
                    {/if}
                </span>
            </button>
        </div>
        <div class="SharePanel__Content">{shareContent}</div>
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

    .SharePanel__ShareBtn {
        display: none;
    }

    @media screen and (hover: none) and (pointer: coarse) {
        .SharePanel__ShareBtn {
            display: flex;
        }
    }
</style>
