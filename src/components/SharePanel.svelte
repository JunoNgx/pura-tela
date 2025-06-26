<script lang="ts">
    import type { ShareItem } from "src/lib/types.js";

    import SharePanelItem from "./SharePanelItem.svelte";

    type SharePanelProps = {
        domId: string;
        title: string;
        desc?: string;
        shareItemList: ShareItem[];
    };

    let { domId, title, desc, shareItemList }: SharePanelProps = $props();
</script>

<div class="SharePanel" id={`${domId}`}>
    <h3 class="SharePanel__Title">{title}</h3>
    {#if desc}
        <p class="SharePanel__Description">{desc}</p>
    {/if}
    <div class="SharePanel__ListContainer">
        {#each shareItemList as shareItem, index}
            <SharePanelItem {shareItem} {domId} {index} />
        {/each}
    </div>
</div>

<style>
    .SharePanel__ListContainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
