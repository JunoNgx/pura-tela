<script lang="ts">
	import { onDestroy } from "svelte";

    import MaterialSymbolsLightShareOutline from "~icons/material-symbols-light/share-outline";
    import MaterialSymbolsLightContentCopyOutline from "~icons/material-symbols-light/content-copy-outline";

    type ShareItem = {
        label: string,
        content: string,
        shareText: string,
        shareTitle: string
    };

    type SharePanelProps = {
        domId: string,
        title: string,
        desc?: string,
        shareItemList: ShareItem[],
    };

    let {
        domId,
        title,
        desc,
        shareItemList,
    }: SharePanelProps = $props();
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

        navigator.share({
            title: item.shareTitle,
            text: item.shareText,
            url: item.content,
        })
        .catch(error => {
            console.log("Error sharing content", error)
        });
    };

    onDestroy(() => {
        clearTimeout(copyRestoreStatusTimeout);
    })
</script>

<div class="SharePanel"
    id={`${domId}`}
>
    <h3 class="SharePanel__Title">{title}</h3>
    {#if desc}
        <p class="SharePanel__Description">{desc}</p>
    {/if}
    <div class="SharePanel__ListContainer">

        {#each shareItemList as shareItem, index }
            <div class="SharePanel__ShareItem"
                id={`${domId}-${index}`}
            >
                <div class="SharePanel__ShareItemTop">
                    <h4 class="SharePanel__ShareItemLabel"
                        id={`${domId}-${index}-label`}
                    >
                        {shareItem.label}
                    </h4>

                    <div class="SharePanel__ButtonsContainer">
                        <button class="SharePanel__ShareBtn IconButtonWithLabel"
                            onclick={() => {shareItemContent(shareItem)}}
                            title="Share this content"
                            aria-label="Share this content"
                        >
                            <MaterialSymbolsLightShareOutline/>
                            <span>Share</span>
                        </button>
                        <button class="SharePanel__CopyBtn IconButtonWithLabel"
                            onclick={() => {copyItemContent(shareItem)}}
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
                </div>

                <div class="SharePanel__Content"
                    aria-describedby="{`${domId}-${index}-label`}"
                >
                    {shareItem.content}
                </div>
            </div>
        {/each}

    </div>
</div>

<style>
    .SharePanel {
        margin-top: 3rem;
    }

    .SharePanel__ListContainer {
        border: var(--lineWeight) dashed var(--colPri);
        padding: 1rem;
    }
    
    .SharePanel__ShareItemTop {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .SharePanel__ShareItemLabel {
        margin: 0;
        font-weight: bold;
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
