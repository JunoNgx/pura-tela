<script lang="ts">
	import { onDestroy } from "svelte";

    import MaterialSymbolsShareOutline from "~icons/material-symbols/share-outline";
    import MaterialSymbolsContentCopyOutlineSharp from "~icons/material-symbols/content-copy-outline-sharp";
	import type { ShareItem } from "src/lib/types.js";

    type SharePanelItemProps = {
        domId: string,
        index: number,
        shareItem: ShareItem,
    };

    let {
        domId,
        index,
        shareItem
    }: SharePanelItemProps = $props();
    let hasBeenCopied = $state(false);
    let copyRestoreStatusTimeout: number | undefined = $state();

    const copyItemContent = async (item: ShareItem) => {
        try {
            await navigator.clipboard.writeText(item.content);
            hasBeenCopied = true;

            copyRestoreStatusTimeout = setTimeout(() => {
                hasBeenCopied = false;
            }, 1000);
        } catch(error) {
            throw new Error("Unable to copy colour code to clipboard")
        }
    };

    const shareItemContent = (item: ShareItem) => {
        if (!navigator.share) {
            copyItemContent(item);
            return;
        }

        const shareOptions = getShareOptions(item);
        navigator.share(shareOptions)
        .catch(error => {
            console.log("Error sharing content", error)
        });
    };

    const getShareOptions = (item: ShareItem) => {
        if (shareItem.isContentPlainText) {
            return {
                title: item.shareTitle,
                text: `${item.shareText} ${item.content}`,
            };
        }

        return {
            title: item.shareTitle,
            text: item.shareText,
            url: item.content,
        };
    };

    onDestroy(() => {
        clearTimeout(copyRestoreStatusTimeout);
    });
</script>


<div class="ShareItem"
    id={`${domId}-${index}`}
>
    <div class="ShareItem__Top">
        <h4 class="ShareItem__Label"
            id={`${domId}-${index}-label`}
        >
            {shareItem.label}
        </h4>

        <div class="ShareItem__ButtonsContainer">
            <button class="ShareItem__ShareBtn IconButtonWithLabel"
                onclick={() => {shareItemContent(shareItem)}}
                title="Share this content"
                aria-label="Share this content"
            >
                <MaterialSymbolsShareOutline/>
                <span>Share</span>
            </button>
            <button class="ShareItem__CopyBtn IconButtonWithLabel"
                onclick={() => {copyItemContent(shareItem)}}
                title="Copy this content"
                aria-label="Copy this content"
            >
                <MaterialSymbolsContentCopyOutlineSharp/>
                <span>
                    {#if hasBeenCopied}
                        Copied
                    {:else}
                        Copy
                    {/if}
                </span>
            </button>
        </div>
    </div>

    <div class="ShareItem__Content"
        aria-describedby="{`${domId}-${index}-label`}"
    >
        {shareItem.content}
    </div>
</div>

<style>
    .ShareItem {
        border: var(--lineWeight) dashed var(--colPri);
        padding: 1rem;
    }
    
    .ShareItem__Top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .ShareItem__Label {
        margin: 0;
        font-weight: bold;
    }

    .ShareItem__ButtonsContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1rem;
    }

    .ShareItem__Content {
        font-family: var(--fontFamilyMono);
        flex-shrink: 3;
        word-break: break-all;
        margin-top: 1rem;
    }

    /* .ShareItem__ShareBtn {
        display: none;
    } */

    @media screen and (hover: none) and (pointer: coarse) {
        .ShareItem__ShareBtn {
            display: flex;
        }
    }
</style>
